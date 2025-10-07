export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { fileName, contentType, folder, propertyId } = req.body;

    if (!fileName || !contentType || !folder) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // Call backend API to generate presigned URL
    const backendResponse = await fetch(
      `${
        process.env.BACKEND_URL || "http://localhost:5000"
      }/images/generate-upload-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName,
          contentType,
          folder,
          propertyId,
        }),
      }
    );

    if (!backendResponse.ok) {
      throw new Error("Backend API error");
    }

    const data = await backendResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error generating upload URL:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
