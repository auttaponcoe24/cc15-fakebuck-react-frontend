import React from "react";

function LoginInput({ type="text", placeholder, value, onChange }) {
  return (
    <input 
        type={type} 
        placeholder={placeholder} 
        className="block w-full rounded-md px-4 py-3 outline-none border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-300" 
        value={value}
        onChange={onChange}
    />
  )
}

export default LoginInput;
