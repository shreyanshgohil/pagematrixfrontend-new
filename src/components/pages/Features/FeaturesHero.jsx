import React from "react";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaRocket,
  FaCode,
  FaArrowRight,
} from "react-icons/fa";
import {
  IoAnalyticsOutline,
  IoSpeedometerOutline,
  IoGlobeOutline,
} from "react-icons/io5";

const FeaturesHero = () => {
  const quickFeatures = [
    { icon: <IoSpeedometerOutline />, text: "Google PageSpeed API" },
    { icon: <IoAnalyticsOutline />, text: "Real-time Analysis" },
    { icon: <IoGlobeOutline />, text: "Mobile & Desktop" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-blue-700 via-brand-blue-800 to-brand-theme-600 pt-20 sm:pt-24 lg:pt-32">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700/90 via-brand-blue-800/80 to-brand-theme-600/70"></div>

        {/* Animated Background Shapes */}
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
              {quickFeatures.map((feature, index) => (
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
                  <span className="text-white">Powerful</span>
                  <br />
                  <span className="bg-gradient-to-r from-brand-theme to-yellow-400 bg-clip-text text-transparent">
                    PageSpeed Features
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-white/90 lg:max-w-lg leading-relaxed">
                  Discover all the powerful features that make our PageSpeed
                  tool the ultimate choice for website performance optimization
                  and analysis.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    15+
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">
                    Core Features
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">
                    Google API
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    24/7
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">
                    Monitoring
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/pagespeed-test"
                className="group bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white font-semibold py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-brand-theme/30 flex items-center justify-center space-x-2 sm:space-x-3 flex-1"
              >
                <FaTachometerAlt className="text-base sm:text-lg group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm sm:text-base">Try Features Now</span>
                <FaArrowRight className="text-base sm:text-lg group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href="#features-overview"
                className="group bg-white/90 flex-1 backdrop-blur-sm border-2 border-white/30 text-brand-theme hover:bg-white hover:text-brand-theme-600 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2 sm:space-x-3"
              >
                <span className="text-sm sm:text-base">Explore Features</span>
                <FaArrowRight className="text-base sm:text-lg group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Right Content - Feature Preview */}
          <div className="relative w-full">
            {/* Main Feature Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/30">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-brand-blue-800 mb-2">
                  Feature Preview
                </h3>
                <p className="text-brand-gray-500 text-base sm:text-lg">
                  See what makes our tool special
                </p>
              </div>

              {/* Feature Icons Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center p-3 sm:p-4 bg-brand-theme/10 rounded-xl">
                  <FaRocket className="text-2xl sm:text-3xl text-brand-theme mx-auto mb-2" />
                  <div className="text-xs sm:text-sm font-semibold text-brand-blue-800">
                    Google API
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-brand-blue-700/10 rounded-xl">
                  <FaTachometerAlt className="text-2xl sm:text-3xl text-brand-blue-700 mx-auto mb-2" />
                  <div className="text-xs sm:text-sm font-semibold text-brand-blue-800">
                    Real-time
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-brand-theme-600/10 rounded-xl">
                  <IoGlobeOutline className="text-2xl sm:text-3xl text-brand-theme-600 mx-auto mb-2" />
                  <div className="text-xs sm:text-sm font-semibold text-brand-blue-800">
                    Multi-device
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-brand-blue-800/10 rounded-xl">
                  <FaCode className="text-2xl sm:text-3xl text-brand-blue-800 mx-auto mb-2" />
                  <div className="text-xs sm:text-sm font-semibold text-brand-blue-800">
                    Developer API
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-4 pt-3 border-t border-brand-gray-200">
                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-brand-theme">
                      15+
                    </div>
                    <div className="text-xs sm:text-sm text-brand-gray-500">
                      Features
                    </div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-brand-theme">
                      100%
                    </div>
                    <div className="text-xs sm:text-sm text-brand-gray-500">
                      Google API
                    </div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-brand-theme">
                      24/7
                    </div>
                    <div className="text-xs sm:text-sm text-brand-gray-500">
                      Available
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

export default FeaturesHero;
