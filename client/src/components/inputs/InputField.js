import React from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidForm,
  setInvalidForm,
}) => {
  return (
    <div className="w-full">
      <input
        type={type || "text"}
        className="text-xs w-full px-4 py-2 border border-solid border-gray-300 rounded outline-none"
        placeholder={nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setInvalidForm([])}
      />
      {invalidForm?.some((el) => el.name === nameKey) && (
        <small className="text-main">
          {invalidForm.find((el) => el.name === nameKey)?.message}
        </small>
      )}
    </div>
  );
};

export default InputField;
