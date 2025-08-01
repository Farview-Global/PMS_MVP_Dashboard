import React, { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";
import { chartLabels, dummyData } from "../data/projectionsData";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ProjectionsContent = () => {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const datePickerRef = useRef(null);

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
      pointHoverRadius: selectedMetric === key || selectedMetric === null ? 7 : 3,
      borderWidth: selectedMetric === key || selectedMetric === null ? 3 : 1,
      borderDash: selectedMetric === key || selectedMetric === null ? [] : [5, 5],
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }, // We use custom legend buttons
      tooltip: {
        callbacks: {
          label: (context) => {
            const key = Object.keys(dummyData)[context.datasetIndex];
            const value = context.raw;
            return key === "occupancyPercentage" ? `${value}%` : `$${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) =>
            selectedMetric === "occupancyPercentage" ? `${value}%` : `$${value}`,
        },
      },
    },
  };

  const handleCustomDateClick = () => {
    console.log("Custom date clicked");
  };

  return (
    <div className="w-[1680px] h-[536px] bg-white border border-gray-200 rounded-md px-10 py-6 mt-6 mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center px-10 py-[5px]">
        <div className="w-[1578px] h-[72px] flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">
            Total Revenue{" "}
            {selectedMetric && selectedMetric !== "occupancyPercentage" && (
              <span className="text-green-600 text-2xl ml-2 font-semibold">
                ${dummyData[selectedMetric][6].toFixed(2)}
              </span>
            )}
            {selectedMetric === "occupancyPercentage" && (
              <span className="text-blue-600 text-2xl ml-2 font-semibold">
                {dummyData[selectedMetric][6].toFixed(2)}%
              </span>
            )}
          </div>

          {/* Date Picker */}
          <button
                    onClick={handleCustomDateClick}
                    className="min-w-[160px] h-[40px] border border-black flex items-center justify-center gap-2 mx-10 rounded-md hover:bg-gray-100 transition"
                  >
                    <Calendar size={18} />
                    <span className="text-sm font-medium">Custom Range</span>
                  </button>
        </div>
      </div>

      {/* Chart & Legend Section */}
      <div className="p-[10px]">
        <div className="w-[1638px] h-[412px] flex items-start justify-between">
          {/* Chart Area */}
          <div className="w-[950px] h-[412px] flex flex-col items-start">
            <Line data={data} options={options} />
          </div>

          {/* Legend Buttons */}
          <div className="py-[16.8px] flex-shrink-0">
            <div className="w-[498px] h-[282px] flex flex-col items-start gap-y-5">
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
                    className={`text-sm font-semibold transition ${
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
