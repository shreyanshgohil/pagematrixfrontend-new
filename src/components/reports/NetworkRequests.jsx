import React from "react";
import { FaGlobe } from "react-icons/fa";

const NetworkRequests = ({ normalData }) => {
  if (
    !normalData.lighthouseResult?.audits?.["network-requests"]?.details?.items
  ) {
    return null;
  }

  const requests =
    normalData.lighthouseResult.audits["network-requests"].details.items;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme-600 to-brand-theme-800 rounded-xl flex items-center justify-center shadow-lg">
          <FaGlobe className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Network Requests
        </h2>
      </div>
      <p className="text-sm text-brand-gray-500 mb-6 font-medium">
        {
          normalData.lighthouseResult.audits["network-requests"].description
        }
      </p>

      <div className="overflow-x-auto rounded-xl border-2 border-brand-gray-400/30 shadow-lg">
        <table className="min-w-full divide-y divide-brand-gray-400/30">
          <thead className="bg-gradient-to-r from-brand-theme/10 to-brand-theme-600/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-brand-blue-900 uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-brand-blue-900 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-brand-blue-900 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-brand-blue-900 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-brand-blue-900 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-brand-gray-400/20">
            {requests.slice(0, 50).map((request, index) => (
              <tr
                key={index}
                className="hover:bg-brand-theme/5 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm">
                  <div className="max-w-xs truncate font-medium text-brand-blue-900">
                    {request.url}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-brand-gray-500 font-medium">
                  {request.resourceType || request.mimeType || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-brand-blue-900 font-medium">
                  {request.transferSize
                    ? `${(request.transferSize / 1024).toFixed(2)} KB`
                    : "-"}
                </td>
                <td className="px-6 py-4 text-sm text-brand-blue-900 font-medium">
                  {request.networkEndTime && request.networkRequestTime
                    ? `${(
                        (request.networkEndTime - request.networkRequestTime) *
                        1000
                      ).toFixed(2)}ms`
                    : "-"}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                      request.statusCode >= 200 && request.statusCode < 300
                        ? "bg-brand-theme/20 text-brand-theme border-brand-theme/30"
                        : request.statusCode >= 300 && request.statusCode < 400
                        ? "bg-brand-theme-600/20 text-brand-theme-600 border-brand-theme-600/30"
                        : request.statusCode >= 400
                        ? "bg-brand-theme-800/20 text-brand-theme-800 border-brand-theme-800/30"
                        : "bg-brand-gray-400/20 text-brand-gray-500 border-brand-gray-400/30"
                    }`}
                  >
                    {request.statusCode || "-"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {requests.length > 50 && (
        <div className="mt-4 text-sm text-brand-gray-500 text-center font-medium">
          Showing first 50 of {requests.length} requests
        </div>
      )}
    </div>
  );
};

export default NetworkRequests;

