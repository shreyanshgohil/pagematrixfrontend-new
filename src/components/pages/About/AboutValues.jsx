import React from "react";
import {
  FaShieldAlt,
  FaUsers,
  FaLightbulb,
  FaHandshake,
  FaRocket,
  FaAward,
} from "react-icons/fa";

const AboutValues = () => {
  const values = [
    {
      icon: <FaShieldAlt />,
      title: "Trust & Accuracy",
      description:
        "We believe in complete accuracy. Every PageSpeed analysis uses Google's official API and we provide honest, reliable data to help you make informed optimization decisions.",
      color: "from-brand-blue-700 to-brand-blue-800",
    },
    {
      icon: <FaUsers />,
      title: "Developer First",
      description:
        "Our developers are at the heart of everything we do. We listen, learn and continuously improve our API and tools to exceed your performance optimization needs.",
      color: "from-brand-theme to-brand-theme-600",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description:
        "We leverage cutting-edge technology and Google's PageSpeed API to simplify performance analysis and make website optimization more efficient and accessible.",
      color: "from-brand-theme-600 to-brand-theme-800",
    },
    {
      icon: <FaHandshake />,
      title: "Integrity",
      description:
        "We conduct business with the highest ethical standards, ensuring fair practices and honest communication in all our developer interactions and API usage.",
      color: "from-brand-blue-800 to-brand-theme",
    },
    {
      icon: <FaRocket />,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our service, from API performance to developer support and platform reliability.",
      color: "from-brand-theme-800 to-brand-blue-700",
    },
    {
      icon: <FaAward />,
      title: "Recognition",
      description:
        "We're proud to be recognized as a leading PageSpeed analysis platform but our greatest reward is the trust of our developer community.",
      color: "from-brand-blue-700 to-brand-theme-600",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-brand-gray-300 to-white">
      <div className="container--boxed--lg px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-4 sm:mb-6"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6">
            Our Core Values
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-500 max-w-3xl mx-auto leading-relaxed">
            These values guide our decisions, shape our culture and define how
            we serve our developer community every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-brand-gray-300/50"
            >
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${value.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {value.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-3 sm:mb-4 group-hover:text-brand-theme transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
