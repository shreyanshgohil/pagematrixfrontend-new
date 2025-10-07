import {
  FaSwimmingPool,
  FaCar,
  FaWifi,
  FaShieldAlt,
  FaTree,
  FaUtensils,
  FaGamepad,
  FaDumbbell,
  FaBed,
  FaTv,
  FaParking,
  FaLock,
  FaSnowflake,
  FaFire,
  FaWater,
  FaHome,
  FaBuilding,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import React, { useState } from "react";

const AmenitiesSection = ({ amenities = [] }) => {
  const [showAll, setShowAll] = useState(false);

  if (!amenities || amenities.length === 0) {
    return null;
  }

  // Format amenity name for display
  const formatAmenityName = (amenity) => {
    return amenity
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Icon mapping for amenities
  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();

    if (amenityLower.includes("pool") || amenityLower.includes("swimming")) {
      return <FaSwimmingPool className="text-brand-theme text-lg" />;
    } else if (
      amenityLower.includes("parking") ||
      amenityLower.includes("car")
    ) {
      return <FaCar className="text-brand-theme text-lg" />;
    } else if (
      amenityLower.includes("wifi") ||
      amenityLower.includes("internet")
    ) {
      return <FaWifi className="text-brand-theme text-lg" />;
    } else if (
      amenityLower.includes("security") ||
      amenityLower.includes("guard")
    ) {
      return <FaShieldAlt className="text-brand-theme text-lg" />;
    } else if (
      amenityLower.includes("garden") ||
      amenityLower.includes("landscape")
    ) {
      return <FaTree className="text-brand-theme text-lg" />;
    } else if (
      amenityLower.includes("restaurant") ||
      amenityLower.includes("dining")
    ) {
      return <FaUtensils className="text-brand-theme text-lg" />;
    } else if (
      amenityLower.includes("gym") ||
      amenityLower.includes("fitness")
    ) {
      return <FaDumbbell className="text-brand-theme text-lg" />;
    } else if (amenityLower.includes("play") || amenityLower.includes("kids")) {
      return <FaGamepad className="text-brand-theme text-lg" />;
    } else if (amenityLower.includes("ac") || amenityLower.includes("air")) {
      return <FaSnowflake className="text-brand-theme text-lg" />;
    } else if (
      amenityLower.includes("power") ||
      amenityLower.includes("backup")
    ) {
      return <FaFire className="text-brand-theme text-lg" />;
    } else if (
      amenityLower.includes("water") ||
      amenityLower.includes("supply")
    ) {
      return <FaWater className="text-brand-theme text-lg" />;
    } else if (amenityLower.includes("tv") || amenityLower.includes("cable")) {
      return <FaTv className="text-brand-theme text-lg" />;
    } else if (amenityLower.includes("lock") || amenityLower.includes("safe")) {
      return <FaLock className="text-brand-theme text-lg" />;
    } else {
      return <FaCheckCircle className="text-brand-theme text-lg" />;
    }
  };

  // Sort amenities alphabetically by their formatted names
  const sortedAmenities = [...amenities].sort((a, b) => {
    const nameA = formatAmenityName(a).toLowerCase();
    const nameB = formatAmenityName(b).toLowerCase();
    return nameA.localeCompare(nameB);
  });

  // Determine how many amenities to show based on screen size
  // Default to desktop (6) for SSR, will be updated on client side
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on client side
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const maxItems = isMobile ? 6 : 12;
  const itemsToShow = showAll ? sortedAmenities.length : maxItems;
  const displayedAmenities = sortedAmenities.slice(0, itemsToShow);
  const hasMoreAmenities = sortedAmenities.length > maxItems;

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="bg-white sm:rounded-2xl sm:shadow-xl px-4 py-6 md:px-6 md:py-8 sm:border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-gradient-to-b from-brand-theme to-brand-theme-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-brand-blue-700">
          Features & Amenities
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedAmenities.map((amenity) => (
          <div
            key={amenity}
            className="flex items-center gap-4 p-4 bg-gradient-to-br from-brand-gray-300 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-brand-theme/10 rounded-lg flex items-center justify-center group-hover:bg-brand-theme/20 transition-colors">
              {getAmenityIcon(amenity)}
            </div>
            <span className="font-medium text-brand-blue-700 group-hover:text-brand-theme transition-colors">
              {formatAmenityName(amenity)}
            </span>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {hasMoreAmenities && (
        <div className="mt-6 text-center">
          <button
            onClick={toggleShowAll}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-theme text-white rounded-xl hover:bg-brand-theme-600 transition-all duration-200 hover:shadow-lg font-medium"
          >
            {showAll ? (
              <>
                <span>Show Less</span>
                <FaChevronUp className="text-sm" />
              </>
            ) : (
              <>
                <span>
                  Show More ({sortedAmenities.length - itemsToShow} more)
                </span>
                <FaChevronDown className="text-sm" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AmenitiesSection;
