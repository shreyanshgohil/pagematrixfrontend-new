const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com";

  // Static date for static pages (doesn't change daily)
  const staticDate = "2025-10-01T00:00:00.000Z";

  // Dynamic date for dynamically created pages
  const dynamicDate = new Date().toISOString();

  // Fetch properties data for dynamic sitemap
  let properties = [];
  let totalProperties = 0;

  try {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    console.log(`Fetching properties from: ${apiBaseUrl}/properties`);

    // First, get the total count
    const countRes = await fetch(`${apiBaseUrl}/properties?limit=1&page=1`, {
      headers: {
        "Content-Type": "application/json",
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!countRes.ok) {
      throw new Error(`API responded with status: ${countRes.status}`);
    }

    const countData = await countRes.json();
    totalProperties = countData.data?.totalCount || 0;
    console.log(`Total properties found: ${totalProperties}`);

    // Then fetch all properties (with pagination if needed)
    const limit = 1000; // Max properties per request
    const totalPages = Math.ceil(totalProperties / limit);
    console.log(`Fetching ${totalPages} pages of properties`);

    for (let page = 1; page <= totalPages; page++) {
      const propertiesRes = await fetch(
        `${apiBaseUrl}/properties?limit=${limit}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          signal: AbortSignal.timeout(10000),
        }
      );

      if (!propertiesRes.ok) {
        console.warn(`Failed to fetch page ${page}: ${propertiesRes.status}`);
        continue;
      }

      const propertiesData = await propertiesRes.json();
      const pageProperties = propertiesData.data?.properties || [];
      properties = [...properties, ...pageProperties];
      console.log(
        `Fetched ${pageProperties.length} properties from page ${page}`
      );
    }
  } catch (error) {
    console.error("Error fetching properties for sitemap:", error);
    console.log("Will use fallback properties for sitemap");
  }

  // Sample blog posts (you can replace this with actual blog data from your CMS/API)
  const blogPosts = [
    {
      id: 1,
      slug: "real-estate-market-trends-mumbai-2024",
      title: "Real Estate Market Trends in Mumbai 2024",
      date: "2024-01-20",
    },
    {
      id: 2,
      slug: "first-time-home-buyers-guide",
      title: "First-Time Home Buyer's Guide",
      date: "2024-01-18",
    },
    {
      id: 3,
      slug: "real-estate-investment-strategies-2024",
      title: "Real Estate Investment Strategies for 2024",
      date: "2024-01-15",
    },
    {
      id: 4,
      slug: "new-infrastructure-projects-delhi-ncr",
      title: "New Infrastructure Projects Driving Property Prices in Delhi NCR",
      date: "2024-01-12",
    },
    {
      id: 5,
      slug: "rera-compliance-property-buyers",
      title: "RERA Compliance: What Every Property Buyer Should Know",
      date: "2024-01-10",
    },
  ];

  // Get cities and property types for city pages
  let cities = [];
  let propertyTypes = [];

  try {
    const staticDataRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"
      }/properties/static-data`
    );
    if (staticDataRes.ok) {
      const staticData = await staticDataRes.json();
      cities = staticData.data?.cities || [];
    }
  } catch (error) {
    console.error("Error fetching cities for sitemap:", error);
  }

  // Fallback cities if API fails
  if (cities.length === 0) {
    cities = [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Chennai",
      "Hyderabad",
      "Pune",
      "Kolkata",
      "Ahmedabad",
      "Jaipur",
      "Surat",
      "Lucknow",
      "Kanpur",
      "Nagpur",
      "Indore",
      "Thane",
      "Bhopal",
      "Visakhapatnam",
      "Pimpri-Chinchwad",
      "Patna",
      "Vadodara",
    ];
  }

  // Property types for city pages
  propertyTypes = ["apartment", "villa", "penthouse", "commercial", "plot"];

  // Debug information
  console.log(
    `Sitemap generation: Found ${properties.length} properties out of ${totalProperties} total`
  );
  console.log(`Cities for city pages: ${cities.length}`);
  console.log(`Property types: ${propertyTypes.length}`);
  console.log(
    `Total city pages to generate: ${cities.length * propertyTypes.length}`
  );

  // Add some fallback property URLs if no properties are fetched
  const fallbackProperties =
    properties.length === 0
      ? [
          {
            _id: "sample-1",
            name: "Luxury Apartment Mumbai",
            propertyType: "APARTMENT",
            listingType: "SALE",
            city: "Mumbai",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "sample-2",
            name: "Modern Villa Bangalore",
            propertyType: "VILLA",
            listingType: "RENT",
            city: "Bangalore",
            createdAt: new Date().toISOString(),
          },
        ]
      : [];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Static Pages -->
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${staticDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/properties</loc>
        <lastmod>${staticDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/about</loc>
        <lastmod>${staticDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/contact</loc>
        <lastmod>${staticDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/blog</loc>
        <lastmod>${staticDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/careers</loc>
        <lastmod>${staticDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/privacy</loc>
        <lastmod>${staticDate}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/terms-and-conditions</loc>
        <lastmod>${staticDate}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/team</loc>
        <lastmod>${staticDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/cookie-policy</loc>
        <lastmod>${staticDate}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>1.0</priority>
      </url>
      
      <!-- City Pages -->
      ${cities
        .map((city) =>
          propertyTypes
            .map(
              (propertyType) => `
        <url>
          <loc>${baseUrl}/properties/city/${propertyType}/${city.toLowerCase()}</loc>
          <lastmod>${staticDate}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
        </url>
      `
            )
            .join("")
        )
        .join("")}
      
      <!-- Dynamic Property Pages -->
      ${(properties.length > 0 ? properties : fallbackProperties)
        .map((property) => {
          // Create SEO-friendly URL slug
          const slug = property.name
            ? property.name
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
                .replace(/\s+/g, "-") // Replace spaces with hyphens
                .replace(/-+/g, "-") // Replace multiple hyphens with single
                .trim()
            : `${property.propertyType?.toLowerCase() || "property"}-${
                property.listingType?.toLowerCase() || "sale"
              }-${property.city?.toLowerCase() || "mumbai"}`;

          return `
        <url>
          <loc>${baseUrl}/properties/${property._id}/${slug}</loc>
          <lastmod>${new Date(property.createdAt).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
        </url>`;
        })
        .join("")}
      
      <!-- Blog Posts -->
      ${blogPosts
        .map(
          (post) => `
        <url>
          <loc>${baseUrl}/blog/${post.id}</loc>
          <lastmod>${staticDate}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate"
  );
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
