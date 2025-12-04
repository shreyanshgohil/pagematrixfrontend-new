import Head from "next/head";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SEO from "../components/common/SEO";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaHeadset,
  FaBuilding,
  FaUser,
  FaMessage,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { useState } from "react";
import { sendContactMessage } from "../utils/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await sendContactMessage(formData);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      icon: <FaPhone />,
      title: "Phone",
      details: "+91 72019 28142",
      description: "Call us for immediate performance support",
      color: "from-brand-theme to-brand-theme-600",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      details: "support@pagespeed-tool.com",
      description: "Send us an email anytime",
      color: "from-brand-blue-700 to-brand-blue-800",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Office",
      details: "Gandhinagar, Gujarat, India",
      description: "Visit our main office",
      color: "from-brand-theme-600 to-brand-theme-800",
    },
    {
      icon: <FaClock />,
      title: "Hours",
      details: "Mon - Fri: 9AM - 6PM",
      description: "We're here to help",
      color: "from-brand-blue-800 to-brand-theme",
    },
  ];

  const features = [
    "24/7 Developer Support",
    "Expert Performance Guidance",
    "Quick Response Time",
    "Multiple Contact Methods",
  ];

  return (
    <>
      <SEO
        title="Contact Us - PageSpeed Performance Tool | Get Expert Performance Help & Support"
        description="Contact our PageSpeed performance tool team for expert website optimization guidance, API support and developer assistance. Multiple contact methods available including phone, email and live chat. Get help with PageSpeed analysis, Core Web Vitals and performance optimization."
        keywords="contact PageSpeed tool, performance support, website optimization help, PageSpeed consultation, performance guidance, developer support, PageSpeed expert help, performance contact, API support, Core Web Vitals help"
        url="/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact PageSpeed Performance Tool",
          description:
            "Contact our PageSpeed performance tool team for expert website optimization guidance, API support and developer assistance.",
          url: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com"
          }/contact`,
          mainEntity: {
            "@type": "Organization",
            name: "PageSpeed Performance Tool",
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer service",
                telephone: "+91 72019 28142",
                email: "support@pagespeed-tool.com",
                areaServed: "Global",
                availableLanguage: ["English"],
                hoursAvailable: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "18:00",
                },
              },
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Gandhinagar",
              addressCountry: "India",
            },
          },
        }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-brand-blue-700 via-brand-blue-800 to-brand-theme-600 py-20 sm:py-24 lg:py-32 overflow-hidden">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Main Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700/90 via-brand-blue-800/80 to-brand-theme-600/70"></div>

              {/* Animated Background Shapes */}
              {/* <div className="absolute top-20 left-4 sm:left-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-brand-theme/30 to-brand-theme-600/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-4 sm:right-10 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-l from-brand-blue-700/30 to-brand-theme/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-brand-theme/20 to-brand-blue-700/20 rounded-full blur-2xl animate-pulse delay-500"></div> */}

              {/* Additional Floating Elements */}
              <div className="absolute top-1/4 right-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-r from-brand-theme/15 to-brand-blue-700/15 rounded-full blur-2xl animate-pulse delay-700"></div>
              <div className="absolute bottom-1/4 left-1/4 w-40 sm:w-56 h-40 sm:h-56 bg-gradient-to-r from-brand-blue-700/15 to-brand-theme/15 rounded-full blur-2xl animate-pulse delay-300"></div>

              {/* Enhanced Grid Pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>

              {/* Subtle Wave Pattern */}
              <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-white/10 to-transparent"></div>
            </div>

            <div className="container--boxed relative z-10 px-4 sm:px-6 lg:px-8 w-full py-12 lg:pt-8 lg:py-16">
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 mb-6 sm:mb-8">
                  <FaHeadset className="h-4 w-4 sm:h-5 sm:w-5 text-brand-theme" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-blue-800">
                    Get in Touch
                  </span>
                </div>

                {/* Teal Line */}
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                  <span className="block">We're Here to</span>
                  <span className="bg-gradient-to-r from-brand-theme to-yellow-400 bg-clip-text text-transparent">
                    Help You
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                  Have questions about website performance, need expert guidance
                  or want to optimize your site? Our team of performance experts
                  is ready to assist you every step of the way.
                </p>

                {/* Features */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
                    >
                      <FaCheckCircle className="h-4 w-4 text-brand-theme" />
                      <span className="text-sm sm:text-base text-white/90 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Methods Section */}
          <div className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-brand-gray-300 to-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Contact Methods
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 ">
                {contactMethods.map((method, index) => {
                  const isClickable =
                    method.title === "Phone" || method.title === "Email";
                  const handleClick = () => {
                    if (method.title === "Phone") {
                      window.open(`tel:${method.details}`, "_self");
                    } else if (method.title === "Email") {
                      window.open(`mailto:${method.details}`, "_self");
                    }
                  };

                  return (
                    <div
                      key={index}
                      className={`group bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/30 ${
                        isClickable ? "cursor-pointer" : ""
                      }`}
                      onClick={isClickable ? handleClick : undefined}
                    >
                      <div
                        className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${method.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {method.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-2 sm:mb-3 group-hover:text-brand-theme transition-colors duration-300">
                        {method.title}
                      </h3>
                      <p
                        className={`text-base sm:text-lg font-semibold text-brand-theme mb-2 ${
                          isClickable
                            ? "hover:text-brand-theme-600 transition-colors duration-300"
                            : ""
                        }`}
                      >
                        {method.details}
                      </p>
                      <p className="text-sm sm:text-base text-brand-gray-500">
                        {method.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="py-16 sm:py-20 bg-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
                  {/* Form */}
                  <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-white/30">
                    <h3 className="text-2xl sm:text-3xl font-bold text-brand-blue-800 mb-6 sm:mb-8">
                      Send us a Message
                    </h3>

                    {/* Success/Error Messages */}
                    {submitStatus === "success" && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <FaCheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-green-800">
                              Message Sent Successfully!
                            </h4>
                            <p className="text-sm text-green-700">
                              Thank you for contacting us. We'll get back to you
                              soon.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="h-5 w-5 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">
                              !
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-red-800">
                              Failed to Send Message
                            </h4>
                            <p className="text-sm text-red-700">
                              Please try again or contact us directly.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 sm:space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-brand-blue-800 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white border-2 border-brand-gray-200 rounded-xl text-brand-blue-800 placeholder-brand-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-theme focus:border-brand-theme transition-all duration-300"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-brand-blue-800 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white border-2 border-brand-gray-200 rounded-xl text-brand-blue-800 placeholder-brand-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-theme focus:border-brand-theme transition-all duration-300"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-brand-blue-800 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border-2 border-brand-gray-200 rounded-xl text-brand-blue-800 placeholder-brand-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-theme focus:border-brand-theme transition-all duration-300"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-brand-blue-800 mb-2">
                            Subject *
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white border-2 border-brand-gray-200 rounded-xl text-brand-blue-800 placeholder-brand-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-theme focus:border-brand-theme transition-all duration-300"
                            placeholder="Performance issue, API question, optimization help?"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-blue-800 mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 bg-white border-2 border-brand-gray-200 rounded-xl text-brand-blue-800 placeholder-brand-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-theme focus:border-brand-theme transition-all duration-300 resize-none"
                          placeholder="Tell us about your website performance challenges..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                          isSubmitting
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                            : "bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white transform hover:scale-105 hover:shadow-lg hover:shadow-brand-theme/25"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-200 border-t-gray-600"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <FaArrowRight className="text-sm" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* Contact Info */}
                  <div className="lg:col-span-1 space-y-6 sm:space-y-8">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-white/30">
                      <h4 className="text-2xl sm:text-3xl font-bold text-brand-blue-800 mb-6 sm:mb-8">
                        Why Choose Us?
                      </h4>
                      <div className="space-y-4 sm:space-y-6">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <FaCheckCircle className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-brand-blue-800 mb-1">
                              Expert Performance Guidance
                            </h5>
                            <p className="text-sm sm:text-base text-brand-gray-500">
                              Our experienced team provides personalized website
                              performance optimization advice.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <FaCheckCircle className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-brand-blue-800 mb-1">
                              Quick Response
                            </h5>
                            <p className="text-sm sm:text-base text-brand-gray-500">
                              We respond to all inquiries within 24 hours.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <FaCheckCircle className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-brand-blue-800 mb-1">
                              24/7 Developer Support
                            </h5>
                            <p className="text-sm sm:text-base text-brand-gray-500">
                              Round-the-clock assistance for all your website
                              performance needs.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-brand-blue-700 via-brand-blue-800 to-brand-theme-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white">
                      <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                        Ready to Optimize Your Website Performance?
                      </h4>
                      <p className="text-white/90 mb-6 sm:mb-8">
                        Let our experts help you optimize your website
                        performance and achieve better Core Web Vitals scores.
                      </p>
                      <Link
                        href="/pagespeed-test"
                        className="inline-flex items-center gap-2 bg-white text-brand-theme font-semibold py-3 px-6 rounded-xl hover:bg-white/90 transition-all duration-300"
                      >
                        Test Your Website
                        <FaArrowRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
