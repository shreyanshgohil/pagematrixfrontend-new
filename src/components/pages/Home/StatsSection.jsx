import React from "react";
import {
  FaGlobe,
  FaTachometerAlt,
  FaUsers,
  FaClock,
  FaChartLine,
  FaRocket,
} from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      number: "1000+",
      label: "Websites Tested",
      icon: <FaGlobe className="text-3xl" />,
      description: "Performance analysis completed",
    },
    {
      number: "95%",
      label: "Performance Boost",
      icon: <FaTachometerAlt className="text-3xl" />,
      description: "Average improvement achieved",
    },
    {
      number: "500+",
      label: "Happy Developers",
      icon: <FaUsers className="text-3xl" />,
      description: "Trusted by web developers",
    },
    {
      number: "&lt; 2s",
      label: "Test Response Time",
      icon: <FaClock className="text-3xl" />,
      description: "Lightning fast analysis",
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 md:py-24 bg-white"
      aria-labelledby="stats-heading"
    >
      <div className="container--boxed--lg px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-brand-theme/10 rounded-full mb-4 sm:mb-6">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-brand-theme rounded-full"></div>
            <p className="uppercase font-bold text-xs sm:text-sm text-brand-theme tracking-wider">
              TRUSTED BY WEB DEVELOPERS
            </p>
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-brand-theme rounded-full"></div>
          </div>
          <h2
            id="stats-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6"
          >
            Trusted by Web Developers
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-brand-gray-500 max-w-2xl mx-auto leading-relaxed">
            Our PageSpeed analysis platform delivers exceptional results that
            speak for themselves. Join hundreds of satisfied developers who
            optimized their website performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-brand-gray-300/50 text-center"
            >
              <div className="text-brand-theme mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                <div className="text-2xl sm:text-3xl">{stat.icon}</div>
              </div>
              <div
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-blue-800 mb-2 group-hover:text-brand-theme transition-colors duration-300"
                dangerouslySetInnerHTML={{ __html: stat.number }}
              />
              <div className="text-base sm:text-lg font-semibold text-brand-blue-800 mb-2">
                {stat.label}
              </div>
              <div className="text-xs sm:text-sm text-brand-gray-500 leading-relaxed">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
