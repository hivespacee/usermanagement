import React from "react";
import NoInternetImg from "../assets/upsetcat.png";

const NoInternet = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-mono tracking-widest">
      {/* <h1 className="text-3xl font-bold mb-4">Internet Connection Lost</h1> */}
      <p className="text-gray-400 font-extrabold mb-8 text-center">
        Oops, out of network! Please check your connection and try again.
      </p>
        <img src={NoInternetImg} alt="No Internet" className="w-20 h-90 mb-8 rounded-4xl " />    </div>
  );
};

export default NoInternet;
