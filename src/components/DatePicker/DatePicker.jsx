import React from "react";
import date from "date-and-time";
import CustomDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateIcon from "../../assets/icons/calendar.svg";

function DatePicker({ className, value, setValue, name }) {
  return (
    <div className="mt-[-20px] w-full">
      <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm font-medium  text-white"
      >
        {name}
      </label>
      <input
        type="date"
        name=""
        id=""
        value={date.format(value, "YYYY-MM-DD")}
        onChange={(e) => {
          setValue(date.parse(e.target.value, "YYYY-MM-DD"));
        }}
        className={
          "w-full outline-appBorder appBorder ext-sm rounded-lg  focus:border-appLine block ps-10 text-white  bg-semilight  placeholder-gray-400  focus:ring-appLine   " +
          className
        }
      />
    </div>
  );
}

export default DatePicker;
