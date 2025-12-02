import React from "react";
import {
  FaCheck,
  FaRocket,
  FaCode,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

const FeaturesPricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started with PageSpeed analysis",
      icon: <FaRocket className="text-2xl" />,
      color: "from-brand-gray-400 to-brand-gray-500",
      features: [
        "5 PageSpeed tests per month",
        "Basic performance metrics",
        "Mobile & desktop testing",
        "Core Web Vitals analysis",
        "Basic optimization tips",
        "Email support",
      ],
      limitations: [
        "Limited to 5 tests per month",
        "No API access",
        "No historical data",
        "No team collaboration",
      ],
      cta: "Get Started Free",
      ctaLink: "/pagespeed-test",
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Ideal for developers and small teams",
      icon: <FaCode className="text-2xl" />,
      color: "from-brand-theme to-brand-theme-600",
      features: [
        "Unlimited PageSpeed tests",
        "Advanced performance metrics",
        "PageSpeed API access",
        "Historical data tracking",
        "Automated monitoring",
        "Custom alerts",
        "API access",
        "Priority support",
        "Team collaboration (up to 5 users)",
      ],
      limitations: [],
      cta: "Start Pro Trial",
      ctaLink: "/contact",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large teams and organizations",
      icon: <FaShieldAlt className="text-2xl" />,
      color: "from-brand-blue-700 to-brand-blue-800",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "Advanced analytics",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "Custom API limits",
        "White-label options",
        "On-premise deployment",
      ],
      limitations: [],
      cta: "Contact Sales",
      ctaLink: "/contact",
      popular: false,
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 md:py-24 bg-white"
      aria-labelledby="pricing-heading"
    >
      <div className="container--boxed--lg px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-4 sm:mb-6"></div>
          <h2
            id="pricing-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6"
          >
            Choose Your Plan
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-500 max-w-3xl mx-auto leading-relaxed">
            Select the perfect plan for your PageSpeed analysis needs. All plans
            include access to our PageSpeed API integration and core
            features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                plan.popular
                  ? "border-brand-theme ring-4 ring-brand-theme/10"
                  : "border-brand-gray-200"
              } overflow-hidden`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="p-6 sm:p-8 text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}
                >
                  {plan.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm sm:text-base text-brand-gray-500 mb-4">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-blue-800">
                    {plan.price}
                  </span>
                  <span className="text-base sm:text-lg text-brand-gray-500">
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <FaCheck className="text-green-500 text-sm flex-shrink-0" />
                      <span className="text-sm sm:text-base text-brand-gray-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-brand-gray-500 mb-2">
                      Limitations:
                    </h4>
                    <div className="space-y-2">
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <div
                          key={limitationIndex}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-1 h-1 bg-brand-gray-400 rounded-full flex-shrink-0"></div>
                          <span className="text-xs sm:text-sm text-brand-gray-500">
                            {limitation}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <a
                  href={plan.ctaLink}
                  className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-center transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? "bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white shadow-lg hover:shadow-xl hover:shadow-brand-theme/25"
                      : "border-2 border-brand-theme text-brand-theme hover:bg-brand-theme hover:text-white"
                  }`}
                >
                  <span className="text-sm sm:text-base">{plan.cta}</span>
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-brand-gray-50 rounded-xl p-4 sm:p-6 max-w-4xl mx-auto">
            <h4 className="text-lg sm:text-xl font-semibold text-brand-blue-800 mb-2">
              All Plans Include
            </h4>
            <p className="text-sm sm:text-base text-brand-gray-500 mb-4">
              PageSpeed API integration, Core Web Vitals analysis, mobile
              & desktop testing, and real-time performance metrics.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center text-xs sm:text-sm text-brand-gray-500">
              <span>✓ No setup fees</span>
              <span>✓ Cancel anytime</span>
              <span>✓ 30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPricing;
