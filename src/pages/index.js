import Layout from "@/components/layout";
import Hero from "@/components/pages/Home/Hero";
import StatsSection from "@/components/pages/Home/StatsSection";
import FeaturesSection from "@/components/pages/Home/FeaturesSection";
import WhyUs from "@/components/pages/Home/WhyUs";
import TestimonialsSection from "@/components/pages/Home/TestimonialsSection";
import CTASection from "@/components/pages/Home/CTASection";
import SEO from "@/components/common/SEO";
import AccessibilityTester from "@/components/common/AccessibilityTester";
import { useEffect, useState } from "react";

const index = ({ facets, cities }) => {
  const [showAccessibilityTester, setShowAccessibilityTester] = useState(false);

  // Keyboard shortcut to toggle accessibility tester (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === "A") {
        event.preventDefault();
        setShowAccessibilityTester((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // const { propertyType } = facets;

  return (
    <>
      <SEO
        title="PageSpeed Performance Tool | PageSpeed API Integration | Website Speed Testing"
        description="Analyze your website performance with our comprehensive PageSpeed testing tool. Get real-time performance metrics, Core Web Vitals analysis, and actionable optimization recommendations to boost your website speed and SEO rankings."
        keywords="PageSpeed API, website performance, Core Web Vitals, website speed test, performance optimization, web performance, page speed analysis, mobile performance, desktop performance, website optimization, SEO performance, web vitals, performance monitoring"
        url="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "PageSpeed Performance Tool",
          description:
            "Comprehensive website performance analysis tool. Get real-time performance metrics, Core Web Vitals analysis, and optimization recommendations.",
          url: process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com",
          logo: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com"
          }/images/logos/logo-header.svg`,
          image: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com"
          }/images/logos/logo-header.svg`,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web Browser",
          featureList: [
            "PageSpeed API Integration",
            "Core Web Vitals Analysis",
            "Mobile & Desktop Testing",
            "Real-time Performance Metrics",
            "Developer API Access",
            "Performance Optimization Recommendations",
          ],
          offers: {
            "@type": "Offer",
            description:
              "Website performance testing and optimization services using PageSpeed API",
            category: "Web Performance Tools",
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${
                process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com"
              }/pagespeed-test?url={website_url}`,
            },
            "query-input": "required name=website_url",
          },
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com",
              },
            ],
          }),
        }}
      />

      <Layout>
        <Hero propertyTypes={facets?.propertyType || []} cities={cities} />
        <StatsSection />
        <FeaturesSection />
        <WhyUs />
        <TestimonialsSection />
        <CTASection />
      </Layout>

      {/* Accessibility Tester - Press Ctrl + Shift + A to toggle */}
      <AccessibilityTester isVisible={showAccessibilityTester} />

      {/* Accessibility info for keyboard users */}
      <div className="sr-only">
        Press Ctrl + Shift + A to open the accessibility tester
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    // Fetch both property facets and cities data
    const [facetsRes, staticDataRes] = await Promise.all([
      fetch(`${baseUrl}/properties/facets`),
      fetch(`${baseUrl}/properties/static-data`),
    ]);

    const facetsData = await facetsRes.json();
    const staticData = await staticDataRes.json();

    return {
      props: {
        facets: facetsData.data || {},
        cities: staticData.data?.cities || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        facets: {},
        cities: [],
      },
    };
  }
}
export default index;
