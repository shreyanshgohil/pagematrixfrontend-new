import Image from "next/image";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaCode,
  FaHeadset,
  FaArrowRight,
  FaRocket,
  FaChartLine,
} from "react-icons/fa";

const WhyUs = () => {
  const whyUsData = [
    {
      title: "Google PageSpeed API Integration",
      description:
        "Powered by Google's official PageSpeed Insights API for accurate and reliable performance metrics. Get the same data that Google uses for search rankings.",
      linkTitle: "Test your website",
      linkHref: "/pagespeed-test",
      image: "/images/home/promoting-brand.svg",
      icon: <FaTachometerAlt />,
      color: "from-brand-blue-700 to-brand-blue-800",
    },
    {
      title: "Comprehensive Performance Analysis",
      description:
        "Get detailed insights into Core Web Vitals, performance scores, and actionable recommendations to optimize your website's speed and user experience.",
      linkTitle: "View analysis features",
      linkHref: "/pagespeed-test",
      image: "/images/home/search.svg",
      icon: <FaChartLine />,
      color: "from-brand-theme to-brand-theme-600",
    },
    {
      title: "Developer-Friendly API",
      description:
        "Easy integration with our RESTful API endpoints. Get performance data programmatically for your applications with comprehensive documentation and examples.",
      linkTitle: "Get API access",
      linkHref: "/contact",
      image: "/images/home/remote-collaboration.svg",
      icon: <FaCode />,
      color: "from-brand-theme-600 to-brand-theme-800",
    },
  ];

  return (
    <section
      className="relative py-16 sm:py-20 md:py-32 bg-gradient-to-br from-brand-blue-700 via-brand-blue-800 to-brand-theme-600 overflow-hidden"
      aria-labelledby="why-us-heading"
    >
      {/* Background Elements */}
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Subtle Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-white/10 to-transparent"></div>
      </div>

      <div className="relative z-10 container--boxed--lg px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-full mb-6 sm:mb-8 shadow-lg border border-white/20">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-brand-theme rounded-full"></div>
            <p className="uppercase font-bold text-xs sm:text-sm text-brand-theme tracking-wider">
              WHY CHOOSE OUR PAGESPEED TOOL?
            </p>
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-brand-theme rounded-full"></div>
          </div>
          <h2
            id="why-us-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight"
          >
            Your trusted partner in website performance optimization
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-brand-theme to-yellow-400 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our comprehensive PageSpeed analysis
            platform designed to make your website optimization seamless and
            successful.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {whyUsData.map((feature, index) => (
            <article
              key={index}
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl sm:hover:shadow-2xl transition-all duration-500 sm:transform sm:hover:-translate-y-3 border border-white/30 overflow-hidden"
            >
              {/* Default Background decoration */}
              <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-brand-theme/8 to-transparent rounded-bl-2xl sm:rounded-bl-3xl rounded-tr-2xl sm:rounded-tr-3xl sm:group-hover:opacity-0 transition-opacity duration-300"></div>

              {/* Hover Background - Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-800 to-brand-theme-600 rounded-2xl sm:rounded-3xl opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Hover White Line */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 h-0.5 bg-white rounded-full opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Default Content Container */}
              <div className="relative z-10 sm:group-hover:hidden">
                {/* Icon container */}
                <div className="relative mb-4 sm:mb-6 lg:mb-8">
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${feature.color} rounded-2xl sm:rounded-3xl flex items-center justify-center text-white shadow-xl sm:group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-xl sm:text-2xl lg:text-3xl">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-brand-theme rounded-full"></div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-brand-blue-800 mb-3 sm:mb-4 lg:mb-6">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-brand-gray-500 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                  {feature.description}
                </p>

                {/* Link */}
                <Link
                  href={feature.linkHref}
                  className="relative z-50 group/link inline-flex items-center gap-2 sm:gap-3 text-brand-theme font-semibold hover:text-brand-theme-600 transition-colors duration-300 text-sm sm:text-base lg:text-lg"
                  aria-label={`${feature.linkTitle} - ${feature.title}`}
                >
                  <span>{feature.linkTitle}</span>
                  <FaArrowRight className="text-sm sm:text-base lg:text-lg group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Hover Content Container */}
              <div className="hidden absolute inset-0 z-20 md:flex flex-col justify-center items-center text-white opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-6 lg:p-8">
                <div className="text-center">
                  <div className="mb-4 sm:mb-6">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg`}
                    >
                      <div className="text-lg sm:text-xl lg:text-2xl">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <Link
                    href={feature.linkHref}
                    className="group/link inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold transition-colors duration-300 text-sm sm:text-base"
                    aria-label={`${feature.linkTitle} - ${feature.title}`}
                  >
                    <span>{feature.linkTitle}</span>
                    <FaArrowRight className="text-xs sm:text-sm group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-white/20">
            {/* Enhanced Background pattern */}
            {/* <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-24 sm:w-40 h-24 sm:h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-20 sm:w-32 h-20 sm:h-32 bg-white rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 sm:w-24 h-16 sm:h-24 bg-white rounded-full blur-xl animate-pulse delay-500"></div>
            </div> */}

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Ready to optimize your website performance?
              </h3>
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 lg:mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Join hundreds of satisfied developers who optimized their
                website performance with our PageSpeed analysis tool
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Link
                  href="/pagespeed-test"
                  className="group bg-white text-brand-theme font-bold py-3.5 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-10 rounded-xl sm:rounded-2xl hover:bg-brand-gray-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg shadow-xl"
                >
                  <span>Test Performance</span>
                  <FaArrowRight className="text-sm sm:text-base lg:text-lg group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/contact"
                  className="group border-2 border-white text-white font-bold py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-10 rounded-xl sm:rounded-2xl hover:bg-white hover:text-brand-theme transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg"
                >
                  <span>Get API Access</span>
                  <FaCode className="text-sm sm:text-base lg:text-lg group-hover:scale-110 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
