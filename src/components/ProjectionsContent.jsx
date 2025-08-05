import React, { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";
import { chartLabels, dummyData } from "../data/projectionsData";
import WeekCalendar from "./WeekCalendar";
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
      borderDash: [], // Always solid lines
  borderColor:
    selectedMetric === key || selectedMetric === null
      ? chartColors[key]
      : "rgba(0, 0, 0, 0.3)", // dim others
  backgroundColor:
    selectedMetric === key || selectedMetric === null
      ? chartColors[key]
      : "rgba(0, 0, 0, 0.1)", // dim fill
    })),
  };

  const options = {
  responsive: false,
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
        family: "Segoe UI Variable, Segoe UI " ,
      },
      bodyFont: {
        family: "Segoe UI Variable, Segoe UI",
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
          size: 20,
          family: "Segoe UI Variable, Segoe UI, system-ui, sans-serif",
        },
        padding: 20,
      },
    },
    x: {
      ticks: {
        font: {
          size: 16,
          family: "Segoe UI Variable, Segoe UI, system-ui, sans-serif",
        },
      },
    },
  },
};


  // const handleCustomDateClick = () => {
  //   console.log("Custom date clicked");
  // };

  return (
    <div className="w-[1680px] h-[536px] bg-white border border-gray-200 rounded-md px-10 py-6 mt-6 mx-auto shadow-xl">
      {/* Header Section */}
      <div className="flex justify-between items-center px-10 py-[5px]">
        <div className="w-[1400px] h-[72px] flex justify-between items-center">
          <div className="text-4xl font-bold text-gray-800">
            Total Revenue{" "}
            {selectedMetric && selectedMetric !== "occupancyPercentage" && (
              <span className="text-green-600 text-5xl ml-2 font-semibold">
                ${dummyData[selectedMetric][6].toFixed(2)}
              </span>
            )}
            {selectedMetric === "occupancyPercentage" && (
              <span className="text-blue-600 text-5xl ml-2 font-semibold">
                {dummyData[selectedMetric][6].toFixed(2)}%
              </span>
            )}
          </div>

          {/* Date Picker */}
          <div className="relative inline-block">
            <button
              onClick={handleCustomDateClick}
              className="min-w-[160px] h-[40px] border border-black flex items-center justify-center gap-2 mx-10 rounded-md hover:bg-gray-100 transition"
            >
              <Calendar size={18} />
              <span className="text-sm font-medium">Custom Range</span>
            </button>
            {/* Conditionally render calendar */}
            {showCalendar && (
              <div className="absolute top-full left-0 mt-2 z-50">
                <WeekCalendar onClose={() => setShowCalendar(false)} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart & Legend Section */}
      <div className="p-[10px]">
        <div className="w-[1638px] h-[412px] flex items-start justify-between">
          {/* Chart Area */}
          <div className="w-[1800px] h-[412px] flex flex-col items-start">
            <Line data={data} options={options} width={1050} height={375} />
          </div>

          {/* Legend Buttons */}
          <div className="py-[16.8px] flex-shrink-0">
            <div className="w-[498px] h-[282px] flex flex-col items-start gap-y-8 pt-8">
              {Object.keys(metricLabels).map((key) => (
                <div
                  key={key}
                  onClick={() =>
                    setSelectedMetric(selectedMetric === key ? null : key)
                  }
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  {/* Colored Dot */}
                  <div
                    className="w-3 h-3 rounded-full transition"
                    style={{
                      backgroundColor: chartColors[key],
                      opacity:
                        selectedMetric === null || selectedMetric === key
                          ? 1
                          : 0.4,
                    }}
                  />
                  {/* Label Text */}
                  <span
                    className={`text-2xl font-semibold transition ${
                      selectedMetric === key || selectedMetric === null
                        ? "text-gray-800"
                        : "text-gray-400"
                    }`}
                  >
                    {metricLabels[key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectionsContent;
