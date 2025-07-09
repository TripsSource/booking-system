import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Default styles
import "./styles/datepicker.css"; // Import custom styles
import { FaTrash } from "react-icons/fa6";

interface TimeSlotProps {
  disabled?: boolean;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  date?: Date;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  disabled = false,
  minDate = new Date(Date.now()),
  onChange,
  date = new Date(Date.now()),
  maxDate = new Date("2030-12-31"),
}) => {
  const handleDateChange = (date: Date | null) => {
    if (onChange) {
      if (date) {
        onChange(date); // Pass the new date up to the parent
      }
    }
  };

  return (
    <div className="custom-datepicker">
      <DatePicker
        disabled={disabled}
        selected={date}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd HH:mm"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15} // Time selection every 15 minutes
        minDate={minDate}
        maxDate={maxDate}
        placeholderText="Pick a date and time"
        className="custom-input" // Custom input class
      />
    </div>
  );
};

export default TimeSlot;
