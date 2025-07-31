import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  roomBarChartData,
  roomPieChartData,
  roomSummary,
} from "../data/availableRoomsData";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const AvailableRoomsContent = () => {
  return (
    <div className="flex flex-col space-y-4 w-full p-4 rounded-lg shadow">
      {/* Header Section */}

      <div className="w-full flex items-center justify-between px-2 py-2 rounded-md">
        {/* Left Arrow */}
        <button className="text-xl font-bold text-[#005C84] px-2">
          &#8592;
        </button>

        {/* Cards Container */}
        <div className="flex-1 flex overflow-x-auto space-x-3 px-2">
          {[
            { percent: "70%", day: "Wed", date: "04", month: "June" },
            { percent: "30%", day: "Thurs", date: "05", month: "June" },
            { percent: "100%", day: "Fri", date: "06", month: "June" },
            { percent: "99%", day: "Sat", date: "07", month: "June" },
            { percent: "70%", day: "Sun", date: "08", month: "June" },
            { percent: "59%", day: "Mon", date: "09", month: "June" },
            { percent: "29%", day: "Tue", date: "10", month: "June" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-3 py-2 min-w-[180px] h-[79px] bg-white rounded-full border border-gray-300 flex-shrink-0"
              style={{ width: "180px" }}
            >
              {/* Left: Percent with rounded bg */}
              <div className="bg-[#D6E4FF] px-4 py-1 rounded-full text-[#005C84] font-bold text-lg">
                {item.percent}
              </div>

              {/* Right: Vertical Day-Date-Month */}
              <div className="text-[10px] text-right text-gray-700 leading-tight flex flex-col items-end">
                <span>{item.day}</span>
                <span>{item.date}</span>
                <span>{item.month}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button className="text-xl font-bold text-[#005C84] px-2">
          &#8594;
        </button>
      </div>

      <div className="flex flex-col space-y-4 w-full p-4 bg-white rounded-lg shadow"></div>

      {/* Content Section */}
      <div className="flex space-x-8 mt-4">
        {/* Bar Chart */}
        {/* Bar Chart Section */}
        <div
          className="w-2/3 bg-white rounded-lg border border-gray-200"
          style={{
            width: "949px",
            height: "337px",
            paddingLeft: "3.5px",
            paddingRight: "3.5px",
          }}
        >
          {/* Top Section: Title + Legend */}
          <div className="flex justify-between items-center px-4 pt-4">
            {/* Left: Vacant Rooms */}
            <h3 className="text-sm font-semibold text-[#005C84]">24 Rooms</h3>

            {/* Right: Legend */}
            <div className="flex space-x-4 text-xs text-gray-700">
              {/* Occupied Legend */}
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#005C84] inline-block" />
                <span>Occupied</span>
              </div>
              {/* Vacant Legend */}
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#A2DBFA] inline-block" />
                <span>Vacant</span>
              </div>
            </div>
          </div>

          {/* Bottom Section: Bar Chart */}
          <div className="px-[3.5px] pb-4">
            <Bar
              data={roomBarChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { stepSize: 20 },
                    stacked: true,
                  },
                  x: {
                    stacked: true,
                  },
                },
              }}
              height={280} // fits inside 337px after paddings
            />
          </div>
        </div>
        {/* Pie Chart Section */}
        <div
          className="flex flex-col justify-between bg-white rounded-lg border border-gray-200"
          style={{ width: "586px", height: "337px", padding: "9.45px" }}
        >
          {/* Top Part: Pie Chart + Legends */}
          <div
            className="flex justify-between items-start w-full px-6 py-4"
            style={{ height: "248px" }}
          >
            {/* Left: Doughnut Chart */}
            <div className="flex flex-col justify-center items-center w-1/2 h-full">
              <div className="w-[200px] h-[200px] relative">
                <Doughnut
                  data={roomPieChartData}
                  options={{
                    maintainAspectRatio: false,
                    cutout: "70%", // <- Slimmer ring
                    plugins: { legend: { display: false } },
                  }}
                />
                {/* Center Text Inside Doughnut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-semibold text-[#005C84]">
                  <span>Total Rooms</span>
                  <span>
                    {roomSummary.vacant} / {roomSummary.totalRooms}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Legend with color dots and numbers */}
            <div className="flex flex-col justify-center text-sm text-gray-700 space-y-3 w-1/2">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#A2DBFA] inline-block" />
                <span>Vacant Rooms:</span>
                <span className="font-semibold">{roomSummary.vacant}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#005C84] inline-block" />
                <span>Occupied Rooms:</span>
                <span className="font-semibold">{roomSummary.occupied}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#FFB74D] inline-block" />
                <span>Out of Order:</span>
                <span className="font-semibold">{roomSummary.outOfOrder}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#EF5350] inline-block" />
                <span>Out of Inventory:</span>
                <span className="font-semibold">
                  {roomSummary.outOfInventory}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="col-span-6 flex justify-center mt-4">
            <button className="w-[300px] px-6 py-6 rounded-lg text-lg font-semibold flex justify-between items-center border border-black hover:bg-purple-50 transition-colors duration-200 hover:scale-y-110 hover:bg-gradient-to-t from-[#4A2C82]/70 to-[#005C84]/80">
              <span>View All</span>
              <span className="text-xl">&#8594;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableRoomsContent;
