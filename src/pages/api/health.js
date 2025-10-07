export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Get the backend URL from environment variable or use default
    // Note: In Next.js API routes, we need to use NEXT_PUBLIC_ prefix for client-side env vars
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

    console.log("Testing backend connection to:", backendUrl);

    // Try to connect to the backend
    const response = await fetch(`${backendUrl}/properties`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return res.status(200).json({
        status: "healthy",
        backend: backendUrl,
        message: "Backend is accessible",
      });
    } else {
      return res.status(response.status).json({
        status: "unhealthy",
        backend: backendUrl,
        message: `Backend responded with status: ${response.status}`,
        error: response.statusText,
      });
    }
  } catch (error) {
    console.error("Health check failed:", error);
    return res.status(500).json({
      status: "error",
      message: "Backend is not accessible",
      error: error.message,
      backend: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
    });
  }
}
