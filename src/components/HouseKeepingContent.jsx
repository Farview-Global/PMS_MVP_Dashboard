import React, { useState, useEffect } from 'react';
import roomStatusData from '../data/housekeepingcards.json';

import VacantDirtyIcon from '../assets/Vacant Dirty.svg';
import VacantCleanIcon from '../assets/Vacant Clean.svg';
import OccupiedDirtyIcon from '../assets/Occupied Dirty.svg';
import OccupiedCleanIcon from '../assets/Occupied Clean.svg';
import OutOfOrderIcon from '../assets/Out Of Order.svg';
import OutOfInventoryIcon from '../assets/Out Of Inventory.svg';

const HouseKeepingContent = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Get responsive styles based on screen size
  const getResponsiveCardStyles = () => {
    if (windowWidth < 640) {
      // Mobile: smaller cards
      return {
        containerPadding: "py-5 px-2",
        iconSize: "w-7 h-7",
        textSize: "text-xs",
        countSize: "text-base",
        gap: "gap-2"
      };
    } else if (windowWidth < 768) {
      // Tablet: medium cards
      return {
        containerPadding: "py-6 px-3",
        iconSize: "w-9 h-9",
        textSize: "text-sm",
        countSize: "text-lg",
        gap: "gap-2"
      };
    } else if (windowWidth < 1024) {
      // Small laptop: medium-large cards
      return {
        containerPadding: "py-7 px-4",
        iconSize: "w-11 h-11",
        textSize: "text-sm",
        countSize: "text-xl",
        gap: "gap-2"
      };
    } else if (windowWidth < 1280) {
      // Large laptop: large cards
      return {
        containerPadding: "py-9 px-5",
        iconSize: "w-13 h-13",
        textSize: "text-base",
        countSize: "text-2xl",
        gap: "gap-3"
      };
    } else {
      // Desktop: increased size cards
      return {
        containerPadding: "py-12 px-7",
        iconSize: "w-16 h-16",
        textSize: "text-base",
        countSize: "text-3xl",
        gap: "gap-3"
      };
    }
  };

  const cardStyles = getResponsiveCardStyles();

  return (
    <div className="mt-1 lg:mt-2 p-4">
      <div className="grid grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
        {roomStatusData.map((room) => (
          <div
            key={room.id}
            className={`group flex flex-col items-center ${cardStyles.gap} ${cardStyles.containerPadding} rounded-[10px] border border-black shadow-md w-full transform transition-transform duration-300 hover:scale-y-110 hover:bg-gradient-to-t from-[#3A1F6B]/70 to-[#005C84]/80 hover:border-white`}
          >
            <img 
              src={getIconSrc(room.icon)} 
              alt={room.name} 
              className={`${cardStyles.iconSize} transition-all duration-300 group-hover:brightness-0 group-hover:invert`}
            />
            <p className={`${cardStyles.textSize} font-semibold text-gray-800 group-hover:text-white transition-colors duration-300 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full`}>{room.name}</p>
            <p className={`${cardStyles.countSize} font-bold text-gray-900 group-hover:text-white transition-colors duration-300`}>{room.count}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button className={`flex justify-between items-center font-bold transition-colors duration-200 hover:scale-y-110 hover:bg-gradient-to-t from-[#3A1F6B]/70 to-[#005C84]/80 hover:border-white hover:text-white ${
          windowWidth < 640 ? 'text-xs px-3 py-2 w-[160px]' :
          windowWidth < 768 ? 'text-sm px-4 py-3 w-[180px]' :
          windowWidth < 1024 ? 'text-base px-5 py-4 w-[200px]' :
          windowWidth < 1280 ? 'text-lg px-6 py-4 w-[230px]' :
          'text-xl px-7 py-5 w-[250px]'
        }`}
                style={{ 
                  borderRadius: '10px', 
                  border: '1.5px solid #005C84' 
                }}>
          <span>View All</span>
          <span className={`${
            windowWidth < 640 ? 'text-lg' :
            windowWidth < 768 ? 'text-xl' :
            'text-2xl'
          }`}>&#8594;</span>
        </button>
      </div>
    </div>
  );
};

export default HouseKeepingContent;