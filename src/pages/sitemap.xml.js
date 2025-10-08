const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com";

  // Static date for static pages (doesn't change daily)
  const staticDate = "2025-10-01T00:00:00.000Z";

  // Dynamic date for dynamically created pages
  const dynamicDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    {
      url: "",
      lastmod: staticDate,
      changefreq: "daily",
      priority: "1.0",
    },
    {
      url: "/features",
      lastmod: staticDate,
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      url: "/about",
      lastmod: staticDate,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: "/team",
      lastmod: staticDate,
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      url: "/careers",
      lastmod: staticDate,
      changefreq: "weekly",
      priority: "0.7",
    },
    {
      url: "/contact",
      lastmod: staticDate,
      changefreq: "monthly",
      priority: "0.6",
    },
    {
      url: "/blog",
      lastmod: staticDate,
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      url: "/privacy",
      lastmod: staticDate,
      changefreq: "yearly",
      priority: "0.3",
    },
    {
      url: "/terms-and-conditions",
      lastmod: staticDate,
      changefreq: "yearly",
      priority: "0.3",
    },
    {
      url: "/cookie-policy",
      lastmod: staticDate,
      changefreq: "yearly",
      priority: "0.3",
    },
    {
      url: "/signin",
      lastmod: staticDate,
      changefreq: "monthly",
      priority: "0.5",
    },
    {
      url: "/signup",
      lastmod: staticDate,
      changefreq: "monthly",
      priority: "0.5",
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((page) => {
          return `
        <url>
          <loc>${baseUrl}${page.url}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
