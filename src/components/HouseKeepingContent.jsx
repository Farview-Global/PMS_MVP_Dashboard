import React from 'react';
import roomStatusData from '../data/housekeepingcards.json';

import VacantDirtyIcon from '../assets/Vacant Dirty.svg';
import VacantCleanIcon from '../assets/Vacant Clean.svg';
import OccupiedDirtyIcon from '../assets/Occupied Dirty.svg'; // typo might be here
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
    <div className="mt-2 p-4">
      <div className="grid grid-cols-6 gap-4">
        {roomStatusData.map((room) => (
          <div
            key={room.id}
            className="border border-black rounded-lg shadow-md p-4 flex flex-col items-center justify-center h-[310px] w-[240px] transform transition-transform duration-300 hover:scale-y-110 hover:bg-gradient-to-t from-[#4A2C82]/70 to-[#005C84]/80"
          >
            <img src={getIconSrc(room.icon)} alt={room.name} className="w-30 h-30 mb-2" />
            <p className="text-lg font-semibold text-gray-800">{room.name}</p>
            <p className="text-3xl font-bold text-gray-900">{room.count}</p>
          </div>
        ))}
      </div>
      <div className="col-span-6 flex justify-center mt-6">
          <button className="w-[300px] px-6 py-6 rounded-lg text-lg font-semibold flex justify-between items-center border border-black hover:bg-purple-50 transition-colors duration-200 hover:scale-y-110 hover:bg-gradient-to-t from-[#4A2C82]/70 to-[#005C84]/80">
            <span>View All</span>
            <span className="text-xl">&#8594;</span>
          </button>
        </div>
    </div>
  );
};

export default HouseKeepingContent;
