import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from ".././firebase";
import { FcGoogle } from "react-icons/fc";

export default function Login({ setUser }) {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      alert("Sign-in failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br ">
      <div className="bg-gradient-to-tr from-yellow-400 via-yellow-300 to-yellow-200 p-8 rounded-2xl shadow-2xl w-96 text-center">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">
         Please Sign in to Chat
        </h2>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full gap-3 bg-white text-gray-700 font-medium rounded-lg px-5 py-3 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer"
        >
          <FcGoogle size={24} />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}