import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  FaUpload,
  FaMapMarkerAlt,
  FaHome,
  FaMoneyBillWave,
  FaInfoCircle,
  FaCheckCircle,
  FaLock,
  FaImage,
  FaTrash,
  FaPlus,
  FaQuestionCircle,
} from "react-icons/fa";

const UploadProperty = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(true);
  const [formData, setFormData] = useState({
    // Basic Information
    propertyType: "APARTMENT",
    listingType: "SALE",
    status: "ACTIVE",
    name: "",
    description: "",

    // Location Details
    addressLine1: "",
    addressLine2: "",
    placeName: "",
    city: "",
    stateName: "",
    postalCode: "",
    country: "India",
    location: {
      type: "Point",
      coordinates: [0, 0], // [longitude, latitude]
    },

    // Pricing
    priceMin: "",
    priceMax: "",
    pricePerSqFt: "",
    currency: "INR",
    negotiable: true,

    // Property Specifications
    tower: "",
    units: "",
    reraNo: "",
    noFloors: "",
    floorNumber: "",
    facing: "",
    possession: "READY TO MOVE",
    possessionDate: "",
    plotArea: "",

    // Floor Plan Details
    floorPlanDetails: [],

    // Content Sections
    whySection: "",
    aboutSection: "",
    specification: "",
    highlights: [],

    // Creator Details
    creatorName: "",
    creatorPhoneNo: "",
    creatorEmail: "",
    creatorProfile: "",
    developerCompany: [],

    // Amenities - Array of selected amenities
    amenities: [],

    // Social Media
    instagram: "",
    facebook: "",
    twitter: "",
    pinterest: "",
    virtualTour: "",

    // SEO and Marketing
    keywords: [],
    featured: false,
    premium: false,

    // Property Specific Fields
    propertyAge: "",
    furnishingStatus: "UNFURNISHED",
    parkingType: "NONE",
    parkingCount: "",
    commercialType: undefined,
    plotType: undefined,

    // Contact Preferences
    contactPreferences: {
      call: true,
      whatsapp: true,
      email: true,
      visit: true,
    },

    // FAQ Section
    faqs: [],
  });

  // Image upload states
  const [images, setImages] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [brochure, setBrochure] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // FAQ states
  const [faqTitle, setFaqTitle] = useState("");
  const [faqBody, setFaqBody] = useState("");
  const [editingFaqIndex, setEditingFaqIndex] = useState(null);
  const [faqErrors, setFaqErrors] = useState({}); // Add separate FAQ errors state
  const [showAddFaqForm, setShowAddFaqForm] = useState(false); // Add state for showing add FAQ form

  // Define steps array
  const steps = [
    { number: 1, title: "Basic Info", icon: FaHome },
    { number: 2, title: "Location", icon: FaMapMarkerAlt },
    { number: 3, title: "Pricing", icon: FaMoneyBillWave },
    { number: 4, title: "Images & Media", icon: FaImage },
    { number: 5, title: "Floor Plans", icon: FaHome },
    { number: 6, title: "Creator & Amenities", icon: FaInfoCircle },
    { number: 7, title: "FAQ", icon: FaQuestionCircle },
  ];

  // Check authentication on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem("jay_property_auth");
    if (authStatus === "authenticated") {
      setIsAuthenticated(true);
      setShowPasswordForm(false);
    }
  }, []);

  // Add noindex headers for additional protection
  useEffect(() => {
    // Add noindex meta tag dynamically
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow, noarchive, nosnippet, noimageindex";
    document.head.appendChild(meta);

    // Add X-Robots-Tag header equivalent
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.href);
    }
  }, []);

  // Handle password authentication
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Replace 'jay123' with your actual password
    if (password === "jay123") {
      setIsAuthenticated(true);
      setShowPasswordForm(false);
      localStorage.setItem("jay_property_auth", "authenticated");
    } else {
      alert("Incorrect password. Access denied.");
      setPassword("");
    }
  };

  // Logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowPasswordForm(true);
    localStorage.removeItem("jay_property_auth");
    setPassword("");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const parts = name.split(".");
      if (parts.length === 2) {
        // Handle two-level nesting (e.g., "parent.child")
        const [parent, child] = parts;
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: type === "checkbox" ? checked : value,
          },
        }));
      } else if (parts.length === 3) {
        // Handle three-level nesting with array indices (e.g., "location.coordinates.0")
        const [parent, child, index] = parts;
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: {
              ...prev[parent][child],
              [index]: type === "checkbox" ? checked : Number(value),
            },
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Clear commercial type when property type changes from commercial
    if (name === "propertyType" && value !== "COMMERCIAL") {
      setFormData((prev) => ({
        ...prev,
        commercialType: undefined,
      }));
      // Clear commercial type error
      setErrors((prev) => ({
        ...prev,
        commercialType: "",
      }));
    }

    // Clear plot type when property type changes from plot
    if (name === "propertyType" && value !== "PLOT") {
      setFormData((prev) => ({
        ...prev,
        plotType: undefined,
      }));
    }
  };

  // Image upload functions
  const uploadToS3 = async (file, folder, propertyId = "temp") => {
    try {
      setIsUploading(true);
      setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

      // Get presigned URL
      const response = await fetch("/api/images/generate-upload-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          folder,
          propertyId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get upload URL");
      }

      const { uploadUrl, fileKey, fileUrl } = await response.json();

      // Upload file directly to S3
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));

      return {
        url: fileUrl,
        key: fileKey,
        name: file.name,
        type: file.type,
      };
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = async (
    files,
    type = "images",
    floorPlanIndex = null
  ) => {
    try {
      const uploadedFiles = [];

      for (const file of files) {
        if (file.size > 10 * 1024 * 1024) {
          // 10MB limit
          alert(`File ${file.name} is too large. Maximum size is 10MB.`);
          continue;
        }

        if (!file.type.startsWith("image/")) {
          alert(`File ${file.name} is not an image.`);
          continue;
        }

        const folder =
          type === "featured"
            ? "featured"
            : type === "brochure"
            ? "brochures"
            : type === "floorplan"
            ? "floorplans"
            : "images";

        const uploadedFile = await uploadToS3(file, folder);
        uploadedFiles.push(uploadedFile);
      }

      // Update state based on type
      switch (type) {
        case "images":
          setImages((prev) => [...prev, ...uploadedFiles]);
          break;
        case "featured":
          setFeaturedImage(uploadedFiles[0]);
          break;
        case "brochure":
          setBrochure(uploadedFiles[0]);
          break;
        case "floorplan":
          if (floorPlanIndex !== null) {
            // Add images to specific floor plan
            setFormData((prev) => {
              const newFloorPlans = [...prev.floorPlanDetails];
              const currentImages =
                newFloorPlans[floorPlanIndex].floorPlanImages || [];
              newFloorPlans[floorPlanIndex] = {
                ...newFloorPlans[floorPlanIndex],
                floorPlanImages: [
                  ...currentImages,
                  ...uploadedFiles.map((file, index) => ({
                    url: file.url,
                    index: currentImages.length + index + 1,
                    caption: `Floor plan ${currentImages.length + index + 1}`,
                  })),
                ],
              };
              return { ...prev, floorPlanDetails: newFloorPlans };
            });
          }
          break;
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload images. Please try again.");
    }
  };

  const removeImage = (index, type = "images", floorPlanIndex = null) => {
    switch (type) {
      case "images":
        setImages((prev) => prev.filter((_, i) => i !== index));
        break;
      case "featured":
        setFeaturedImage(null);
        break;
      case "brochure":
        setBrochure(null);
        break;
      case "floorplan":
        if (floorPlanIndex !== null) {
          setFormData((prev) => {
            const newFloorPlans = [...prev.floorPlanDetails];
            newFloorPlans[floorPlanIndex] = {
              ...newFloorPlans[floorPlanIndex],
              floorPlanImages: newFloorPlans[
                floorPlanIndex
              ].floorPlanImages.filter((_, i) => i !== index),
            };
            return { ...prev, floorPlanDetails: newFloorPlans };
          });
        }
        break;
    }
  };

  const handleFileDrop = (e, type, floorPlanIndex = null) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleImageUpload(files, type, floorPlanIndex);
  };

  const handleFileSelect = (e, type, floorPlanIndex = null) => {
    const files = Array.from(e.target.files);
    handleImageUpload(files, type, floorPlanIndex);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.name) newErrors.name = "Property name is required";
        if (!formData.propertyType)
          newErrors.propertyType = "Property type is required";
        break;
      case 2:
        if (!formData.addressLine1)
          newErrors.addressLine1 = "Address line 1 is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.stateName) newErrors.stateName = "State is required";
        if (!formData.postalCode)
          newErrors.postalCode = "Postal code is required";

        // Enhanced coordinate validation
        const longitude = formData.location.coordinates[0];
        const latitude = formData.location.coordinates[1];

        if (!longitude || !latitude) {
          newErrors.location = "Both longitude and latitude are required";
        } else {
          // Validate coordinate ranges
          if (longitude < -180 || longitude > 180) {
            newErrors.location =
              "Longitude must be between -180 and 180 degrees";
          } else if (latitude < -90 || latitude > 90) {
            newErrors.location = "Latitude must be between -90 and 90 degrees";
          } else if (longitude === 0 && latitude === 0) {
            newErrors.location =
              "Coordinates cannot be (0, 0) - please enter valid coordinates";
          }
        }
        break;
      case 3:
        if (!formData.priceMin)
          newErrors.priceMin = "Minimum price is required";
        if (!formData.priceMax)
          newErrors.priceMax = "Maximum price is required";
        if (
          formData.propertyType === "COMMERCIAL" &&
          !formData.commercialType
        ) {
          newErrors.commercialType =
            "Commercial type is required for commercial properties";
        }
        if (formData.propertyType === "PLOT" && !formData.plotType) {
          newErrors.plotType = "Plot type is required for plot properties";
        }
        break;
      case 4:
        // Images are now optional - no validation required
        break;
      case 5:
        // Floor plans are optional - no validation required
        break;
      case 6:
        if (!formData.creatorName)
          newErrors.creatorName = "Creator name is required";
        if (!formData.creatorPhoneNo)
          newErrors.creatorPhoneNo = "Creator phone is required";
        if (!formData.creatorEmail)
          newErrors.creatorEmail = "Creator email is required";
        break;
      case 7:
        // FAQ is optional - no validation required
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 7));
    } else {
      // Show a user-friendly message about what needs to be filled
      if (currentStep === 6) {
        alert(
          "Please fill in all required creator fields (Name, Phone, Email) before proceeding to the next step."
        );
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only allow submission on the final step
    if (currentStep !== 7) {
      return;
    }

    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Prepare image data for submission (all optional)
      const imageData = {};

      // Only add images if they exist and have valid URLs
      if (images.length > 0) {
        const validImages = images.filter(
          (img) => img && img.url && img.url.trim() !== ""
        );
        if (validImages.length > 0) {
          imageData.images = validImages.map((img, index) => ({
            url: img.url,
            index: index + 1,
            caption: `Property image ${index + 1}`,
          }));
        }
      }

      // Only add featuredImage if it exists and has a valid URL
      if (featuredImage?.url && featuredImage.url.trim() !== "") {
        imageData.featuredImage = featuredImage.url;
      }

      // Only add brochure if it exists and has a valid URL
      if (brochure?.url && brochure.url.trim() !== "") {
        imageData.brochure = brochure.url;
      }

      // Clean and validate FAQ data before submission
      const cleanFaqs = (formData.faqs || [])
        .filter(
          (faq) =>
            faq &&
            faq.title &&
            faq.title.trim() !== "" &&
            faq.body &&
            faq.body.trim() !== ""
        )
        .map((faq) => ({
          title: faq.title.trim(),
          body: faq.body.trim(),
        }));

      // Prepare property data for submission - explicitly construct to avoid unexpected fields
      const submissionData = {
        // Basic Information
        propertyType: formData.propertyType || "APARTMENT",
        listingType: formData.listingType || "SALE",
        status: formData.status || "ACTIVE",
        name: formData.name || "",
        description: formData.description || "",

        // Location Details
        addressLine1: formData.addressLine1 || "",
        addressLine2: formData.addressLine2 || "",
        placeName: formData.placeName || "",
        city: formData.city || "",
        stateName: formData.stateName || "",
        postalCode: formData.postalCode || "",
        country: formData.country || "India",
        location: {
          type: "Point",
          coordinates: [
            formData.location.coordinates[1]
              ? Number(formData.location.coordinates[1])
              : 0,
            formData.location.coordinates[0]
              ? Number(formData.location.coordinates[0])
              : 0,
          ],
        },

        // Pricing
        priceMin: String(formData.priceMin || ""),
        priceMax: String(formData.priceMax || ""),
        pricePerSqFt: formData.pricePerSqFt
          ? Number(formData.pricePerSqFt)
          : undefined,
        currency: formData.currency || "INR",
        negotiable: Boolean(formData.negotiable),

        // Property Specifications
        tower: formData.tower ? Number(formData.tower) : undefined,
        units: formData.units ? Number(formData.units) : undefined,
        reraNo: formData.reraNo || "",
        noFloors: formData.noFloors ? Number(formData.noFloors) : undefined,
        floorNumber: formData.floorNumber
          ? Number(formData.floorNumber)
          : undefined,
        facing: formData.facing || "",
        possession: formData.possession || "READY TO MOVE",
        possessionDate: formData.possessionDate || undefined,
        plotArea: formData.plotArea ? Number(formData.plotArea) : undefined,
        propertyAge: formData.propertyAge
          ? Number(formData.propertyAge)
          : undefined,
        furnishingStatus: formData.furnishingStatus || "UNFURNISHED",
        parkingType: formData.parkingType || "NONE",
        parkingCount: formData.parkingCount
          ? Number(formData.parkingCount)
          : undefined,

        // Floor Plan Details
        floorPlanDetails: formData.floorPlanDetails || [],

        // Content Sections
        whySection: formData.whySection || "",
        aboutSection: formData.aboutSection || "",
        specification: formData.specification || "",
        highlights: formData.highlights || [],

        // Creator Details
        creatorName: formData.creatorName || "",
        creatorPhoneNo: formData.creatorPhoneNo || "",
        creatorEmail: formData.creatorEmail || "",
        creatorProfile: formData.creatorProfile || "",
        developerCompany: formData.developerCompany || [],

        // Amenities
        amenities: formData.amenities || [],

        // Social Media
        instagram: formData.instagram || "",
        facebook: formData.facebook || "",
        twitter: formData.twitter || "",
        pinterest: formData.pinterest || "",
        virtualTour: formData.virtualTour || "",

        // SEO and Marketing
        keywords: formData.keywords || [],
        featured: Boolean(formData.featured),
        premium: Boolean(formData.premium),

        // Contact Preferences
        contactPreferences: {
          call: Boolean(formData.contactPreferences?.call),
          whatsapp: Boolean(formData.contactPreferences?.whatsapp),
          email: Boolean(formData.contactPreferences?.email),
          visit: Boolean(formData.contactPreferences?.visit),
        },

        // FAQ Section
        faqs: cleanFaqs,

        // Property Type Specific Fields
        ...(formData.propertyType === "COMMERCIAL" && formData.commercialType
          ? { commercialType: formData.commercialType }
          : {}),
        ...(formData.propertyType === "PLOT" && formData.plotType
          ? { plotType: formData.plotType }
          : {}),

        // Include image data
        ...imageData,
      };

      // Ensure amenities is always an array
      if (!Array.isArray(submissionData.amenities)) {
        submissionData.amenities = [];
      }

      // Filter out any invalid amenities
      submissionData.amenities = submissionData.amenities.filter(
        (amenity) =>
          amenity && typeof amenity === "string" && amenity.trim() !== ""
      );

      // Ensure contact preferences are properly formatted
      if (
        !submissionData.contactPreferences ||
        typeof submissionData.contactPreferences !== "object"
      ) {
        submissionData.contactPreferences = {
          call: true,
          whatsapp: true,
          email: true,
          visit: true,
        };
      }

      // Validate required fields before submission
      const requiredFields = [
        "name",
        "propertyType",
        "addressLine1",
        "city",
        "stateName",
        "postalCode",
        "priceMin",
        "priceMax",
        "creatorName",
        "creatorPhoneNo",
        "creatorEmail",
      ];

      // Additional validation for property type specific fields
      if (
        submissionData.propertyType === "COMMERCIAL" &&
        !submissionData.commercialType
      ) {
        throw new Error(
          "Commercial type is required for commercial properties"
        );
      }

      if (submissionData.propertyType === "PLOT" && !submissionData.plotType) {
        throw new Error("Plot type is required for plot properties");
      }

      // Validate coordinates before submission
      const longitude = submissionData.location.coordinates[0];
      const latitude = submissionData.location.coordinates[1];

      if (!longitude || !latitude) {
        throw new Error("Both longitude and latitude are required");
      }

      if (longitude < -180 || longitude > 180) {
        throw new Error("Longitude must be between -180 and 180 degrees");
      }

      if (latitude < -90 || latitude > 90) {
        throw new Error("Latitude must be between -90 and 90 degrees");
      }

      if (longitude === 0 && latitude === 0) {
        throw new Error(
          "Coordinates cannot be (0, 0) - please enter valid coordinates"
        );
      }

      const missingFields = requiredFields.filter(
        (field) => !submissionData[field]
      );
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      // Final validation check
      try {
        // Test JSON serialization to catch any circular references or invalid data
        JSON.stringify(submissionData);
      } catch (error) {
        console.error("Data serialization error:", error);
        throw new Error(
          "Form data contains invalid values that cannot be submitted. Please check all fields."
        );
      }

      // Make API call to create property
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();

      // Show success message
      alert("Property uploaded successfully!");

      // Reset form for next property
      setFormData({
        propertyType: "APARTMENT",
        listingType: "SALE",
        status: "ACTIVE",
        name: "",
        description: "",
        addressLine1: "",
        addressLine2: "",
        placeName: "",
        city: "",
        stateName: "",
        postalCode: "",
        country: "India",
        location: {
          type: "Point",
          coordinates: [0, 0], // [longitude, latitude]
        },
        priceMin: "",
        priceMax: "",
        pricePerSqFt: "",
        currency: "INR",
        negotiable: true,
        tower: "",
        units: "",
        reraNo: "",
        noFloors: "",
        floorNumber: "",
        facing: "",
        possession: "READY TO MOVE",
        possessionDate: "",
        plotArea: "",
        floorPlanDetails: [],
        whySection: "",
        aboutSection: "",
        specification: "",
        highlights: [],
        creatorName: "",
        creatorPhoneNo: "",
        creatorEmail: "",
        creatorProfile: "",
        developerCompany: [],
        amenities: [],
        instagram: "",
        facebook: "",
        twitter: "",
        pinterest: "",
        virtualTour: "",
        keywords: [],
        featured: false,
        premium: false,
        propertyAge: "",
        furnishingStatus: "UNFURNISHED",
        parkingType: "NONE",
        parkingCount: "",
        commercialType: undefined,
        plotType: undefined,
        contactPreferences: {
          call: true,
          whatsapp: true,
          email: true,
          visit: true,
        },
        faqs: [],
      });

      // Reset FAQ editing states
      setFaqTitle("");
      setFaqBody("");
      setEditingFaqIndex(null);
      setShowAddFaqForm(false); // Hide add FAQ form
      setFaqErrors({}); // Reset FAQ errors

      // Reset images
      setImages([]);
      setFeaturedImage(null);
      setBrochure(null);

      // Reset to first step
      setCurrentStep(1);

      // Clear any errors
      setErrors({});
    } catch (error) {
      console.error("Error uploading property:", error);
      alert(`Error uploading property: ${error.message}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Password protection screen
  if (showPasswordForm) {
    return (
      <>
        <Head>
          <title>Access Denied</title>
          <meta
            name="robots"
            content="noindex, nofollow, noarchive, nosnippet, noimageindex"
          />
          <meta
            name="googlebot"
            content="noindex, nofollow, noarchive, nosnippet, noimageindex"
          />
          <meta
            name="bingbot"
            content="noindex, nofollow, noarchive, nosnippet, noimageindex"
          />
          <meta
            name="slurp"
            content="noindex, nofollow, noarchive, nosnippet, noimageindex"
          />
          <meta
            name="duckduckbot"
            content="noindex, nofollow, noarchive, nosnippet, noimageindex"
          />
          <meta
            name="baiduspider"
            content="noindex, nofollow, noarchive, nosnippet, noimageindex"
          />
          <meta
            name="yandex"
            content="noindex, nofollow, noarchive, nosnippet, noimageindex"
          />
          <meta name="google" content="nositelinkssearchbox" />
          <meta name="google" content="notranslate" />
          <meta name="referrer" content="no-referrer" />
          <meta name="theme-color" content="#000000" />
          <link rel="canonical" href="/" />
        </Head>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-red-100">
                <FaLock className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-white">
                Private Access Required
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                This page is restricted to authorized personnel only
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Enter access password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Access Page
                </button>
              </div>
            </form>
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Unauthorized access attempts will be logged
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Main form content (only shown after authentication)
  return (
    <>
      <Head>
        <title>Property Management - Private</title>
        <meta
          name="robots"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
        <meta
          name="googlebot"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
        <meta
          name="bingbot"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
        <meta
          name="slurp"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
        <meta
          name="duckduckbot"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
        <meta
          name="baiduspider"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
        <meta
          name="yandex"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
        <meta name="referrer" content="no-referrer" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="/" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with logout button */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Property Management Portal
              </h1>
              <p className="text-gray-600">
                Private property upload system - Authorized access only
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  try {
                    const response = await fetch("/api/health");
                    const data = await response.json();
                    alert(
                      `Backend Status: ${data.status}\nMessage: ${data.message}`
                    );
                  } catch (error) {
                    alert(`Health check failed: ${error.message}`);
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Test Backend
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.number;
                  const isCompleted = currentStep > step.number;

                  return (
                    <div
                      key={step.number}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                          isActive
                            ? "border-blue-500 bg-blue-500 text-white"
                            : isCompleted
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-gray-300 bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isCompleted ? (
                          <FaCheckCircle className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <span
                        className={`text-sm font-medium mt-2 ${
                          isActive
                            ? "text-blue-600"
                            : isCompleted
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
              {currentStep === 6 && renderStep6()}
              {currentStep === 7 && renderStep7()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    prevStep();
                  }}
                  disabled={currentStep === 1}
                  className={`px-6 py-2 rounded-md ${
                    currentStep === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-500 text-white hover:bg-gray-600"
                  }`}
                >
                  Previous
                </button>

                {currentStep < 7 ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      nextStep();
                    }}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-md ${
                      isSubmitting
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {isSubmitting ? "Uploading Property..." : "Upload Property"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  // Helper functions for form steps
  function renderStep1() {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type *
            </label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="APARTMENT">Apartment</option>
              <option value="VILLA">Villa</option>
              <option value="PENTHOUSE">Penthouse</option>
              <option value="PLOT">Plot</option>
              <option value="COMMERCIAL">Commercial</option>
            </select>
            {errors.propertyType && (
              <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>
            )}
            {formData.propertyType === "COMMERCIAL" && (
              <p className="text-blue-600 text-xs mt-1">
                ℹ️ Commercial properties require additional type selection below
              </p>
            )}
            {formData.propertyType === "PLOT" && (
              <p className="text-blue-600 text-xs mt-1">
                ℹ️ Plot properties require additional type selection below
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Listing Type *
            </label>
            <select
              name="listingType"
              value={formData.listingType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="SALE">Sale</option>
              <option value="RENT">Rent</option>
              <option value="LEASE">Lease</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter property name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your property..."
            />
          </div>
        </div>
      </div>
    );
  }

  function renderStep2() {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Location Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Line 1 *
            </label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Street address, building number"
            />
            {errors.addressLine1 && (
              <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Apartment, suite, unit, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Place/Locality *
            </label>
            <input
              type="text"
              name="placeName"
              value={formData.placeName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Locality name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City name"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              name="stateName"
              value={formData.stateName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="State name"
            />
            {errors.stateName && (
              <p className="text-red-500 text-sm mt-1">{errors.stateName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postal Code *
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Postal code"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
            )}
          </div>

          {errors.location && (
            <p className="text-red-500 text-sm mt-1 md:col-span-2">
              {errors.location}
            </p>
          )}

          <div className="md:col-span-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-blue-800 font-medium">
                    Coordinate Information
                  </h4>
                  <ul className="text-blue-700 text-sm mt-1 space-y-1">
                    <li>
                      • <strong>Longitude:</strong> Range from -180° to +180°
                      (negative for West, positive for East)
                    </li>
                    <li>
                      • <strong>Latitude:</strong> Range from -90° to +90°
                      (negative for South, positive for North)
                    </li>
                    <li>
                      • <strong>India coordinates:</strong> Longitude: 68° to
                      97°, Latitude: 8° to 37°
                    </li>
                    <li>
                      • You can get coordinates from Google Maps by
                      right-clicking on a location
                    </li>
                  </ul>
                  <div className="mt-3 space-y-2">
                    <button
                      type="button"
                      onClick={() =>
                        window.open("https://www.google.com/maps", "_blank")
                      }
                      className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                      Open Google Maps
                    </button>
                    <p className="text-xs text-blue-600">
                      Right-click on your property location to get coordinates
                    </p>

                    <div className="flex items-center space-x-2">
                      <label className="text-xs text-blue-700 font-medium">
                        Quick coordinates:
                      </label>
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            const [lng, lat] = e.target.value
                              .split(",")
                              .map(Number);
                            setFormData((prev) => ({
                              ...prev,
                              location: {
                                ...prev.location,
                                coordinates: [lng, lat],
                              },
                            }));
                          }
                        }}
                        className="text-xs border border-blue-300 rounded px-2 py-1 bg-white"
                      >
                        <option value="">Select a city</option>
                        <option value="77.2090,28.7041">Delhi</option>
                        <option value="72.8777,19.0760">Mumbai</option>
                        <option value="77.5946,12.9716">Bangalore</option>
                        <option value="78.9629,20.5937">Chennai</option>
                        <option value="73.8567,18.5204">Pune</option>
                        <option value="75.7873,26.9124">Jaipur</option>
                        <option value="88.3639,22.5726">Kolkata</option>
                        <option value="73.2081,19.9975">Nashik</option>
                        <option value="72.5714,23.0225">Ahmedabad</option>
                        <option value="76.2673,9.9312">Kochi</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longitude (Required)
            </label>
            <input
              type="number"
              step="any"
              name="location.coordinates.0"
              value={formData.location.coordinates[0]}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formData.location.coordinates[0] &&
                formData.location.coordinates[0] >= -180 &&
                formData.location.coordinates[0] <= 180
                  ? "border-green-500 bg-green-50"
                  : formData.location.coordinates[0] &&
                    (formData.location.coordinates[0] < -180 ||
                      formData.location.coordinates[0] > 180)
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
              placeholder="Longitude coordinate (-180 to 180)"
              min="-180"
              max="180"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter longitude value (e.g., 77.2090 for Delhi)
            </p>
            {formData.location.coordinates[0] &&
              formData.location.coordinates[0] >= -180 &&
              formData.location.coordinates[0] <= 180 && (
                <p className="text-xs text-green-600 mt-1">✓ Valid longitude</p>
              )}
            {formData.location.coordinates[0] &&
              (formData.location.coordinates[0] < -180 ||
                formData.location.coordinates[0] > 180) && (
                <p className="text-xs text-red-600 mt-1">
                  ✗ Invalid longitude range
                </p>
              )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latitude (Required)
            </label>
            <input
              type="number"
              step="any"
              name="location.coordinates.1"
              value={formData.location.coordinates[1]}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formData.location.coordinates[1] &&
                formData.location.coordinates[1] >= -90 &&
                formData.location.coordinates[1] <= 90
                  ? "border-green-500 bg-green-50"
                  : formData.location.coordinates[1] &&
                    (formData.location.coordinates[1] < -90 ||
                      formData.location.coordinates[1] > 90)
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
              placeholder="Latitude coordinate (-90 to 90)"
              min="-90"
              max="90"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter latitude value (e.g., 28.7041 for Delhi)
            </p>
            {formData.location.coordinates[1] &&
              formData.location.coordinates[1] >= -90 &&
              formData.location.coordinates[1] <= 90 && (
                <p className="text-xs text-green-600 mt-1">✓ Valid latitude</p>
              )}
            {formData.location.coordinates[1] &&
              (formData.location.coordinates[1] < -90 ||
                formData.location.coordinates[1] > 90) && (
                <p className="text-xs text-red-600 mt-1">
                  ✗ Invalid latitude range
                </p>
              )}
          </div>

          {/* Coordinate Summary */}
          {(formData.location.coordinates[0] ||
            formData.location.coordinates[1]) && (
            <div className="md:col-span-2">
              <div
                className={`border rounded-lg p-4 ${
                  formData.location.coordinates[0] &&
                  formData.location.coordinates[1] &&
                  formData.location.coordinates[0] >= -180 &&
                  formData.location.coordinates[0] <= 180 &&
                  formData.location.coordinates[1] >= -90 &&
                  formData.location.coordinates[1] <= 90 &&
                  !(
                    formData.location.coordinates[0] === 0 &&
                    formData.location.coordinates[1] === 0
                  )
                    ? "border-green-200 bg-green-50"
                    : "border-yellow-200 bg-yellow-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4
                      className={`font-medium ${
                        formData.location.coordinates[0] &&
                        formData.location.coordinates[1] &&
                        formData.location.coordinates[0] >= -180 &&
                        formData.location.coordinates[0] <= 180 &&
                        formData.location.coordinates[1] >= -90 &&
                        formData.location.coordinates[1] <= 90 &&
                        !(
                          formData.location.coordinates[0] === 0 &&
                          formData.location.coordinates[1] === 0
                        )
                          ? "text-green-800"
                          : "text-yellow-800"
                      }`}
                    >
                      Current Coordinates
                    </h4>
                    <p
                      className={`text-sm ${
                        formData.location.coordinates[0] &&
                        formData.location.coordinates[1] &&
                        formData.location.coordinates[0] >= -180 &&
                        formData.location.coordinates[0] <= 180 &&
                        formData.location.coordinates[1] >= -90 &&
                        formData.location.coordinates[1] <= 90 &&
                        !(
                          formData.location.coordinates[0] === 0 &&
                          formData.location.coordinates[1] === 0
                        )
                          ? "text-green-700"
                          : "text-yellow-700"
                      }`}
                    >
                      Longitude: {formData.location.coordinates[0] || "Not set"}{" "}
                      | Latitude:{" "}
                      {formData.location.coordinates[1] || "Not set"}
                    </p>
                  </div>
                  <div className="text-right">
                    {formData.location.coordinates[0] &&
                    formData.location.coordinates[1] &&
                    formData.location.coordinates[0] >= -180 &&
                    formData.location.coordinates[0] <= 180 &&
                    formData.location.coordinates[1] >= -90 &&
                    formData.location.coordinates[1] <= 90 &&
                    !(
                      formData.location.coordinates[0] === 0 &&
                      formData.location.coordinates[1] === 0
                    ) ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓ Valid
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        ⚠ Needs Attention
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderStep3() {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Pricing & Specifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Price *
            </label>
            <input
              type="text"
              name="priceMin"
              value={formData.priceMin}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Minimum price"
            />
            {errors.priceMin && (
              <p className="text-red-500 text-sm mt-1">{errors.priceMin}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Price *
            </label>
            <input
              type="text"
              name="priceMax"
              value={formData.priceMax}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Maximum price"
            />
            {errors.priceMax && (
              <p className="text-red-500 text-sm mt-1">{errors.priceMax}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price per Sq Ft
            </label>
            <input
              type="number"
              name="pricePerSqFt"
              value={formData.pricePerSqFt}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Price per square foot"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="negotiable"
                checked={formData.negotiable}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">
                Price is negotiable
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tower Number
            </label>
            <input
              type="number"
              name="tower"
              value={formData.tower}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tower number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Units
            </label>
            <input
              type="number"
              name="units"
              value={formData.units}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Total units"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RERA Number
            </label>
            <input
              type="text"
              name="reraNo"
              value={formData.reraNo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="RERA number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Floors
            </label>
            <input
              type="number"
              name="noFloors"
              value={formData.noFloors}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Total floors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Floor Number
            </label>
            <input
              type="number"
              name="floorNumber"
              value={formData.floorNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Floor number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facing Direction
            </label>
            <input
              type="text"
              name="facing"
              value={formData.facing}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="North, South, East, West"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Possession Status
            </label>
            <select
              name="possession"
              value={formData.possession}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="READY TO MOVE">Ready to Move</option>
              <option value="IN 1 YEAR">In 1 Year</option>
              <option value="IN 2 YEARS">In 2 Years</option>
              <option value="IN 3 YEARS">In 3 Years</option>
              <option value="3 YEARS+">3 Years+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Possession Date (Optional)
            </label>
            <input
              type="date"
              name="possessionDate"
              value={formData.possessionDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Select possession date"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty if possession status is "Ready to Move"
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plot Area (sq ft)
            </label>
            <input
              type="number"
              name="plotArea"
              value={formData.plotArea}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Plot area in square feet"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Age (years)
            </label>
            <input
              type="number"
              name="propertyAge"
              value={formData.propertyAge}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Property age in years"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Furnishing Status
            </label>
            <select
              name="furnishingStatus"
              value={formData.furnishingStatus}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="UNFURNISHED">Unfurnished</option>
              <option value="SEMI_FURNISHED">Semi Furnished</option>
              <option value="FURNISHED">Furnished</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parking Type
            </label>
            <select
              name="parkingType"
              value={formData.parkingType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="NONE">None</option>
              <option value="COVERED">Covered</option>
              <option value="OPEN">Open</option>
              <option value="BOTH">Both</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parking Count
            </label>
            <input
              type="number"
              name="parkingCount"
              value={formData.parkingCount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Number of parking spaces"
            />
          </div>

          {/* Property Type Specific Fields */}
          {formData.propertyType === "COMMERCIAL" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commercial Type *
              </label>
              <select
                name="commercialType"
                value={formData.commercialType || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Commercial Type</option>
                <option value="OFFICE">Office</option>
                <option value="SHOP">Shop</option>
                <option value="WAREHOUSE">Warehouse</option>
                <option value="INDUSTRIAL">Industrial</option>
                <option value="RETAIL">Retail</option>
                <option value="HOTEL">Hotel</option>
                <option value="RESTAURANT">Restaurant</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Commercial type is required for commercial properties
              </p>
              {errors.commercialType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.commercialType}
                </p>
              )}
            </div>
          )}

          {formData.propertyType === "PLOT" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plot Type *
              </label>
              <select
                name="plotType"
                value={formData.plotType || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Plot Type</option>
                <option value="RESIDENTIAL">Residential</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="AGRICULTURAL">Agricultural</option>
                <option value="INDUSTRIAL">Industrial</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Plot type is required for plot properties
              </p>
              {errors.plotType && (
                <p className="text-red-500 text-sm mt-1">{errors.plotType}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderStep4() {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Images & Media
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          All images and media files are optional but highly recommended for
          better property presentation.
        </p>

        {/* Property Images */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Images (Optional)
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors"
              onDrop={(e) => handleFileDrop(e, "images")}
              onDragOver={(e) => e.preventDefault()}
            >
              <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-500 font-medium">
                    Click to upload
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, "images")}
                  />
                </label>
                <span className="text-gray-500"> or drag and drop</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                PNG, JPG, GIF up to 10MB each
              </p>
            </div>
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">{errors.images}</p>
            )}
          </div>

          {/* Display uploaded images */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={`Property ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index, "images")}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Featured Image */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image (Optional - Main property image)
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors"
              onDrop={(e) => handleFileDrop(e, "featured")}
              onDragOver={(e) => e.preventDefault()}
            >
              {featuredImage ? (
                <div className="space-y-4">
                  <img
                    src={featuredImage.url}
                    alt="Featured"
                    className="mx-auto h-32 w-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(null, "featured")}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove Featured Image
                  </button>
                </div>
              ) : (
                <>
                  <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500 font-medium">
                        Click to upload
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect(e, "featured")}
                      />
                    </label>
                    <span className="text-gray-500"> or drag and drop</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </>
              )}
            </div>
            {errors.featuredImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.featuredImage}
              </p>
            )}
          </div>
        </div>

        {/* Virtual Tour */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Virtual Tour URL (Optional)
            </label>
            <input
              type="url"
              name="virtualTour"
              value={formData.virtualTour}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/virtual-tour"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the URL for virtual tour or 360° view of the property
            </p>
          </div>
        </div>

        {/* Brochure */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brochure (Optional - Property brochure/PDF)
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors"
              onDrop={(e) => handleFileDrop(e, "brochure")}
              onDragOver={(e) => e.preventDefault()}
            >
              {brochure ? (
                <div className="space-y-4">
                  <div className="mx-auto h-32 w-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FaImage className="h-16 w-16 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">{brochure.name}</p>
                  <button
                    type="button"
                    onClick={() => removeImage(null, "brochure")}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove Brochure
                  </button>
                </div>
              ) : (
                <>
                  <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500 font-medium">
                        Click to upload
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => handleFileSelect(e, "brochure")}
                      />
                    </label>
                    <span className="text-gray-500"> or drag and drop</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Images or PDF up to 10MB
                  </p>
                </>
              )}
            </div>
            {errors.brochure && (
              <p className="text-red-500 text-sm mt-1">{errors.brochure}</p>
            )}
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm font-medium mb-2">
              Uploading files...
            </p>
            {Object.entries(uploadProgress).map(([fileName, progress]) => (
              <div key={fileName} className="mb-2">
                <div className="flex justify-between text-xs text-blue-600 mb-1">
                  <span>{fileName}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function renderStep5() {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Floor Plan Details
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Add detailed floor plan information for different configurations
          available in this property.
        </p>

        {/* Floor Plan Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-blue-800 font-medium">Floor Plan Summary</h4>
              <p className="text-blue-600 text-sm">
                {formData.floorPlanDetails.length === 0
                  ? "No floor plans added yet. Add your first floor plan below."
                  : `${formData.floorPlanDetails.length} Floor Plan${
                      formData.floorPlanDetails.length === 1 ? "" : "s"
                    } added`}
              </p>
            </div>
            {formData.floorPlanDetails.length > 0 && (
              <div className="text-right">
                <span className="text-2xl font-bold text-blue-600">
                  {formData.floorPlanDetails.length}
                </span>
                <p className="text-blue-600 text-xs">Total Plans</p>
              </div>
            )}
          </div>
        </div>

        {/* Floor Plan Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <FaInfoCircle className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-800 font-medium">Floor Plan Tips</h4>
              <ul className="text-yellow-700 text-sm mt-1 space-y-1">
                <li>• Add different configurations (1BHK, 2BHK, 3BHK, etc.)</li>
                <li>• Include accurate area measurements in square feet</li>
                <li>• Specify pricing for each configuration</li>
                <li>
                  • Upload floor plan images directly within each floor plan
                  configuration
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {formData.floorPlanDetails.map((floorPlan, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Configuration
                  </label>
                  <input
                    type="text"
                    value={floorPlan.configuration}
                    onChange={(e) => {
                      const newFloorPlans = [...formData.floorPlanDetails];
                      newFloorPlans[index] = {
                        ...newFloorPlans[index],
                        configuration: e.target.value,
                      };
                      setFormData((prev) => ({
                        ...prev,
                        floorPlanDetails: newFloorPlans,
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 2BHK, 3BHK"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    value={floorPlan.price}
                    onChange={(e) => {
                      const newFloorPlans = [...formData.floorPlanDetails];
                      newFloorPlans[index] = {
                        ...newFloorPlans[index],
                        price: Number(e.target.value),
                      };
                      setFormData((prev) => ({
                        ...prev,
                        floorPlanDetails: newFloorPlans,
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Price in INR"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rooms
                  </label>
                  <input
                    type="number"
                    value={floorPlan.rooms}
                    onChange={(e) => {
                      const newFloorPlans = [...formData.floorPlanDetails];
                      newFloorPlans[index] = {
                        ...newFloorPlans[index],
                        rooms: Number(e.target.value),
                      };
                      setFormData((prev) => ({
                        ...prev,
                        floorPlanDetails: newFloorPlans,
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of rooms"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Balcony
                  </label>
                  <input
                    type="number"
                    value={floorPlan.balcony}
                    onChange={(e) => {
                      const newFloorPlans = [...formData.floorPlanDetails];
                      newFloorPlans[index] = {
                        ...newFloorPlans[index],
                        balcony: Number(e.target.value),
                      };
                      setFormData((prev) => ({
                        ...prev,
                        floorPlanDetails: newFloorPlans,
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of balconies"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bathroom
                  </label>
                  <input
                    type="number"
                    value={floorPlan.bathroom}
                    onChange={(e) => {
                      const newFloorPlans = [...formData.floorPlanDetails];
                      newFloorPlans[index] = {
                        ...newFloorPlans[index],
                        bathroom: Number(e.target.value),
                      };
                      setFormData((prev) => ({
                        ...prev,
                        floorPlanDetails: newFloorPlans,
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of bathrooms"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Area (sq ft)
                  </label>
                  <input
                    type="number"
                    value={floorPlan.totalArea}
                    onChange={(e) => {
                      const newFloorPlans = [...formData.floorPlanDetails];
                      newFloorPlans[index] = {
                        ...newFloorPlans[index],
                        totalArea: Number(e.target.value),
                      };
                      setFormData((prev) => ({
                        ...prev,
                        floorPlanDetails: newFloorPlans,
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Total area in sq ft"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carpet Area (sq ft)
                  </label>
                  <input
                    type="number"
                    value={floorPlan.carpetArea}
                    onChange={(e) => {
                      const newFloorPlans = [...formData.floorPlanDetails];
                      newFloorPlans[index] = {
                        ...newFloorPlans[index],
                        carpetArea: Number(e.target.value),
                      };
                      setFormData((prev) => ({
                        ...prev,
                        floorPlanDetails: newFloorPlans,
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Carpet area in sq ft"
                  />
                </div>
              </div>

              {/* Floor Plan Images Section */}
              <div className="mt-6 border-t pt-4">
                <h5 className="text-md font-medium text-gray-700 mb-3">
                  Floor Plan Images
                </h5>

                {/* Image Upload Area */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors mb-4"
                  onDrop={(e) => handleFileDrop(e, "floorplan", index)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <FaUpload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="mt-2">
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500 font-medium">
                        Click to upload
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileSelect(e, "floorplan", index)
                        }
                      />
                    </label>
                    <span className="text-gray-500"> or drag and drop</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>

                {/* Display Floor Plan Images */}
                {floorPlan.floorPlanImages &&
                  floorPlan.floorPlanImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {floorPlan.floorPlanImages.map((image, imageIndex) => (
                        <div key={imageIndex} className="relative group">
                          <img
                            src={image.url}
                            alt={`Floor Plan ${
                              image.caption || imageIndex + 1
                            }`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeImage(imageIndex, "floorplan", index)
                            }
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FaTrash className="w-3 h-3" />
                          </button>
                          <div className="text-xs text-gray-600 mt-1 text-center">
                            {image.caption || `Image ${imageIndex + 1}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const newFloorPlans = formData.floorPlanDetails.filter(
                      (_, i) => i !== index
                    );
                    setFormData((prev) => ({
                      ...prev,
                      floorPlanDetails: newFloorPlans,
                    }));
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove Floor Plan
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                floorPlanDetails: [
                  ...prev.floorPlanDetails,
                  {
                    rooms: 0,
                    balcony: 0,
                    bathroom: 0,
                    totalArea: 0,
                    carpetArea: 0,
                    price: 0,
                    configuration: "",
                    floorPlanImages: [],
                  },
                ],
              }));
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <FaPlus className="w-4 h-4 inline mr-2" />
            Add Floor Plan
          </button>
        </div>
      </div>
    );
  }

  function renderStep6() {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Creator Details & Amenities
        </h3>

        {/* Required Fields Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-blue-800 font-medium mb-2">Required Fields</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div
              className={`flex items-center ${
                formData.creatorName ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="mr-2">{formData.creatorName ? "✓" : "✗"}</span>
              Creator Name
            </div>
            <div
              className={`flex items-center ${
                formData.creatorPhoneNo ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="mr-2">
                {formData.creatorPhoneNo ? "✓" : "✗"}
              </span>
              Phone Number
            </div>
            <div
              className={`flex items-center ${
                formData.creatorEmail ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="mr-2">{formData.creatorEmail ? "✓" : "✗"}</span>
              Email Address
            </div>
          </div>
          <p className="text-blue-600 text-sm mt-2">
            All required fields must be filled before proceeding to the next
            step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Creator Name *
            </label>
            <input
              type="text"
              name="creatorName"
              value={formData.creatorName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.creatorName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your name"
            />
            {errors.creatorName && (
              <p className="text-red-500 text-sm mt-1">{errors.creatorName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="creatorPhoneNo"
              value={formData.creatorPhoneNo}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.creatorPhoneNo ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Phone number"
            />
            {errors.creatorPhoneNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.creatorPhoneNo}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="creatorEmail"
              value={formData.creatorEmail}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.creatorEmail ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email address"
            />
            {errors.creatorEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.creatorEmail}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Creator Profile URL (Optional)
            </label>
            <input
              type="url"
              name="creatorProfile"
              value={formData.creatorProfile}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/profile"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Developer Company ID (Optional)
            </label>
            <input
              type="text"
              name="developerCompany"
              value={
                formData.developerCompany.length > 0
                  ? formData.developerCompany[0]?.companyId || ""
                  : ""
              }
              onChange={(e) => {
                const companyId = e.target.value;
                if (companyId) {
                  setFormData((prev) => ({
                    ...prev,
                    developerCompany: [{ companyId }],
                  }));
                } else {
                  setFormData((prev) => ({
                    ...prev,
                    developerCompany: [],
                  }));
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company ID (MongoDB ObjectId)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the MongoDB ObjectId of the developer company
            </p>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">
            Property Highlights
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Add key highlights that make this property special
          </p>

          <div className="space-y-3">
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => {
                    const newHighlights = [...formData.highlights];
                    newHighlights[index] = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      highlights: newHighlights,
                    }));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter highlight point"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newHighlights = formData.highlights.filter(
                      (_, i) => i !== index
                    );
                    setFormData((prev) => ({
                      ...prev,
                      highlights: newHighlights,
                    }));
                  }}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  highlights: [...prev.highlights, ""],
                }));
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              <FaPlus className="w-4 h-4 inline mr-2" />
              Add Highlight
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">
            Content Sections
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why Choose This Property
              </label>
              <textarea
                name="whySection"
                value={formData.whySection}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Explain why someone should choose this property..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About the Property
              </label>
              <textarea
                name="aboutSection"
                value={formData.aboutSection}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Detailed description about the property..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specifications
              </label>
              <textarea
                name="specification"
                value={formData.specification}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Technical specifications and details..."
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">
            Social Media Links
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Instagram profile URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Facebook profile URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter
              </label>
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Twitter profile URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pinterest
              </label>
              <input
                type="url"
                name="pinterest"
                value={formData.pinterest}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Pinterest profile URL"
              />
            </div>
          </div>
        </div>

        {/* SEO and Marketing */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">
            SEO & Marketing
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords
              </label>
              <div className="space-y-2">
                {formData.keywords.map((keyword, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => {
                        const newKeywords = [...formData.keywords];
                        newKeywords[index] = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          keywords: newKeywords,
                        }));
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter keyword"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newKeywords = formData.keywords.filter(
                          (_, i) => i !== index
                        );
                        setFormData((prev) => ({
                          ...prev,
                          keywords: newKeywords,
                        }));
                      }}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      keywords: [...prev.keywords, ""],
                    }));
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  <FaPlus className="w-4 h-4 inline mr-2" />
                  Add Keyword
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Featured Property
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="premium"
                  checked={formData.premium}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Premium Property
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">
            Contact Preferences
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(formData.contactPreferences).map(([key, value]) => (
              <label key={key} className="flex items-center">
                <input
                  type="checkbox"
                  name={`contactPreferences.${key}`}
                  checked={value}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {key}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Amenities</h4>
          <p className="text-sm text-gray-600 mb-4">
            Select all amenities available in this property
          </p>

          {/* Amenities organized by category */}
          {[
            {
              title: "Security & Safety",
              amenities: [
                "SECURITY",
                "SECURITY_PERSONNEL",
                "CCTV_CAMERAS",
                "FIRE_SAFETY",
                "INTERCOM",
              ],
            },
            {
              title: "Transportation & Access",
              amenities: [
                "LIFT",
                "ESCALATOR",
                "PARKING",
                "COVERED_PARKING",
                "OPEN_PARKING",
                "VALET_PARKING",
                "METRO_STATION",
                "BUS_STOP",
                "AUTO_RICKSHAW_STAND",
              ],
            },
            {
              title: "Recreation & Fitness",
              amenities: [
                "GYMNASIUM",
                "SWIMMING_POOL",
                "CHILDRENS_PLAY_AREA",
                "JOGGING_TRACK",
                "TENNIS_COURT",
                "BADMINTON_COURT",
                "BASKETBALL_COURT",
                "FOOTBALL_GROUND",
                "CRICKET_GROUND",
                "YOGA_ROOM",
                "MEDITATION_ROOM",
              ],
            },
            {
              title: "Social & Community",
              amenities: [
                "CLUB_HOUSE",
                "COMMUNITY_HALL",
                "PARTY_LAWN",
                "BARBECUE_AREA",
                "GARDEN",
                "TERRACE",
                "ROOFTOP_ACCESS",
              ],
            },
            {
              title: "Essential Services",
              amenities: [
                "POWER_BACKUP",
                "GAS_PIPELINE",
                "INTERNET",
                "WATER_SUPPLY",
                "ELECTRICITY",
                "MAINTENANCE_STAFF",
                "HOUSEKEEPING",
              ],
            },
            {
              title: "Shopping & Convenience",
              amenities: [
                "SHOPPING_CENTER",
                "SUPERMARKET",
                "CONVENIENCE_STORE",
                "PHARMACY",
                "ATM",
                "BANK",
              ],
            },
            {
              title: "Healthcare & Education",
              amenities: [
                "HOSPITAL",
                "CLINIC",
                "SCHOOL",
                "COLLEGE",
                "UNIVERSITY",
                "LIBRARY",
              ],
            },
            {
              title: "Property Features",
              amenities: [
                "BALCONY",
                "MODULAR_KITCHEN",
                "WARDROBES",
                "AIR_CONDITIONING",
                "HEATING",
                "VASTU_COMPLIANT",
              ],
            },
            {
              title: "Entertainment",
              amenities: [
                "MOVIE_THEATER",
                "GAMING_ZONE",
                "KIDS_ZONE",
                "RESTAURANT",
                "CAFE",
                "FOOD_COURT",
              ],
            },
            {
              title: "Business & Work",
              amenities: [
                "CO_WORKING_SPACE",
                "BUSINESS_CENTER",
                "CONFERENCE_ROOM",
                "MEETING_ROOM",
              ],
            },
            {
              title: "Pet & Lifestyle",
              amenities: [
                "PET_FRIENDLY",
                "BIKE_FRIENDLY",
                "SENIOR_FRIENDLY",
                "DISABILITY_FRIENDLY",
              ],
            },
          ].map((category) => (
            <div key={category.title} className="mb-6">
              <h5 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">
                {category.title}
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {category.amenities.map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData((prev) => ({
                            ...prev,
                            amenities: [...prev.amenities, amenity],
                          }));
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            amenities: prev.amenities.filter(
                              (a) => a !== amenity
                            ),
                          }));
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {amenity
                        .replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderStep7() {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">FAQ</h3>
        <p className="text-sm text-gray-600 mb-6">
          Add frequently asked questions to help potential buyers understand
          more about the property.
        </p>

        {/* FAQ Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-blue-800 font-medium">FAQ Summary</h4>
              <p className="text-blue-600 text-sm">
                {formData.faqs.length === 0
                  ? "No FAQs added yet. Add your first FAQ below."
                  : `${formData.faqs.length} FAQ${
                      formData.faqs.length === 1 ? "" : "s"
                    } added`}
              </p>
            </div>
            {formData.faqs.length > 0 && (
              <div className="text-right">
                <span className="text-2xl font-bold text-blue-600">
                  {formData.faqs.length}
                </span>
                <p className="text-blue-600 text-xs">Total FAQs</p>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <FaInfoCircle className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-800 font-medium">FAQ Tips</h4>
              <ul className="text-yellow-700 text-sm mt-1 space-y-1">
                <li>
                  • Common questions about property features, amenities, or
                  policies
                </li>
                <li>• Keep answers clear and easy to read in plain text</li>
                <li>
                  • Keep answers concise but informative (recommended: 50-500
                  characters)
                </li>
                <li>
                  • FAQs are optional but help improve property presentation
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {formData.faqs.map((faq, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                {faq.title}
              </h4>
              <div className="text-gray-700">{faq.body}</div>
              <button
                type="button"
                onClick={() => {
                  setEditingFaqIndex(index);
                  setShowAddFaqForm(false);
                  setFaqTitle(faq.title);
                  setFaqBody(faq.body);
                  setFaqErrors({}); // Clear errors when editing FAQ
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit FAQ
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    faqs: prev.faqs.filter((_, i) => i !== index),
                  }));
                }}
                className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove FAQ
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              setEditingFaqIndex(null);
              setShowAddFaqForm(true);
              setFaqTitle("");
              setFaqBody("");
              setFaqErrors({}); // Clear errors when opening new FAQ form
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add New FAQ
          </button>

          {(editingFaqIndex !== null || showAddFaqForm) && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                {editingFaqIndex === null ? "Add New FAQ" : "Edit FAQ"}
              </h4>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={faqTitle}
                  onChange={(e) => {
                    setFaqTitle(e.target.value);
                    // Clear title error when user starts typing
                    if (faqErrors.faqTitle) {
                      setFaqErrors((prev) => ({ ...prev, faqTitle: "" }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="FAQ title"
                />
                {faqErrors.faqTitle && (
                  <p className="text-red-500 text-sm mt-1">
                    {faqErrors.faqTitle}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Body *
                </label>
                <textarea
                  value={faqBody}
                  onChange={(e) => {
                    setFaqBody(e.target.value);
                    // Clear body error when user starts typing
                    if (faqErrors.faqBody) {
                      setFaqErrors((prev) => ({ ...prev, faqBody: "" }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your answer here..."
                />
                {faqErrors.faqBody && (
                  <p className="text-red-500 text-sm mt-1">
                    {faqErrors.faqBody}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Enter your FAQ answer in plain text. Keep it clear and
                  informative.
                </p>

                {/* Preview Section */}
                {faqBody && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      Preview:
                    </h5>
                    <div className="text-sm text-gray-600 border-l-2 border-blue-300 pl-3">
                      {faqBody}
                    </div>
                  </div>
                )}

                {/* Character Counter */}
                <div className="mt-2 text-right">
                  <span
                    className={`text-xs ${
                      faqBody.length > 500 ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {faqBody.length} characters{" "}
                    {faqBody.length > 500 ? "(recommended: max 500)" : ""}
                  </span>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingFaqIndex(null);
                    setShowAddFaqForm(false);
                    setFaqTitle("");
                    setFaqBody("");
                    setFaqErrors({}); // Clear errors when canceling
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    let newFaqErrors = {};
                    if (!faqTitle.trim()) {
                      newFaqErrors.faqTitle = "FAQ title is required.";
                    }
                    if (!faqBody.trim()) {
                      newFaqErrors.faqBody = "FAQ body is required.";
                    }
                    if (faqTitle.trim().length < 5) {
                      newFaqErrors.faqTitle =
                        "FAQ title should be at least 5 characters long.";
                    }
                    if (faqBody.trim().length < 10) {
                      newFaqErrors.faqBody =
                        "FAQ body should be at least 10 characters long.";
                    }
                    setFaqErrors(newFaqErrors);

                    if (Object.keys(newFaqErrors).length > 0) {
                      return;
                    }

                    if (editingFaqIndex === null) {
                      setFormData((prev) => ({
                        ...prev,
                        faqs: [
                          ...prev.faqs,
                          { title: faqTitle.trim(), body: faqBody.trim() },
                        ],
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        faqs: prev.faqs.map((faq, i) =>
                          i === editingFaqIndex
                            ? { title: faqTitle.trim(), body: faqBody.trim() }
                            : faq
                        ),
                      }));
                    }
                    setEditingFaqIndex(null);
                    setShowAddFaqForm(false);
                    setFaqTitle("");
                    setFaqBody("");
                    setFaqErrors({}); // Clear errors after successful save
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {editingFaqIndex === null ? "Add FAQ" : "Save FAQ"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default UploadProperty;
