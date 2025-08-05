import React, { useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
 
/**
 * Generates an array of all days in a specific month and year
 * @param {number} year - The year (e.g., 2025)
 * @param {number} month - The month (0-11, where 0 is January)
 * @returns {Date[]} Array of Date objects for each day in the month
 */
function getDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
 
/**
 * Compares two dates to check if they represent the same day
 * @param {Date} date1 - First date to compare
 * @param {Date} date2 - Second date to compare
 * @returns {boolean} True if both dates represent the same day
 */
function isSameDate(date1, date2) {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
}
 
/**
 * Checks if a given date is today
 * @param {Date} date - Date to check
 * @returns {boolean} True if the date is today
 */
function isToday(date) {
  const today = new Date();
  return isSameDate(date, today);
}
 
/**
 * Checks if a given date is in the past (before today)
 * @param {Date} date - Date to check
 * @returns {boolean} True if the date is in the past
 */
function isPastDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate < today;
}
 
/**
 * Checks if a given date is in the future (after today)
 * @param {Date} date - Date to check
 * @returns {boolean} True if the date is in the future
 */
function isFutureDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate > today;
}
 
/**
 * Advanced Calendar Component
 *
 * A customizable calendar component that supports different modes for date selection:
 * - "all": All dates are selectable
 * - "pastDisabled": Past dates are disabled, current and future dates are selectable
 * - "futureDisabled": Future dates are disabled, past and current dates are selectable
 * - "onlyToday": Only today's date is selectable
 *
 * @param {Function} onDateSelect - Callback function called when a date is selected
 * @param {string} mode - Selection mode for dates ("all", "pastDisabled", "futureDisabled", "onlyToday")
 * @returns {JSX.Element} The calendar component
 */
export default function AdvancedCalendar({ onDateSelect, mode = "all" }) {
  // useState hook: Manages the currently displayed month/year
  // Returns current state value and a function to update it
  const [currentDate, setCurrentDate] = useState(new Date());
 
  // useState hook: Manages the currently selected date
  // Returns selected date state and a function to update it
  const [selectedDate, setSelectedDate] = useState(null);
 
  // Extract year and month from current date for calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  // Get all days in the current month
  const days = getDaysInMonth(year, month);
  // Get the day of week for the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const startDay = new Date(year, month, 1).getDay();
 
  // Navigation functions to change the displayed month/year
  // These functions use setCurrentDate to update the state
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevYear = () => setCurrentDate(new Date(year - 1, month, 1));
  const nextYear = () => setCurrentDate(new Date(year + 1, month, 1));
 
  /**
   * Handles date selection when a user clicks on a date
   * @param {Date} clickedDate - The date that was clicked
   */
  const handleDateClick = (clickedDate) => {
    // Check if date is disabled based on mode
    if (isDateDisabled(clickedDate)) {
      return;
    }
   
    // Update the selected date state
    setSelectedDate(clickedDate);
    // Call the callback function if provided
    if (onDateSelect) {
      onDateSelect(clickedDate);
    }
  };
 
  /**
   * Determines if a date should be disabled based on the current mode
   * @param {Date} date - The date to check
   * @returns {boolean} True if the date should be disabled
   */
  const isDateDisabled = (date) => {
    switch (mode) {
      case "all":
        // All dates enabled
        return false;
     
      case "pastDisabled":
        // Past dates disabled, current and future enabled
        return isPastDate(date);
     
      case "futureDisabled":
        // Future dates disabled, past and current enabled
        return isFutureDate(date);
     
      case "onlyToday":
        // Only today enabled, past and future disabled
        return !isToday(date);
     
      default:
        return false;
    }
  };
 
  /**
   * Returns a human-readable description of the current mode
   * @returns {string} Description of the current mode
   */
  const getModeDescription = () => {
    switch (mode) {
      case "all":
        return "All dates enabled";
      case "pastDisabled":
        return "Past dates disabled";
      case "futureDisabled":
        return "Future dates disabled";
      case "onlyToday":
        return "Only today enabled";
      default:
        return "All dates enabled";
    }
  };
 
  return (
    <div className="bg-white shadow-2xl rounded-2xl p-[20px] w-[380px] h-[320px] flex flex-col gap-2">
      {/* Mode indicator - shows current selection mode */}
      <div className="text-xs text-gray-500 text-center mb-1">
        {getModeDescription()}
      </div>
     
      {/* Calendar Header - Month/Year display with navigation buttons */}
      <div className="flex items-center justify-center gap-0 mb-2">
        {/* Previous year button */}
        <button className="text-md font-bold px-0 py-0 m-1" onClick={prevYear}>
        <MdKeyboardDoubleArrowLeft />
        </button>
        {/* Previous month button */}
        <button className="text-md font-bold px-0 py-0 m-1" onClick={prevMonth}>
        <MdKeyboardArrowLeft />
        </button>
        {/* Current month and year display */}
        <span className="text-lg min-w-[120px] text-center text-gray-800">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </span>
        {/* Next month button */}
        <button className="text-md font-bold px-0 py-0 m-1" onClick={nextMonth}>
        <MdKeyboardArrowRight />
        </button>
        {/* Next year button */}
        <button className="text-md font-bold px-0 py-0 m-1" onClick={nextYear}>
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
 
      {/* Calendar Grid - 7 columns for days of the week */}
      <div className="grid grid-cols-7 text-md gap-1 text-center flex-1">
        {/* Empty cells for alignment - fills in the first row to align with correct day of week */}
        {Array(startDay).fill(null).map((_, i) => (
          <div key={"empty" + i}></div>
        ))}
        {/* Days of the month - renders each day with appropriate styling */}
        {days.map((date) => {
          const isDisabled = isDateDisabled(date);
          const isSelected = selectedDate && isSameDate(selectedDate, date);
         
          return (
            <div
              key={date.toISOString()}
              className={`rounded py-1 ${
                isDisabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'cursor-pointer hover:bg-gray-200'
                             } ${
                 isSelected ? 'text-white' : ''
               }`}
               style={{
                 backgroundColor: isSelected ? '#323B83' : 'transparent'
               }}
              onClick={() => handleDateClick(date)}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}