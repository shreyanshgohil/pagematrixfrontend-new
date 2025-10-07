import React from "react";
import {
  FaRocket,
  FaTachometerAlt,
  FaMobile,
  FaCode,
  FaChartLine,
  FaShieldAlt,
  FaGlobe,
  FaCogs,
  FaClock,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

const FeaturesDetailed = () => {
  const detailedFeatures = [
    {
      title: "Google PageSpeed API Integration",
      description:
        "Our tool is powered by Google's official PageSpeed Insights API, ensuring you get the same accurate performance data that Google uses for search rankings.",
      features: [
        "Official Google PageSpeed Insights API",
        "Same data Google uses for rankings",
        "Real-time performance scoring",
        "Comprehensive audit results",
        "Mobile and desktop analysis",
      ],
      icon: <FaRocket className="text-4xl" />,
      color: "from-brand-blue-700 to-brand-blue-800",
      image: "/images/features/google-api.svg",
    },
    {
      title: "Core Web Vitals Analysis",
      description:
        "Get detailed insights into the most important performance metrics that directly impact your SEO rankings and user experience.",
      features: [
        "Largest Contentful Paint (LCP)",
        "First Input Delay (FID)",
        "Cumulative Layout Shift (CLS)",
        "First Contentful Paint (FCP)",
        "Time to Interactive (TTI)",
      ],
      icon: <FaChartLine className="text-4xl" />,
      color: "from-brand-theme to-brand-theme-600",
      image: "/images/features/core-web-vitals.svg",
    },
    {
      title: "Mobile & Desktop Testing",
      description:
        "Test your website performance across different devices and screen sizes to ensure optimal user experience everywhere.",
      features: [
        "Mobile-first performance testing",
        "Desktop optimization analysis",
        "Device-specific recommendations",
        "Responsive design validation",
        "Cross-platform compatibility",
      ],
      icon: <FaMobile className="text-4xl" />,
      color: "from-brand-theme-600 to-brand-theme-800",
      image: "/images/features/mobile-desktop.svg",
    },
    {
      title: "Developer API Access",
      description:
        "Integrate our powerful PageSpeed analysis into your applications with our comprehensive RESTful API and detailed documentation.",
      features: [
        "RESTful API endpoints",
        "Comprehensive documentation",
        "SDK for popular languages",
        "Webhook notifications",
        "Rate limiting and quotas",
      ],
      icon: <FaCode className="text-4xl" />,
      color: "from-brand-blue-800 to-brand-theme",
      image: "/images/features/developer-api.svg",
    },
    {
      title: "Real-time Performance Monitoring",
      description:
        "Monitor your website performance continuously with real-time alerts and automated testing schedules.",
      features: [
        "Continuous monitoring",
        "Real-time alerts",
        "Automated testing schedules",
        "Performance trend analysis",
        "Historical data tracking",
      ],
      icon: <FaTachometerAlt className="text-4xl" />,
      color: "from-brand-blue-700 to-brand-theme-600",
      image: "/images/features/real-time-monitoring.svg",
    },
    {
      title: "Security & Reliability",
      description:
        "Enterprise-grade security and reliability with 99.9% uptime guarantee and bank-level encryption.",
      features: [
        "99.9% uptime guarantee",
        "Bank-level encryption",
        "SOC 2 compliance",
        "Regular security audits",
        "Data privacy protection",
      ],
      icon: <FaShieldAlt className="text-4xl" />,
      color: "from-brand-theme-600 to-brand-blue-700",
      image: "/images/features/security.svg",
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 md:py-24 bg-white"
      aria-labelledby="detailed-features-heading"
    >
      <div className="container--boxed--lg px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-4 sm:mb-6"></div>
          <h2
            id="detailed-features-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6"
          >
            Detailed Feature Breakdown
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-500 max-w-3xl mx-auto leading-relaxed">
            Dive deep into each feature and understand how our PageSpeed tool
            can help you optimize your website performance and boost your SEO
            rankings.
          </p>
        </div>

        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          {detailedFeatures.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 sm:gap-12 lg:gap-16 items-center`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="space-y-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-blue-800">
                    {feature.title}
                  </h3>
                  <p className="text-base sm:text-lg text-brand-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Feature List */}
                <div className="space-y-3">
                  {feature.features.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-brand-theme rounded-full flex-shrink-0"></div>
                      <span className="text-sm sm:text-base text-brand-gray-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <a
                    href="/pagespeed-test"
                    className="group inline-flex items-center space-x-2 text-brand-theme hover:text-brand-theme-600 font-semibold transition-colors duration-300"
                  >
                    <span>Try this feature</span>
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>

              {/* Image/Visual */}
              <div className="flex-1">
                <div className="relative">
                  {/* Placeholder for feature image */}
                  <div className="bg-gradient-to-br from-brand-gray-100 to-brand-gray-200 rounded-2xl p-8 sm:p-12 lg:p-16 text-center">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}
                    >
                      {feature.icon}
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-brand-blue-800 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm sm:text-base text-brand-gray-500">
                      Feature visualization coming soon
                    </p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-theme/20 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-brand-blue-700/20 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesDetailed;
