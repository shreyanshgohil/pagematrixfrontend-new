import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowRight,
  FaHome,
  FaBuilding,
  FaStore,
  FaMapMarkedAlt,
  FaHeadset,
  FaShieldAlt,
  FaSearch,
  FaMobile,
  FaDesktop,
  FaTachometerAlt,
  FaCode,
} from "react-icons/fa";
import logo from "../../../../public/images/logos/logo-footer.svg";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const ignorePaddingPages = ["/contact", "/privacy", "/terms-and-conditions"];

  // Newsletter state
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address");
      setIsSuccess(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, action: "subscribe" }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          data.message || "Successfully subscribed to our newsletter!"
        );
        setIsSuccess(true);
        setEmail("");
      } else {
        setMessage(data.message || "Something went wrong. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setMessage("Network error. Please check your connection and try again.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Pricing", href: "/pricing" },
      { name: "Contact", href: "/contact" },
    ],
    services: [
      { name: "PageSpeed Analysis", href: "/pagespeed-test" },
      { name: "API Documentation", href: "/api-docs" },
      { name: "Performance Tools", href: "/tools" },
    ],
    resources: [
      { name: "Performance Guides", href: "/guides" },
      { name: "API Reference", href: "/api-reference" },
      { name: "Best Practices", href: "/best-practices" },
      { name: "FAQ", href: "/faq" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms-and-conditions" },
      { name: "Cookie Policy", href: "/cookie-policy" },
    ],
  };

  const toolFeatures = [
    {
      name: "Mobile Performance",
      href: "/pagespeed-test?strategy=mobile",
      icon: <FaMobile />,
    },
    {
      name: "Desktop Performance",
      href: "/pagespeed-test?strategy=desktop",
      icon: <FaDesktop />,
    },
    {
      name: "Core Web Vitals",
      href: "/core-web-vitals",
      icon: <FaTachometerAlt />,
    },
    {
      name: "API Access",
      href: "/api-docs",
      icon: <FaCode />,
    },
  ];

  const socialLinks = [
    { name: "Facebook", href: "#", icon: <FaFacebookF /> },
    { name: "Twitter", href: "#", icon: <FaTwitter /> },
    { name: "LinkedIn", href: "#", icon: <FaLinkedinIn /> },
    { name: "Instagram", href: "#", icon: <FaInstagram /> },
  ];

  return (
    <footer
      className={`relative overflow-hidden ${
        ignorePaddingPages.includes(router.pathname) ? "" : "pt-16"
      }`}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-theme-800"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-brand-theme rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/3 w-28 h-28 bg-brand-theme rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container--boxed">
          <div className="py-16">
            {/* Mobile-first responsive layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Company Info Section */}
              <div className="lg:max-w-md">
                <Link
                  href={"/"}
                  aria-label="Go to homepage"
                  className="group inline-block mb-6"
                >
                  <Image
                    src={logo}
                    width={199}
                    height={44}
                    alt="11yards Real Estate - Click to go to homepage"
                    style={{ height: "70px" }}
                    fetchPriority="high"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <p className="text-white/90 mb-6 leading-relaxed text-sm lg:text-base">
                  Your trusted partner in finding the perfect property. We
                  connect you with verified real estate opportunities across
                  India.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <a
                    href="tel:+917201928142"
                    className="flex items-center gap-3 text-white/90 hover:text-brand-theme transition-colors duration-300 group"
                  >
                    <FaPhone className="text-brand-theme text-sm group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm">+91 72019 28142</span>
                  </a>
                  <a
                    href="mailto:info@11yards.com"
                    className="flex items-center gap-3 text-white/90 hover:text-brand-theme transition-colors duration-300 group"
                  >
                    <FaEnvelope className="text-brand-theme text-sm group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm">info@11yards.com</span>
                  </a>
                  <div className="flex items-center gap-3 text-white/90">
                    <FaMapMarkerAlt className="text-brand-theme text-sm" />
                    <span className="text-sm">Gandhinagar, Gujarat, India</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-white/10 hover:bg-brand-theme rounded-lg flex items-center justify-center text-white hover:text-white transition-all duration-300 transform hover:scale-110"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Links Section - Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Quick Links */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-6">
                    Quick Links
                  </h3>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white/80 hover:text-brand-theme transition-colors duration-300 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-6">
                    Our Services
                  </h3>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white/80 hover:text-brand-theme transition-colors duration-300 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tool Features */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <h3 className="text-white font-bold text-lg mb-6">
                    Tool Features
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {toolFeatures.map((feature) => (
                      <Link
                        key={feature.name}
                        href={feature.href}
                        className="group bg-white/10 hover:bg-brand-theme/20 rounded-lg p-3 text-center transition-all duration-300 transform hover:scale-105"
                      >
                        <div className="flex justify-center mb-2">
                          <div className="text-brand-theme text-lg group-hover:scale-110 transition-transform duration-300">
                            {feature.icon}
                          </div>
                        </div>
                        <div className="text-white text-xs font-medium text-center">
                          {feature.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="mt-12 lg:mt-16 py-8 sm:pb-0 border-t border-white/20">
              <div className="max-w-2xl mx-auto text-center px-4">
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-4">
                  Stay Updated with Performance Insights
                </h3>
                <p className="text-white/80 mb-6 text-sm lg:text-base">
                  Get notified about performance updates, new features and
                  optimization tips.
                </p>
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-theme focus:border-transparent text-sm"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <FaArrowRight className="text-sm" />
                      </>
                    )}
                  </button>
                </form>

                {/* Success/Error Message */}
                {message && (
                  <div
                    className={`mt-4 p-3 rounded-lg text-sm ${
                      isSuccess
                        ? "bg-green-100/20 text-green-200 border border-green-300/30"
                        : "bg-red-100/20 text-red-200 border border-red-300/30"
                    }`}
                  >
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-black/20 backdrop-blur-sm">
          <div className="container--boxed">
            <div className="py-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="text-white/80 text-sm text-center lg:text-left">
                  © {new Date().getFullYear()} 11yards. All rights reserved.
                </div>

                <nav
                  aria-label="Footer legal navigation"
                  className="w-full lg:w-auto"
                >
                  <ul className="flex items-center justify-start lg:justify-start flex-wrap gap-4 lg:gap-6">
                    {footerLinks.legal.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white/60 hover:text-brand-theme text-xs lg:text-sm transition-colors duration-300"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="flex items-center justify-center lg:justify-start gap-2 text-white/60 text-xs lg:text-sm">
                  <FaShieldAlt className="text-brand-theme" />
                  <span>RERA Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
