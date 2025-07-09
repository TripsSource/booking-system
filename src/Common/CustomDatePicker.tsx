import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/datepicker.css";

interface CustomDatePickerProps {
  disabled?: boolean;
  date?: Date | null;
  classes?: string;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  format?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = (props) => {
  const {
    disabled = false,
    date,
    onChange,
    minDate,
    maxDate,
    classes,
    format,
  } = props;
  const handleDateChange = (date: Date | null) => {
    if (onChange) {
      onChange(date);
    }
  };
  const startYear = minDate ? moment(minDate).year() : 1970;
  const endYear = maxDate ? moment(maxDate).year() : 2050;

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="custom-datepicker">
      <DatePicker
        className={`custom-input ${classes}`}
        disabled={disabled}
        dateFormat={format || "dd.MM.yyyy"}
        minDate={minDate || moment("1970-01-01").toDate()}
        maxDate={maxDate || moment("2050-12-31").toDate()}
        placeholderText="DD.MM.YYYY"
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div>
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="btn-sm btn-outline-primary border-0 py-3"
              type="button"
            >
              {"<"}
            </button>
            <select
              value={moment(date).year()}
              onChange={({ target: { value } }) => changeYear(Number(value))}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={months[moment(date).month()]}
              onChange={({ target: { value } }) => {
                changeMonth(months.indexOf(value));
              }}
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="btn-sm btn-outline-primary border-0 py-3"
              type="button"
            >
              {">"}
            </button>
          </div>
        )}
        selected={date}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default CustomDatePicker;
