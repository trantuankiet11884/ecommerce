import React, { memo } from "react";

const Selected = ({ value, changeValue, options }) => {
  return (
    <select
      value={value}
      onChange={(e) => changeValue(e.target.value)}
      className="form-select text-sm"
    >
      <option value="">All</option>
      {options?.map((option) => (
        <option key={option.id} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default memo(Selected);
