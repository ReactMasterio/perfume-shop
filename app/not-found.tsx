"use client";
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animation from "@/public/notFoundAnimation.json";

const NotFoundPage = () => {
  return (
    <div className="w-screen flex flex-col justify-center align-middle text-center">
      <Player
        autoplay
        loop
        src={animation}
        className="w-1/2"
      ></Player>
    </div>
  );
};

export default NotFoundPage;
