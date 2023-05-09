import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function RegisterFormComponent() {
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Confirm Password Does Not Match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        name,
        registrationNumber,
        email,
        password,
        confirmPassword,
      });
      if (response.data.isRegistered) {
        sessionStorage.setItem("id", response.data.id);
        window.location.href = "http://localhost:5173/details";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="name" className="sr-only">
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            id="name"
            value={name}
            name="name"
            type="text"
            autocomplete="name"
            required
            class="dark:text-white appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-800"
            placeholder="Name"
          />
        </div>
        <div>
          <label for="name" className="sr-only">
            Registration Number
          </label>
          <input
            onChange={(e) => setRegistrationNumber(e.target.value)}
            id="name"
            value={registrationNumber}
            name="Registration Number"
            type="text"
            autocomplete="name"
            required
            class="dark:text-white appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-800"
            placeholder="Registration Number"
          />
        </div>
        <div>
          <label for="email-address" className="sr-only">
            Email address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email-address"
            value={email}
            name="email"
            type="email"
            autocomplete="email"
            required
            class="dark:text-white appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-800"
            placeholder="Email address"
          />
        </div>
        <div>
          <label for="password" className="sr-only">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            name="password"
            type="password"
            autocomplete="new-password"
            required
            class="dark:text-white appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-800"
            placeholder="Password"
          />
        </div>
        <div>
          <label for="password-confirm" className="sr-only">
            Confirm password
          </label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            id="password-confirm"
            name="confirmPassword"
            type="password"
            autocomplete="new-password"
            required
            class="dark:text-white appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-800"
            placeholder="Confirm password"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M3.293 6.293a1 1 0 011.414 0L10 10.586l5.293-5.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          Create account
        </button>
      </div>
      <div>
        <Link to="/">
          <button
            type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-red-500 group-hover:text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.293 6.293a1 1 0 011.414 0L10 10.586l5.293-5.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Proceed to Login
          </button>
        </Link>
      </div>
    </form>
  );
}

export default RegisterFormComponent;
