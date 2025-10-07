import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "This PageSpeed tool is incredible! It helped us identify critical performance issues and improve our website speed by 40%. The Google API integration is seamless and the insights are spot-on.",
      author: "Sarah Chen",
      role: "Frontend Developer at TechCorp",
      avatar: "SC",
      rating: 5,
    },
    {
      quote:
        "As a web performance consultant, I rely on this tool for all my client projects. The detailed Core Web Vitals analysis and actionable recommendations are exactly what I need to deliver results.",
      author: "Michael Rodriguez",
      role: "Performance Consultant at WebOptimize",
      avatar: "MR",
      rating: 5,
    },
    {
      quote:
        "The API integration was so easy! I was able to integrate PageSpeed testing into our CI/CD pipeline in just a few hours. Our website performance monitoring is now fully automated.",
      author: "David Kim",
      role: "DevOps Engineer at StartupXYZ",
      avatar: "DK",
      rating: 5,
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 md:py-24 bg-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="container--boxed--lg px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-4 sm:mb-6"></div>
          <h2
            id="testimonials-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6"
          >
            What Our Users Say
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-500 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of satisfied developers who trust our PageSpeed tool
            for their website performance optimization needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              {/* Rating */}
              <div className="flex items-center mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="text-yellow-400 h-4 w-4 sm:h-5 sm:w-5"
                  />
                ))}
              </div>

              {/* Quote icon */}
              <div className="text-brand-theme-500 text-xl sm:text-2xl mb-3 sm:mb-4">
                <FaQuoteLeft />
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-theme-500 to-brand-theme-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-lg mr-3 sm:mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-600 text-xs sm:text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
