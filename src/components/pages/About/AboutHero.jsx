import React from "react";
import {
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaAward,
  FaTachometerAlt,
  FaCode,
  FaGlobe,
} from "react-icons/fa";

const AboutHero = () => {
  const achievements = [
    { icon: <FaTachometerAlt />, number: "1000+", label: "Websites Tested" },
    { icon: <FaUsers />, number: "500+", label: "Happy Developers" },
    { icon: <FaShieldAlt />, number: "99.9%", label: "Uptime Guarantee" },
    { icon: <FaGlobe />, number: "Global", label: "Reach" },
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
              <div className="w-2 h-2 bg-brand-theme rounded-full"></div>
              <p className="uppercase font-bold text-xs sm:text-sm text-brand-theme tracking-wider">
                ABOUT PAGESPEED TOOL
              </p>
              <div className="w-2 h-2 bg-brand-theme rounded-full"></div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-white">Optimizing Performance,</span>
                <br />
                <span className="bg-gradient-to-r from-brand-theme to-yellow-400 bg-clip-text text-transparent">
                  One Website at a Time
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                We're more than just a PageSpeed tool. We're your trusted
                partner in optimizing website performance, backed by Google's
                PageSpeed API and years of development experience.
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {achievement.number}
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="relative">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/30">
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-2xl flex items-center justify-center text-white text-3xl sm:text-4xl mx-auto mb-6">
                  <FaTachometerAlt />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-brand-blue-800 mb-4">
                  Our Journey
                </h3>
                <p className="text-brand-gray-500 text-base sm:text-lg leading-relaxed mb-6">
                  Since our founding in 2022, we've been committed to
                  revolutionizing website performance optimization through
                  Google's PageSpeed API, cutting-edge technology and
                  exceptional developer experience.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-brand-theme/10 rounded-xl p-4">
                    <div className="text-2xl font-bold text-brand-theme">
                      2022
                    </div>
                    <div className="text-sm text-brand-gray-500">Founded</div>
                  </div>
                  <div className="bg-brand-theme/10 rounded-xl p-4">
                    <div className="text-2xl font-bold text-brand-theme">
                      2024
                    </div>
                    <div className="text-sm text-brand-gray-500">Today</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            {/* <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-r from-brand-theme/20 to-brand-theme-600/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-r from-brand-blue-700/20 to-brand-theme/20 rounded-full blur-xl animate-pulse delay-1000"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
