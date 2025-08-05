import React, { useState } from "react";
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
      <div className="flex flex-wrap justify-center sm:flex-nowrap sm:justify-between items-stretch w-full bg-white rounded-xl p-2 shadow-sm gap-1 sm:gap-2">
        {tabs.map((tab) => {
          const isActive = tab.isActive;
          return (
            <div
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={clsx(
                `group flex flex-1 items-center space-x-1 sm:space-x-2 rounded-lg p-1 sm:p-2 cursor-pointer transition-all duration-200 h-auto w-full sm:w-auto min-w-[120px]`,
                isActive
                  ? "bg-gradient-to-t from-[#3A1F6B]/80 to-[#005C84]/80"
                  : "bg-white border border-black hover:shadow-sm"
              )}
            >
              <div
                className={clsx(
                  `flex-shrink-0 rounded-md`,
                  isActive ? "p-1 sm:p-2" : "border border-black p-1"
                )}
              >
                <img
                  src={iconMap[tab.icon]}
                  alt={tab.name}
                  className={clsx(
                    `w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-200 group-hover:scale-110`,
                    isActive && "filter invert"
                  )}
                />
              </div>
              <div className="flex-1">
                <span
                  className={clsx(
                    `font-bold text-xs sm:text-sm md:text-base whitespace-nowrap`,
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