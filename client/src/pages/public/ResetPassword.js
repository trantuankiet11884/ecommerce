import React, { useState } from "react";
import { Button } from "components";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "apis/user";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    console.log(response);
  };
  return (
    <div className="flex justify-center">
      <form className="w-main max-w-sm ">
        <div className="flex items-center justify-center border-black py-2">
          <input
            className="appearance-none  w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-overlay text-overlay"
            type="text"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className=" text-sm border-4 text-white py-1 px-2 rounded"
            name="Submit"
            onOk={handleResetPassword}
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
