import { useState } from "react";
import ReactDatePicker from "react-datepicker";

const DatePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date(Date.now()));
  return (
    <ReactDatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      className="form-control datetimepicker-input digits"
    />
  );
};

export default DatePicker;
