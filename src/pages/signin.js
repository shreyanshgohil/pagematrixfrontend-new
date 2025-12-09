import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SEO from "../components/common/SEO";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaTachometerAlt,
  FaShieldAlt,
  FaRocket,
  FaGoogle,
} from "react-icons/fa";

const SignIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check if redirected from signup
    if (router.query.verified === "false") {
      setSubmitStatus("success");
      setErrorMessage("Please verify your email before signing in.");
    }
  }, [router.query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Get ID token
      const idToken = await userCredential.user.getIdToken();

      // Login to backend
      const response = await api.login(idToken);

      if (response.status === 200) {
        setSubmitStatus("success");
        // Redirect to dashboard or home page
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error.message === "Firebase: Error (auth/user-not-found)" ||
        error.message === "Firebase: Error (auth/wrong-password)"
          ? "Invalid email or password"
          : error.message === "Firebase: Error (auth/user-disabled)"
          ? "This account has been disabled"
          : error.message || "Sign in failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Login to backend
      const response = await api.login(idToken);

      if (response.status === 200) {
        setSubmitStatus("success");
        // Redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        throw new Error(response.message || "Google sign in failed");
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error.message === "Firebase: Error (auth/popup-closed-by-user)"
          ? "Sign in was cancelled"
          : error.message || "Google sign in failed. Please try again."
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
        title="Sign In - PageSpeed Performance Tool | Access Your Account"
        description="Sign in to your PageSpeed performance tool account to access website analysis, API features, and performance optimization tools. Secure login for developers and website owners."
        keywords="sign in, login, PageSpeed account, performance tool login, developer login, website analysis login, API access"
        url="/signin"
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

        <main className="flex-1 flex items-center justify-center py-40 relative z-10">
          <div className="container--boxed w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Branding & Features */}
              <div className="text-white space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <FaUser className="h-4 w-4 text-brand-theme" />
                    <span className="text-sm font-semibold">Welcome Back</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                    Sign In to Your
                    <span className="block bg-gradient-to-r from-brand-theme to-yellow-400 bg-clip-text text-transparent leading-tight">
                      PageSpeed Account
                    </span>
                  </h1>

                  <p className="text-xl text-white/90 max-w-lg leading-relaxed">
                    Access your performance analysis tools, API features, and
                    optimization recommendations.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="text-white text-lg">{feature.icon}</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
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

              {/* Right Side - Sign In Form */}
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
                        Welcome Back
                      </h2>
                      <p className="text-brand-gray-500">
                        Sign in to access your PageSpeed tools
                      </p>
                    </div>

                    {/* Success/Error Messages */}
                    {submitStatus === "success" && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <FaCheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-green-800">
                              Sign In Successful!
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
                              Sign In Failed
                            </h4>
                            <p className="text-sm text-red-700">
                              {errorMessage || "Please check your credentials and try again."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            placeholder="Enter your password"
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

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-brand-theme focus:ring-brand-theme border-brand-gray-300 rounded"
                          />
                          <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-brand-gray-500"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="text-sm">
                          <Link
                            href="/forgot-password"
                            className="font-medium text-brand-theme hover:text-brand-theme-600 transition-colors duration-300"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading || isGoogleLoading}
                        className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group ${
                          isLoading || isGoogleLoading
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                            : "bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white transform hover:scale-105 hover:shadow-xl hover:shadow-brand-theme/25"
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-200 border-t-gray-600"></div>
                            Signing In...
                          </>
                        ) : (
                          <>
                            Sign In
                            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </button>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-brand-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-brand-gray-500">
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading || isGoogleLoading}
                        className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
                          isLoading || isGoogleLoading
                            ? "border-gray-300 text-gray-400 cursor-not-allowed"
                            : "border-brand-gray-300 text-brand-blue-800 hover:border-brand-theme hover:bg-brand-theme/5"
                        }`}
                      >
                        {isGoogleLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-brand-gray-300 border-t-brand-theme"></div>
                            Signing In...
                          </>
                        ) : (
                          <>
                            <FaGoogle className="h-5 w-5" />
                            Sign in with Google
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-8 text-center">
                      <p className="text-sm text-brand-gray-500">
                        Don't have an account?{" "}
                        <Link
                          href="/signup"
                          className="font-medium text-brand-theme hover:text-brand-theme-600 transition-colors duration-300"
                        >
                          Sign up here
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
                Why Choose Our PageSpeed Tool?
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6"></div>
              <p className="text-lg text-brand-gray-600 max-w-3xl mx-auto">
                Join thousands of developers who trust our platform to optimize
                their website performance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group bg-white rounded-2xl p-8 shadow-lg border border-brand-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaTachometerAlt className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-3">
                  PageSpeed API
                </h3>
                <p className="text-brand-gray-600">
                  Accurate, real-time performance analysis for comprehensive
                  website optimization
                </p>
              </div>

              <div className="text-center group bg-white rounded-2xl p-8 shadow-lg border border-brand-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaShieldAlt className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-3">
                  Enterprise Security
                </h3>
                <p className="text-brand-gray-600">
                  Your data is protected with enterprise-grade security and
                  privacy standards
                </p>
              </div>

              <div className="text-center group bg-white rounded-2xl p-8 shadow-lg border border-brand-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-theme-600 to-brand-theme-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaRocket className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-3">
                  Lightning Fast
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

export default SignIn;
