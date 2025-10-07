import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoLocationOutline } from "react-icons/io5";
import { FaBed, FaBuilding, FaHome } from "react-icons/fa";
import styles from "./stype.module.scss";
import { slugify } from "@/utils/common";
import { generateAccessibleButtonText } from "@/utils/accessibility";
import { usePropertyCard } from "@/contexts/PropertyCardContext";
import { useState, useEffect } from "react";

const formatPrice = (price) => {
  if (typeof price !== "number") return "";
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(1)}Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)}L`;
  }
  return `₹${price.toLocaleString()}`;
};

const PropertyCard = ({ property }) => {
  const router = useRouter();
  const { isCardHovered, setHoveredCard, clearHoveredCard } = usePropertyCard();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const propertyName = property?.name || "Property";
  const profileUrl = `/properties/${property?._id}/${slugify(propertyName)}`;
  const mainImageUrl = property?.images?.[0]?.url || "/images/temp/1.jpg";
  const hasRemoteImage = Boolean(property?.images?.[0]?.url);
  const cardId = property?._id;
  const isHovered = isCardHovered(cardId);

  // Detect if device supports touch
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches
      );
    };

    checkTouchDevice();
    window.addEventListener("resize", checkTouchDevice);

    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  // Get all unique BHK configurations from floorPlanDetails
  const allBhkConfigs = property?.floorPlanDetails
    ?.map((fp) => fp.rooms)
    ?.filter((rooms, index, arr) => arr.indexOf(rooms) === index) // Remove duplicates
    ?.sort((a, b) => a - b); // Sort in ascending order

  const noOfTowers = property?.tower;
  const units = property?.units;

  const showPriceRange =
    property?.priceMin &&
    property?.priceMax &&
    property.priceMin !== property.priceMax;

  const handleMouseEnter = () => {
    // Only set hover on non-touch devices
    if (!isTouchDevice) {
      setHoveredCard(cardId);
    }
  };

  const handleMouseLeave = () => {
    // Only clear hover on non-touch devices
    if (!isTouchDevice) {
      clearHoveredCard();
    }
  };

  const handleImageClick = () => {
    // On desktop: redirect to property page
    // On mobile: toggle the card state (original behavior)
    if (isTouchDevice) {
      // Mobile behavior - toggle hover state
      if (isHovered) {
        clearHoveredCard();
      } else {
        setHoveredCard(cardId);
      }
    } else {
      // Desktop behavior - redirect to property page
      router.push(profileUrl);
    }
  };

  return (
    <article
      data-testid="property-card"
      className={`relative rounded-lg h-[429px] overflow-hidden group shadow-lg ${styles["influencer-card"]} property-card`}
      role="article"
      aria-labelledby={`property-${property?._id}-name`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 w-full h-full rounded-lg overflow-hidden bg-white cursor-pointer"
        onClick={handleImageClick}
        role="button"
        tabIndex={0}
        aria-label={
          isTouchDevice
            ? `Toggle details for ${propertyName}`
            : `View details for ${propertyName}`
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleImageClick();
          }
        }}
      >
        {hasRemoteImage ? (
          <img
            src={mainImageUrl}
            alt={`${propertyName} in ${property?.city || ""}, ${
              property?.stateName || ""
            }`}
            className="object-cover w-full h-full"
          />
        ) : (
          <Image
            src={mainImageUrl}
            alt={`${propertyName} placeholder image`}
            className="object-cover image-accessible"
            fill
            quality={95}
          />
        )}
      </div>
      {/* Property description */}
      <div
        className={`absolute z-10 bottom-0 left-0 right-0 p-4 bg-white rounded-b-lg transition-transform ease-in-out duration-300 rounded-t-lg ${
          isHovered
            ? styles["influencer-details-hovered"]
            : styles["influencer-details"]
        }`}
      >
        <h3
          id={`property-${property?._id}-name`}
          className="flex items flex-nowrap text-2xl leading-tight font-semibold text-brand-blue-700"
        >
          <span className="mr-2 line-clamp-1">{propertyName}</span>
          <Image
            src="/images/icons/verified.svg"
            width={13}
            height={14}
            alt="Verified property badge"
            aria-label="This property is verified"
          />
        </h3>

        <div
          className="flex w-full items-center gap-0.5 mb-3"
          role="group"
          aria-label="Property location"
        >
          <IoLocationOutline
            className="text-brand-theme-500"
            aria-hidden="true"
          />
          <span className="text-sm text-brand-gray font-medium">
            {property?.city}
            {property?.stateName ? `, ${property.stateName}` : ""}
          </span>
        </div>

        <div className="mb-2 text-brand-blue-700 font-semibold">
          {showPriceRange ? (
            <span>
              {formatPrice(parseInt(property.priceMin))} -{" "}
              {formatPrice(parseInt(property.priceMax))}
            </span>
          ) : (
            <span>
              {formatPrice(
                parseInt(property?.priceMin || property?.priceMax || 0)
              )}
            </span>
          )}
        </div>

        <div>
          <div
            className="flex items-center gap-y-2 gap-x-4 flex-wrap"
            role="group"
            aria-label="Property statistics"
          >
            {allBhkConfigs && allBhkConfigs.length > 0 && (
              <div className="flex items-center gap-1">
                <FaBed className="text-brand-theme-500" aria-hidden="true" />
                <span className="text-sm text-brand-blue-700 font-medium">
                  {allBhkConfigs.join(",")} BHK
                </span>
              </div>
            )}
            {typeof noOfTowers === "number" && (
              <div className="flex items-center gap-1">
                <FaBuilding
                  className="text-brand-theme-500"
                  aria-hidden="true"
                />
                <span className="text-sm text-brand-blue-700 font-medium">
                  {noOfTowers} Tower
                </span>
              </div>
            )}
            {typeof units === "number" && (
              <div className="flex items-center gap-1">
                <FaHome className="text-brand-theme-500" aria-hidden="true" />
                <span className="text-sm text-brand-blue-700 font-medium">
                  {units} Units
                </span>
              </div>
            )}
          </div>

          <Link
            href={profileUrl}
            className="button--primary w-full inline-block mt-6 button-accessible"
            aria-label={generateAccessibleButtonText(
              "View details for",
              propertyName
            )}
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
