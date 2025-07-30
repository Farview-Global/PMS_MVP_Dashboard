import React from "react";
import GreetingWeatherHotelCard from "./components/GreetingWeatherHotelCard";
import Welcome from "./components/Welcome";
import DashboardTabs from "./components/DashboardTabs";

const App = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex flex-col items-center pt-[9px] pb-[20px]">
        <div className="mt-4">
          <GreetingWeatherHotelCard />
        </div>
        <div className="mt-[24px]">
          <Welcome />
        </div>
        <div className="mt-6">
          <DashboardTabs />
        </div>
      </div>
    </div>
  );
};

export default App;
