import React from 'react';
import sunIcon from '../assets/sun.svg';
import hotelIcon from '../assets/hotel.svg';

const GreetingWeatherHotelCard = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full p-2 bg-white rounded-xl shadow-lg gap-2">
      <div className="flex items-center space-x-2">
        <img src={sunIcon} alt="Sun" className="w-8 h-8" />
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#374151]">
            Good afternoon, Alex
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] font-semibold mt-1">72°F, Sunny</p>
        </div>
      </div>
      <div className="relative group cursor-pointer w-full sm:w-auto mt-2 sm:mt-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-600 rounded-xl p-[1px] group-hover:from-white group-hover:to-white transition-all duration-300">
          <div className="bg-white rounded-[11px] h-full w-full"></div>
        </div>
        <div className="relative flex items-center gap-2 p-2 rounded-xl">
          <img src={hotelIcon} alt="Hotel" className="w-8 h-12" />
          <div className="text-xs text-black">
            <p className="font-medium">Hotel Name Here</p>
            <p>Location Here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingWeatherHotelCard;