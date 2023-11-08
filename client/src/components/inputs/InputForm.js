import clsx from "clsx";
import React, { memo } from "react";

const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullWidth,
  defaultValue,
  styles,
  readOnly,
}) => {
  return (
    <div className={clsx("flex flex-col h-20 gap-2", styles)}>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={clsx("form-input my-auto", fullWidth && "w-full", styles)}
        readOnly={readOnly}
      />
      {errors[id] && (
        <small className="text-xs text-main">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(InputForm);
