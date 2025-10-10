import React, { useState } from "react";
import {
  FaRocket,
  FaSearch,
  FaClock,
  FaExclamationTriangle,
  FaChartBar,
  FaLightbulb,
  FaLink,
} from "react-icons/fa";

const TaskForm = () => {
  const [taskType, setTaskType] = useState("indexer");
  const [urls, setUrls] = useState("");
  const [taskTitle, setTaskTitle] = useState("PageSpeed Task #cd24grota");
  const [errors, setErrors] = useState({});

  const availableCredits = 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!urls.trim()) {
      newErrors.urls = "Please enter at least one valid URL";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log("Form submitted:", { taskType, urls, taskTitle });
    }
  };

  const urlCount = urls.split("\n").filter((url) => url.trim()).length;
  const hasSufficientCredits = urlCount <= availableCredits;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-200">
        {/* Header */}
        <div className="flex items-start space-x-6 mb-10">
          <div className="w-16 h-16 bg-gradient-to-r from-brand-theme/10 to-brand-theme/20 rounded-2xl flex items-center justify-center shadow-lg">
            <FaLightbulb className="h-8 w-8 text-brand-theme" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Submit New Task
            </h2>
            <p className="text-gray-600 text-lg">
              Create and submit performance analysis tasks for your URLs
            </p>
          </div>
        </div>

        {/* Standard Queue Info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-10 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm">
              <FaClock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Standard Queue
              </h3>
              <p className="text-gray-600">
                Analysis will take up to{" "}
                <strong className="text-blue-600">2 minutes</strong> to complete
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Task Type */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-6">
              Task Type
            </label>
            <div className="grid grid-cols-2 gap-6">
              <button
                type="button"
                onClick={() => setTaskType("indexer")}
                className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                  taskType === "indexer"
                    ? "border-brand-theme bg-brand-theme/5 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      taskType === "indexer"
                        ? "bg-brand-theme/10"
                        : "bg-gray-100"
                    }`}
                  >
                    <FaRocket
                      className={`h-6 w-6 ${
                        taskType === "indexer"
                          ? "text-brand-theme"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="text-left">
                    <div
                      className={`font-bold text-lg ${
                        taskType === "indexer"
                          ? "text-brand-theme"
                          : "text-gray-700"
                      }`}
                    >
                      PageSpeed Analysis
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Analyze website performance • Uses unified credits
                    </div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTaskType("checker")}
                className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                  taskType === "checker"
                    ? "border-brand-theme bg-brand-theme/5 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      taskType === "checker"
                        ? "bg-brand-theme/10"
                        : "bg-gray-100"
                    }`}
                  >
                    <FaSearch
                      className={`h-6 w-6 ${
                        taskType === "checker"
                          ? "text-brand-theme"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="text-left">
                    <div
                      className={`font-bold text-lg ${
                        taskType === "checker"
                          ? "text-brand-theme"
                          : "text-gray-700"
                      }`}
                    >
                      Performance Check
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Quick performance check • Uses unified credits
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Task Title */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-3">
              Task Title (Auto-Generated)
            </label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-theme focus:border-brand-theme text-lg transition-all duration-200"
            />
            <div className="flex items-center space-x-2 mt-3 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
              <FaLightbulb className="h-4 w-4 text-brand-theme" />
              <span>Task name is auto-generated. You can edit it anytime.</span>
            </div>
          </div>

          {/* URLs Input */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-3">
              <div className="flex items-center space-x-3">
                <FaLink className="h-5 w-5 text-brand-theme" />
                <span>URLs</span>
              </div>
            </label>
            <textarea
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              rows={6}
              placeholder="Enter URLs (one per line)&#10;https://example.com/page1&#10;https://example.com/page2"
              className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-brand-theme focus:border-brand-theme text-lg transition-all duration-200 ${
                errors.urls ? "border-red-300" : "border-gray-300"
              }`}
            />
            {errors.urls && (
              <p className="mt-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                {errors.urls}
              </p>
            )}
          </div>

          {/* Credits Info */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-700 font-bold text-lg">
                Available Credits: {availableCredits}
              </span>
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold ${
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

            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                <FaChartBar className="h-5 w-5 text-brand-theme" />
                <span className="font-medium">
                  Max 10,000 URLs per task • Each URL = 1 credit
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                <FaExclamationTriangle className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">
                  URLs must start with http:// or https:// • Use "Fix URLs" for
                  corrections
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white font-bold py-5 px-8 rounded-xl hover:from-brand-theme-600 hover:to-brand-theme-800 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl text-lg"
            >
              <FaRocket className="h-6 w-6" />
              <span>Submit Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
