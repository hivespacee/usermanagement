import React from "react";
import NoInternetImg from "../assets/upsetcat.png";

const NoInternet = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-mono tracking-widest px-4 py-8">
      <p className="text-gray-400 font-extrabold mb-6 sm:mb-8 text-center text-auto">
        Whoops! Looks like we're disconneted.
      </p>
      <div className="flex">
        <img
          src={NoInternetImg}
          alt="No Internet"
          className="w-auto h-72 mb-6 rounded-3xl"
        />
      </div>
    </div>
  );
};

export default NoInternet;
