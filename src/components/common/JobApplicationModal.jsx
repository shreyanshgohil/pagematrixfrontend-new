import { useState } from "react";
import {
  FaTimes,
  FaUpload,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFilePdf,
  FaSpinner,
} from "react-icons/fa";

const JobApplicationModal = ({ isOpen, onClose, jobPosition, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));
      if (errors.resume) {
        setErrors((prev) => ({
          ...prev,
          resume: "",
        }));
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        resume: "Please upload a PDF file only",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.resume) {
      newErrors.resume = "Resume is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData, jobPosition);
      // Reset form on success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        resume: null,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      // Don't show alert here, let parent handle it
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        resume: null,
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-brand-theme to-brand-theme-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Apply for Position
              </h2>
              <p className="text-white/90 mt-1">{jobPosition?.title}</p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-blue-800 mb-2">
                <FaUser className="inline h-4 w-4 mr-2 text-brand-theme" />
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-theme/20 transition-colors duration-200 ${
                  errors.firstName
                    ? "border-red-500"
                    : "border-brand-gray-200 focus:border-brand-theme"
                }`}
                placeholder="Enter your first name"
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-blue-800 mb-2">
                <FaUser className="inline h-4 w-4 mr-2 text-brand-theme" />
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-theme/20 transition-colors duration-200 ${
                  errors.lastName
                    ? "border-red-500"
                    : "border-brand-gray-200 focus:border-brand-theme"
                }`}
                placeholder="Enter your last name"
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-brand-blue-800 mb-2">
              <FaEnvelope className="inline h-4 w-4 mr-2 text-brand-theme" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-theme/20 transition-colors duration-200 ${
                errors.email
                  ? "border-red-500"
                  : "border-brand-gray-200 focus:border-brand-theme"
              }`}
              placeholder="Enter your email address"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-semibold text-brand-blue-800 mb-2">
              <FaPhone className="inline h-4 w-4 mr-2 text-brand-theme" />
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-theme/20 transition-colors duration-200 ${
                errors.phone
                  ? "border-red-500"
                  : "border-brand-gray-200 focus:border-brand-theme"
              }`}
              placeholder="Enter your phone number"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-semibold text-brand-blue-800 mb-2">
              <FaFilePdf className="inline h-4 w-4 mr-2 text-brand-theme" />
              Resume (PDF) *
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
                disabled={isSubmitting}
              />
              <label
                htmlFor="resume-upload"
                className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 ${
                  errors.resume
                    ? "border-red-500 bg-red-50"
                    : "border-brand-gray-200 hover:border-brand-theme hover:bg-brand-theme/5"
                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="text-center">
                  <FaUpload className="h-6 w-6 text-brand-theme mx-auto mb-2" />
                  <p className="text-sm text-brand-gray-600">
                    {formData.resume
                      ? formData.resume.name
                      : "Click to upload your resume (PDF)"}
                  </p>
                </div>
              </label>
            </div>
            {errors.resume && (
              <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-brand-theme-600 hover:to-brand-theme-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-brand-theme/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="h-4 w-4 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-3 border border-brand-gray-300 text-brand-blue-800 font-semibold rounded-xl hover:bg-brand-gray-50 transition-colors duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationModal;
