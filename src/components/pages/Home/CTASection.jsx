import React from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaShieldAlt,
  FaClock,
  FaHeadset,
  FaTachometerAlt,
  FaCode,
} from "react-icons/fa";

const CTASection = () => {
  return (
    <section
      className="py-16 sm:py-20 bg-gradient-to-br from-brand-gray-300 to-white relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background pattern */}
      {/* <div className="absolute inset-0 opacity-20">
        <div className="absolute top-6 sm:top-10 left-6 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-brand-theme/10 rounded-full blur-3xl"></div>
        <div className="absolute top-12 sm:top-20 right-12 sm:right-20 w-16 sm:w-24 h-16 sm:h-24 bg-brand-blue-700/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-12 sm:bottom-20 left-1/4 w-24 sm:w-40 h-24 sm:h-40 bg-brand-theme/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-6 sm:bottom-10 right-1/3 w-20 sm:w-28 h-20 sm:h-28 bg-brand-blue-700/10 rounded-full blur-2xl"></div>
      </div> */}

      <div className="container--boxed--lg relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-4 sm:mb-6"></div>
          <h2
            id="cta-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-blue-800 mb-4 sm:mb-6 leading-tight"
          >
            Ready to Optimize Your Website Performance?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-brand-gray-500 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of developers who trust our PageSpeed tool for their
            website performance optimization needs. Start testing your website
            today and boost your performance scores.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
            <Link
              href="/pagespeed-test"
              className="group bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-brand-theme/25 flex items-center justify-center gap-2 sm:gap-3"
            >
              <FaTachometerAlt className="text-sm sm:text-base lg:text-lg" />
              <span className="text-sm sm:text-base lg:text-lg">
                Test Website Performance
              </span>
              <FaArrowRight className="text-sm sm:text-base lg:text-lg group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/contact"
              className="group border-2 border-brand-theme text-brand-theme font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl hover:bg-brand-theme hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3"
            >
              <FaCode className="text-sm sm:text-base lg:text-lg group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm sm:text-base lg:text-lg">
                Get API Access
              </span>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 text-brand-gray-500 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-brand-theme" />
              <span>Google PageSpeed API</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-brand-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <FaClock className="text-brand-theme" />
              <span>Real-time Analysis</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-brand-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <FaHeadset className="text-brand-theme" />
              <span>Developer Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
