import Head from "next/head";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SEO from "../components/common/SEO";
import { useState, useEffect } from "react";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../config/firebase";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
  FaKey,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const ResetPassword = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [oobCode, setOobCode] = useState("");

  useEffect(() => {
    // Get oobCode from URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("oobCode") || urlParams.get("mode") === "resetPassword" 
      ? urlParams.get("oobCode") 
      : "";

    if (code) {
      setOobCode(code);
      // Verify the code
      verifyPasswordResetCode(auth, code)
        .then((email) => {
          setIsVerifying(false);
        })
        .catch((error) => {
          console.error("Verification error:", error);
          setSubmitStatus("error");
          setErrorMessage("Invalid or expired reset link. Please request a new one.");
          setIsVerifying(false);
        });
    } else {
      setSubmitStatus("error");
      setErrorMessage("No reset code found in the URL.");
      setIsVerifying(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);
    setErrorMessage("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setSubmitStatus("error");
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setSubmitStatus("error");
      setErrorMessage("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // Reset password in Firebase
      await confirmPasswordReset(auth, oobCode, formData.password);

      // Also notify backend
      await api.resetPassword(oobCode, formData.password);

      setSubmitStatus("success");
      // Redirect to signin after 2 seconds
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (error) {
      console.error("Reset password error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error.message === "Firebase: Error (auth/expired-action-code)"
          ? "Reset link has expired. Please request a new one."
          : error.message === "Firebase: Error (auth/invalid-action-code)"
          ? "Invalid reset link. Please request a new one."
          : error.message || "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isVerifying) {
    return (
      <>
        <SEO
          title="Reset Password - PageSpeed Performance Tool"
          description="Reset your password securely"
          url="/reset-password"
        />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-theme border-t-transparent mx-auto mb-4"></div>
            <p className="text-brand-gray-600">Verifying reset link...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Reset Password - PageSpeed Performance Tool | Set New Password"
        description="Reset your PageSpeed performance tool password securely. Set a new password to regain access to your account."
        keywords="reset password, new password, PageSpeed account recovery, password reset"
        url="/reset-password"
      />

      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Beautiful Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700 via-brand-blue-800 to-brand-theme-600">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-brand-theme/20 to-brand-blue-700/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-brand-blue-700/20 to-brand-theme/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Header />

        <main className="flex-1 flex items-center justify-center py-40 relative z-10">
          <div className="container--boxed w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FaKey className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-brand-blue-800 mb-2">
                      Set New Password
                    </h2>
                    <p className="text-brand-gray-600">
                      Enter your new password below
                    </p>
                  </div>

                  {/* Success/Error Messages */}
                  {submitStatus === "success" && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-green-800">
                            Password Reset Successful!
                          </h4>
                          <p className="text-sm text-green-700">
                            Redirecting to sign in...
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FaTimesCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-red-800">
                            Reset Failed
                          </h4>
                          <p className="text-sm text-red-700">
                            {errorMessage || "Please try again."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-blue-800 mb-2">
                        New Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-brand-gray-400 group-focus-within:text-brand-theme transition-colors duration-300" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-14 py-4 bg-white border-2 border-brand-gray-200 rounded-xl text-brand-blue-800 placeholder-brand-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-theme focus:border-brand-theme transition-all duration-300 hover:border-brand-theme/50"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-brand-gray-50 rounded-r-xl transition-colors duration-300"
                        >
                          {showPassword ? (
                            <FaEyeSlash className="h-5 w-5 text-brand-gray-400 hover:text-brand-theme transition-colors duration-300" />
                          ) : (
                            <FaEye className="h-5 w-5 text-brand-gray-400 hover:text-brand-theme transition-colors duration-300" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-blue-800 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-brand-gray-400 group-focus-within:text-brand-theme transition-colors duration-300" />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-14 py-4 bg-white border-2 border-brand-gray-200 rounded-xl text-brand-blue-800 placeholder-brand-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-theme focus:border-brand-theme transition-all duration-300 hover:border-brand-theme/50"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-brand-gray-50 rounded-r-xl transition-colors duration-300"
                        >
                          {showConfirmPassword ? (
                            <FaEyeSlash className="h-5 w-5 text-brand-gray-400 hover:text-brand-theme transition-colors duration-300" />
                          ) : (
                            <FaEye className="h-5 w-5 text-brand-gray-400 hover:text-brand-theme transition-colors duration-300" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group ${
                        isLoading
                          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                          : "bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white transform hover:scale-105 hover:shadow-xl hover:shadow-brand-theme/25"
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-200 border-t-gray-600"></div>
                          Resetting Password...
                        </>
                      ) : (
                        <>
                          Reset Password
                          <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-brand-gray-500">
                      Remember your password?{" "}
                      <Link
                        href="/signin"
                        className="font-medium text-brand-theme hover:text-brand-theme-600 transition-colors duration-300"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ResetPassword;
