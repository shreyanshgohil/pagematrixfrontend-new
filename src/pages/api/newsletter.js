export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Get the backend URL from environment variable or use default
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

    const { email, action = "subscribe" } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        status: 400,
        data: null,
        error: "Email field is missing",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
        status: 400,
        data: null,
        error: "Invalid email format",
      });
    }

    console.log(`Making ${action} request to backend for email:`, email);
    console.log("Backend URL:", backendUrl);

    // Determine the endpoint based on action
    const endpoint = action === "unsubscribe" ? "unsubscribe" : "subscribe";

    // Forward the request to the backend
    const response = await fetch(`${backendUrl}/newsletter/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
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
        status: 500,
        data: null,
        error: parseError.message,
      });
    }

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in newsletter API:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      data: null,
      error: error.message,
    });
  }
}
