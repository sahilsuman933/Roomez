import React from "react";
import RegisterFormComponent from "../Components/RegisterFormComponent";
import Navbar from "../Components/Navbar";
import { Navigate } from "react-router-dom";

function RegisterForm() {
  if (sessionStorage.getItem("id") !== null) {
    return <Navigate to="/profile" replace="true" />;
  }
  return (
    <>
      <div className="h-screen bg-gray-900">
        <Navbar />
        <div className=" flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <img src="b1.png" className="mr-20" />
          <div>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                Create a new account
              </h2>
            </div>
            <RegisterFormComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
