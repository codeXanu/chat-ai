import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from ".././firebase";

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
    <div className="p-4 flex flex-col items-center justify-center min-h-screen">
      <h2 className="mb-6 text-2xl font-bold">Sign in to Chat</h2>
      <button
        onClick={handleGoogleSignIn}
        className="bg-yellow-500 text-white rounded px-5 py-3 shadow hover:bg-yellow-600"
      >
        Sign in with Google
      </button>
    </div>
  );
}