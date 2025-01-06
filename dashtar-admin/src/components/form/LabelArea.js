import React from "react";
import { Label } from "@windmill/react-ui";

const LabelArea = ({ label, isLogin = false }) => {
  const loginStyle = {
    color: isLogin ? "#3f3eed" : "",
  };
  return (
    <Label
      className="col-span-4 sm:col-span-2 font-medium text-sm"
      style={loginStyle}
    >
      {label}
    </Label>
  );
};

export default LabelArea;
