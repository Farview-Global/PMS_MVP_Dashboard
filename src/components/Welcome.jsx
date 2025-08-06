import React from "react";
import findIcon from '../assets/find.svg';
import reserveIcon from '../assets/reserve.svg';
import walkinIcon from '../assets/walkin.svg';
 
const Welcome = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between w-full gap-2">
      <div className="w-[440px] h-[96px] bg-white rounded-lg shadow-lg flex items-center justify-between pl-[40px] pr-[30px] pt-[24px] pb-[24px]">
        <div className="flex flex-col gap-[20px]">
          <h1 className="text-2xl md:text-2xl font-bold text-gray-800">
            Welcome to Navi Dashboard
          </h1>
          <p className="text-xs md:text-sm text-gray-600">
            Your hotel management system
          </p>
        </div>
      </div>
 
      <div className="w-[580px] h-[96px] p-[20px] m-[0.5px] rounded-[10px] border border-black flex items-center">
  <div className="hidden md:block transform -rotate-90 mr-2">
    <span className="text-blue-600 font-bold text-base">QUICK LINKS</span>
  </div>
  <div className="flex flex-wrap sm:flex-nowrap gap-2 flex-1">
    <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-2 flex-1">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
        <img src={findIcon} alt="Find" className="w-5 h-5" />
      </div>
      <span className="text-xs font-medium text-center text-gray-600">
        Find a Guest
      </span>
    </div>
    <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-2 flex-1">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
        <img src={reserveIcon} alt="Reserve" className="w-5 h-5" />
      </div>
      <span className="text-xs font-medium text-center text-gray-600">
        New Reservation
      </span>
    </div>
    <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-2 flex-1">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
        <img src={walkinIcon} alt="Walk-in" className="w-5 h-5" />
      </div>
      <span className="text-xs font-medium text-center text-gray-600">
        Walk-In
      </span>
    </div>
  </div>
</div>
 
    </div>
  );
};
 
export default Welcome;