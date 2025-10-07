import AmenitiesSection from "@/components/common/AmenitiesSection";
import BreadcrumbMenu from "@/components/common/BreadcrumbMenu";
import FAQSection from "@/components/common/FAQSection";
import FloorPlanSection from "@/components/common/FloorPlanSection";
import ModernImageSlider from "@/components/common/ModernImageSlider";
import PropertyMap from "@/components/common/PropertyMap";
import PropertySEO from "@/components/common/SEO/PropertySEO";
import VerticalImageSlider from "@/components/common/VerticalImageSlider";
import Layout from "@/components/layout";
import { APIProvider } from "@vis.gl/react-google-maps";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import {
  FaArrowRight,
  FaBath,
  FaBed,
  FaBuilding,
  FaCalendarAlt,
  FaCar,
  FaClock,
  FaDownload,
  FaEye,
  FaHeart,
  FaInfoCircle,
  FaRulerCombined,
  FaSquare,
  FaStar,
  FaTree,
} from "react-icons/fa";
import { FiMail, FiPhone, FiShare2 } from "react-icons/fi";
import { GoLinkExternal } from "react-icons/go";
import { MdDirections, MdLocationOn, MdVerified } from "react-icons/md";

const PropertyDetailPage = ({ property, error }) => {
  const router = useRouter();
  const modernSliderRef = useRef(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr.`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L.`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const formatPropertyType = (type) => {
    switch (type) {
      case "APARTMENT":
        return "Flats / Apartments";
      case "VILLA":
        return "Villa";
      case "PENTHOUSE":
        return "Penthouse";
      case "COMMERCIAL":
        return "Commercial";
      case "PLOT":
        return "Plot";
      default:
        return type;
    }
  };

  const formatListingType = (type) => {
    switch (type) {
      case "SALE":
        return "For Sale";
      case "RENT":
        return "For Rent";
      case "LEASE":
        return "For Lease";
      default:
        return type;
    }
  };

  // Show error page if there's an error
  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-brand-gray-300">
          <div className="">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h1 className="text-2xl font-bold text-brand-blue-700 mb-4">
                Error Loading Property
              </h1>
              <p className="text-brand-gray">{error}</p>
            </div>
          </div>
        </div>
        {/* Add bottom spacing to prevent footer overlap */}
        <div className="h-16 sm:h-20"></div>
      </Layout>
    );
  }

  // Show loading state while generating new pages (ISR fallback)
  if (router.isFallback) {
    return (
      <Layout>
        <div className="min-h-screen bg-brand-gray-300">
          <div className="">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="mt-4 text-center text-brand-gray">
                  <p>Generating property page...</p>
                  <p className="text-sm">
                    This may take a few seconds for new properties
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add bottom spacing to prevent footer overlap */}
        <div className="h-16 sm:h-20"></div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="min-h-screen bg-brand-gray-300">
          <div className="">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h1 className="text-2xl font-bold text-brand-blue-700 mb-4">
                Property Not Found
              </h1>
              <p className="text-brand-gray">
                The property you're looking for doesn't exist.
              </p>
            </div>
          </div>
        </div>
        {/* Add bottom spacing to prevent footer overlap */}
        <div className="h-16 sm:h-20"></div>
      </Layout>
    );
  }

  return (
    <>
      <PropertySEO
        property={property}
        url={`/properties/${router.query.id}/${router.query.slug}`}
      />
      <Layout>
        <div className="min-h-screen bg-brand-gray-300 property-details-page pb-20">
          <div className="container--boxed px-0 sm:px-6">
            <div className="px-4 sm:px-0">
              <BreadcrumbMenu
                items={[
                  { label: "Home", href: "/" },
                  { label: "Properties", href: "/properties" },
                  { label: property.name, href: "#" },
                ]}
              />
            </div>

            <div className="mt-8">
              {/* Hero Section with Dual Image Sliders */}
              <div className="relative mb-8 px-4 sm:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Main Horizontal Slider - Left Side */}
                  <div className="lg:col-span-3">
                    <ModernImageSlider
                      images={property.images || []}
                      property={property}
                      showControls={true}
                      showThumbnails={false}
                      autoPlay={isAutoPlay}
                      selectedIndex={selectedImageIndex}
                      onImageSelect={setSelectedImageIndex}
                      onPlayChange={setIsAutoPlay}
                      className="modern-image-slider"
                      modernSliderRef={modernSliderRef}
                    />
                  </div>

                  {/* Vertical Slider - Right Side */}
                  <div className="hidden lg:block lg:col-span-1">
                    <VerticalImageSlider
                      images={property.images || []}
                      property={property}
                      showControls={true}
                      autoPlay={isAutoPlay}
                      selectedIndex={selectedImageIndex}
                      onImageSelect={setSelectedImageIndex}
                      modernSliderRef={modernSliderRef}
                      className="vertical-image-slider"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                  {/* Quick Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 px-4 sm:px-0">
                    {(() => {
                      const uniqueRooms = property.floorPlanDetails
                        ? [
                            ...new Set(
                              property.floorPlanDetails.map((fp) => fp.rooms)
                            ),
                          ].sort((a, b) => a - b)
                        : [];
                      const uniqueBathrooms = property.floorPlanDetails
                        ? [
                            ...new Set(
                              property.floorPlanDetails.map((fp) => fp.bathroom)
                            ),
                          ].sort((a, b) => a - b)
                        : [];
                      const uniqueTotalAreas = property.floorPlanDetails
                        ? [
                            ...new Set(
                              property.floorPlanDetails.map(
                                (fp) => fp.totalArea
                              )
                            ),
                          ].sort((a, b) => a - b)
                        : [];

                      return (
                        <>
                          <div className="bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl p-3 sm:p-4 text-white">
                            <div className="flex items-center gap-3">
                              <FaBed className="text-2xl" />
                              <div>
                                <div className="text-sm opacity-90">BHK</div>
                                <div className="text-xl font-bold">
                                  {uniqueRooms.length > 0
                                    ? uniqueRooms.join(",")
                                    : "N/A"}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-xl p-3 sm:p-4 text-white">
                            <div className="flex items-center gap-3">
                              <FaBath className="text-2xl" />
                              <div>
                                <div className="text-sm opacity-90">
                                  Bathrooms
                                </div>
                                <div className="text-xl font-bold">
                                  {uniqueBathrooms.length > 0
                                    ? uniqueBathrooms.join(",")
                                    : "N/A"}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-brand-theme-600 to-brand-theme-800 rounded-xl p-3 sm:p-4 text-white">
                            <div className="flex items-center gap-3">
                              <FaSquare className="text-2xl" />
                              <div>
                                <div className="text-sm opacity-90">Area</div>
                                <div className="text-xl font-bold">
                                  {uniqueTotalAreas.length > 0
                                    ? `${uniqueTotalAreas[0]} sqft`
                                    : "N/A"}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-brand-gray-500 to-brand-gray-600 rounded-xl p-3 sm:p-4 text-white">
                            <div className="flex items-center gap-3">
                              <FaBuilding className="text-2xl" />
                              <div>
                                <div className="text-sm opacity-90">Type</div>
                                <div className="text-xl font-bold">
                                  {formatPropertyType(property.propertyType)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* About Section */}
                  <div className="bg-white sm:rounded-2xl sm:shadow-xl px-4 py-4 sm:py-6 md:px-6 md:py-8 sm:border border-gray-100">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-brand-theme to-brand-theme-600 rounded-full"></div>
                      <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-700">
                        About {property.name}
                      </h2>
                    </div>
                    <div
                      className="prose prose-base sm:prose-lg max-w-none text-brand-gray leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: property.description,
                      }}
                    />
                  </div>

                  {/* Property Details */}
                  <div className="bg-white sm:rounded-2xl sm:shadow-xl px-4 py-4 sm:py-6 md:px-6 md:py-8 sm:border border-gray-100">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6 lg:mb-8">
                      <div className="w-1 h-8 bg-gradient-to-b from-brand-blue-700 to-brand-blue-800 rounded-full"></div>
                      <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-700">
                        Property Details
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      <div className="bg-gradient-to-br from-brand-gray-300 to-white p-4 lg:p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3 sm:mb-3">
                          <div className="w-10 h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                            <FaBuilding className="text-brand-theme text-lg" />
                          </div>
                          <div>
                            <p className="text-sm text-brand-gray font-medium">
                              Category
                            </p>
                            <p className="font-bold text-brand-blue-700">
                              Residential -{" "}
                              {formatPropertyType(property.propertyType)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-brand-gray-300 to-white p-4 lg:p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3 sm:mb-3">
                          <div className="w-10 h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                            <FaClock className="text-brand-theme text-lg" />
                          </div>
                          <div>
                            <p className="text-sm text-brand-gray font-medium">
                              Construction Status
                            </p>
                            <p className="font-bold text-brand-blue-700">
                              Under Construction
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-brand-gray-300 to-white p-4 lg:p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3 sm:mb-3">
                          <div className="w-10 h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                            <FaBuilding className="text-brand-theme text-lg" />
                          </div>
                          <div>
                            <p className="text-sm text-brand-gray font-medium">
                              Project Size
                            </p>
                            <p className="font-bold text-brand-blue-700">
                              4 Tower - 132 Units
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-brand-gray-300 to-white p-4 lg:p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3 sm:mb-3">
                          <div className="w-10 h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                            <FaRulerCombined className="text-brand-theme text-lg" />
                          </div>
                          <div>
                            <p className="text-sm text-brand-gray font-medium">
                              Floors
                            </p>
                            <p className="font-bold text-brand-blue-700">13</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-brand-gray-300 to-white p-4 lg:p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                            <MdVerified className="text-brand-theme text-lg" />
                          </div>
                          <div>
                            <p className="text-sm text-brand-gray font-medium">
                              RERA No
                            </p>
                            <p className="font-bold text-brand-blue-700 text-xs">
                              {property.reraNo || "PR/GJ/GANDHINAGAR/..."}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-brand-gray-300 to-white p-4 lg:p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3 sm:mb-3">
                          <div className="w-10 h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                            <FaSquare className="text-brand-theme text-lg" />
                          </div>
                          <div>
                            <p className="text-sm text-brand-gray font-medium">
                              Plot Area
                            </p>
                            <p className="font-bold text-brand-blue-700">
                              5600 Sq Yard
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-brand-gray-300 to-white p-4 lg:p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3 sm:mb-3">
                          <div className="w-10 h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                            <FaCar className="text-brand-theme text-lg" />
                          </div>
                          <div>
                            <p className="text-sm text-brand-gray font-medium">
                              Parking
                            </p>
                            <p className="font-bold text-brand-blue-700">
                              4W + 2W + Basement
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-brand-gray-300 to-white p-4 lg:p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3 sm:mb-3">
                          <div className="w-10 h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                            <FaEye className="text-brand-theme text-lg" />
                          </div>
                          <div>
                            <p className="text-sm text-brand-gray font-medium">
                              Facing
                            </p>
                            <p className="font-bold text-brand-blue-700">
                              East
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-brand-gray-300 to-white p-4 lg:p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3 sm:mb-3">
                          <div className="w-10 h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                            <FaTree className="text-brand-theme text-lg" />
                          </div>
                          <div>
                            <p className="text-sm text-brand-gray font-medium">
                              Position
                            </p>
                            <p className="font-bold text-brand-blue-700">
                              2 Side Open
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Details */}
                  <div className="bg-gradient-to-br from-brand-theme to-brand-theme-600 sm:rounded-2xl sm:shadow-xl px-4 py-4 sm:py-6 md:px-6 md:py-8 text-white">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-1 h-8 bg-white/30 rounded-full"></div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                        Pricing Details
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 lg:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <FaSquare className="text-2xl" />
                          </div>
                          <div>
                            <p className="text-sm opacity-90">Package Price</p>
                            <p className="text-3xl font-bold">
                              {property.priceMin === property.priceMax
                                ? formatPrice(parseInt(property.priceMin))
                                : `${formatPrice(
                                    parseInt(property.priceMin)
                                  )} - ${formatPrice(
                                    parseInt(property.priceMax)
                                  )}*`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 lg:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <FaRulerCombined className="text-2xl" />
                          </div>
                          <div>
                            <p className="text-sm opacity-90">
                              Price per Sq.Ft.
                            </p>
                            <div className="flex items-center gap-2">
                              <p className="text-2xl font-bold">On Request</p>
                              <FaInfoCircle className="text-lg opacity-70" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floor Plan Section */}
                  <FloorPlanSection
                    floorPlanDetails={property.floorPlanDetails}
                    propertyName={property.name}
                    propertyLocation={`${property.city}, ${property.stateName}`}
                  />

                  {/* Amenities Section */}
                  <AmenitiesSection amenities={property.amenities} />

                  {/* Location & Map Section */}
                  <div className="bg-white sm:rounded-2xl sm:shadow-xl px-4 py-4 sm:py-6 md:px-6 md:py-8 sm:border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-gradient-to-b from-brand-theme to-brand-theme-600 rounded-full"></div>
                        <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-700">
                          Location & Map
                        </h2>
                      </div>
                      <Link
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-all duration-200 hover:shadow-lg self-start sm:self-auto"
                        target="_blank"
                        href={`https://www.google.com/maps?q=${property.location.coordinates[1]},${property.location.coordinates[0]}`}
                      >
                        <MdDirections className="text-lg" />
                        <span>Open in Maps</span>
                        <GoLinkExternal className="text-sm" />
                      </Link>
                    </div>
                    <div className="bg-gradient-to-r from-brand-theme/5 to-brand-theme/10 rounded-xl p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6">
                      <div className="flex items-center gap-3">
                        <MdLocationOn className="text-brand-theme text-2xl" />
                        <div>
                          <p className="text-lg font-semibold text-brand-blue-700">
                            {property.city}, {property.stateName}
                          </p>
                          <p className="text-brand-gray">
                            Prime location with excellent connectivity
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_KEY}>
                        <PropertyMap
                          property={property}
                          className="bg-gray-200 h-[480px] sm:h-[600px] md:h-96"
                        />
                      </APIProvider>
                    </div>
                  </div>

                  {/* FAQ Section */}
                  <FAQSection
                    propertyName={property.name}
                    propertyLocation={`${property.city}, ${property.stateName}`}
                    faqs={property.faqs}
                  />

                  {/* Specification Section */}
                  {property.specification && (
                    <div className="bg-white sm:rounded-lg sm:shadow-md sm:border border-gray-100 p-3 sm:p-4 md:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-brand-blue-700 mb-3 sm:mb-4">
                        Specifications
                      </h3>
                      <div
                        className="prose"
                        dangerouslySetInnerHTML={{
                          __html: property.specification,
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Sticky Contact Card */}
                  <div className="sticky top-24 space-y-6">
                    {/* Contact Agent Card */}
                    <div className="bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 sm:rounded-2xl sm:shadow-2xl px-4 py-6 md:px-6 md:py-8 text-white">
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-3xl font-bold">
                            {property.creatorName
                              ? property.creatorName.charAt(0)
                              : "G"}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {property.creatorName || "Dhrumal Chudasama"}
                        </h3>
                        <p className="text-white/80 text-sm">Property Agent</p>
                        <div className="flex items-center justify-center gap-1 mt-2">
                          <FaStar className="text-yellow-400 text-sm" />
                          <FaStar className="text-yellow-400 text-sm" />
                          <FaStar className="text-yellow-400 text-sm" />
                          <FaStar className="text-yellow-400 text-sm" />
                          <FaStar className="text-yellow-400 text-sm" />
                          <span className="text-white/80 text-sm ml-2">
                            4.9 (127 reviews)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                          <FiPhone className="text-brand-theme text-lg" />
                          <div>
                            <p className="text-sm text-white/80">Phone</p>
                            <p className="font-semibold">07600500508</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                          <FiMail className="text-brand-theme text-lg" />
                          <div>
                            <p className="text-sm text-white/80">Email</p>
                            <p className="font-semibold text-sm">
                              gandhinagarproperty.com@gmail.com
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button className="w-full bg-brand-theme text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-theme-600 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 font-semibold">
                          <FiPhone className="text-lg" />
                          Call Now
                        </button>
                        <button className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/30 transition-all duration-200 font-semibold">
                          <FiMail className="text-lg" />
                          Send Message
                        </button>
                        <button className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/30 transition-all duration-200 font-semibold">
                          <FaDownload className="text-lg" />
                          Download Brochure
                        </button>
                      </div>
                    </div>

                    {/* Request Callback Form */}
                    <div className="bg-white sm:rounded-2xl sm:shadow-xl px-4 py-6 md:px-6 md:py-8 sm:border border-gray-100">
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-brand-theme/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <FaCalendarAlt className="text-brand-theme text-xl" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-blue-700 mb-2">
                          Request Callback
                        </h3>
                        <p className="text-brand-gray text-sm">
                          Get instant response from our experts
                        </p>
                      </div>

                      <form className="space-y-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-theme focus:border-transparent transition-all duration-200 hover:border-brand-theme bg-gray-50"
                          />
                        </div>
                        <div>
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-theme focus:border-transparent transition-all duration-200 hover:border-brand-theme bg-gray-50"
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-theme focus:border-transparent transition-all duration-200 hover:border-brand-theme bg-gray-50"
                          />
                        </div>
                        <div>
                          <textarea
                            placeholder="Your Message (Optional)"
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-theme focus:border-transparent transition-all duration-200 hover:border-brand-theme bg-gray-50 resize-none"
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:from-brand-theme-600 hover:to-brand-theme-800 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 font-semibold"
                        >
                          <FaArrowRight />
                          Request Callback
                        </button>
                      </form>
                    </div>

                    {/* Quick Actions - Commented out */}
                    {/* <div className="bg-white sm:bg-gradient-to-br sm:from-brand-gray-300 sm:to-white sm:rounded-2xl sm:shadow-xl px-4 py-6 md:px-6 md:py-8 sm:border border-gray-100">
                      <h3 className="text-lg font-bold text-brand-blue-700 mb-4">
                        Quick Actions
                      </h3>
                      <div className="space-y-3">
                        <button className="w-full flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-brand-theme/5 transition-all duration-200 group">
                          <div className="w-10 h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center group-hover:bg-brand-theme/20 transition-colors">
                            <FaHeart className="text-brand-theme" />
                          </div>
                          <span className="font-medium text-brand-blue-700">
                            Add to Favorites
                          </span>
                        </button>
                        <button className="w-full flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-brand-theme/5 transition-all duration-200 group">
                          <div className="w-10 h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center group-hover:bg-brand-theme/20 transition-colors">
                            <FiShare2 className="text-brand-theme" />
                          </div>
                          <span className="font-medium text-brand-blue-700">
                            Share Property
                          </span>
                        </button>
                        <button className="w-full flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-brand-theme/5 transition-all duration-200 group">
                          <div className="w-10 h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center group-hover:bg-brand-theme/20 transition-colors">
                            <FaDownload className="text-brand-theme" />
                          </div>
                          <span className="font-medium text-brand-blue-700">
                            Download PDF
                          </span>
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PropertyDetailPage;

export async function getStaticPaths() {
  try {
    // Get the base URL from environment variables or use localhost as fallback
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    // Fetch all properties to generate paths
    const response = await fetch(`${baseUrl}/properties`);

    if (!response.ok) {
      console.warn("Failed to fetch properties for static paths generation");
      return {
        paths: [],
        fallback: "blocking", // Show a loading state while generating new pages
      };
    }

    const data = await response.json();
    const properties = data.data || [];

    // Generate paths for each property
    const paths = properties.map((property) => ({
      params: {
        id: property._id.toString(),
        slug:
          property.slug ||
          property.name?.toLowerCase().replace(/\s+/g, "-") ||
          "property",
      },
    }));

    return {
      paths,
      fallback: "blocking", // Enable ISR for new properties
    };
  } catch (error) {
    console.error("Error generating static paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps(context) {
  const { id } = context.params;

  try {
    // Get the base URL from environment variables or use localhost as fallback
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    // Fetch property data from the API
    const response = await fetch(`${baseUrl}/properties/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return {
          notFound: true, // This will show the 404 page
        };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data) {
      return {
        notFound: true,
      };
    }

    // Return the property data as props with revalidation
    return {
      props: {
        property: data.data,
        error: null,
      },
      revalidate: 3600, // Revalidate every hour (ISR)
    };
  } catch (error) {
    console.error("Error fetching property data:", error);

    // Return error as prop
    return {
      props: {
        property: null,
        error: "Failed to load property data. Please try again later.",
      },
      revalidate: 3600, // Still revalidate on error
    };
  }
}
