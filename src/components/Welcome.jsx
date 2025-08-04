import React from "react";
import findIcon from '../assets/find.svg';
import reserveIcon from '../assets/reserve.svg';
import walkinIcon from '../assets/walkin.svg';

const Welcome = () => {
  return (
    <div className="flex justify-between items-center w-[1678px] h-[136px] ">
      {/* Left Section: Welcome to Navi Dashboard */}
      <div className="flex justify-between items-center w-[506px] h-[125px] bg-white rounded-[6px] shadow-lg p-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to Navi Dashboard
          </h1>
          <p className="text-gray-600">
            Your hotel management system
          </p>
        </div>
      </div>

      {/* Right Section: Quick Links */}
      <div className="flex items-center w-[620px] h-[136px] rounded-[10px] border border-black p-4">
        {/* QUICK LINKS Label */}
        <div className="transform -rotate-90 mr-4">
          <span className="text-blue-600 font-bold text-lg">
            QUICK LINKS
          </span>
        </div>

        {/* Quick Link Cards */}
        <div className="flex space-x-4 flex-1">
          {/* Find a Guest Card */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-4 flex-1">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <img src={findIcon} alt="Find" className="w-6 h-6" />
            </div>
            <span className="text-gray-600 text-sm font-medium">Find a Guest</span>
          </div>

          {/* New Reservation Card */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-4 flex-1">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <img src={reserveIcon} alt="Reserve" className="w-6 h-6" />
            </div>
            <span className="text-gray-600 text-sm font-medium">New Reservation</span>
          </div>

          {/* Walk-In Card */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-4 flex-1">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <img src={walkinIcon} alt="Walk-in" className="w-6 h-6" />
            </div>
            <span className="text-gray-600 text-sm font-medium">Walk-In</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
