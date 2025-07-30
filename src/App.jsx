import React from "react";
import GreetingWeatherHotelCard from "./components/GreetingWeatherHotelCard";
import Welcome from "./components/Welcome";
import DashboardTabs from "./components/DashboardTabs";

const App = () => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(90deg, #E7E7E7 0%, #FFFFFF 100%)' }}>
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
