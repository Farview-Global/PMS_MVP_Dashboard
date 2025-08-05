import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import AdvancedCalendar from "./AdvancedCalendar";
import clsx from 'clsx';

const barData = [
  { name: "NK", Occupied: 12, Vacant: 4 },
  { name: "SNK", Occupied: 10, Vacant: 6 },
  { name: "NQQ", Occupied: 14, Vacant: 5 },
  { name: "SNQQ", Occupied: 16, Vacant: 8 },
  { name: "SNKK", Occupied: 11, Vacant: 5 },
  { name: "HQQ", Occupied: 7, Vacant: 5 },
  { name: "NK", Occupied: 12, Vacant: 4 },
  { name: "SNK", Occupied: 10, Vacant: 6 },
];

const donutData = [
  { name: "Vacant Rooms", value: 24, color: "#7DD3FC" },
  { name: "Occupied Rooms", value: 28, color: "#1E3A8A" },
  { name: "Out of Order", value: 2, color: "#D1D5DB" },
  { name: "Out of Inventory", value: 3, color: "#9333EA" },
];

const roomForecast = [
  { percentage: 75, day: "Mon", date: "31", month: "Jul" },
  { percentage: 60, day: "Tue", date: "01", month: "Aug" },
  { percentage: 80, day: "Wed", date: "02", month: "Aug" },
  { percentage: 70, day: "Thu", date: "03", month: "Aug" },
  { percentage: 90, day: "Fri", date: "04", month: "Aug" },
  { percentage: 60, day: "Sat", date: "05", month: "Aug" },
  { percentage: 90, day: "Sun", date: "06", month: "Aug" },
];

const AvailableRoomsContent = () => {
  const totalRooms = 80;
  const totalAvailable = donutData.reduce((sum, d) => sum + d.value, 0);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleCustomDateClick = () => {
    setShowCalendar((prev) => !prev);
  };

  return (
    <div className="w-full space-y-2">
      <div className="w-full flex gap-2 p-1 overflow-x-auto items-center rounded-md flex-nowrap">
        <button className="text-gray-600 hover:text-black flex-shrink-0">
          <ChevronLeft size={20} />
        </button>
        {roomForecast.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[150px] h-[70px] border border-gray-300 rounded-md flex items-center justify-between px-2 shadow-lg bg-white"
          >
            <div className="basis-[30%] flex items-center justify-center">
              <div className="w-[70px] h-[40px] bg-[#005C84] text-white font-bold text-base rounded-md flex items-center justify-center">
                {item.percentage}%
              </div>
            </div>
            <div className="basis-[70%] flex flex-col items-center justify-center text-xs font-medium text-gray-700">
              <span>{item.day}</span>
              <span>{item.date}</span>
              <span>{item.month}</span>
            </div>
          </div>
        ))}
        <button className="text-gray-600 hover:text-black flex-shrink-0">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row w-full p-2 gap-2 bg-white shadow-md rounded-md relative z-10">
        <div className="absolute top-2 right-2 z-20">
          <div className="relative inline-block">
            <button
              onClick={handleCustomDateClick}
              className="min-w-[140px] h-[35px] border border-black flex items-center justify-center gap-2 rounded-md hover:bg-gray-100 transition"
            >
              <Calendar size={16} />
              <span className="text-xs font-medium">Custom Range</span>
            </button>
            {showCalendar && (
              <div className="absolute top-full right-0 mt-2 z-[9999] bg-white rounded-lg shadow-2xl border">
                <AdvancedCalendar onClose={() => setShowCalendar(false)} />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 p-2">
          <h2 className="text-black text-lg font-semibold mb-1">24 Rooms</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={barData}
              barSize={30}
              margin={{ top: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                stroke="#000"
                style={{
                  fontSize: '12px',
                  fontFamily:
                    "Segoe UI Variable, Segoe UI, system-ui, sans-serif",
                }}
              />
              <YAxis
                stroke="#000"
                style={{
                  fontSize: '12px',
                  fontFamily:
                    "Segoe UI Variable, Segoe UI, system-ui, sans-serif",
                }}
              />
              <Tooltip
                contentStyle={{
                  fontFamily:
                    "Segoe UI Variable, Segoe UI, system-ui, sans-serif",
                }}
              />
              <Bar
                dataKey="Occupied"
                stackId="a"
                fill="url(#occupiedGradient)"
                radius={[4, 4, 0, 0]}
                stroke="#000"
              />
              <Bar
                dataKey="Vacant"
                stackId="a"
                fill="url(#vacantGradient)"
                radius={[4, 4, 0, 0]}
                stroke="#000"
              />
              <defs>
                <linearGradient
                  id="occupiedGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#005C84" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#4A2C82" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="vacantGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#93C5FD" />
                  <stop offset="100%" stopColor="#DBEAFE" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 bg-white rounded-lg border border-gray-200 p-1 flex flex-col justify-between text-black shadow-md h-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center w-full px-2 py-1">
            <div className="relative w-full h-[160px] flex-shrink-0 max-w-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    labelLine={false}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-xs font-semibold text-[#005C84]">
                <span>Total Rooms</span>
                <span>{`${totalAvailable}/${totalRooms}`}</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center text-xs sm:text-sm text-gray-700 space-y-2 w-full sm:w-1/2 mt-2 sm:mt-0 px-1 sm:px-2">
              {donutData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    {item.name}:
                  </span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-center mt-1 px-4 pb-4">
            <button className="w-full max-w-sm px-4 py-2 rounded-lg text-xs md:text-sm font-semibold flex justify-between items-center border border-black hover:bg-purple-50 transition-colors duration-200 hover:scale-y-110 hover:bg-gradient-to-t from-[#3A1F6B]/70 to-[#005C84]/80 hover:border-white hover:text-white">
              <span>View All</span>
              <span className="text-lg">&#8594;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableRoomsContent;