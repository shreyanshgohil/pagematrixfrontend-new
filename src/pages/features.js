import Layout from "@/components/layout";
import SEO from "@/components/common/SEO";
import FeaturesHero from "@/components/pages/Features/FeaturesHero";
import FeaturesOverview from "@/components/pages/Features/FeaturesOverview";
import FeaturesDetailed from "@/components/pages/Features/FeaturesDetailed";
import FeaturesComparison from "@/components/pages/Features/FeaturesComparison";
import FeaturesPricing from "@/components/pages/Features/FeaturesPricing";
import CTASection from "@/components/pages/Home/CTASection";

const Features = () => {
  return (
    <>
      <SEO
        title="PageSpeed Tool Features | Google PageSpeed API Integration | Performance Analysis"
        description="Explore comprehensive PageSpeed tool features including Google PageSpeed API integration, Core Web Vitals analysis, mobile & desktop testing, real-time performance metrics, and developer-friendly API access."
        keywords="PageSpeed features, Google PageSpeed API, Core Web Vitals, performance analysis, mobile testing, desktop testing, real-time metrics, developer API, website optimization, performance monitoring"
        url="/features"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "PageSpeed Tool Features",
          description:
            "Comprehensive features of our PageSpeed performance analysis tool powered by Google's PageSpeed Insights API",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/features",
          mainEntity: {
            "@type": "WebApplication",
            name: "PageSpeed Performance Tool",
            featureList: [
              "Google PageSpeed API Integration",
              "Core Web Vitals Analysis",
              "Mobile & Desktop Testing",
              "Real-time Performance Metrics",
              "Developer API Access",
              "Performance Optimization Recommendations",
            ],
          },
        }}
      />

      <Layout>
        <FeaturesHero />
        <FeaturesOverview />
        <FeaturesDetailed />
        <FeaturesComparison />
        <FeaturesPricing />
        <CTASection />
      </Layout>
    </>
  );
};

export default Features;
