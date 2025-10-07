export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Get the backend URL from environment variable or use default
    // Note: In Next.js API routes, we need to use NEXT_PUBLIC_ prefix for client-side env vars
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

    // Create a temporary user ID for the system (24 character hex string like MongoDB ObjectId)
    const tempUserId = "507f1f77bcf86cd799439011"; // This is a valid MongoDB ObjectId format

    // Prepare the request body with required fields
    const requestBody = {
      ...req.body,
      userId: tempUserId, // Use the temporary user ID
    };

    console.log("Sending request to backend:", requestBody);
    console.log("Backend URL:", backendUrl);

    // Check if backend is reachable first
    try {
      console.log("Testing backend connectivity...");
      const healthCheck = await fetch(`${backendUrl}/properties`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Backend health check status:", healthCheck.status);

      if (!healthCheck.ok) {
        return res.status(503).json({
          message: "Backend server is responding but with error",
          status: healthCheck.status,
          statusText: healthCheck.statusText,
          backendUrl: backendUrl,
        });
      }
    } catch (healthError) {
      console.error("Backend health check failed:", healthError);
      return res.status(503).json({
        message:
          "Backend server is not accessible. Please make sure the backend server is running on " +
          backendUrl,
        error: healthError.message,
        backendUrl: backendUrl,
      });
    }

    // Forward the request to the backend
    console.log("Making POST request to backend...");
    const response = await fetch(`${backendUrl}/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Response received:", response.status, response.statusText);

    let data;
    try {
      data = await response.json();
      console.log("Backend response data:", data);
    } catch (parseError) {
      console.error("Failed to parse response:", parseError);
      return res.status(500).json({
        message: "Failed to parse backend response",
        error: parseError.message,
        backendStatus: response.status,
      });
    }

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in properties API:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
