import React from "react";
import {
  FaRocket,
  FaTrophy,
  FaUsers,
  FaChartLine,
  FaGlobe,
  FaAward,
} from "react-icons/fa";

const AboutTimeline = () => {
  const timeline = [
    {
      year: "2022",
      title: "The Beginning",
      description:
        "Founded with a vision to revolutionize website performance optimization through cutting-edge technology.",
      icon: <FaRocket />,
      color: "from-brand-blue-700 to-brand-blue-800",
    },
    {
      year: "2022",
      title: "Platform Launch",
      description:
        "Launched our innovative PageSpeed analysis platform with comprehensive performance testing capabilities.",
      icon: <FaTrophy />,
      color: "from-brand-theme to-brand-theme-600",
    },
    {
      year: "2023",
      title: "Early Growth",
      description:
        "Achieved our first 100+ website performance tests and began serving developers across the globe with accurate PageSpeed insights.",
      icon: <FaUsers />,
      color: "from-brand-theme-600 to-brand-theme-800",
    },
    {
      year: "2023",
      title: "API Innovation",
      description:
        "Introduced developer-friendly RESTful API and advanced Core Web Vitals analysis for better performance optimization recommendations.",
      icon: <FaChartLine />,
      color: "from-brand-blue-800 to-brand-theme",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description:
        "Expanded our services globally, establishing ourselves as a reliable PageSpeed analysis platform serving developers worldwide.",
      icon: <FaGlobe />,
      color: "from-brand-theme-800 to-brand-blue-700",
    },
    {
      year: "2025",
      title: "Future Vision",
      description:
        "Continuing to grow and innovate, with plans to reach 10,000+ website tests and serve developers with advanced performance analytics.",
      icon: <FaAward />,
      color: "from-brand-blue-700 to-brand-theme-600",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container--boxed--lg px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-4 sm:mb-6"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6">
            Our Journey
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-500 max-w-3xl mx-auto leading-relaxed">
            From a small startup to a global PageSpeed analysis platform -
            here's our story of growth and innovation in web performance
            optimization.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-theme via-brand-theme-600 to-brand-theme transform lg:-translate-x-0.5"></div>

          <div className="space-y-8 sm:space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[17px] sm:left-[33px] lg:left-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-white border-4 border-brand-theme rounded-full transform -translate-x-1/2 z-10 top-1/2 -translate-y-1/2"></div>

                {/* Content Card */}
                <div
                  className={`ml-12 sm:ml-16 lg:ml-0 lg:w-1/2 ${
                    index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
                  }`}
                >
                  <div className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-brand-gray-300/50">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl sm:text-3xl font-bold text-brand-theme mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-3 sm:mb-4 group-hover:text-brand-theme transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
