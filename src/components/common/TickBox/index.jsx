import React from "react";
import { FaCheck } from "react-icons/fa";

const TickBox = ({ checked = true, size = "default", className = "" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-5 h-5",
    large: "w-6 h-6",
  };

  const iconSizeClasses = {
    small: "h-2.5 w-2.5",
    default: "h-3 w-3",
    large: "h-4 w-4",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        ${checked ? "bg-brand-theme" : "bg-gray-200 border-2 border-gray-300"} 
        rounded-full 
        flex 
        items-center 
        justify-center 
        flex-shrink-0 
        transition-all 
        duration-200
        ${className}
      `}
    >
      {checked && <FaCheck className={`${iconSizeClasses[size]} text-white`} />}
    </div>
  );
};

export default TickBox;
