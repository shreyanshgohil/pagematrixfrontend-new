import React from "react";
import { FaBullseye, FaEye, FaHeart } from "react-icons/fa";

const AboutMission = () => {
  const missionData = [
    {
      icon: <FaBullseye />,
      title: "Our Mission",
      description:
        "To democratize website performance optimization by making PageSpeed analysis accessible, accurate and actionable for every developer and website owner.",
      color: "from-brand-blue-700 to-brand-blue-800",
    },
    {
      icon: <FaEye />,
      title: "Our Vision",
      description:
        "To become the world's most trusted PageSpeed analysis platform, transforming how developers optimize website performance and boost SEO rankings.",
      color: "from-brand-theme to-brand-theme-600",
    },
    {
      icon: <FaHeart />,
      title: "Our Values",
      description:
        "Innovation, accuracy and developer-first approach guide every decision we make in serving the web development community.",
      color: "from-brand-theme-600 to-brand-theme-800",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container--boxed--lg px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-4 sm:mb-6"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6">
            Our Mission, Vision & Values
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-500 max-w-3xl mx-auto leading-relaxed">
            We believe that optimizing website performance should be simple,
            accurate and developer-friendly. Our commitment to excellence drives
            everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {missionData.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-brand-gray-300/50 text-center"
            >
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${item.color} rounded-2xl sm:rounded-3xl flex items-center justify-center text-white text-2xl sm:text-3xl mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-4 sm:mb-6 group-hover:text-brand-theme transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
