import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaFileAlt,
  FaLightbulb,
  FaLink,
  FaChartBar,
  FaExclamationTriangle,
  FaTachometerAlt,
} from "react-icons/fa";

const NewTaskModal = ({ isOpen, onClose }) => {
  const [taskTitle, setTaskTitle] = useState("Task #5b8lhf8rh");
  const [urls, setUrls] = useState("");
  const [errors, setErrors] = useState({});

  const availableCredits = 8;
  const urlCount = urls.split("\n").filter((url) => url.trim()).length;
  const hasSufficientCredits = urlCount <= availableCredits;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!urls.trim()) {
      newErrors.urls = "Please enter at least one valid URL";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log("Form submitted:", { urls, taskTitle });
      onClose();
    }
  };

  const handleClose = () => {
    setErrors({});
    setUrls("");
    onClose();
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all max-w-2xl w-full">
          {/* Header */}
          <div className="bg-white px-6 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Add URL Pages
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="px-6 py-4">
            {/* Info Banner */}
            <div className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <FaTachometerAlt className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Add URL pages to analyze their speed and performance
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Each URL will be analyzed for page speed metrics
                  </p>
                </div>
              </div>
            </div>

            {/* Task Title */}
            <div className="mb-4">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                <FaFileAlt className="h-4 w-4" />
                <span>Task Title</span>
                <span className="text-xs text-brand-theme font-normal">
                  (AUTO-GENERATED)
                </span>
              </label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full px-3 py-2 border-2 border-brand-theme rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme text-gray-700"
              />
              <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                <FaLightbulb className="h-4 w-4" />
                <span>
                  Task name is auto-generated. You can edit it anytime.
                </span>
              </div>
            </div>

            {/* URLs */}
            <div className="mb-4">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                <FaLink className="h-4 w-4" />
                <span>URLs</span>
              </label>
              <textarea
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                rows={3}
                placeholder="Enter URLs (one per line)&#10;https://example.com/page1&#10;https://example.com/page2"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                  errors.urls ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.urls && (
                <p className="mt-2 text-sm text-red-600">{errors.urls}</p>
              )}
            </div>

            {/* Available Credits */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Available Credits: {availableCredits}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    hasSufficientCredits
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {hasSufficientCredits
                    ? "Sufficient Credits"
                    : "Insufficient Credits"}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FaChartBar className="h-4 w-4" />
                  <span>Max 10,000 URLs per task • Each URL = 1 credit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaTachometerAlt className="h-4 w-4" />
                  <span>
                    Pages will be analyzed for speed and performance metrics
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaExclamationTriangle className="h-4 w-4" />
                  <span>
                    URLs must start with http:// or https:// • Use "Fix URLs"
                    for corrections
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:from-brand-theme-600 hover:to-brand-theme-800 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
            >
              <FaTachometerAlt className="h-5 w-5" />
              <span>Analyze Pages</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;
