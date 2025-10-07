import React from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaGlobe,
  FaTrophy,
  FaStar,
  FaChartLine,
  FaCode,
  FaRocket,
} from "react-icons/fa";

const AboutStats = () => {
  const stats = [
    {
      icon: <FaTachometerAlt />,
      number: "1000+",
      label: "Websites Tested",
      description: "Performance analysis completed",
      color: "from-brand-blue-700 to-brand-blue-800",
    },
    {
      icon: <FaUsers />,
      number: "500+",
      label: "Happy Developers",
      description: "Developers who optimized their sites",
      color: "from-brand-theme to-brand-theme-600",
    },
    {
      icon: <FaGlobe />,
      number: "Global",
      label: "Reach",
      description: "Serving developers worldwide",
      color: "from-brand-theme-600 to-brand-theme-800",
    },
    {
      icon: <FaTrophy />,
      number: "2+",
      label: "Years Experience",
      description: "Trusted performance expertise",
      color: "from-brand-blue-800 to-brand-theme",
    },
    {
      icon: <FaStar />,
      number: "4.9/5",
      label: "Developer Rating",
      description: "Based on verified reviews",
      color: "from-brand-theme-800 to-brand-blue-700",
    },
    {
      icon: <FaChartLine />,
      number: "95%",
      label: "Performance Boost",
      description: "Average improvement achieved",
      color: "from-brand-blue-700 to-brand-theme-600",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container--boxed--lg px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-4 sm:mb-6"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6">
            Our Impact in Numbers
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-500 max-w-3xl mx-auto leading-relaxed">
            These numbers represent more than just statistics - they represent
            hundreds of optimized websites and successful performance
            improvements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-brand-gray-300/50 text-center"
            >
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${stat.color} rounded-2xl sm:rounded-3xl flex items-center justify-center text-white text-2xl sm:text-3xl mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-2 sm:mb-3 group-hover:text-brand-theme transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-lg sm:text-xl font-semibold text-brand-blue-800 mb-2 sm:mb-3">
                {stat.label}
              </div>
              <div className="text-sm sm:text-base text-brand-gray-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
