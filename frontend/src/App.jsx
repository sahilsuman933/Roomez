import React from "react";
import "./stylesheet/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Pages/Login";
import RegisterForm from "./Pages/Register";
import Match from "./Pages/Match";
import Details from "./Pages/Details";
import Profile from "./Pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/details" element={<Details />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/match" element={<Match />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
