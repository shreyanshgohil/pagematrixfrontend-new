import { useState, useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

const Toast = ({ message, type = "success", isVisible, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      setProgress(100);

      // Progress bar animation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(progressInterval);
            return 0;
          }
          return prev - 2; // Decrease by 2% every 100ms
        });
      }, 100);

      const timer = setTimeout(() => {
        setIsAnimating(false);
        clearInterval(progressInterval);
        setTimeout(() => {
          onClose();
        }, 300); // Wait for exit animation
      }, 5000); // Auto close after 5 seconds

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    const baseStyles = `fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-xl shadow-2xl border-l-4 transform transition-all duration-300 ease-in-out ${
      isAnimating ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
    }`;

    if (type === "success") {
      return `${baseStyles} border-brand-theme`;
    } else if (type === "error") {
      return `${baseStyles} border-red-500`;
    }
    return baseStyles;
  };

  const getIcon = () => {
    if (type === "success") {
      return <FaCheckCircle className="h-5 w-5 text-brand-theme" />;
    } else if (type === "error") {
      return <FaExclamationCircle className="h-5 w-5 text-red-500" />;
    }
    return null;
  };

  return (
    <div className={getToastStyles()}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-brand-blue-800">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onClose}
              className="bg-white rounded-md inline-flex text-brand-gray-400 hover:text-brand-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-theme focus:ring-offset-2"
            >
              <span className="sr-only">Close</span>
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
          <div
            className={`h-1 rounded-full transition-all duration-100 ${
              type === "success" ? "bg-brand-theme" : "bg-red-500"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
