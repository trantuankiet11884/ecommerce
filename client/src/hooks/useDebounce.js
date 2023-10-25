import React, { useEffect, useState } from "react";

const useDebounce = (value, ms) => {
  const [debounceValue, setDebounceValue] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, ms);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, ms]);
  return debounceValue;
};

export default useDebounce;
