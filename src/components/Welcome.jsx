import React from "react";
import findIcon from '../assets/find.svg';
import reserveIcon from '../assets/reserve.svg';
import walkinIcon from '../assets/walkin.svg';

const Welcome = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between w-full gap-2">
      <div className="flex-1 min-w-[250px] bg-white rounded-lg shadow-lg p-4 flex justify-between items-center h-auto">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
            Welcome to Navi Dashboard
          </h1>
          <p className="text-xs md:text-sm text-gray-600">
            Your hotel management system
          </p>
        </div>
      </div>
      <div className="flex-1 min-w-[250px] flex items-center h-auto rounded-lg border border-black p-2">
        <div className="hidden md:block transform -rotate-90 mr-2">
          <span className="text-blue-600 font-bold text-base">
            QUICK LINKS
          </span>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-2 flex-1">
          <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-2 flex-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
              <img src={findIcon} alt="Find" className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-center text-gray-600">Find a Guest</span>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-2 flex-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
              <img src={reserveIcon} alt="Reserve" className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-center text-gray-600">New Reservation</span>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-2 flex-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
              <img src={walkinIcon} alt="Walk-in" className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-center text-gray-600">Walk-In</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;