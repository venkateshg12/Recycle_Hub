import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import bg from "../assets/background.jpg";
export default function Person_or_Agent() {
  const navigate = useNavigate();
  function loginAsUser() {
    navigate("/login");
  }
  function loginAsAgent() {
    navigate("/Agent_login");
  }
  return (
<div className="flex flex-col md:flex-row items-center justify-around min-h-screen w-full transition-colors bg-gradient-to-l from-green-200 to-transparent">
<div className="flex flex-col justify-center items-center border border-black rounded-lg p-8 bg-white shadow-lg w-full md:w-1/3 max-w-sm mx-4">
        <p className="text-lg text-fuchsia-600 mb-4 text-center">
          Come and join us to make the world sustainable
        </p>
        <button
          className="hover:shadow-lg text-white bg-green-400 border border-green-400 w-full rounded-md py-2"
          onClick={() => navigate("/login")}
        >
          Login as User
        </button>
      </div>
      <div className="flex flex-col justify-center items-center border border-black rounded-lg p-8 bg-white shadow-lg w-full md:w-1/3 max-w-sm mx-4">
        <p className="text-lg text-fuchsia-600 mb-4 text-center">
          Come and join us to make the world sustainable
        </p>
        <button
          className="hover:shadow-lg text-white bg-green-400 border border-green-400 w-full rounded-md py-2"
          onClick={() => navigate("/Agent_login")}
        >
          Login as Agent
        </button>
      </div>
    </div>
  );
}
