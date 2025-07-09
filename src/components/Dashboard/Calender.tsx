"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";

const Calender = () => {
  const [dateValue, setDateValue] = useState<Date>(new Date(Date.now()));

  return (
    <div className="col-lg-6 col-xxl-4">
      <div className="datepicker-dashboard card">
        <div className="datepicker-here">
          <Calendar
            onChange={(value) => setDateValue(value as Date)}
            value={dateValue}
            className="w-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Calender;
