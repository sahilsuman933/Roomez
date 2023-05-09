import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 py-3">
      <div
        className="container mx-auto flex justify-between items-center mb-4 ml-4"
        style={{ margin: "0 auto" }}
      >
        <Link
          to="/"
          className="text-gray-100 font-bold text-3xl flex items-center"
        >
          <img src="Logo.png" alt="Roomees Logo" className="h-24 mr-2" />
          Roomeez
        </Link>
        {sessionStorage.getItem("id") !== null ? (
          <div className="flex items-center">
            <Link
              to="/profile"
              className="text-gray-100 hover:text-gray-300 mx-4"
            >
              <img src="user.svg" alt="User Icon" className="h-8" />
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
