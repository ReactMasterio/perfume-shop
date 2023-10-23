"use client";
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animation from "@/public/forbiddenAnimation.json";

const Unauthorized = () => {
  return (
    <div className="w-screen flex flex-col justify-center align-middle text-center">
      <Player autoplay loop src={animation} className="w-1/3"></Player>
    </div>
  );
};

export default Unauthorized;
