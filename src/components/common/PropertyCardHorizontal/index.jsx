import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import {
  FaBed,
  FaBuilding,
  FaHome,
  FaBath,
  FaRulerCombined,
  FaClock,
  FaCouch,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import styles from "./stype.module.scss";
import { slugify } from "@/utils/common";
import { generateAccessibleButtonText } from "@/utils/accessibility";
import { formatPossession, getPossessionProgress } from "@/utils/constants";

const formatPrice = (price) => {
  if (typeof price !== "number") return "";
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(1)}Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)}L`;
  }
  return `₹${price.toLocaleString()}`;
};

const PropertyCardHorizontal = ({ property }) => {
  const propertyName = property?.name || "Property";
  const profileUrl = `/properties/${property?._id}/${slugify(propertyName)}`;
  const mainImageUrl = property?.images?.[0]?.url || "/images/temp/1.jpg";
  const hasRemoteImage = Boolean(property?.images?.[0]?.url);

  const allBhkConfigs = property?.floorPlanDetails
    ?.map((fp) => fp.rooms)
    ?.filter((rooms, index, arr) => arr.indexOf(rooms) === index)
    ?.sort((a, b) => a - b);

  const noOfTowers = property?.tower;
  const units = property?.units;

  const bathrooms = property?.floorPlanDetails
    ?.map((fp) => fp.bathroom)
    ?.filter((b) => typeof b === "number")
    ?.filter((b, index, arr) => arr.indexOf(b) === index)
    ?.sort((a, b) => a - b);

  const totalAreas = property?.floorPlanDetails
    ?.map((fp) => fp.totalArea)
    ?.filter((a) => typeof a === "number" && a > 0)
    ?.sort((a, b) => a - b);
  const areaMin = totalAreas && totalAreas.length > 0 ? totalAreas[0] : null;
  const areaMax =
    totalAreas && totalAreas.length > 0
      ? totalAreas[totalAreas.length - 1]
      : null;

  const listingType = property?.listingType;
  const propertyType = property?.propertyType;
  const furnishingStatus = property?.furnishingStatus;
  const possession = property?.possession; // string value expected per filters
  const possessionDate = property?.possessionDate; // date value for specific possession date
  const reraNo = property?.reraNo;

  const formatPropertyType = (type) => {
    switch (type) {
      case "APARTMENT":
        return "Apartment";
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

  const showPriceRange =
    property?.priceMin &&
    property?.priceMax &&
    property.priceMin !== property.priceMax;

  const priceDisplay = showPriceRange
    ? `${formatPrice(parseInt(property.priceMin))} - ${formatPrice(
        parseInt(property.priceMax)
      )}`
    : formatPrice(parseInt(property?.priceMin || property?.priceMax || 0));

  return (
    <article
      data-testid="property-card-horizontal"
      className={`relative rounded-3xl overflow-hidden shadow-lg bg-white group ${styles["card-horizontal"]}`}
      role="article"
      aria-labelledby={`property-h-${property?._id}-name`}
    >
      <div className="flex flex-col lg:flex-row">
        <Link
          href={profileUrl}
          className={`relative lg:w-[45%] w-full h-[300px] sm:h-[350px] lg:h-auto lg:self-stretch shrink-0 block ${styles["media"]}`}
          aria-label={`View details for ${propertyName}`}
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
              className="object-cover"
              fill
              quality={95}
            />
          )}
          {/* Overlay badges */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"
            aria-hidden="true"
          />
          <div className="absolute top-4 left-2 right-2 flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {listingType && (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/95 text-brand-blue-700 shadow-lg backdrop-blur-sm border border-white/20">
                  {formatListingType(listingType)}
                </span>
              )}
              {propertyType && (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-brand-theme/90 text-white shadow-lg backdrop-blur-sm">
                  {formatPropertyType(propertyType)}
                </span>
              )}
            </div>
            {reraNo && (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white shadow-lg backdrop-blur-sm"
                title={`RERA: ${reraNo}`}
              >
                <MdVerified className="text-sm" aria-hidden="true" />
                RERA
              </span>
            )}
          </div>
          {/* Floating price badge */}
          <div className="absolute bottom-4 right-2">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-xl border border-white/20">
              <span className="text-lg font-bold text-brand-blue-700">
                {priceDisplay}
              </span>
            </div>
          </div>
          {possession && (
            <div className="absolute bottom-4 left-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 text-brand-blue-700 shadow-lg backdrop-blur-sm border border-white/20">
                <FaClock className="text-sm" aria-hidden="true" />
                {formatPossession(possession, possessionDate)}
              </span>
            </div>
          )}
        </Link>

        <div className="flex-1 p-4 sm:p-5 lg:p-6">
          <div className="mb-3">
            <Link
              href={profileUrl}
              aria-label={`View details for ${propertyName}`}
            >
              <h3
                id={`property-h-${property?._id}-name`}
                className="text-lg sm:text-xl lg:text-2xl leading-tight font-bold text-brand-blue-700 mb-2 group-hover:text-brand-theme hover:text-brand-theme cursor-pointer transition-colors duration-200"
              >
                {propertyName}
              </h3>
            </Link>

            <div
              className="flex items-center gap-2"
              role="group"
              aria-label="Property location"
            >
              <IoLocationOutline
                className="text-brand-theme text-lg"
                aria-hidden="true"
              />
              <span className="text-base text-brand-gray font-medium">
                {property?.city}
                {property?.stateName ? `, ${property.stateName}` : ""}
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-brand-gray-300/30 to-transparent rounded-2xl p-3 mb-4">
            <div
              className="grid grid-cols-2 lg:grid-cols-3 gap-3"
              role="group"
              aria-label="Property statistics"
            >
              {allBhkConfigs && allBhkConfigs.length > 0 && (
                <div className="flex items-center gap-2 bg-white/60 rounded-xl p-2 backdrop-blur-sm">
                  <div className="p-2 bg-brand-theme/10 rounded-lg">
                    <FaBed
                      className="text-brand-theme text-lg"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-sm font-semibold text-brand-blue-700">
                    {allBhkConfigs.join(",")} BHK
                  </span>
                </div>
              )}
              {(areaMin || areaMax) && (
                <div className="flex items-center gap-2 bg-white/60 rounded-xl p-2 backdrop-blur-sm">
                  <div className="p-2 bg-brand-theme/10 rounded-lg">
                    <FaRulerCombined
                      className="text-brand-theme text-lg"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-sm font-semibold text-brand-blue-700">
                    {areaMin && areaMax && areaMin !== areaMax
                      ? `${areaMin} - ${areaMax} sq ft`
                      : `${areaMin || areaMax} sq ft`}
                  </span>
                </div>
              )}
              {bathrooms && bathrooms.length > 0 && (
                <div className="flex items-center gap-2 bg-white/60 rounded-xl p-2 backdrop-blur-sm">
                  <div className="p-2 bg-brand-theme/10 rounded-lg">
                    <FaBath
                      className="text-brand-theme text-lg"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-sm font-semibold text-brand-blue-700">
                    {bathrooms.join(",")} Bath
                  </span>
                </div>
              )}
              {typeof noOfTowers === "number" && (
                <div className="flex items-center gap-2 bg-white/60 rounded-xl p-2 backdrop-blur-sm">
                  <div className="p-2 bg-brand-theme/10 rounded-lg">
                    <FaBuilding
                      className="text-brand-theme text-lg"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-sm font-semibold text-brand-blue-700">
                    {noOfTowers} Tower
                  </span>
                </div>
              )}
              {typeof units === "number" && (
                <div className="flex items-center gap-2 bg-white/60 rounded-xl p-2 backdrop-blur-sm">
                  <div className="p-2 bg-brand-theme/10 rounded-lg">
                    <FaHome
                      className="text-brand-theme text-lg"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-sm font-semibold text-brand-blue-700">
                    {units} Units
                  </span>
                </div>
              )}
              {furnishingStatus && (
                <div className="flex items-center gap-2 bg-white/60 rounded-xl p-2 backdrop-blur-sm">
                  <div className="p-2 bg-brand-theme/10 rounded-lg">
                    <FaCouch
                      className="text-brand-theme text-lg"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-sm font-semibold text-brand-blue-700">
                    {furnishingStatus === "FURNISHED"
                      ? "Furnished"
                      : furnishingStatus === "SEMI_FURNISHED"
                      ? "Semi Furnished"
                      : furnishingStatus === "UNFURNISHED"
                      ? "Unfurnished"
                      : furnishingStatus.replace("_", " ")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
            <div className="text-brand-blue-700 font-bold text-lg sm:text-xl lg:text-2xl">
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

            <Link
              href={profileUrl}
              className="button--primary w-full justify-center sm:w-auto inline-flex items-center gap-2 px-8 py-3.5 button-accessible rounded-xl font-semibold text-base"
              aria-label={generateAccessibleButtonText(
                "View details for",
                propertyName
              )}
            >
              View details
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {possession && (
            <div
              className="hidden sm:block bg-gradient-to-r from-brand-gray-300/20 to-transparent rounded-xl p-4"
              aria-label="Possession progress"
            >
              <div className="flex items-center justify-between text-sm text-brand-gray mb-3">
                <span className="font-medium">Possession Timeline</span>
                <span className="font-semibold text-brand-blue-700">
                  {formatPossession(possession, possessionDate)}
                </span>
              </div>
              <div className="h-3 w-full bg-brand-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-theme via-brand-theme-600 to-emerald-500 rounded-full"
                  style={{
                    width: `${getPossessionProgress(
                      possession,
                      possessionDate
                    )}%`,
                  }}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={getPossessionProgress(
                    possession,
                    possessionDate
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default PropertyCardHorizontal;
