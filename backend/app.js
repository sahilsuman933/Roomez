const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect("#", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  registrationNumber: String,
  email: String,
  password: String,
  cleanliness: { type: Number, default: null },
  sleepScheduleTo: { type: Number, default: null },
  sleepScheduleFrom: { type: Number, default: null },
  studyScheduleTo: { type: Number, default: null },
  studyScheduleFrom: { type: Number, default: null },
  socialActivity: { type: Number, default: null },
});

const User = mongoose.model("User", userSchema);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    const { name, registrationNumber, email, password, confirmPassword } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = new User({
      name,
      registrationNumber,
      email,
      password,
    });

    await user.save();

    res.status(200).json({
      message: "User registered successfully",
      id: user._id,
      isRegistered: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", isRegistered: false });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", isAuthenticated: false });
    }

    res.status(200).json({
      message: "Login successful",
      id: user._id,
      isAuthenticated: true,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", isAuthenticated: false });
  }
});

app.post("/user-data", async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.put("/user-preferences", async (req, res) => {
  try {
    const {
      id,
      cleanliness,
      sleepScheduleTo,
      sleepScheduleFrom,
      studyScheduleTo,
      studyScheduleFrom,
      socialActivity,
    } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found", isSet: false });
    }

    user.cleanliness = cleanliness;
    user.sleepScheduleTo = sleepScheduleTo;
    user.sleepScheduleFrom = sleepScheduleFrom;
    user.studyScheduleTo = studyScheduleTo;
    user.studyScheduleFrom = studyScheduleFrom;
    user.socialActivity = socialActivity;

    await user.save();

    res
      .status(200)
      .json({ message: "User parameters updated successfully", isSet: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Match
const genSimilarityIndex = (userData, roommateData) => {
  const difference = {
    cleanliness:
      (Math.abs(userData.cleanliness - roommateData.cleanliness) * 0.3) / 10,
    sleepScheduleTo: Math.abs(
      userData.sleepScheduleTo - roommateData.sleepScheduleTo
    ),
    sleepScheduleFrom: Math.abs(
      userData.sleepScheduleFrom - roommateData.sleepScheduleFrom
    ),
    studyScheduleTo: Math.abs(
      userData.studyScheduleTo - roommateData.studyScheduleTo
    ),
    studyScheduleFrom: Math.abs(
      userData.studyScheduleFrom - roommateData.studyScheduleFrom
    ),
    socialActivity:
      (Math.abs(userData.socialActivity - roommateData.socialActivity) * 0.1) /
      10,
  };

  const sleepSchedule =
    ((difference.sleepScheduleFrom - difference.sleepScheduleTo) * 0.3) / 1439;
  const studySchedule =
    ((difference.studyScheduleFrom - difference.studyScheduleTo) * 0.3) / 1439;

  return (
    difference.cleanliness +
    difference.socialActivity +
    sleepSchedule +
    studySchedule
  );
};

app.post("/match", async (req, res) => {
  const { id } = req.body;

  const userData = await User.findById(id);
  let similarityArr = [];
  try {
    const users = await User.find();

    users.forEach((roommateData) => {
      if (roommateData._id != id) {
        similarityArr = [
          ...similarityArr,
          {
            name: roommateData.name,
            registrationNumber: roommateData.registrationNumber,
            email: roommateData.email,
            matchValue: genSimilarityIndex(userData, roommateData),
          },
        ];
      }
    });

    similarityArr.sort((a, b) => b.matchValue - a.matchValue);

    res.status(200).json(similarityArr[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
