import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  FaBolt,
  FaBriefcase,
  FaStar,
  FaCrown,
  FaGem,
  FaBuilding,
  FaCheck,
  FaHistory,
  FaFileAlt,
  FaCog,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

const PlansBilling = () => {
  const [selectedPlan, setSelectedPlan] = useState("free");

  const subscriptionDetails = {
    currentPlan: "Free",
    billingPeriod: "9/15/2025 to 10/15/2025",
    monthlyCost: "$0.00/month",
  };

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0.00",
      credits: "10",
      icon: FaBolt,
      isCurrent: true,
      isAvailable: true,
      features: [
        "10 Credits per month",
        "PageSpeed analysis for your URLs",
        "No payment required",
      ],
      buttonText: "Current Plan",
      buttonStyle: "bg-gray-100 text-gray-600 cursor-not-allowed",
    },
    {
      id: "admin",
      name: "Admin Plan",
      price: "$0.00",
      credits: "50,000",
      icon: FaBolt,
      isCurrent: false,
      isAvailable: false,
      features: [
        "50,000 Credits per month",
        "PageSpeed analysis for your URLs",
        "VIP queue access",
        "Admin-only features",
        "Custom expiration dates",
      ],
      buttonText: "Unavailable",
      buttonStyle: "bg-gray-100 text-gray-600 cursor-not-allowed",
    },
    {
      id: "starter",
      name: "Starter",
      price: "$45.00",
      credits: "800",
      icon: FaBolt,
      isCurrent: false,
      isAvailable: true,
      features: [
        "800 Credits per month",
        "PageSpeed analysis for your URLs",
        "VIP queue access",
        "Monthly recurring payment",
      ],
      buttonText: "↑ Upgrade",
      buttonStyle: "bg-brand-theme text-white hover:bg-brand-theme-600",
    },
    {
      id: "professional",
      name: "Professional",
      price: "$99.00",
      credits: "2,000",
      icon: FaBriefcase,
      isCurrent: false,
      isAvailable: true,
      features: [
        "2,000 Credits per month",
        "PageSpeed analysis for your URLs",
        "VIP queue access",
        "Monthly recurring payment",
      ],
      buttonText: "↑ Upgrade",
      buttonStyle: "bg-brand-theme text-white hover:bg-brand-theme-600",
    },
    {
      id: "premium",
      name: "Premium",
      price: "$219.00",
      credits: "4,800",
      icon: FaStar,
      isCurrent: false,
      isAvailable: true,
      features: [
        "4,800 Credits per month",
        "PageSpeed analysis for your URLs",
        "VIP queue access",
        "Monthly recurring payment",
      ],
      buttonText: "↑ Upgrade",
      buttonStyle: "bg-brand-theme text-white hover:bg-brand-theme-600",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$449.00",
      credits: "12,000",
      icon: FaCrown,
      isCurrent: false,
      isAvailable: true,
      features: [
        "12,000 Credits per month",
        "PageSpeed analysis for your URLs",
        "VIP queue access",
        "Monthly recurring payment",
      ],
      buttonText: "↑ Upgrade",
      buttonStyle: "bg-brand-theme text-white hover:bg-brand-theme-600",
    },
    {
      id: "ultimate",
      name: "Ultimate",
      price: "$749.00",
      credits: "20,000",
      icon: FaGem,
      isCurrent: false,
      isAvailable: true,
      features: [
        "20,000 Credits per month",
        "PageSpeed analysis for your URLs",
        "VIP queue access",
        "Monthly recurring payment",
      ],
      buttonText: "↑ Upgrade",
      buttonStyle: "bg-brand-theme text-white hover:bg-brand-theme-600",
    },
    {
      id: "corporate",
      name: "Corporate",
      price: "$1,499.00",
      credits: "40,000",
      icon: FaBuilding,
      isCurrent: false,
      isAvailable: true,
      features: [
        "40,000 Credits per month",
        "PageSpeed analysis for your URLs",
        "VIP queue access",
        "Monthly recurring payment",
      ],
      buttonText: "↑ Upgrade",
      buttonStyle: "bg-brand-theme text-white hover:bg-brand-theme-600",
    },
  ];

  const benefits = [
    {
      icon: FaBolt,
      title: "Unified Credits",
      description:
        "Use credits for PageSpeed analysis of your URLs. Each URL analyzed uses one credit.",
      color: "text-brand-theme",
      bgColor: "bg-brand-theme/10",
    },
    {
      icon: FaFileAlt,
      title: "VIP Queue Access",
      description:
        "Priority processing with 5-minute crawler visits for all plans.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: FaStar,
      title: "Monthly Renewal",
      description:
        "Credits refresh every month, cancel anytime through customer portal.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: FaCog,
      title: "Easy Management",
      description:
        "Update payment methods, change plans, or cancel through Stripe portal.",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const footerLinks = {
    product: ["Features", "Pricing", "API Documentation", "Integrations"],
    company: ["About Us", "Contact", "Careers", "Blog"],
    support: [
      "Help Center",
      "Privacy Policy",
      "Terms of Service",
      "Status Page",
    ],
  };

  return (
    <>
      <Head>
        <title>Plans & Billing - PageSpeed Performance Tool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SEO
        title="Plans & Billing - PageSpeed Performance Tool | Subscription Management"
        description="Manage your subscription, view billing history, and choose the perfect plan for your needs. Upgrade or downgrade your plan anytime."
        keywords="plans, billing, subscription, pricing, upgrade, PageSpeed plans, credit management"
        url="/plans-billing"
      />

      <DashboardLayout>
        <div className="min-h-screen bg-gray-50">
          {/* Header Section */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Plans & Billing
                </h1>
                <p className="text-gray-600 text-lg">
                  Manage your subscription and choose the perfect plan for your
                  needs
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Subscription Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Subscription Details
              </h2>
              <p className="text-gray-600 mb-6">
                Information about your current subscription and billing
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                    <FaBolt className="h-5 w-5 text-brand-theme" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Plan</p>
                    <p className="font-semibold text-gray-900">
                      {subscriptionDetails.currentPlan}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Billing Period</p>
                  <p className="font-semibold text-gray-900">
                    {subscriptionDetails.billingPeriod}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Cost</p>
                  <p className="font-semibold text-gray-900">
                    {subscriptionDetails.monthlyCost}
                  </p>
                  <button className="text-brand-theme hover:text-brand-theme-600 text-sm font-medium mt-1">
                    View History
                  </button>
                </div>
              </div>
            </div>

            {/* Monthly Subscription Plans */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Monthly Subscription Plans
              </h2>
              <p className="text-gray-600 mb-6">
                Choose the perfect plan with unified credits for all your needs
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-xl shadow-sm border-2 p-6 relative hover:shadow-md transition-shadow duration-200 flex flex-col ${
                      plan.isCurrent
                        ? "border-brand-theme"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {plan.isCurrent && (
                      <div className="absolute -top-2 -right-2 bg-brand-theme text-white text-xs font-bold px-3 py-1 rounded-full">
                        Current Plan
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 bg-brand-theme/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <plan.icon className="h-6 w-6 text-brand-theme" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {plan.name}
                      </h3>
                      <p className="text-2xl font-bold text-gray-900 mb-1">
                        {plan.price}
                      </p>
                      <p className="text-sm text-gray-600">
                        {plan.credits} Credits/month
                      </p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <FaCheck className="h-4 w-4 text-brand-theme mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors mt-auto ${plan.buttonStyle}`}
                      disabled={!plan.isAvailable}
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Benefits */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Subscription Benefits
              </h2>
              <p className="text-gray-600 mb-6">
                What you get with your monthly subscription
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 ${benefit.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-brand-theme to-brand-theme-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Q</span>
                    </div>
                    <span className="text-xl font-bold text-brand-blue-800">
                      PageSpeed
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Advanced website performance analysis and optimization tools
                    for modern web development.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Product
                  </h3>
                  <ul className="space-y-2">
                    {footerLinks.product.map((link, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-brand-theme text-sm"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Company
                  </h3>
                  <ul className="space-y-2">
                    {footerLinks.company.map((link, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-brand-theme text-sm"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Support
                  </h3>
                  <ul className="space-y-2">
                    {footerLinks.support.map((link, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-brand-theme text-sm"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-600 text-sm">
                    © 2025 PageSpeed. All rights reserved.
                  </p>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-brand-theme"
                    >
                      <FaLinkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-brand-theme"
                    >
                      <FaTwitter className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-brand-theme"
                    >
                      <FaFacebook className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-brand-theme"
                    >
                      <FaInstagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </DashboardLayout>
    </>
  );
};

export default PlansBilling;
