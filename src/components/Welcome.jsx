import React from "react";
import { Search, Calendar, Users } from "lucide-react";

const Welcome = () => {
  return (
    <div className="flex flex-row justify-between w-full gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
      {/* Welcome Card - Reduced to 25% width */}
      <div className="w-[25%] bg-white rounded-lg shadow-lg p-1 sm:p-2 md:p-3 lg:p-3 xl:p-4 flex justify-between items-center h-auto">
        <div className="w-full">
          <h1 className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-800 mb-1 leading-tight">
            Welcome to Navi Dashboard
          </h1>
          <p className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-xs xl:text-sm text-gray-600 leading-tight">
            Your hotel management system
          </p>
        </div>
      </div>

      {/* Quick Links Card - Reduced to 35% width */}
      <div className="w-[35%] flex items-center h-auto rounded-lg border border-black p-1 sm:p-2 md:p-3 lg:p-3 xl:p-4 min-h-[60px] sm:min-h-[70px] md:min-h-[80px] lg:min-h-[85px] xl:min-h-[90px]">
        {/* Vertical QUICK LINKS text */}
        <div className="flex items-center justify-center -rotate-[90deg] mr-1 sm:mr-2 md:mr-3 lg:mr-4">
          <span className="text-blue-600 font-bold text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs whitespace-nowrap">
            QUICK LINKS
          </span>
        </div>
        
        <div className="flex gap-1 sm:gap-1 md:gap-2 lg:gap-2 flex-1 items-center justify-between">
          {/* Find a Guest */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-1 sm:p-1 md:p-2 lg:p-2 flex-1 min-w-0 h-[50px] sm:h-[55px] md:h-[60px] lg:h-[65px] xl:h-[70px]">
            <div className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-blue-100 flex items-center justify-center mb-1" style={{borderRadius: '50%', aspectRatio: '1/1'}}>
              <Search className="w-2 h-2 sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-3 lg:h-3 xl:w-4 xl:h-4 text-blue-600" />
            </div>
            <span className="text-[5px] sm:text-[6px] md:text-[7px] lg:text-[8px] xl:text-[9px] font-medium text-center text-gray-600 leading-tight px-1">Find a Guest</span>
          </div>
          
          {/* New Reservation */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-1 sm:p-1 md:p-2 lg:p-2 flex-1 min-w-0 h-[50px] sm:h-[55px] md:h-[60px] lg:h-[65px] xl:h-[70px]">
            <div className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-blue-100 flex items-center justify-center mb-1" style={{borderRadius: '50%', aspectRatio: '1/1'}}>
              <Calendar className="w-2 h-2 sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-3 lg:h-3 xl:w-4 xl:h-4 text-blue-600" />
            </div>
            <span className="text-[5px] sm:text-[6px] md:text-[7px] lg:text-[8px] xl:text-[9px] font-medium text-center text-gray-600 leading-tight px-1">New Reservation</span>
          </div>
          
          {/* Walk-In */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-1 sm:p-1 md:p-2 lg:p-2 flex-1 min-w-0 h-[50px] sm:h-[55px] md:h-[60px] lg:h-[65px] xl:h-[70px]">
            <div className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-blue-100 flex items-center justify-center mb-1" style={{borderRadius: '50%', aspectRatio: '1/1'}}>
              <Users className="w-2 h-2 sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-3 lg:h-3 xl:w-4 xl:h-4 text-blue-600" />
            </div>
            <span className="text-[5px] sm:text-[6px] md:text-[7px] lg:text-[8px] xl:text-[9px] font-medium text-center text-gray-600 leading-tight px-1">Walk-In</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;