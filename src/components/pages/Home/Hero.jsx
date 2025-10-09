import React from "react";
import Link from "next/link";
import {
  IoArrowForward,
  IoStar,
  IoCheckmarkCircle,
  IoShieldCheckmark,
  IoSpeedometerOutline,
  IoAnalyticsOutline,
  IoGlobeOutline,
} from "react-icons/io5";
import { FaTachometerAlt, FaRocket, FaChartLine } from "react-icons/fa";

const HeroSection = ({ cities = [] }) => {
  const features = [
    { icon: <IoShieldCheckmark />, text: "Google PageSpeed API" },
    { icon: <IoCheckmarkCircle />, text: "Real-time Analysis" },
    { icon: <IoStar />, text: "Performance Insights" },
  ];

  const capabilities = [
    {
      icon: <IoSpeedometerOutline />,
      title: "Mobile Performance",
      description: "Comprehensive mobile PageSpeed analysis",
    },
    {
      icon: <IoAnalyticsOutline />,
      title: "Desktop Performance",
      description: "Detailed desktop performance insights",
    },
    {
      icon: <IoGlobeOutline />,
      title: "Complete Analysis",
      description: "Both mobile and desktop testing",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-blue-700 via-brand-blue-800 to-brand-theme-600 pt-20 sm:pt-24 lg:pt-32">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700/90 via-brand-blue-800/80 to-brand-theme-600/70"></div>

        {/* Animated Background Shapes */}
        {/* <div className="absolute top-20 left-4 sm:left-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-brand-theme/30 to-brand-theme-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-l from-brand-blue-700/30 to-brand-theme/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-brand-theme/20 to-brand-blue-700/20 rounded-full blur-2xl animate-pulse delay-500"></div> */}

        {/* Additional Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-r from-brand-theme/15 to-brand-blue-700/15 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 sm:w-56 h-40 sm:h-56 bg-gradient-to-r from-brand-blue-700/15 to-brand-theme/15 rounded-full blur-2xl animate-pulse delay-300"></div>

        {/* Enhanced Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Subtle Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-white/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:pt-8 lg:py-16">
        {/* Main Hero Content */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 w-full">
            {/* Features Badge */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 shadow-xl border border-white/20"
                >
                  <span className="text-brand-theme text-base sm:text-lg">
                    {feature.icon}
                  </span>
                  <span className="text-brand-blue-800 text-xs sm:text-sm font-semibold">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">Analyze Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-brand-theme to-yellow-400 bg-clip-text text-transparent">
                    Website Performance
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-white/90 lg:max-w-lg leading-relaxed">
                  Get comprehensive PageSpeed insights using Google's PageSpeed
                  API. Optimize your website performance with real-time analysis
                  and actionable recommendations.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    1000+
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">
                    Websites Tested
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    95%
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">
                    Performance Boost
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl sm:text-3xl font-bold text-white"
                    dangerouslySetInnerHTML={{ __html: "&lt; 2s" }}
                  />
                  <div className="text-xs sm:text-sm text-white/80">
                    Avg Test Time
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/signup"
                className="group bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white font-semibold py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-brand-theme/30 flex items-center justify-center space-x-2 sm:space-x-3 flex-1"
              >
                <FaRocket className="text-base sm:text-lg group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm sm:text-base">Get Started Free</span>
                <IoArrowForward className="text-base sm:text-lg group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href="/pricing"
                className="group bg-white/90 flex-1 backdrop-blur-sm border-2 border-white/30 text-brand-theme hover:bg-white hover:text-brand-theme-600 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2 sm:space-x-3"
              >
                <span className="text-sm sm:text-base">View Pricing</span>
                <IoArrowForward className="text-base  sm:text-lg group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Right Content - Features Showcase */}
          <div className="relative w-full">
            {/* Main Features Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/30">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-brand-blue-800 mb-2">
                  Powerful Performance Tools
                </h3>
                <p className="text-brand-gray-500 text-base sm:text-lg">
                  Everything you need to optimize your website
                </p>
              </div>

              {/* Features Grid */}
              <div className="space-y-4 sm:space-y-6">
                {capabilities.map((capability, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-brand-theme/5 to-brand-theme-600/5 rounded-xl border border-brand-theme/10 hover:border-brand-theme/20 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-brand-theme to-brand-theme-600 rounded-xl flex items-center justify-center text-white text-xl">
                      {capability.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-brand-blue-800 text-base sm:text-lg mb-1">
                        {capability.title}
                      </h4>
                      <p className="text-brand-gray-600 text-sm sm:text-base">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="mt-6 sm:mt-8 pt-4 border-t border-brand-gray-200">
                <div className="text-center">
                  <p className="text-brand-gray-600 text-sm sm:text-base mb-4">
                    Ready to get started? Sign up now and test your first
                    website!
                  </p>
                  <Link
                    href="/signup"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-brand-theme/25"
                  >
                    <FaRocket className="text-lg" />
                    <span>Start Testing Now</span>
                    <IoArrowForward className="text-lg" />
                  </Link>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-4 border-t border-brand-gray-200">
                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-brand-theme">
                      1000+
                    </div>
                    <div className="text-xs sm:text-sm text-brand-gray-500">
                      Tests Run
                    </div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-brand-theme">
                      95%
                    </div>
                    <div className="text-xs sm:text-sm text-brand-gray-500">
                      Success Rate
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-lg sm:text-xl font-bold text-brand-theme"
                      dangerouslySetInnerHTML={{ __html: "&lt; 2s" }}
                    />
                    <div className="text-xs sm:text-sm text-brand-gray-500">
                      Avg Time
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
