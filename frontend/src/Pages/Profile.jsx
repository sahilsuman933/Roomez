import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Profile() {
  const [data, setData] = useState(null);

  if (sessionStorage.getItem("id") == null) {
    return <Navigate to="/" replace="true" />;
  }

  useEffect(() => {
    axios
      .post("http://localhost:3000/user-data", {
        id: sessionStorage.getItem("id"),
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const makeTimeFormat = (sliderValue) => {
    const hours = Math.floor(sliderValue / 60);
    const minutes = sliderValue % 60;
    const formattedTime =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0");

    return formattedTime;
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 h-screen">
        {data === null ? (
          <div
            class="text-center"
            style={{
              position: "absolute",
              margin: "0 auto",
              left: "0",
              right: "0",
              top: "50%",
            }}
          >
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="p-10">
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2">
                <h1 className="text-3xl font-bold text-white mb-6">
                  User Profile
                </h1>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="mb-6">
                    <h2 className="text-xl text-white font-bold mb-2">Name:</h2>
                    <p className="text-white">{data.name}</p>
                  </div>
                  <div className="mb-6">
                    <h2 className="text-xl text-white font-bold mb-2">
                      Registration Number:
                    </h2>
                    <p className="text-white">{data.registrationNumber}</p>
                  </div>
                  <div className="mb-6">
                    <h2 className="text-xl text-white font-bold mb-2">
                      Email:
                    </h2>
                    <p className="text-white">{data.email}</p>
                  </div>
                  <div className="mb-6">
                    <h2 className="text-xl text-white font-bold mb-2">
                      Cleanliness:
                    </h2>
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={data.cleanliness}
                        className="w-full slider"
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <h2 className="text-xl text-white font-bold mb-2">
                      Social Activity:
                    </h2>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={data.socialActivity}
                      className="w-full slider"
                      disabled={true}
                    />
                  </div>
                  <div className="mb-6">
                    <h2 className="text-xl text-white font-bold mb-2">
                      When do you study?
                    </h2>
                    <p className=" text-white font-bold mb-2">
                      From: {makeTimeFormat(data.studyScheduleFrom)}
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="1439"
                      value={data.studyScheduleFrom}
                      className="w-full slider"
                      disabled={true}
                    />
                    <p className=" text-white font-bold mb-2">
                      To: {makeTimeFormat(data.sleepScheduleFrom)}
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="1439"
                      value={data.studyScheduleTo}
                      className="w-full slider"
                      disabled={true}
                    />
                  </div>
                  <div className="mb-6">
                    <h2 className="text-xl text-white font-bold mb-2">
                      When do you sleep?
                    </h2>
                    <p className=" text-white font-bold mb-2">
                      From: {makeTimeFormat(data.sleepScheduleFrom)}
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="1439"
                      value={data.sleepScheduleFrom}
                      className="w-full slider"
                      disabled={true}
                    />
                    <p className=" text-white font-bold mb-2">
                      To: {makeTimeFormat(data.sleepScheduleTo)}
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="1439"
                      value={data.sleepScheduleTo}
                      className="w-full slider"
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="b1.png"
                  alt="Profile"
                  className="rounded-full h-64 mb-2"
                />
                <Link to="/match">
                  <button className="bg-blue-700 text-white px-4 py-2 rounded-lg mt-4">
                    Find Match
                  </button>
                </Link>

                <Link to="/details">
                  <button className="bg-red-700 text-white px-4 py-2 rounded-lg mt-6">
                    Modify Personal Details
                  </button>
                </Link>
                <button
                  className="text-white px-4 py-2 rounded-lg mt-4 bg-green-700"
                  onClick={() => {
                    sessionStorage.removeItem("id");
                    window.location.href = "http://localhost:5173/";
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
