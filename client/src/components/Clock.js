import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const day = time.getDate().toString().padStart(2, "0");
  const month = (time.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are 0-indexed

  return (
    <div className="clock">
      <p>{`${day}-${month} ${hours}:${minutes}:${seconds}`}</p>
    </div>
  );
};

export default Clock;
