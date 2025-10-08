import React from "react";
import Layout from "@/components/layout";
import SEO from "@/components/common/SEO";
import PricingHero from "@/components/pages/Pricing/PricingHero";
import PricingPlans from "@/components/pages/Pricing/PricingPlans";
import StatsSection from "@/components/pages/Home/StatsSection";
import FeaturesSection from "@/components/pages/Home/FeaturesSection";
import WhyUs from "@/components/pages/Home/WhyUs";
import TestimonialsSection from "@/components/pages/Home/TestimonialsSection";
import CTASection from "@/components/pages/Home/CTASection";

const PricingPage = () => {
  return (
    <Layout>
      <SEO
        title="Pricing - PageSpeed Performance Tool | Affordable Website Speed Testing Plans"
        description="Choose the perfect PageSpeed performance testing plan for your needs. From free tier to enterprise solutions, get accurate website speed analysis with Google PageSpeed API integration."
        keywords="PageSpeed pricing, website performance pricing, PageSpeed API pricing, website speed test pricing, performance testing plans, PageSpeed tool pricing, website optimization pricing, Core Web Vitals pricing"
        url="/pricing"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "PageSpeed Performance Tool - Pricing",
          description:
            "Affordable website performance testing plans with Google PageSpeed API integration. Choose from free to enterprise solutions.",
          url: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com"
          }/pricing`,
          applicationCategory: "DeveloperApplication",
          offers: [
            {
              "@type": "Offer",
              name: "Free Plan",
              description: "Free tier for testing and small projects",
              price: "0",
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "0",
                priceCurrency: "USD",
                billingIncrement: "P1M",
              },
            },
            {
              "@type": "Offer",
              name: "Basic Plan",
              description:
                "Ideal for steady indexing needs and growing projects",
              price: "19",
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "19",
                priceCurrency: "USD",
                billingIncrement: "P1M",
              },
            },
            {
              "@type": "Offer",
              name: "Professional Plan",
              description:
                "Great for growing businesses and professional users",
              price: "99",
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "99",
                priceCurrency: "USD",
                billingIncrement: "P1M",
              },
            },
          ],
        }}
      />
      <PricingHero />
      <PricingPlans />
      <StatsSection />
      <FeaturesSection />
      <WhyUs />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default PricingPage;
