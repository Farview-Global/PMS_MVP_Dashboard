import React, { useState, useEffect } from "react";
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
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getResponsiveStyles = () => {
    if (windowWidth < 640) {
      // Mobile - Very small
      return {
        barChartHeight: 160,
        pieChartWidth: 'w-full',
        pieChartContainer: 'w-full max-w-[300px]',
        pieInnerRadius: 30,
        pieOuterRadius: 45,
        containerDirection: 'flex-col',
        barSection: 'w-full',
        pieSection: 'w-full flex justify-center',
        // Forecast cards - Much smaller
        cardWidth: 'w-[60px]',
        cardHeight: 'h-[28px]',
        percentageBoxWidth: 'w-[25px]',
        percentageBoxHeight: 'h-[16px]',
        percentageFontSize: 'text-[8px]',
        dateFontSize: 'text-[7px]',
        cardGap: 'gap-1',
        cardPadding: 'px-1',
        // Custom range button
        buttonWidth: 'min-w-[80px]'
      };
    } else if (windowWidth < 768) {
      // Small tablets - Small
      return {
        barChartHeight: 180,
        pieChartWidth: 'w-[350px]',
        pieChartContainer: 'w-[350px]',
        pieInnerRadius: 35,
        pieOuterRadius: 50,
        containerDirection: 'flex-col',
        barSection: 'w-full',
        pieSection: 'w-full flex justify-center',
        // Forecast cards - Small
        cardWidth: 'w-[75px]',
        cardHeight: 'h-[34px]',
        percentageBoxWidth: 'w-[30px]',
        percentageBoxHeight: 'h-[18px]',
        percentageFontSize: 'text-[9px]',
        dateFontSize: 'text-[8px]',
        cardGap: 'gap-1',
        cardPadding: 'px-1',
        // Custom range button
        buttonWidth: 'min-w-[90px]'
      };
    } else if (windowWidth < 1024) {
      // Tablets - Medium
      return {
        barChartHeight: 200,
        pieChartWidth: 'w-[380px]',
        pieChartContainer: 'w-[380px]',
        pieInnerRadius: 35,
        pieOuterRadius: 55,
        containerDirection: 'flex-row',
        barSection: 'flex-1',
        pieSection: 'flex-shrink-0',
        // Forecast cards - Medium
        cardWidth: 'w-[80px]',
        cardHeight: 'h-[36px]',
        percentageBoxWidth: 'w-[32px]',
        percentageBoxHeight: 'h-[18px]',
        percentageFontSize: 'text-[9px]',
        dateFontSize: 'text-[8px]',
        cardGap: 'gap-2',
        cardPadding: 'px-1',
        // Custom range button
        buttonWidth: 'min-w-[100px]'
      };
    } else if (windowWidth < 1280) {
      // Small laptops - Standard
      return {
        barChartHeight: 210,
        pieChartWidth: 'w-[420px]',
        pieChartContainer: 'w-[420px]',
        pieInnerRadius: 40,
        pieOuterRadius: 60,
        containerDirection: 'flex-row',
        barSection: 'flex-1',
        pieSection: 'flex-shrink-0',
        // Forecast cards - Standard
        cardWidth: 'w-[105px]',
        cardHeight: 'h-[48px]',
        percentageBoxWidth: 'w-[42px]',
        percentageBoxHeight: 'h-[26px]',
        percentageFontSize: 'text-xs',
        dateFontSize: 'text-[10px]',
        cardGap: 'gap-2',
        cardPadding: 'px-2',
        // Custom range button
        buttonWidth: 'min-w-[120px]'
      };
    } else {
      // Large laptops and desktops - Largest
      return {
        barChartHeight: 220,
        pieChartWidth: 'w-[450px]',
        pieChartContainer: 'w-[450px]',
        pieInnerRadius: 45,
        pieOuterRadius: 65,
        containerDirection: 'flex-row',
        barSection: 'flex-1',
        pieSection: 'flex-shrink-0',
        // Forecast cards - Large
        cardWidth: 'w-[120px]',
        cardHeight: 'h-[55px]',
        percentageBoxWidth: 'w-[50px]',
        percentageBoxHeight: 'h-[30px]',
        percentageFontSize: 'text-sm',
        dateFontSize: 'text-xs',
        cardGap: 'gap-3',
        cardPadding: 'px-2',
        // Custom range button
        buttonWidth: 'min-w-[120px]'
      };
    }
  };

  const styles = getResponsiveStyles();

  const handleCustomDateClick = () => {
    setShowCalendar((prev) => !prev);
  };

  return (
    <div className="w-full space-y-2">
      <div className={`w-full flex ${styles.cardGap} p-1 overflow-x-auto items-center rounded-md flex-nowrap`}>
        <button className="text-gray-600 hover:text-black flex-shrink-0">
          <ChevronLeft size={20} />
        </button>
        {roomForecast.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 ${styles.cardWidth} ${styles.cardHeight} border border-gray-300 rounded-md flex items-center justify-between ${styles.cardPadding} shadow-lg bg-white`}
          >
            <div className="basis-[35%] flex items-center justify-center">
              <div className={`${styles.percentageBoxWidth} ${styles.percentageBoxHeight} bg-[#005C84] text-white font-bold ${styles.percentageFontSize} rounded-md flex items-center justify-center`}>
                {item.percentage}%
              </div>
            </div>
            <div className={`basis-[65%] flex flex-col items-center justify-center ${styles.dateFontSize} font-medium text-gray-700`}>
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

      <div className={`flex ${styles.containerDirection} w-full p-2 gap-2 bg-white shadow-md rounded-md relative z-10`}>
        <div className="absolute -top-12 right-2 z-20">
          <div className="relative inline-block">
            <button
              onClick={handleCustomDateClick}
              className={`${styles.buttonWidth} h-[30px] border border-black flex items-center justify-center gap-2 rounded-md hover:bg-gray-100 transition`}
            >
              <Calendar size={14} />
              <span className="text-[10px] font-medium">Custom Range</span>
            </button>
            {showCalendar && (
              <div className="absolute top-full right-0 mt-2 z-[9999] bg-white rounded-lg shadow-2xl border transform scale-75 origin-top-right">
                <AdvancedCalendar onClose={() => setShowCalendar(false)} />
              </div>
            )}
          </div>
        </div>

        <div className={`${styles.barSection} p-2`}>
          <h2 className="text-black text-lg font-semibold mb-1">24 Rooms</h2>
          <ResponsiveContainer width="100%" height={styles.barChartHeight}>
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

        <div className={`${styles.pieSection}`}>
          <div className={`${styles.pieChartContainer} bg-white rounded-lg border border-gray-200 p-1 flex flex-col justify-between text-black shadow-md h-auto`}>
            <div className="flex flex-col sm:flex-row justify-between items-center w-full px-2 py-1">
              <div className="relative w-full h-[160px] flex-shrink-0 max-w-[130px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={styles.pieInnerRadius}
                      outerRadius={styles.pieOuterRadius}
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
              <button className="flex justify-between items-center text-lg font-semibold transition-colors duration-200 hover:scale-y-110 hover:bg-gradient-to-t from-[#3A1F6B]/70 to-[#005C84]/80 hover:border-white hover:text-white"
                      style={{ 
                        width: '250px', 
                        padding: '20px', 
                        borderRadius: '10px', 
                        border: '1.5px solid #005C84' 
                      }}>
                <span>View All</span>
                <span className="text-2xl">&#8594;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableRoomsContent;