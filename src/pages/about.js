import React from "react";
import Head from "next/head";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AboutHero from "../components/pages/About/AboutHero";
import AboutMission from "../components/pages/About/AboutMission";
import AboutTeam from "../components/pages/About/AboutTeam";
import AboutValues from "../components/pages/About/AboutValues";
import AboutStats from "../components/pages/About/AboutStats";
import AboutTimeline from "../components/pages/About/AboutTimeline";
import CTASection from "../components/pages/Home/CTASection";
import SEO from "../components/common/SEO";

const AboutPage = () => {
  return (
    <>
      <SEO
        title="About Us - PageSpeed Performance Tool | Google PageSpeed API Integration"
        description="Learn about our PageSpeed performance tool - the comprehensive website speed analysis platform powered by Google's PageSpeed Insights API. Discover our mission, team, and commitment to helping developers optimize website performance."
        keywords="about PageSpeed tool, website performance company, PageSpeed API team, performance experts, PageSpeed mission, website optimization values, PageSpeed about us, performance tool team, web performance professionals"
        url="/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About PageSpeed Performance Tool",
          description:
            "Learn about our PageSpeed performance tool - the comprehensive website speed analysis platform powered by Google's PageSpeed Insights API. Discover our mission, team, and commitment to helping developers optimize website performance.",
          url: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com"
          }/about`,
          mainEntity: {
            "@type": "Organization",
            name: "PageSpeed Performance Tool",
            description:
              "Comprehensive website performance analysis platform powered by Google's PageSpeed Insights API for developers and website owners",
            url:
              process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com",
            logo: `${
              process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com"
            }/images/logos/logo-header.svg`,
            foundingDate: "2022",
            address: {
              "@type": "PostalAddress",
              addressCountry: "India",
            },
            areaServed: {
              "@type": "Country",
              name: "Global",
            },
            serviceType: [
              "Website Performance Analysis",
              "Google PageSpeed API Integration",
              "Core Web Vitals Testing",
              "Performance Optimization",
            ],
          },
        }}
      />

      <Header />
      <main>
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <AboutStats />
        <AboutTeam />
        <AboutTimeline />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
