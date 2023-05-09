import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Slider() {
  if (sessionStorage.getItem("id") == null) {
    return <Navigate to="/" replace="true" />;
  }

  const [cleanliness, setCleanliness] = useState(0);
  const [sleepScheduleTo, setsleepScheduleTo] = useState(0);
  const [sleepScheduleFrom, setSleepScheduleFrom] = useState(0);
  const [studyScheduleTo, setStudyScheduleTo] = useState(0);
  const [studyScheduleFrom, setStudyScheduleFrom] = useState(0);
  const [socialActivity, setSocialActivity] = useState(0);

  const makeTimeFormat = (sliderValue) => {
    const hours = Math.floor(sliderValue / 60);
    const minutes = sliderValue % 60;
    const formattedTime =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0");

    return formattedTime;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:3000/user-preferences",
        {
          id: sessionStorage.getItem("id"),
          cleanliness,
          sleepScheduleTo,
          sleepScheduleFrom,
          studyScheduleTo,
          studyScheduleFrom,
          socialActivity,
        }
      );
      if (response.data.isSet) {
        window.location.href = "http://localhost:5173/profile";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <h1 className=" text-left text-3xl font-extrabold text-white">
          Your Preferences
        </h1>

        <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg px-8 py-6 mt-8 w-1/2">
          <h2 className="text-lg font-medium text-white mb-2">Cleanliness</h2>
          <input
            type="range"
            min="0"
            max="10"
            value={cleanliness}
            className="w-full slider"
            onChange={(e) => setCleanliness(e.target.value)}
          />
          <div className="flex justify-center w-full text-white">
            <p className="mt-2 value">{cleanliness}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg px-8 py-6 mt-8 w-1/2">
          <h2 className="text-lg font-medium text-white mb-2">
            Social Activity
          </h2>
          <input
            type="range"
            min="0"
            max="10"
            value={socialActivity}
            className="w-full slider"
            onChange={(e) => setSocialActivity(e.target.value)}
          />
          <div className="flex justify-center w-full text-white">
            <p className="mt-2 value">{socialActivity}</p>
          </div>
        </div>

        <div className="flex flex-col  justify-center bg-gray-800 rounded-lg px-8 py-6 mt-8 w-1/2">
          <h3 className="text-lg font-medium text-white mb-2 text-center">
            When do you study?
          </h3>
          <h2 className="text-lg font-medium text-white mb-2">
            From: {makeTimeFormat(sleepScheduleFrom)}
          </h2>
          <input
            type="range"
            min="0"
            max="1439"
            className="w-full slider"
            value={sleepScheduleFrom}
            onChange={(e) => setSleepScheduleFrom(e.target.value)}
          />
          <h2 className="text-lg font-medium text-white mb-2">
            To: {makeTimeFormat(sleepScheduleTo)}
          </h2>
          <input
            type="range"
            min="0"
            max="1439"
            className="w-full slider"
            value={sleepScheduleTo}
            onChange={(e) => setsleepScheduleTo(e.target.value)}
          />
        </div>
        <div className="flex flex-col  justify-center bg-gray-800 rounded-lg px-8 py-6 mt-8 w-1/2">
          <h3 className="text-lg font-medium text-white mb-2 text-center">
            When do you sleep?
          </h3>
          <h2 className="text-lg font-medium text-white mb-2">
            From: {makeTimeFormat(studyScheduleFrom)}
          </h2>
          <input
            type="range"
            min="0"
            max={1439}
            className="w-full slider"
            value={studyScheduleFrom}
            onChange={(e) => setStudyScheduleFrom(e.target.value)}
          />
          <h2 className="text-lg font-medium text-white mb-2">
            To: {makeTimeFormat(studyScheduleTo)}
          </h2>
          <input
            type="range"
            min="0"
            max="1439"
            className="w-full slider"
            value={studyScheduleTo}
            onChange={(e) => setStudyScheduleTo(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            type="button"
            className="mt-8 group relative w-full flex justify-center py-3 px-5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Slider;
