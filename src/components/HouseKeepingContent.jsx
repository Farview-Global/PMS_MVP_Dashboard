import React from 'react';
import roomStatusData from '../data/housekeepingcards.json';

import VacantDirtyIcon from '../assets/Vacant Dirty.svg';
import VacantCleanIcon from '../assets/Vacant Clean.svg';
import OccupiedDirtyIcon from '../assets/Occupied Dirty.svg';
import OccupiedCleanIcon from '../assets/Occupied Clean.svg';
import OutOfOrderIcon from '../assets/Out Of Order.svg';
import OutOfInventoryIcon from '../assets/Out Of Inventory.svg';

const HouseKeepingContent = () => {
  const getIconSrc = (iconPath) => {
    switch (iconPath) {
      case "../assets/Vacant Dirty.svg":
        return VacantDirtyIcon;
      case "../assets/Vacant Clean.svg":
        return VacantCleanIcon;
      case "../assets/Ocuupied Dirty.svg":
        return OccupiedDirtyIcon;
      case "../assets/Occupied Clean.svg":
        return OccupiedCleanIcon;
      case "../assets/Out Of Order.svg":
        return OutOfOrderIcon;
      case "../assets/Out Of Inventory.svg":
        return OutOfInventoryIcon;
      default:
        return null;
    }
  };

  return (
    <div className="mt-4 lg:mt-6 p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {roomStatusData.map((room) => (
          <div
            key={room.id}
            className="group flex flex-col items-center gap-3 py-14 px-10 rounded-[10px] border border-black shadow-md w-full transform transition-transform duration-300 hover:scale-y-110 hover:bg-gradient-to-t from-[#3A1F6B]/70 to-[#005C84]/80 hover:border-white"
          >
            <img 
              src={getIconSrc(room.icon)} 
              alt={room.name} 
              className="w-20 h-20 transition-all duration-300 group-hover:brightness-0 group-hover:invert" 
            />
            <p className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-white transition-colors duration-300 text-center whitespace-nowrap">{room.name}</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">{room.count}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button className="flex justify-between items-center text-lg font-bold transition-colors duration-200 hover:scale-y-110 hover:bg-gradient-to-t from-[#3A1F6B]/70 to-[#005C84]/80 hover:border-white hover:text-white"
                style={{ 
                  width: '250px', 
                  padding: '20px', 
                  borderRadius: '10px', 
                  border: '1.5px solid #005C84' 
                }}>
          <span>View All</span>
          <span className="text-2xl">&#8594;</span>
        </button>
      </div>
    </div>
  );
};

export default HouseKeepingContent;