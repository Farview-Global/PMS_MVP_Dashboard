import React from "react";
import GreetingWeatherHotelCard from "./components/GreetingWeatherHotelCard";
import Welcome from "./components/Welcome";
import DashboardTabs from "./components/DashboardTabs";

const App = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-2 lg:p-4"
      style={{ background: 'linear-gradient(90deg, #E7E7E7 0%, #FFFFFF 100%)' }}
    >
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto gap-y-4 overflow-hidden">
        <GreetingWeatherHotelCard />
        <Welcome />
        <DashboardTabs />
      </div>
    </div>
  );
};

export default App;