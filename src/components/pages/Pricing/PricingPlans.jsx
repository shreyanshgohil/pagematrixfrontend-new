import React from "react";
import { FaStar } from "react-icons/fa";
import TickBox from "../../common/TickBox";

const PricingPlans = () => {
  const plans = [
    {
      name: "Free",
      tagline: "Free tier for testing and small projects",
      price: "$0",
      period: "monthly",
      credits: "10 Credits",
      creditPrice: "$0.000/credit",
      features: [
        "10 Credits per month",
        "Use for indexing or checking",
        "No payment required",
      ],
      buttonText: "Start For Free",
      buttonStyle:
        "bg-white text-brand-gray-700 border border-brand-gray-300 hover:bg-brand-gray-50",
      popular: false,
    },
    {
      name: "Basic",
      tagline: "Ideal for steady indexing needs and growing projects.",
      price: "$19",
      period: "monthly",
      credits: "200 Credits",
      creditPrice: "$0.095/credit",
      features: [
        "200 Credits per month",
        "Use for indexing or checking",
        "VIP queue access",
        "Monthly recurring payment",
      ],
      buttonText: "Choose Basic",
      buttonStyle:
        "bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white",
      popular: false,
    },
    {
      name: "Starter",
      tagline: "Perfect for small projects and getting started with indexing",
      price: "$45",
      period: "monthly",
      credits: "800 Credits",
      creditPrice: "$0.056/credit",
      features: [
        "800 Credits per month",
        "Use for indexing or checking",
        "VIP queue access",
        "Monthly recurring payment",
      ],
      buttonText: "Choose Starter",
      buttonStyle:
        "bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white",
      popular: false,
    },
    {
      name: "Professional",
      tagline: "Great for growing businesses and professional users",
      price: "$99",
      period: "monthly",
      credits: "2,000 Credits",
      creditPrice: "$0.050/credit",
      features: [
        "2000 Credits per month",
        "Use for indexing or checking",
        "VIP queue access",
        "Monthly recurring payment",
      ],
      buttonText: "Choose Professional",
      buttonStyle:
        "bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white",
      popular: true,
    },
    {
      name: "Premium",
      tagline: "Best for established businesses with high indexing needs",
      price: "$219",
      period: "monthly",
      credits: "4,800 Credits",
      creditPrice: "$0.046/credit",
      features: [
        "4800 Credits per month",
        "Use for indexing or checking",
        "VIP queue access",
        "Monthly recurring payment",
      ],
      buttonText: "Choose Premium",
      buttonStyle:
        "bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white",
      popular: false,
    },
    {
      name: "Enterprise",
      tagline: "For large-scale operations and enterprise clients",
      price: "$449",
      period: "monthly",
      credits: "12,000 Credits",
      creditPrice: "$0.037/credit",
      features: [
        "12000 Credits per month",
        "Use for indexing or checking",
        "VIP queue access",
        "Monthly recurring payment",
      ],
      buttonText: "Choose Enterprise",
      buttonStyle:
        "bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white",
      popular: false,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container--boxed px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-800 mb-4">
            Simple, Transparent Pricing
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6"></div>
          <p className="text-lg text-brand-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your website performance testing needs.
            All plans include access to our Google PageSpeed API integration.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                plan.popular
                  ? "border-brand-theme shadow-xl ring-2 ring-brand-theme/20"
                  : "border-brand-gray-200 hover:border-brand-theme/50"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <FaStar className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-brand-blue-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-brand-gray-600 text-sm mb-4">
                  {plan.tagline}
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-brand-blue-800">
                    {plan.price}
                  </span>
                  <span className="text-brand-gray-500 ml-2">
                    /{plan.period}
                  </span>
                </div>
                <div className="text-sm text-brand-gray-500">
                  {plan.credits} • {plan.creditPrice}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <TickBox
                        checked={true}
                        size="default"
                        className="mt-0.5"
                      />
                      <span className="text-brand-gray-700 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-brand-gray-600 mb-4">
            All plans include 24/7 support and 99.9% uptime guarantee
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-brand-gray-500">
            <div className="flex items-center gap-2">
              <TickBox checked={true} size="small" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <TickBox checked={true} size="small" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <TickBox checked={true} size="small" />
              <span>API access included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
