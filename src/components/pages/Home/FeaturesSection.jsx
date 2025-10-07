import React from "react";
import {
  FaRocket,
  FaShieldAlt,
  FaChartLine,
  FaCogs,
  FaTachometerAlt,
  FaGlobe,
  FaCode,
  FaMobile,
} from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      title: "Google PageSpeed API",
      description:
        "Powered by Google's official PageSpeed Insights API for accurate and reliable performance metrics.",
      icon: <FaRocket className="text-3xl" />,
      color: "from-brand-blue-700 to-brand-blue-800",
    },
    {
      title: "Real-time Analysis",
      description:
        "Get instant performance insights with comprehensive Core Web Vitals and optimization recommendations.",
      icon: <FaTachometerAlt className="text-3xl" />,
      color: "from-brand-theme to-brand-theme-600",
    },
    {
      title: "Mobile & Desktop Testing",
      description:
        "Test your website performance across both mobile and desktop devices with detailed comparison reports.",
      icon: <FaMobile className="text-3xl" />,
      color: "from-brand-theme-600 to-brand-theme-800",
    },
    {
      title: "Developer-Friendly API",
      description:
        "Easy integration with RESTful API endpoints. Get performance data programmatically for your applications.",
      icon: <FaCode className="text-3xl" />,
      color: "from-brand-blue-800 to-brand-theme",
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-brand-gray-300 to-white"
      aria-labelledby="features-heading"
    >
      <div className="container--boxed--lg px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-4 sm:mb-6"></div>
          <h2
            id="features-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6"
          >
            Why Choose Our PageSpeed Tool?
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-500 max-w-3xl mx-auto leading-relaxed">
            We've built the most comprehensive PageSpeed analysis platform with
            features that actually matter for your website performance
            optimization and SEO success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg sm:hover:shadow-2xl transition-all duration-500 sm:transform sm:hover:-translate-y-2 border border-brand-gray-300/50 text-center"
            >
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white mx-auto mb-4 sm:mb-6 sm:group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-lg sm:text-2xl lg:text-3xl">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-3 sm:mb-4 sm:group-hover:text-brand-theme transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
