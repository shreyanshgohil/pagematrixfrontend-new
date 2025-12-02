import Layout from "@/components/layout";
import SEO from "@/components/common/SEO";
import APIDocumentation from "@/components/pages/API/APIDocumentation";

const API = () => {
  return (
    <>
      <SEO
        title="API Documentation | PageSpeed Performance API | Developer Integration"
        description="Integrate our PageSpeed Performance API into your applications. Get comprehensive website performance analysis with simple REST endpoints and authentication tokens."
        keywords="PageSpeed API, website performance API, developer API, REST API, performance testing API, API documentation, developer tools, web performance API"
        url="/api"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebAPI",
          name: "PageSpeed Performance API",
          description:
            "REST API for website performance analysis",
          url: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com"
          }/api`,
          documentation: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com"
          }/api`,
          provider: {
            "@type": "Organization",
            name: "PageSpeed Performance Tool",
          },
          serviceType: "Web Performance Analysis",
          areaServed: "Worldwide",
          availableChannel: {
            "@type": "ServiceChannel",
            serviceUrl: `${
              process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com"
            }/api/v1/pagespeed`,
            serviceName: "PageSpeed Analysis Endpoint",
          },
        }}
      />

      <Layout>
        <APIDocumentation />
      </Layout>
    </>
  );
};

export default API;
