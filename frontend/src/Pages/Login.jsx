import React from "react";
import LoginFormComponent from "../Components/LoginFormComponent";
import Navbar from "../Components/Navbar";
import { Navigate } from "react-router-dom";

function LoginForm() {
  if (sessionStorage.getItem("id") != null) {
    return <Navigate to="/profile" replace="true" />;
  }

  return (
    <div className="h-screen bg-gray-900">
      <Navbar />
      <div className="flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Sign in to your account
            </h2>
          </div>
          <LoginFormComponent />
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
