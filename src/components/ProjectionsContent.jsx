import React, { useState, useRef } from "react";
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
            size: 16,
            family: "Segoe UI Variable, Segoe UI, system-ui, sans-serif",
          },
          padding: 20,
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
            family: "Segoe UI Variable, Segoe UI, system-ui, sans-serif",
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-auto bg-white border border-gray-200 rounded-md p-2 mt-4 shadow-xl overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-2 md:px-4 py-2 gap-2">
        <div className="text-lg md:text-xl font-bold text-gray-800 text-center md:text-left">
          Total Revenue
          {selectedMetric && selectedMetric !== "occupancyPercentage" && (
            <span className="text-green-600 text-xl md:text-2xl ml-2 font-semibold">
              ${dummyData[selectedMetric][6].toFixed(2)}
            </span>
          )}
          {selectedMetric === "occupancyPercentage" && (
            <span className="text-blue-600 text-xl md:text-2xl ml-2 font-semibold">
              {dummyData[selectedMetric][6].toFixed(2)}%
            </span>
          )}
        </div>
        <div className="relative">
          <button
            onClick={handleCustomDateClick}
            className="w-full min-w-[160px] h-[40px] border border-black flex items-center justify-center gap-2 rounded-md hover:bg-gray-100 transition"
          >
            <Calendar size={18} />
            <span className="text-sm font-medium">Custom Range</span>
          </button>
          {showCalendar && (
            <div className="absolute top-full right-0 mt-2 z-50">
              <WeekCalendar onClose={() => setShowCalendar(false)} />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start justify-between p-2 mt-2 gap-4">
        <div className="relative flex-1 w-full h-[250px] md:h-[300px]">
          <Line data={data} options={options} />
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
                  className="w-3 h-3 rounded-full transition"
                  style={{
                    backgroundColor: chartColors[key],
                    opacity:
                      selectedMetric === null || selectedMetric === key ? 1 : 0.4,
                  }}
                />
                <span
                  className={clsx(
                    "text-sm md:text-base font-semibold transition",
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