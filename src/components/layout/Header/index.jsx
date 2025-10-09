import { IoMenu, IoClose } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Check if current page should have fixed header (home, about, blog, blog details, contact, privacy, terms-and-conditions, and cookie-policy pages)
  const isFixedHeaderPage =
    router.pathname === "/" ||
    router.pathname === "/about" ||
    router.pathname === "/api" ||
    router.pathname === "/blog" ||
    router.pathname.startsWith("/blog/") ||
    router.pathname === "/contact" ||
    router.pathname === "/privacy" ||
    router.pathname === "/terms-and-conditions" ||
    router.pathname === "/cookie-policy";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "API", href: "/api" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Main header */}
      <header
        className={`${
          isFixedHeaderPage ? "fixed" : "sticky"
        } top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md"
            : isFixedHeaderPage
            ? "bg-transparent"
            : "bg-white"
        }`}
        role="banner"
        aria-label="Site header"
      >
        <div className="container--boxed">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href={"/"} aria-label="Go to homepage">
                <Image
                  src={"/images/logos/logo-header.svg"}
                  width={199}
                  height={44}
                  alt="11yards Real Estate - Click to go to homepage"
                  style={{ height: "56px" }}
                  fetchPriority="high"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center space-x-8"
              role="navigation"
              aria-label="Main navigation"
            >
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-semibold relative group transition-all duration-300 ${
                    isScrolled || !isFixedHeaderPage
                      ? "text-brand-blue-800 hover:text-brand-theme"
                      : "text-white hover:text-brand-theme"
                  }`}
                >
                  {item.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-brand-theme transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Authentication Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/signin"
                className={`font-semibold transition-all duration-300 ${
                  isScrolled || !isFixedHeaderPage
                    ? "text-brand-blue-800 hover:text-brand-theme"
                    : "text-white hover:text-brand-theme"
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-brand-theme/25"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className={`lg:hidden p-2 rounded-lg ${
                isScrolled || !isFixedHeaderPage
                  ? "text-brand-blue-800"
                  : "text-white"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <IoClose className="text-2xl" />
              ) : (
                <IoMenu className="text-2xl" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <Transition appear show={isMenuOpen} as={Fragment}>
            <Dialog
              as="div"
              className="lg:hidden relative z-50"
              onClose={setIsMenuOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/50" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                    <Transition.Child
                      as={Fragment}
                      enter="transform transition ease-in-out duration-300"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transform transition ease-in-out duration-300"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Dialog.Panel className="pointer-events-auto w-screen">
                        <div className="flex h-full flex-col bg-white shadow-xl">
                          {/* Mobile Header */}
                          <div className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900 px-6 py-4 relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-20">
                              <div className="absolute top-4 left-4 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                              <div
                                className="absolute top-8 right-12 w-2 h-2 bg-white rounded-full animate-pulse"
                                style={{ animationDelay: "0.5s" }}
                              ></div>
                              <div
                                className="absolute top-12 left-16 w-2.5 h-2.5 bg-white rounded-full animate-pulse"
                                style={{ animationDelay: "1s" }}
                              ></div>
                              <div
                                className="absolute top-6 right-20 w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                                style={{ animationDelay: "1.5s" }}
                              ></div>
                              <div
                                className="absolute top-16 left-8 w-1 h-1 bg-white rounded-full animate-pulse"
                                style={{ animationDelay: "2s" }}
                              ></div>
                              <div
                                className="absolute top-20 right-8 w-2 h-2 bg-white rounded-full animate-pulse"
                                style={{ animationDelay: "2.5s" }}
                              ></div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                            <div className="flex items-center justify-between relative z-10">
                              <div className="flex items-center space-x-3">
                                <Image
                                  src={"/images/logos/logo-header.svg"}
                                  width={199}
                                  height={44}
                                  alt="11yards Real Estate - Click to go to homepage"
                                  style={{ height: "56px" }}
                                  fetchPriority="high"
                                />
                              </div>
                              <button
                                type="button"
                                className="p-2 text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <span className="sr-only">Close menu</span>
                                <IoClose className="h-6 w-6" />
                              </button>
                            </div>
                          </div>

                          {/* Navigation Content */}
                          <div className="flex-1 px-6 py-6">
                            <nav
                              className="space-y-0"
                              role="navigation"
                              aria-label="Mobile navigation"
                            >
                              {navigationItems.map((item, index) => (
                                <div key={item.name}>
                                  <Link
                                    href={item.href}
                                    className="block py-4 text-lg font-medium text-brand-blue-800"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {item.name}
                                  </Link>
                                  {index < navigationItems.length - 1 && (
                                    <div className="border-b border-gray-200"></div>
                                  )}
                                </div>
                              ))}
                            </nav>

                            {/* Authentication Buttons */}
                            <div className="mt-8 space-y-3">
                              <Link
                                href="/signin"
                                className="flex items-center justify-center w-full border-2 border-brand-theme text-brand-theme font-semibold py-3 px-6 rounded-lg hover:bg-brand-theme hover:text-white transition-all duration-300"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                Sign In
                              </Link>
                              <Link
                                href="/signup"
                                className="flex items-center justify-center w-full bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-brand-theme-600 hover:to-brand-theme-800 transition-all duration-300"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                Get Started
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </header>
    </>
  );
};

export default Header;
