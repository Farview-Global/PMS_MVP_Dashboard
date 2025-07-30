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

const DashboardTabs = () => {
  const [tabs, setTabs] = useState(dashboardTabsData);

  const handleTabClick = (tabId) => {
    setTabs(tabs.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    })));
  };

  const getIconSrc = (iconPath) => {
    switch (iconPath) {
      case "../assets/Reservations.svg":
        return reservationsIcon;
      case "../assets/House Keeping.svg":
        return houseKeepingIcon;
      case "../assets/Available Rooms.svg":
        return availableRoomsIcon;
      case "../assets/Projections.svg":
        return projectionsIcon;
      default:
        return reservationsIcon;
    }
  };

  const ActiveTabContent = () => {
    const activeTab = tabs.find(tab => tab.isActive);
    switch (activeTab?.name) {
      case "Reservations":
        return <ReservationsContent />;
      case "House Keeping":
        return <HouseKeepingContent />;
      case "Available Rooms":
        return <AvailableRoomsContent />;
      case "Projections":
        return <ProjectionsContent />;
      default:
        return null;
    }
  };

  return (
    <div className="w-[1678px] h-[535.876px]">
      <div className="flex justify-between items-center w-full h-[155px] bg-white rounded-[10px] p-[16.8px] shadow-sm">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`group flex items-center space-x-4 rounded-lg px-8 py-6 cursor-pointer transition-all duration-200 ${tab.isActive
                ? "bg-gradient-to-t from-[#4A2C82]/80 to-[#005C84]/80 w-[420px] h-[110px]" // Increased size when active
                : "bg-white border border-black hover:shadow-sm w-[400px] h-[100px]" // Original size when inactive
            }`}
          >
            {/* Logo Section */}
            <div className={`flex-shrink-0 rounded-[6px] ${tab.isActive ? 'p-[15px]' : 'border border-black p-[10px]'}`}>
              <img 
                src={getIconSrc(tab.icon)}
                alt={tab.name}
                className={`w-12 h-12 transition-transform duration-200 group-hover:scale-110 ${tab.isActive ? 'filter invert' : ''}`}
              />
            </div>
            {/* Font Section */}
            <div>
              <span className={`font-bold text-xl ${
                tab.isActive ? "text-white" : "text-black"
              }`}>
                {tab.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ActiveTabContent />
    </div>
  );
};

export default DashboardTabs; 