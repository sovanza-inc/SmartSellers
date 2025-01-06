import React from "react";
import { Input } from "@windmill/react-ui";

const InputArea = ({
  register,
  defaultValue,
  required,
  name,
  label,
  type,
  placeholder,
  isLogin = false,
}) => {
  const loginStyle = {
    backgroundColor: isLogin ? "#fff" : "", // Apply background color if login is true
    borderColor: isLogin ? "#3f3eed" : "", // Apply border color if login is true
    color: isLogin ? "black" : "",
  };

  return (
    <>
      <Input
        {...register(`${name}`, {
          required: required ? false : `${label} is required!`,
        })}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        name={name}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        style={loginStyle}
      />
    </>
  );
};

export default InputArea;
