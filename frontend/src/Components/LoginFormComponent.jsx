import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginFormComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      if (response.data.isAuthenticated) {
        window.location.href = "http://localhost:5173/details";
        sessionStorage.setItem("id", response.data.id);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="mt-8 space-y-6" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">
            Email address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            autocomplete="email"
            required
            className="dark:text-white appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-white-400 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-800"
            placeholder="Email address"
          />
        </div>
        <div>
          <label for="password" class="sr-only">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            className="dark:text-white appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-white-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-800"
            placeholder="Password"
          />
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-400">
            Remember me
          </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
          <br />
        </div>
      </div>
      <div>
        <button
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </div>
      <div>
        <Link to="/register">
          <button
            type="button"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </Link>
      </div>
    </form>
  );
}

export default LoginFormComponent;
