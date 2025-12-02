import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  IoCodeSlash,
  IoKey,
  IoDocumentText,
  IoCheckmarkCircle,
  IoWarning,
  IoCopy,
  IoArrowForward,
  IoSpeedometerOutline,
  IoAnalyticsOutline,
  IoGlobeOutline,
} from "react-icons/io5";
import { FaRocket, FaTerminal, FaCode, FaServer } from "react-icons/fa";

const APIDocumentation = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedCode, setCopiedCode] = useState("");

  // Refs for each section
  const sectionRefs = {
    overview: useRef(null),
    authentication: useRef(null),
    endpoints: useRef(null),
    examples: useRef(null),
    response: useRef(null),
    errors: useRef(null),
  };

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      // Find which section is currently in view
      const sections = Object.entries(sectionRefs).map(([key, ref]) => ({
        key,
        ref,
        top: ref.current?.offsetTop || 0,
        bottom:
          (ref.current?.offsetTop || 0) + (ref.current?.offsetHeight || 0),
      }));

      const activeSection = sections.find(
        (section) =>
          scrollPosition >= section.top && scrollPosition < section.bottom
      );

      if (activeSection) {
        setActiveTab(activeSection.key);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const section = sectionRefs[sectionId];
    if (section?.current) {
      section.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const codeExamples = {
    curl: `curl -X POST "https://api.pagespeed-tool.com/v1/pagespeed" \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "strategy": "mobile"
  }'`,

    javascript: `const response = await fetch('https://api.pagespeed-tool.com/v1/pagespeed', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com',
    strategy: 'mobile'
  })
});

const data = await response.json();
console.log(data);`,

    python: `import requests

url = "https://api.pagespeed-tool.com/v1/pagespeed"
headers = {
    "Authorization": "Bearer YOUR_API_TOKEN",
    "Content-Type": "application/json"
}
data = {
    "url": "https://example.com",
    "strategy": "mobile"
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result)`,

    php: `<?php
$url = 'https://api.pagespeed-tool.com/v1/pagespeed';
$data = [
    'url' => 'https://example.com',
    'strategy' => 'mobile'
];

$options = [
    'http' => [
        'header' => [
            'Authorization: Bearer YOUR_API_TOKEN',
            'Content-Type: application/json'
        ],
        'method' => 'POST',
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$response = json_decode($result, true);
?>`,
  };

  const responseExample = {
    success: true,
    data: {
      url: "https://example.com",
      strategy: "mobile",
      performanceScore: 85,
      accessibilityScore: 92,
      bestPracticesScore: 88,
      seoScore: 95,
      coreWebVitals: {
        lcp: 2.1,
        fid: 45,
        cls: 0.05,
      },
      opportunities: [
        {
          id: "unused-css-rules",
          title: "Remove unused CSS",
          description: "Remove unused CSS rules to reduce file size",
          impact: "medium",
          savings: "15.2 KB",
        },
      ],
      diagnostics: [
        {
          id: "render-blocking-resources",
          title: "Eliminate render-blocking resources",
          description: "Resources are blocking the first paint of your page",
          impact: "high",
        },
      ],
      timestamp: "2024-01-15T10:30:00Z",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue-700 via-brand-blue-800 to-brand-theme-600 pt-20 sm:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              API Documentation
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Integrate our PageSpeed Performance API into your applications.
              Get comprehensive website performance analysis with simple REST
              endpoints.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center space-x-2 bg-white text-brand-theme font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <FaRocket className="text-lg" />
                <span>Get API Access</span>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center space-x-2 border-2 border-white text-white font-semibold py-3 px-6 rounded-xl hover:bg-white hover:text-brand-theme transition-colors"
              >
                <span>View Pricing</span>
                <IoArrowForward className="text-lg" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 z-40">
              <nav className="space-y-2">
                {[
                  { id: "overview", label: "Overview", icon: IoDocumentText },
                  {
                    id: "authentication",
                    label: "Authentication",
                    icon: IoKey,
                  },
                  { id: "endpoints", label: "Endpoints", icon: FaServer },
                  { id: "examples", label: "Code Examples", icon: IoCodeSlash },
                  {
                    id: "response",
                    label: "Response Format",
                    icon: IoAnalyticsOutline,
                  },
                  { id: "errors", label: "Error Handling", icon: IoWarning },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === id
                        ? "bg-brand-theme text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-16">
              {/* Overview Section */}
              <div
                ref={sectionRefs.overview}
                id="overview"
                className="scroll-mt-8"
              >
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      API Overview
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Our PageSpeed Performance API provides comprehensive
                      website performance analysis. Get detailed metrics, recommendations, and
                      Core Web Vitals data for any website.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-brand-theme/10 to-brand-theme-600/10 p-6 rounded-xl border border-brand-theme/20">
                      <IoSpeedometerOutline className="text-3xl text-brand-theme mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Real-time Analysis
                      </h3>
                      <p className="text-gray-600">
                        Get instant performance metrics for any website URL
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-brand-theme/10 to-brand-theme-600/10 p-6 rounded-xl border border-brand-theme/20">
                      <IoAnalyticsOutline className="text-3xl text-brand-theme mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Comprehensive Data
                      </h3>
                      <p className="text-gray-600">
                        Access Core Web Vitals, opportunities, and diagnostics
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-brand-theme/10 to-brand-theme-600/10 p-6 rounded-xl border border-brand-theme/20">
                      <IoGlobeOutline className="text-3xl text-brand-theme mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Mobile & Desktop
                      </h3>
                      <p className="text-gray-600">
                        Test both mobile and desktop performance strategies
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">
                      Getting Started
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-blue-800">
                      <li>Sign up for an account and choose a plan</li>
                      <li>Generate your API token from the dashboard</li>
                      <li>
                        Make your first API request using the examples below
                      </li>
                      <li>Integrate the API into your application</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Authentication Section */}
              <div
                ref={sectionRefs.authentication}
                id="authentication"
                className="scroll-mt-8"
              >
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Authentication
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      All API requests require authentication using a Bearer
                      token. Generate your API token from your dashboard after
                      signing up.
                    </p>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">
                        Authorization Header
                      </h3>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            "Authorization: Bearer YOUR_API_TOKEN",
                            "auth-header"
                          )
                        }
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {copiedCode === "auth-header" ? (
                          <IoCheckmarkCircle className="text-green-400" />
                        ) : (
                          <IoCopy />
                        )}
                      </button>
                    </div>
                    <code className="text-green-400 text-sm">
                      Authorization: Bearer YOUR_API_TOKEN
                    </code>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                      <IoWarning className="text-yellow-600 text-xl mt-1" />
                      <div>
                        <h3 className="text-lg font-bold text-yellow-900 mb-2">
                          Important Security Notes
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-yellow-800">
                          <li>
                            Keep your API token secure and never expose it in
                            client-side code
                          </li>
                          <li>Use environment variables to store your token</li>
                          <li>Regenerate your token if it's compromised</li>
                          <li>
                            Each token has usage limits based on your plan
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Endpoints Section */}
              <div
                ref={sectionRefs.endpoints}
                id="endpoints"
                className="scroll-mt-8"
              >
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      API Endpoints
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Our API provides a single endpoint for PageSpeed analysis
                      with flexible parameters.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="bg-gray-900 px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                            POST
                          </span>
                          <code className="text-green-400">/v1/pagespeed</code>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          PageSpeed Analysis
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Analyze website performance and get comprehensive
                          PageSpeed insights.
                        </p>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">
                              Request Body
                            </h4>
                            <div className="bg-gray-900 rounded-lg p-4">
                              <pre className="text-green-400 text-sm">
                                {`{
  "url": "https://example.com",
  "strategy": "mobile" | "desktop" | "both"
}`}
                              </pre>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">
                              Parameters
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-start space-x-3">
                                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                                  url
                                </code>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    string (required)
                                  </p>
                                  <p className="text-gray-600 text-sm">
                                    The URL of the website to analyze
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                                  strategy
                                </code>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    string (required)
                                  </p>
                                  <p className="text-gray-600 text-sm">
                                    Analysis strategy: "mobile", "desktop", or
                                    "both"
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Examples Section */}
              <div
                ref={sectionRefs.examples}
                id="examples"
                className="scroll-mt-8"
              >
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Code Examples
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Here are examples of how to use our API in different
                      programming languages.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(codeExamples).map(([language, code]) => (
                      <div
                        key={language}
                        className="border border-gray-200 rounded-xl overflow-hidden"
                      >
                        <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FaCode className="text-green-400" />
                            <span className="text-white font-bold capitalize">
                              {language}
                            </span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(code, language)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedCode === language ? (
                              <IoCheckmarkCircle className="text-green-400" />
                            ) : (
                              <IoCopy />
                            )}
                          </button>
                        </div>
                        <div className="bg-gray-900 p-6">
                          <pre className="text-green-400 text-sm overflow-x-auto">
                            <code>{code}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Response Format Section */}
              <div
                ref={sectionRefs.response}
                id="response"
                className="scroll-mt-8"
              >
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Response Format
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      All successful API responses follow a consistent JSON
                      structure with comprehensive performance data.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-900 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">
                          Example Response
                        </h3>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              JSON.stringify(responseExample, null, 2),
                              "response-example"
                            )
                          }
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedCode === "response-example" ? (
                            <IoCheckmarkCircle className="text-green-400" />
                          ) : (
                            <IoCopy />
                          )}
                        </button>
                      </div>
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        <code>{JSON.stringify(responseExample, null, 2)}</code>
                      </pre>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-blue-900 mb-3">
                          Performance Scores
                        </h3>
                        <ul className="space-y-2 text-blue-800 text-sm">
                          <li>
                            <strong>performanceScore:</strong> Overall
                            performance score (0-100)
                          </li>
                          <li>
                            <strong>accessibilityScore:</strong> Accessibility
                            score (0-100)
                          </li>
                          <li>
                            <strong>bestPracticesScore:</strong> Best practices
                            score (0-100)
                          </li>
                          <li>
                            <strong>seoScore:</strong> SEO score (0-100)
                          </li>
                        </ul>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-green-900 mb-3">
                          Core Web Vitals
                        </h3>
                        <ul className="space-y-2 text-green-800 text-sm">
                          <li>
                            <strong>lcp:</strong> Largest Contentful Paint
                            (seconds)
                          </li>
                          <li>
                            <strong>fid:</strong> First Input Delay
                            (milliseconds)
                          </li>
                          <li>
                            <strong>cls:</strong> Cumulative Layout Shift
                            (score)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Handling Section */}
              <div ref={sectionRefs.errors} id="errors" className="scroll-mt-8">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Error Handling
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Our API uses standard HTTP status codes and returns
                      detailed error information.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-red-900 mb-3">
                          Client Errors (4xx)
                        </h3>
                        <ul className="space-y-2 text-red-800 text-sm">
                          <li>
                            <strong>400:</strong> Bad Request - Invalid
                            parameters
                          </li>
                          <li>
                            <strong>401:</strong> Unauthorized - Invalid or
                            missing token
                          </li>
                          <li>
                            <strong>403:</strong> Forbidden - Insufficient
                            credits
                          </li>
                          <li>
                            <strong>404:</strong> Not Found - Invalid endpoint
                          </li>
                          <li>
                            <strong>429:</strong> Too Many Requests - Rate limit
                            exceeded
                          </li>
                        </ul>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-orange-900 mb-3">
                          Server Errors (5xx)
                        </h3>
                        <ul className="space-y-2 text-orange-800 text-sm">
                          <li>
                            <strong>500:</strong> Internal Server Error
                          </li>
                          <li>
                            <strong>502:</strong> Bad Gateway
                          </li>
                          <li>
                            <strong>503:</strong> Service Unavailable
                          </li>
                          <li>
                            <strong>504:</strong> Gateway Timeout
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4">
                        Error Response Format
                      </h3>
                      <pre className="text-red-400 text-sm">
                        {`{
  "success": false,
  "error": {
    "code": "INVALID_URL",
    "message": "The provided URL is not valid",
    "details": "URL must include protocol (http:// or https://)"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentation;
