import React from "react";
import NewsletterSignup from "@/components/common/NewsletterSignup";

const NewsletterSection = () => {
  const handleSuccess = (data) => {
    console.log("Newsletter subscription successful:", data);
    // You can add additional success handling here, like analytics tracking
  };

  const handleError = (error) => {
    console.error("Newsletter subscription error:", error);
    // You can add additional error handling here, like error reporting
  };

  return (
    <section
      className="py-16 sm:py-20 bg-gradient-to-br from-brand-blue-50 to-white relative overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-6 sm:top-10 left-6 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-brand-theme/20 rounded-full blur-3xl"></div>
        <div className="absolute top-12 sm:top-20 right-12 sm:right-20 w-16 sm:w-24 h-16 sm:h-24 bg-brand-blue-700/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-12 sm:bottom-20 left-1/4 w-24 sm:w-40 h-24 sm:h-40 bg-brand-theme/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-6 sm:bottom-10 right-1/3 w-20 sm:w-28 h-20 sm:h-28 bg-brand-blue-700/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container--boxed--lg relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-4 sm:mb-6"></div>
          <h2
            id="newsletter-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6 leading-tight"
          >
            Stay Updated with the Latest Properties
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-brand-gray-500 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Get exclusive access to new property listings, market insights and
            real estate tips delivered directly to your inbox. Join our
            community of property enthusiasts today!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <NewsletterSignup
            title=""
            subtitle=""
            buttonText="Subscribe to Newsletter"
            className="newsletter-homepage"
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 text-brand-gray-500 text-xs sm:text-sm mt-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-theme rounded-full"></div>
            <span>Weekly Property Updates</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-brand-gray-400 rounded-full"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-theme rounded-full"></div>
            <span>Market Insights</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-brand-gray-400 rounded-full"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-theme rounded-full"></div>
            <span>No Spam, Unsubscribe Anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
