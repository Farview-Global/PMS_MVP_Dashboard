import React, { useState, useEffect } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
 
function getDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
 
// Helper function to compare dates
function isSameDate(date1, date2) {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
}
 
 
 
// Function to get all dates from selected date to 7 days later (including selected date)
function getDatesFromSelectedToWeekEnd(selectedDate) {
  const dates = [];
  const currentDate = new Date(selectedDate);
 
  // Get 7 days starting from the selected date (including the selected date)
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    dates.push(date);
  }
 
  return dates;
}
 
// Function to format date range for display
function formatDateRange(startDate, endDate) {
  const startMonth = startDate.toLocaleString("default", { month: "short" });
  const endMonth = endDate.toLocaleString("default", { month: "short" });
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
 
  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
  } else {
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
  }
}
 
export default function WeekCalendar({ onDateRangeSelect, onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeekRange, setSelectedWeekRange] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getDaysInMonth(year, month);
  const startDay = new Date(year, month, 1).getDay();
 
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevYear = () => setCurrentDate(new Date(year - 1, month, 1));
  const nextYear = () => setCurrentDate(new Date(year + 1, month, 1));
 
  const handleDateClick = (clickedDate) => {
    // Allow clicking on any date (including past dates)
   
    // Get all dates from the clicked date to the end of that week
    const weekRange = getDatesFromSelectedToWeekEnd(clickedDate);
    setSelectedWeekRange(weekRange);
   
    // Calculate and pass the date range to parent component
    const startDate = weekRange[0];
    const endDate = weekRange[6];
    const dateRangeString = formatDateRange(startDate, endDate);
   
    if (onDateRangeSelect) {
      onDateRangeSelect(dateRangeString);
    }

    // Auto-close the calendar after selection
    if (onClose) {
      setTimeout(() => onClose(), 300); // Small delay for better UX
    }
  };
 
  // Check if a date is in the selected week range
  const isDateInSelectedWeekRange = (date) => {
    if (!selectedWeekRange) return false;
    return selectedWeekRange.some(weekDate => isSameDate(weekDate, date));
  };
 
  // Check if a date should be disabled (no dates are disabled now)
  const isDateDisabled = () => {
    return false; // Allow all dates to be selectable
  };
 
  // Get responsive styles based on screen size
  const getResponsiveStyles = () => {
    if (windowWidth < 640) {
      return {
        containerClass: "bg-white shadow-2xl rounded-xl p-3 w-[300px] h-[240px] flex flex-col gap-1",
        headerTextSize: "text-sm",
        buttonSize: "text-sm",
        daySize: "text-sm",
        headerMinWidth: "min-w-[100px]"
      };
    } else if (windowWidth < 768) {
      return {
        containerClass: "bg-white shadow-2xl rounded-xl p-4 w-[340px] h-[260px] flex flex-col gap-2",
        headerTextSize: "text-base",
        buttonSize: "text-base",
        daySize: "text-sm",
        headerMinWidth: "min-w-[110px]"
      };
    } else {
      return {
        containerClass: "bg-white shadow-2xl rounded-2xl p-[20px] w-[380px] h-[277px] flex flex-col gap-2",
        headerTextSize: "text-lg",
        buttonSize: "text-md",
        daySize: "text-md",
        headerMinWidth: "min-w-[120px]"
      };
    }
  };

  const styles = getResponsiveStyles();

  return (
    <div className={styles.containerClass}>
      {/* Header */}
      <div className="flex items-center justify-center gap-0 mb-2">
        <button className={`${styles.buttonSize} font-bold px-0 py-0 m-1`} onClick={prevYear}>
        <MdKeyboardDoubleArrowLeft />
        </button>
        <button className={`${styles.buttonSize} font-bold px-0 py-0 m-1`} onClick={prevMonth}>
        <MdKeyboardArrowLeft />
        </button>
        <span className={`${styles.headerTextSize} ${styles.headerMinWidth} text-center text-gray-800`}>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </span>
        <button className={`${styles.buttonSize} font-bold px-0 py-0 m-1`} onClick={nextMonth}>
        <MdKeyboardArrowRight />
        </button>
        <button className={`${styles.buttonSize} font-bold px-0 py-0 m-1`} onClick={nextYear}>
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
 
      {/* Calendar Grid */}
      <div className={`grid grid-cols-7 ${styles.daySize} gap-1 text-center flex-1`}>
        {/* Empty cells for alignment */}
        {Array(startDay).fill(null).map((_, i) => (
          <div key={"empty" + i}></div>
        ))}
        {/* Days of the month */}
        {days.map((date) => (
          <div
            key={date.toISOString()}
            className={`rounded py-1 ${
              isDateDisabled(date)
                ? 'text-gray-400 cursor-not-allowed'
                : 'cursor-pointer hover:bg-gray-200'
            } ${
              isDateInSelectedWeekRange(date) ? 'text-white' : ''
            }`}
            style={{
              backgroundColor: isDateInSelectedWeekRange(date) ? '#323B83' : 'transparent'
            }}
            onClick={() => handleDateClick(date)}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}