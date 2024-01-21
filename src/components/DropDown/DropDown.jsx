import React from "react";

function DropDown({ name, list, value, setValue, idName }) {
  return (
    <div>
      <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm font-medium  text-white"
      >
        {name}
      </label>
      <select
        name={idName}
        id="small"
        className="outline-appBorder block w-full p-2.5 mb-6 text-sm border-appBorder rounded-lg   focus:border-appColor-light bg-appBg-semilight  placeholder-gray-400 text-white focus:ring-blue-500 "
        onChange={(e) => {
          setValue(e.target.value);
        }}
        defaultValue={value}
      >
        {list?.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.lable}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default DropDown;
