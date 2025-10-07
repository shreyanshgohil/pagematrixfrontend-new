import React from "react";
import {
  FaCheck,
  FaTimes,
  FaRocket,
  FaTachometerAlt,
  FaCode,
  FaShieldAlt,
} from "react-icons/fa";

const FeaturesComparison = () => {
  const features = [
    {
      name: "Google PageSpeed API",
      ourTool: true,
      competitors: false,
      description: "Official Google PageSpeed Insights API integration",
    },
    {
      name: "Real-time Analysis",
      ourTool: true,
      competitors: true,
      description: "Instant performance testing and results",
    },
    {
      name: "Core Web Vitals",
      ourTool: true,
      competitors: true,
      description: "Comprehensive Core Web Vitals analysis",
    },
    {
      name: "Mobile & Desktop Testing",
      ourTool: true,
      competitors: true,
      description: "Test across multiple devices and platforms",
    },
    {
      name: "Developer API Access",
      ourTool: true,
      competitors: false,
      description: "RESTful API for programmatic access",
    },
    {
      name: "Automated Monitoring",
      ourTool: true,
      competitors: false,
      description: "Schedule automated performance tests",
    },
    {
      name: "Team Collaboration",
      ourTool: true,
      competitors: false,
      description: "Share reports and collaborate with team",
    },
    {
      name: "Historical Data",
      ourTool: true,
      competitors: true,
      description: "Track performance trends over time",
    },
    {
      name: "Custom Alerts",
      ourTool: true,
      competitors: false,
      description: "Set up custom performance alerts",
    },
    {
      name: "Enterprise Security",
      ourTool: true,
      competitors: true,
      description: "Bank-level security and compliance",
    },
  ];

  const plans = [
    {
      name: "Our PageSpeed Tool",
      icon: <FaRocket className="text-2xl" />,
      color: "from-brand-theme to-brand-theme-600",
      features: features.map((f) => f.ourTool),
      highlight: true,
    },
    {
      name: "Competitor A",
      icon: <FaTachometerAlt className="text-2xl" />,
      color: "from-brand-gray-400 to-brand-gray-500",
      features: features.map((f) => f.competitors),
      highlight: false,
    },
    {
      name: "Competitor B",
      icon: <FaCode className="text-2xl" />,
      color: "from-brand-gray-400 to-brand-gray-500",
      features: features.map((f) => f.competitors),
      highlight: false,
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-brand-gray-300 to-white"
      aria-labelledby="comparison-heading"
    >
      <div className="container--boxed--lg px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-4 sm:mb-6"></div>
          <h2
            id="comparison-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6"
          >
            Why Choose Our PageSpeed Tool?
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-500 max-w-3xl mx-auto leading-relaxed">
            See how our comprehensive PageSpeed tool compares to other solutions
            in the market. We offer unique features that set us apart.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full bg-white rounded-2xl shadow-xl border border-brand-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-blue-800 to-brand-theme-600 text-white p-4 sm:p-6">
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="text-sm sm:text-base font-semibold">
                  Features
                </div>
                {plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`text-center ${
                      plan.highlight ? "bg-white/20 rounded-lg p-2" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2 mb-1">
                      <div
                        className={`text-${
                          plan.highlight ? "white" : "brand-gray-300"
                        }`}
                      >
                        {plan.icon}
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm font-bold">
                      {plan.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Rows */}
            <div className="divide-y divide-brand-gray-200">
              {features.map((feature, featureIndex) => (
                <div
                  key={featureIndex}
                  className="grid grid-cols-4 gap-4 p-4 sm:p-6 hover:bg-brand-gray-50 transition-colors duration-200"
                >
                  <div className="space-y-1">
                    <div className="text-sm sm:text-base font-semibold text-brand-blue-800">
                      {feature.name}
                    </div>
                    <div className="text-xs sm:text-sm text-brand-gray-500">
                      {feature.description}
                    </div>
                  </div>
                  {plans.map((plan, planIndex) => (
                    <div
                      key={planIndex}
                      className="flex items-center justify-center"
                    >
                      {plan.features[featureIndex] ? (
                        <div className="flex items-center space-x-2">
                          <FaCheck className="text-green-500 text-lg" />
                          {plan.highlight && (
                            <span className="text-xs text-green-600 font-semibold">
                              ✓
                            </span>
                          )}
                        </div>
                      ) : (
                        <FaTimes className="text-brand-gray-300 text-lg" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg border border-brand-gray-200">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-blue-800 mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-base sm:text-lg text-brand-gray-500 mb-6 max-w-2xl mx-auto">
              Join hundreds of developers who have already switched to our
              comprehensive PageSpeed tool for better performance analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/pagespeed-test"
                className="group bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-brand-theme/25 flex items-center justify-center gap-2 sm:gap-3"
              >
                <FaRocket className="text-sm sm:text-base" />
                <span>Start Free Trial</span>
              </a>
              <a
                href="/contact"
                className="group border-2 border-brand-theme text-brand-theme font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl hover:bg-brand-theme hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3"
              >
                <FaShieldAlt className="text-sm sm:text-base" />
                <span>Contact Sales</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesComparison;
