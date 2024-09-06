import clsx from "clsx";
import React from "react";
import Select from "react-select";
const CustomSelect = ({
  label,
  placeholder,
  onChange,
  options = [],
  value,
  className,
}) => {
  return (
    <div>
      {label && <h3 className="font-medium">{label}</h3>}

      <Select
        isClearable
        options={options}
        value={value}
        isSearchable
        placeholder={placeholder}
        onchange={(val) => onChange(val)}
        formatOptionLabel={(option) => {
          return (
            <div className="flex text-black items-center gap-2">
              <span>{option.label}</span>
            </div>
          );
        }}
        className={{ control: () => clsx("border-1 py-1", className) }}
      />
    </div>
  );
};

export default CustomSelect;
