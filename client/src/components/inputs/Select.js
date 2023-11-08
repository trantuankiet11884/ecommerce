import clsx from "clsx";
import React, { memo } from "react";

const Select = ({
  label,
  options = [],
  register,
  errors,
  id,
  validate,
  styles,
  fullWidth,
  defaultValue,
}) => {
  return (
    <div className={clsx("flex flex-col gap-2", styles)}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        {...register(id, validate)}
        defaultValue={defaultValue}
        className={clsx("form-select max-h-11", fullWidth && "w-full", styles)}
      >
        <option value="">CHOOSE</option>
        {options?.map((option) => (
          <option value={option.code}>{option.value}</option>
        ))}
      </select>
      {errors[id] && (
        <small className="text-xs text-main">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(Select);
