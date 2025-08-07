import React, { useState, useEffect } from "react";
import dashboardTabsData from "../data/dashboardTabs.json";
import reservationsIcon from "../assets/Reservations.svg";
import houseKeepingIcon from "../assets/House Keeping.svg";
import availableRoomsIcon from "../assets/Available Rooms.svg";
import projectionsIcon from "../assets/Projections.svg";
import ReservationsContent from "./ReservationsContent";
import HouseKeepingContent from "./HouseKeepingContent";
import AvailableRoomsContent from "./AvailableRoomsContent";
import ProjectionsContent from "./ProjectionsContent";
import clsx from 'clsx';

const iconMap = {
  "../assets/Reservations.svg": reservationsIcon,
  "../assets/House Keeping.svg": houseKeepingIcon,
  "../assets/Available Rooms.svg": availableRoomsIcon,
  "../assets/Projections.svg": projectionsIcon,
};

const contentMap = {
  "Reservations": ReservationsContent,
  "House Keeping": HouseKeepingContent,
  "Available Rooms": AvailableRoomsContent,
  "Projections": ProjectionsContent,
};

const DashboardTabs = () => {
  const [tabs, setTabs] = useState(dashboardTabsData);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabClick = (tabId) => {
    setTabs(tabs.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    })));
  };

  const ActiveTabContent = () => {
    const activeTab = tabs.find(tab => tab.isActive);
    if (!activeTab) return null;
    const ComponentToRender = contentMap[activeTab.name];
    return ComponentToRender ? <ComponentToRender /> : null;
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-stretch w-full bg-white rounded-xl p-2 sm:p-3 lg:p-4 xl:p-5 shadow-sm gap-1 sm:gap-2 lg:gap-3">
        {tabs.map((tab) => {
          const isActive = tab.isActive;
          return (
            <div
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={clsx(
                `group flex flex-1 items-center justify-center sm:justify-start space-x-1 sm:space-x-2 lg:space-x-3 rounded-lg p-1 sm:p-2 lg:p-3 cursor-pointer transition-all duration-200 h-auto w-full sm:w-auto min-w-[100px] sm:min-w-[120px] lg:min-w-[140px] xl:min-w-[160px] overflow-hidden`,
                isActive
                  ? "bg-gradient-to-t from-[#3A1F6B]/80 to-[#005C84]/80 scale-100"
                  : "bg-white border border-black hover:shadow-sm"
              )}
            >
              <div
                className={clsx(
                  `flex-shrink-0 rounded-md`,
                  isActive ? "p-1 lg:p-2" : "border border-black p-1"
                )}
              >
                <img
                  src={iconMap[tab.icon]}
                  alt={tab.name}
                  className={clsx(
                    `transition-transform duration-200 group-hover:scale-110`,
                    windowWidth < 640 ? "w-4 h-4" :
                    windowWidth < 768 ? "w-5 h-5" :
                    windowWidth < 1024 ? "w-6 h-6" :
                    windowWidth < 1280 ? "w-7 h-7" : "w-8 h-8",
                    isActive && "filter invert"
                  )}
                />
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <span
                  className={clsx(
                    `font-bold whitespace-nowrap text-ellipsis overflow-hidden block`,
                    windowWidth < 640 ? "text-xs" :
                    windowWidth < 768 ? "text-sm" :
                    windowWidth < 1024 ? "text-base" :
                    windowWidth < 1280 ? "text-lg" : "text-xl",
                    isActive ? "text-white" : "text-black"
                  )}
                >
                  {tab.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <ActiveTabContent />
    </div>
  );
};

export default DashboardTabs;