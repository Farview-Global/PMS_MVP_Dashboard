import React, { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";
import { chartLabels, dummyData } from "../data/projectionsData";
import WeekCalendar from "./WeekCalendar";
import clsx from 'clsx';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ProjectionsContent = () => {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const datePickerRef = useRef(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCustomDateClick = () => {
    setShowCalendar((prev) => !prev);
  };

  const chartColors = {
    averageDailyRate: "#00b894",
    occupancyPercentage: "#a29bfe",
    totalRevenue: "#6c5ce7",
    groupRevenue: "#81ecec",
  };

  const metricLabels = {
    averageDailyRate: "Average Daily Rate",
    occupancyPercentage: "Occupancy Percentage",
    totalRevenue: "Total Revenue",
    groupRevenue: "Group Revenue",
  };

  const data = {
    labels: chartLabels,
    datasets: Object.keys(dummyData).map((key) => ({
      label: metricLabels[key],
      data: dummyData[key],
      borderColor: chartColors[key],
      backgroundColor: chartColors[key],
      fill: false,
      tension: 0.4,
      pointRadius: selectedMetric === key || selectedMetric === null ? 5 : 3,
      pointHoverRadius:
        selectedMetric === key || selectedMetric === null ? 7 : 3,
      borderWidth: selectedMetric === key || selectedMetric === null ? 3 : 1,
      borderDash: [],
      borderColor:
        selectedMetric === key || selectedMetric === null
          ? chartColors[key]
          : "rgba(0, 0, 0, 0.3)",
      backgroundColor:
        selectedMetric === key || selectedMetric === null
          ? chartColors[key]
          : "rgba(0, 0, 0, 0.1)",
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const key = Object.keys(dummyData)[context.datasetIndex];
            const value = context.raw;
            return key === "occupancyPercentage" ? `${value}%` : `$${value}`;
          },
        },
        titleFont: {
          family: "Segoe UI Variable, Segoe UI",
          size: windowWidth < 768 ? 12 : 16,
        },
        bodyFont: {
          family: "Segoe UI Variable, Segoe UI",
          size: windowWidth < 768 ? 12 : 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) =>
            selectedMetric === "occupancyPercentage"
              ? `${value}%`
              : `$${value}`,
          font: {
            size: windowWidth < 768 ? 12 : 16,
            family: "Segoe UI Variable, Segoe UI, system-ui, sans-serif",
          },
          padding: windowWidth < 768 ? 15 : 20,
        },
      },
      x: {
        ticks: {
          font: {
            size: windowWidth < 768 ? 10 : 12,
            family: "Segoe UI Variable, Segoe UI, system-ui, sans-serif",
          },
          maxRotation: windowWidth < 640 ? 45 : 0,
          minRotation: windowWidth < 640 ? 45 : 0,
        },
      },
    },
  };

  return (
    <div className="w-full h-auto bg-white border border-gray-200 rounded-md p-2 mt-4 shadow-xl overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-2 md:px-4 py-2 gap-2">
        <div className={clsx(
          "font-bold text-gray-800 text-center md:text-left",
          windowWidth < 640 ? "text-sm" :
          windowWidth < 768 ? "text-base" :
          windowWidth < 1024 ? "text-lg" : "text-xl"
        )}>
          Total Revenue
          {selectedMetric && selectedMetric !== "occupancyPercentage" && (
            <span className={clsx(
              "text-green-600 ml-2 font-semibold",
              windowWidth < 640 ? "text-base" :
              windowWidth < 768 ? "text-lg" :
              windowWidth < 1024 ? "text-xl" : "text-2xl"
            )}>
              ${dummyData[selectedMetric][6].toFixed(2)}
            </span>
          )}
          {selectedMetric === "occupancyPercentage" && (
            <span className={clsx(
              "text-blue-600 ml-2 font-semibold",
              windowWidth < 640 ? "text-base" :
              windowWidth < 768 ? "text-lg" :
              windowWidth < 1024 ? "text-xl" : "text-2xl"
            )}>
              {dummyData[selectedMetric][6].toFixed(2)}%
            </span>
          )}
        </div>
        <div className="relative">
          <button
            onClick={handleCustomDateClick}
            className={clsx(
              "w-full border border-black flex items-center justify-center gap-2 rounded-md hover:bg-gray-100 transition",
              windowWidth < 640 ? "min-w-[100px] h-[28px]" :
              windowWidth < 768 ? "min-w-[120px] h-[30px]" :
              windowWidth < 1024 ? "min-w-[130px] h-[32px]" :
              "min-w-[140px] h-[34px]"
            )}
          >
            <Calendar size={windowWidth < 640 ? 12 : windowWidth < 768 ? 14 : 16} />
            <span className={clsx(
              "font-medium",
              windowWidth < 640 ? "text-[10px]" :
              windowWidth < 768 ? "text-[11px]" : "text-xs"
            )}>
              Custom Range
            </span>
          </button>
          {showCalendar && (
            <div className="absolute top-full right-0 mt-2 z-50 transform scale-75 origin-top-right">
              <WeekCalendar 
                onClose={() => setShowCalendar(false)}
                onDateRangeSelect={(dateRange) => {
                  console.log('Selected date range:', dateRange);
                  // You can add additional logic here to handle the selected date range
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start justify-between p-2 mt-2 gap-4">
        <div className="relative flex-1 w-full max-w-[95%] mx-auto h-[130px] sm:h-[160px] md:h-[200px] lg:h-[230px] xl:h-[260px]">
          <Line key={windowWidth} data={data} options={options} />
        </div>
        <div className="w-full md:w-auto p-2 flex-shrink-0">
          <div className="flex flex-row flex-wrap justify-center md:flex-col md:items-start gap-x-4 gap-y-2 md:gap-y-4 pt-2">
            {Object.keys(metricLabels).map((key) => (
              <div
                key={key}
                onClick={() =>
                  setSelectedMetric(selectedMetric === key ? null : key)
                }
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <div
                  className={clsx(
                    "rounded-full transition",
                    windowWidth < 640 ? "w-2 h-2" :
                    windowWidth < 768 ? "w-3 h-3" : "w-3 h-3"
                  )}
                  style={{
                    backgroundColor: chartColors[key],
                    opacity:
                      selectedMetric === null || selectedMetric === key ? 1 : 0.4,
                  }}
                />
                <span
                  className={clsx(
                    "font-semibold transition",
                    windowWidth < 640 ? "text-xs" :
                    windowWidth < 768 ? "text-sm" :
                    windowWidth < 1024 ? "text-sm" : "text-base",
                    selectedMetric === key || selectedMetric === null
                      ? "text-gray-800"
                      : "text-gray-400"
                  )}
                >
                  {metricLabels[key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectionsContent;