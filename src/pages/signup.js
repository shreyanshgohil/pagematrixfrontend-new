import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SEO from "../components/common/SEO";
import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaUser,
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
  FaTachometerAlt,
  FaShieldAlt,
  FaRocket,
  FaCode,
} from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setSubmitStatus("error");
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setSubmitStatus("error");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, accept any valid form
      if (
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.password
      ) {
        setSubmitStatus("success");
        // Redirect to dashboard or home page
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const features = [
    {
      icon: <FaTachometerAlt />,
      title: "Performance Analysis",
      description:
        "Get detailed PageSpeed insights and optimization recommendations",
    },
    {
      icon: <FaCode />,
      title: "API Access",
      description: "Integrate our PageSpeed API into your applications",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security",
    },
    {
      icon: <FaRocket />,
      title: "Fast Results",
      description: "Get performance analysis results in seconds",
    },
  ];

  return (
    <>
      <SEO
        title="Sign Up - PageSpeed Performance Tool | Create Your Account"
        description="Create your PageSpeed performance tool account to access website analysis, API features, and performance optimization tools. Free signup for developers and website owners."
        keywords="sign up, register, PageSpeed account, performance tool signup, developer account, website analysis account, API access signup"
        url="/signup"
      />

      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Beautiful Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700 via-brand-blue-800 to-brand-theme-600">
          {/* Animated Background Elements */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-brand-theme/20 to-brand-blue-700/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-brand-blue-700/20 to-brand-theme/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-brand-theme/15 to-brand-blue-700/15 rounded-full blur-2xl animate-pulse delay-500"></div>

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <Header />

        <main className="flex-1 flex items-center justify-center py-12 pt-20 sm:pt-24 lg:pt-32 relative z-10">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Branding & Features */}
              <div className="text-white space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <FaUser className="h-4 w-4 text-brand-theme" />
                    <span className="text-sm font-semibold">Join Us Today</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                    Create Your
                    <span className="block bg-gradient-to-r from-brand-theme to-yellow-400 bg-clip-text text-transparent">
                      Free Account
                    </span>
                  </h1>

                  <p className="text-xl text-white/90 max-w-lg leading-relaxed">
                    Start optimizing your website performance with our
                    comprehensive PageSpeed analysis tools.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <div className="w-10 h-10 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <div className="text-white text-sm">{feature.icon}</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Sign Up Form */}
              <div className="relative">
                {/* Floating Card */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 relative overflow-hidden">
                  {/* Card Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-theme/10 to-brand-blue-700/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-brand-blue-700/10 to-brand-theme/10 rounded-full translate-y-12 -translate-x-12"></div>

                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FaUser className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-brand-blue-800 mb-2">
                        Create Account
                      </h2>
                      <p className="text-brand-gray-600">
                        Start optimizing your website performance
                      </p>
                    </div>

                    {/* Success/Error Messages */}
                    {submitStatus === "success" && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <FaCheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-green-800">
                              Account Created Successfully!
                            </h4>
                            <p className="text-sm text-green-700">
                              Redirecting to your dashboard...
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
                              Sign Up Failed
                            </h4>
                            <p className="text-sm text-red-700">
                              Please check your information and try again.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-brand-blue-800 mb-2">
                            First Name
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <FaUser className="h-5 w-5 text-brand-gray-400 group-focus-within:text-brand-theme transition-colors duration-300" />
                            </div>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-brand-gray-200 rounded-xl text-brand-blue-800 placeholder-brand-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-theme focus:border-brand-theme transition-all duration-300 hover:border-brand-theme/50"
                              placeholder="John"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-brand-blue-800 mb-2">
                            Last Name
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <FaUser className="h-5 w-5 text-brand-gray-400 group-focus-within:text-brand-theme transition-colors duration-300" />
                            </div>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-brand-gray-200 rounded-xl text-brand-blue-800 placeholder-brand-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-theme focus:border-brand-theme transition-all duration-300 hover:border-brand-theme/50"
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brand-blue-800 mb-2">
                          Email Address
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaEnvelope className="h-5 w-5 text-brand-gray-400 group-focus-within:text-brand-theme transition-colors duration-300" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-brand-gray-200 rounded-xl text-brand-blue-800 placeholder-brand-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-theme focus:border-brand-theme transition-all duration-300 hover:border-brand-theme/50"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brand-blue-800 mb-2">
                          Password
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
                            placeholder="Create a password"
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
                            placeholder="Confirm your password"
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

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="agree-terms"
                            name="agreeToTerms"
                            type="checkbox"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            required
                            className="h-4 w-4 text-brand-theme focus:ring-brand-theme border-brand-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="agree-terms"
                            className="text-brand-gray-500"
                          >
                            I agree to the{" "}
                            <Link
                              href="/terms-and-conditions"
                              className="text-brand-theme hover:text-brand-theme-600 transition-colors duration-300"
                            >
                              Terms & Conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="text-brand-theme hover:text-brand-theme-600 transition-colors duration-300"
                            >
                              Privacy Policy
                            </Link>
                          </label>
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
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-8 text-center">
                      <p className="text-sm text-brand-gray-500">
                        Already have an account?{" "}
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
          </div>
        </main>

        {/* Light Section Between Form and Footer */}
        <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="container--boxed px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-800 mb-4">
                What You Get With Your Account
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6"></div>
              <p className="text-lg text-brand-gray-600 max-w-3xl mx-auto">
                Unlock the full potential of our PageSpeed performance analysis
                platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group bg-white rounded-2xl p-8 shadow-lg border border-brand-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaTachometerAlt className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-3">
                  Performance Analysis
                </h3>
                <p className="text-brand-gray-600">
                  Get detailed PageSpeed insights and optimization
                  recommendations
                </p>
              </div>

              <div className="text-center group bg-white rounded-2xl p-8 shadow-lg border border-brand-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaCode className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-3">
                  API Access
                </h3>
                <p className="text-brand-gray-600">
                  Integrate our PageSpeed API into your applications and
                  workflows
                </p>
              </div>

              <div className="text-center group bg-white rounded-2xl p-8 shadow-lg border border-brand-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-theme-600 to-brand-theme-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaShieldAlt className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-3">
                  Secure Platform
                </h3>
                <p className="text-brand-gray-600">
                  Your data is protected with enterprise-grade security
                  standards
                </p>
              </div>

              <div className="text-center group bg-white rounded-2xl p-8 shadow-lg border border-brand-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-theme-600 to-brand-theme-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaRocket className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-3">
                  Fast Results
                </h3>
                <p className="text-brand-gray-600">
                  Get performance analysis results in seconds with our optimized
                  infrastructure
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default SignUp;
