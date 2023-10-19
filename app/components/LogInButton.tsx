"use client";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const LogInButton = () => {
  return (
    <button
      className="hidden md:flex transition-all px-4 py-2"
      onClick={() => console.log("Log In Clicked.")}
    >
      <ArrowRightIcon className="h-3 w-3 mr-2 self-center" />
      Log In
    </button>
  );
};

export default LogInButton;
