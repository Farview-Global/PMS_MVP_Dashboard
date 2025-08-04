import React from "react";
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

  const handleCustomDateClick = () => {
    console.log("Custom date clicked");
  };

  return (
    <div className="w-full space-y-4">
      <div className="w-full flex gap-2 p-2 overflow-x-auto items-center rounded-md">
        <button className="text-gray-600 hover:text-black">
          <ChevronLeft size={24} />
        </button>

        {roomForecast.map((item, index) => (
          <div
            key={index}
            className="min-w-[180px] h-[80px] border border-gray-300 rounded-md flex items-center justify-between px-4 shadow-xl bg-white"
          >
            <div className="basis-[30%] flex items-center justify-center">
              <div className="w-[80px] h-[50px] bg-[#005C84] text-white font-bold text-lg rounded-md flex items-center justify-center">
                {item.percentage}%
              </div>
            </div>

            <div className="basis-[70%] flex flex-col items-center justify-center text-[14px] font-medium text-gray-700">
              <span>{item.day}</span>
              <span>{item.date}</span>
              <span>{item.month}</span>
            </div>
          </div>
        ))}

        <button className="text-gray-600 hover:text-black">
          <ChevronRight size={24} />
        </button>

        <button
          onClick={handleCustomDateClick}
          className="min-w-[160px] h-[40px] border border-black flex items-center justify-center gap-2 mx-10 rounded-md hover:bg-gray-100 transition"
        >
          <Calendar size={18} />
          <span className="text-sm font-medium">Custom Date</span>
        </button>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col md:flex-row w-full p-4 gap-4 bg-white shadow-md rounded-md">
        {/* Bar Chart */}
        <div className="w-full md:w-2/3 p-4">
          <h2 className="text-black text-xl font-semibold mb-2">24 Rooms</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} barSize={40} margin={{ top: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                stroke="#000" 
                style={{ fontFamily: "Segoe UI Variable, Segoe UI, system-ui, sans-serif" }}
              />
              <YAxis 
                stroke="#000" 
                style={{ fontFamily: "Segoe UI Variable, Segoe UI, system-ui, sans-serif" }}
              />
              <Tooltip 
                contentStyle={{ 
                  fontFamily: "Segoe UI Variable, Segoe UI, system-ui, sans-serif" 
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

        <div
          className="w-full md:w-[586px] bg-white rounded-lg border border-gray-200 p-[9.45px] flex flex-col justify-between text-black shadow-md"
          style={{ height: "337px" }}
        >
          {/* Pie Chart */}
          <div
            className="flex justify-between items-start w-full px-6 py-4"
            style={{ height: "248px" }}
          >
            {/* Left: Donut */}
            <div className="relative w-[200px] h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
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

              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-semibold text-[#005C84]">
                <span>Total Rooms</span>
                <span>{`${totalAvailable}/${totalRooms}`}</span>
              </div>
            </div>

            {/* Right: Legends */}
            <div className="flex flex-col justify-center text-sm text-gray-700 space-y-6 w-1/2">
              {donutData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    {item.name}:
                  </span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Button */}
          <div className="col-span-6 flex justify-center mt-2">
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
