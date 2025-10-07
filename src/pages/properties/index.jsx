import BreadcrumbMenu from "@/components/common/BreadcrumbMenu";
import PropertyCard from "@/components/common/PropertyCard";
import PropertyCardHorizontal from "@/components/common/PropertyCardHorizontal";
import Pagination from "@/components/common/Pagination";
import ResultPerPage from "@/components/common/ResultPerPage";
import Layout from "@/components/layout";
import Filters from "@/components/pages/properties/filters";
import MobileFiltersMenu from "@/components/common/MobileFiltersMenu";
import SEO from "@/components/common/SEO";
import { PropertyCardProvider } from "@/contexts/PropertyCardContext";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { FaListUl, FaMapMarkerAlt } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";
import { formatPossession } from "@/utils/constants";

const PropertiesContent = (props) => {
  const router = useRouter();
  const {
    properties: initialProperties,
    facets: initialFacets,
    totalCount: initialTotalCount,
    currentPage: initialCurrentPage,
    resultsPerPage: initialResultsPerPage,
    initialFilters,
  } = props;

  // State for dynamic data
  const [properties, setProperties] = useState(initialProperties);
  const [facets, setFacets] = useState(initialFacets);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [resultsPerPage, setResultsPerPage] = useState(initialResultsPerPage);
  const [viewMode, setViewMode] = useState("list"); // grid | list

  const setInitialFilterHandler = (newFacets, isClear = false) => {
    const facetsData = newFacets || facets;

    const defaultFilters = {
      propertyType: [],
      listingType: [],
      city: [],
      status: [],
      stateName: [],
      furnishingStatus: [],
      possession: [],
      parkingType: [],
      commercialType: [],
      plotType: [],
      amenities: [],
      priceMin: {
        min: facetsData?.priceMin?.min || 0,
        max: facetsData?.priceMin?.max || 100000000,
      },
      totalArea: {
        min: facetsData?.totalArea?.min || 0,
        max: facetsData?.totalArea?.max || 10000,
      },
      carpetArea: {
        min: facetsData?.carpetArea?.min || 0,
        max: facetsData?.carpetArea?.max || 10000,
      },
      rooms: {
        min: facetsData?.rooms?.min || 1,
        max: facetsData?.rooms?.max || 10,
      },
      noFloors: {
        min: facetsData?.noFloors?.min || 1,
        max: facetsData?.noFloors?.max || 50,
      },
      propertyAge: {
        min: facetsData?.propertyAge?.min || 0,
        max: facetsData?.propertyAge?.max || 100,
      },
    };

    if (initialFilters && !isClear) {
      return {
        propertyType: initialFilters.propertyType || [],
        listingType: initialFilters.listingType || [],
        city: initialFilters.city || [],
        status: initialFilters.status || [],
        stateName: initialFilters.stateName || [],
        furnishingStatus: initialFilters.furnishingStatus || [],
        possession: initialFilters.possession || [],
        parkingType: initialFilters.parkingType || [],
        commercialType: initialFilters.commercialType || [],
        plotType: initialFilters.plotType || [],
        amenities: initialFilters.amenities || [],
        priceMin: initialFilters.priceMin
          ? {
              min:
                initialFilters.priceMin.min !== undefined
                  ? initialFilters.priceMin.min
                  : defaultFilters.priceMin.min,
              max:
                initialFilters.priceMin.max !== undefined
                  ? initialFilters.priceMin.max
                  : defaultFilters.priceMin.max,
            }
          : defaultFilters.priceMin,
        totalArea: initialFilters.totalArea
          ? {
              min:
                initialFilters.totalArea.min !== undefined
                  ? initialFilters.totalArea.min
                  : defaultFilters.totalArea.min,
              max:
                initialFilters.totalArea.max !== undefined
                  ? initialFilters.totalArea.max
                  : defaultFilters.totalArea.max,
            }
          : defaultFilters.totalArea,
        carpetArea: initialFilters.carpetArea
          ? {
              min:
                initialFilters.carpetArea.min !== undefined
                  ? initialFilters.carpetArea.min
                  : defaultFilters.carpetArea.min,
              max:
                initialFilters.carpetArea.max !== undefined
                  ? initialFilters.carpetArea.max
                  : defaultFilters.carpetArea.max,
            }
          : defaultFilters.carpetArea,
        rooms: initialFilters.rooms
          ? {
              min:
                initialFilters.rooms.min !== undefined
                  ? initialFilters.rooms.min
                  : defaultFilters.rooms.min,
              max:
                initialFilters.rooms.max !== undefined
                  ? initialFilters.rooms.max
                  : defaultFilters.rooms.max,
            }
          : defaultFilters.rooms,
        noFloors: initialFilters.noFloors
          ? {
              min:
                initialFilters.noFloors.min !== undefined
                  ? initialFilters.noFloors.min
                  : defaultFilters.noFloors.min,
              max:
                initialFilters.noFloors.max !== undefined
                  ? initialFilters.noFloors.max
                  : defaultFilters.noFloors.max,
            }
          : defaultFilters.noFloors,
        propertyAge: initialFilters.propertyAge
          ? {
              min:
                initialFilters.propertyAge.min !== undefined
                  ? initialFilters.propertyAge.min
                  : defaultFilters.propertyAge.min,
              max:
                initialFilters.propertyAge.max !== undefined
                  ? initialFilters.propertyAge.max
                  : defaultFilters.propertyAge.max,
            }
          : defaultFilters.propertyAge,
      };
    }

    return defaultFilters;
  };

  // Initialize filters from props (pre-applied from getServerSideProps) or default values
  const [filters, setFilters] = useState(setInitialFilterHandler);

  // Add a separate state for user-selected filters (to preserve user choices when facets change)
  const [userSelectedFilters, setUserSelectedFilters] = useState(() => {
    // Initialize user selected filters based on initial filters
    const initialUserSelections = {};
    if (initialFilters?.priceMin) {
      initialUserSelections.priceMin = true;
    }
    if (initialFilters?.totalArea) {
      initialUserSelections.totalArea = true;
    }
    if (initialFilters?.carpetArea) {
      initialUserSelections.carpetArea = true;
    }
    if (initialFilters?.rooms) {
      initialUserSelections.rooms = true;
    }
    if (initialFilters?.noFloors) {
      initialUserSelections.noFloors = true;
    }
    if (initialFilters?.propertyAge) {
      initialUserSelections.propertyAge = true;
    }
    return initialUserSelections;
  });

  // Add loading state for filters
  const [isFiltering, setIsFiltering] = useState(false);

  // Add mobile filters menu state
  const [mobileFiltersMenu, setMobileFiltersMenu] = useState(false);

  // Helper function to format property types for display
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

  // Helper function to format listing types for display
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

  // Helper function to format furnishing status for display
  const formatFurnishingStatus = (status) => {
    switch (status) {
      case "FURNISHED":
        return "Furnished";
      case "SEMI_FURNISHED":
        return "Semi Furnished";
      case "UNFURNISHED":
        return "Unfurnished";
      default:
        return status;
    }
  };

  // Function to fetch data from API
  const fetchData = useCallback(
    async (queryParams, isClear = false, paramUserSelectedFilters = null) => {
      try {
        setIsFiltering(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
        const newUserSelectedFilters =
          paramUserSelectedFilters || userSelectedFilters;
        const url = `${baseUrl}/properties${
          queryParams ? `?${queryParams}` : ""
        }`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.data) {
          const newFacets = data.data.facets || {};
          setProperties(data.data.properties || []);
          setFacets(newFacets);
          setTotalCount(data.data.totalCount || 0);
          setCurrentPage(data.data.currentPage || 1);
          setResultsPerPage(data.data.resultsPerPage || 12);

          // Update filters with new facets if this is not a clear operation
          if (!isClear) {
            setFilters((prevFilters) => {
              const updatedFilters = { ...prevFilters };

              // Only update range filters if they haven't been user-modified
              if (!newUserSelectedFilters.priceMin) {
                updatedFilters.priceMin = {
                  min: newFacets?.priceMin?.min || 0,
                  max: newFacets?.priceMin?.max || 100000000,
                };
              }
              if (!newUserSelectedFilters.totalArea) {
                updatedFilters.totalArea = {
                  min: newFacets?.totalArea?.min || 0,
                  max: newFacets?.totalArea?.max || 10000,
                };
              }
              if (!newUserSelectedFilters.carpetArea) {
                updatedFilters.carpetArea = {
                  min: newFacets?.carpetArea?.min || 0,
                  max: newFacets?.carpetArea?.max || 10000,
                };
              }
              if (!newUserSelectedFilters.rooms) {
                updatedFilters.rooms = {
                  min: newFacets?.rooms?.min || 1,
                  max: newFacets?.rooms?.max || 10,
                };
              }
              if (!newUserSelectedFilters.noFloors) {
                updatedFilters.noFloors = {
                  min: newFacets?.noFloors?.min || 1,
                  max: newFacets?.noFloors?.max || 50,
                };
              }
              if (!newUserSelectedFilters.propertyAge) {
                updatedFilters.propertyAge = {
                  min: newFacets?.propertyAge?.min || 0,
                  max: newFacets?.propertyAge?.max || 100,
                };
              }

              return updatedFilters;
            });
          }
        }
        if (isClear) {
          const initialFilters = setInitialFilterHandler(
            data.data.facets,
            true
          );
          setFilters(initialFilters);
          setUserSelectedFilters({}); // Clear user selections when clearing all filters
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsFiltering(false);
      }
    },
    [userSelectedFilters]
  );

  const buildFilterURL = (
    filters,
    additionalParams = {},
    paramUserSelectedFilters = null
  ) => {
    const queryParams = new URLSearchParams();
    const newUserSelectedFilters =
      paramUserSelectedFilters || userSelectedFilters;
    // Add array filters
    if (filters.propertyType?.length > 0) {
      filters.propertyType.forEach((type) => {
        queryParams.append("propertyType", type);
      });
    }

    if (filters.listingType?.length > 0) {
      filters.listingType.forEach((type) => {
        queryParams.append("listingType", type);
      });
    }

    if (filters.city?.length > 0) {
      filters.city.forEach((city) => {
        queryParams.append("city", city);
      });
    }

    if (filters.status?.length > 0) {
      filters.status.forEach((status) => {
        queryParams.append("status", status);
      });
    }

    if (filters.stateName?.length > 0) {
      filters.stateName.forEach((state) => {
        queryParams.append("stateName", state);
      });
    }

    if (filters.furnishingStatus?.length > 0) {
      filters.furnishingStatus.forEach((status) => {
        queryParams.append("furnishingStatus", status);
      });
    }

    if (filters.possession?.length > 0) {
      filters.possession.forEach((pos) => {
        queryParams.append("possession", pos);
      });
    }

    if (filters.parkingType?.length > 0) {
      filters.parkingType.forEach((type) => {
        queryParams.append("parkingType", type);
      });
    }

    if (filters.commercialType?.length > 0) {
      filters.commercialType.forEach((type) => {
        queryParams.append("commercialType", type);
      });
    }

    if (filters.plotType?.length > 0) {
      filters.plotType.forEach((type) => {
        queryParams.append("plotType", type);
      });
    }

    if (filters.amenities?.length > 0) {
      filters.amenities.forEach((amenity) => {
        queryParams.append("amenities", amenity);
      });
    }

    // Add range filters (only if user has actually selected them)
    if (newUserSelectedFilters.priceMin) {
      if (filters.priceMin.min > (facets?.priceMin?.min || 0)) {
        queryParams.append("priceMin", filters.priceMin.min);
      }
      if (filters.priceMin.max < (facets?.priceMin?.max || 100000000)) {
        queryParams.append("priceMax", filters.priceMin.max);
      }
    }

    if (newUserSelectedFilters.totalArea) {
      if (filters.totalArea.min > (facets?.totalArea?.min || 0)) {
        queryParams.append("totalAreaMin", filters.totalArea.min);
      }
      if (filters.totalArea.max < (facets?.totalArea?.max || 10000)) {
        queryParams.append("totalAreaMax", filters.totalArea.max);
      }
    }

    if (newUserSelectedFilters.carpetArea) {
      if (filters.carpetArea.min > (facets?.carpetArea?.min || 0)) {
        queryParams.append("carpetAreaMin", filters.carpetArea.min);
      }
      if (filters.carpetArea.max < (facets?.carpetArea?.max || 10000)) {
        queryParams.append("carpetAreaMax", filters.carpetArea.max);
      }
    }

    if (newUserSelectedFilters.rooms) {
      if (filters.rooms.min > (facets?.rooms?.min || 1)) {
        queryParams.append("roomsMin", filters.rooms.min);
      }
      if (filters.rooms.max < (facets?.rooms?.max || 10)) {
        queryParams.append("roomsMax", filters.rooms.max);
      }
    }

    if (newUserSelectedFilters.noFloors) {
      if (filters.noFloors.min > (facets?.noFloors?.min || 1)) {
        queryParams.append("noFloorsMin", filters.noFloors.min);
      }
      if (filters.noFloors.max < (facets?.noFloors?.max || 50)) {
        queryParams.append("noFloorsMax", filters.noFloors.max);
      }
    }

    if (newUserSelectedFilters.propertyAge) {
      if (filters.propertyAge.min > (facets?.propertyAge?.min || 0)) {
        queryParams.append("propertyAgeMin", filters.propertyAge.min);
      }
      if (filters.propertyAge.max < (facets?.propertyAge?.max || 100)) {
        queryParams.append("propertyAgeMax", filters.propertyAge.max);
      }
    }

    // Add additional parameters (like page, limit)
    Object.entries(additionalParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });

    return queryParams.toString();
  };

  const updateURLWithFilters = useCallback(
    (newFilters, paramUserSelectedFilters = {}) => {
      const newUserSelectedFilters =
        paramUserSelectedFilters || userSelectedFilters;
      // Create a clean query object instead of copying existing one
      const query = {};

      // Update array filters
      if (newFilters.propertyType?.length > 0) {
        query.propertyType = newFilters.propertyType.map((type) =>
          type.toLowerCase()
        );
      }

      if (newFilters.listingType?.length > 0) {
        query.listingType = newFilters.listingType.map((type) =>
          type.toLowerCase()
        );
      }

      if (newFilters.city?.length > 0) {
        query.city = newFilters.city.map((city) => city.toLowerCase());
      }

      if (newFilters.status?.length > 0) {
        query.status = newFilters.status.map((status) => status.toLowerCase());
      }

      if (newFilters.stateName?.length > 0) {
        query.stateName = newFilters.stateName.map((state) =>
          state.toLowerCase()
        );
      }

      if (newFilters.furnishingStatus?.length > 0) {
        query.furnishingStatus = newFilters.furnishingStatus.map((status) =>
          status.toLowerCase()
        );
      }

      if (newFilters.possession?.length > 0) {
        query.possession = newFilters.possession.map((pos) =>
          pos.toLowerCase()
        );
      }

      if (newFilters.parkingType?.length > 0) {
        query.parkingType = newFilters.parkingType.map((type) =>
          type.toLowerCase()
        );
      }

      if (newFilters.commercialType?.length > 0) {
        query.commercialType = newFilters.commercialType.map((type) =>
          type.toLowerCase()
        );
      }

      if (newFilters.plotType?.length > 0) {
        query.plotType = newFilters.plotType.map((type) => type.toLowerCase());
      }

      if (newFilters.amenities?.length > 0) {
        query.amenities = newFilters.amenities.map((amenity) =>
          amenity.toLowerCase()
        );
      }

      // Update range filters (only if user has actually selected them)
      if (newUserSelectedFilters.priceMin) {
        query.priceMin = newFilters.priceMin.min;
        query.priceMax = newFilters.priceMin.max;
      }

      if (newUserSelectedFilters.totalArea) {
        query.totalAreaMin = newFilters.totalArea.min;
        query.totalAreaMax = newFilters.totalArea.max;
      }

      if (newUserSelectedFilters.carpetArea) {
        query.carpetAreaMin = newFilters.carpetArea.min;
        query.carpetAreaMax = newFilters.carpetArea.max;
      }

      if (newUserSelectedFilters.rooms) {
        query.roomsMin = newFilters.rooms.min;
        query.roomsMax = newFilters.rooms.max;
      }

      if (newUserSelectedFilters.noFloors) {
        query.noFloorsMin = newFilters.noFloors.min;
        query.noFloorsMax = newFilters.noFloors.max;
      }

      if (newUserSelectedFilters.propertyAge) {
        query.propertyAgeMin = newFilters.propertyAge.min;
        query.propertyAgeMax = newFilters.propertyAge.max;
      }

      // Reset to page 1 when filters change
      query.page = 1;

      router.replace(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    },
    [router, facets]
  );

  const filtersChangeHandler = ({ type, key, value }) => {
    const tempCopy = JSON.parse(JSON.stringify(filters));

    if (type === "customRefinement") {
      if (tempCopy?.[key]?.includes(value)) {
        tempCopy[key] = tempCopy[key].filter((item) => item !== value);
      } else if (tempCopy?.[key]) {
        tempCopy[key] = [...tempCopy[key], value];
      } else {
        tempCopy[key] = [value];
      }

      // Apply checkbox filters immediately
      setFilters(tempCopy);

      // Build query string and fetch data
      const queryString = buildFilterURL(tempCopy);

      fetchData(queryString);

      // Update URL
      updateURLWithFilters(tempCopy);
    } else if (type === "range") {
      tempCopy[key] = value;

      // For range filters, update local state and immediately apply
      setFilters(tempCopy);

      const tempUserSelectedFilters = JSON.parse(
        JSON.stringify(userSelectedFilters)
      );
      // Mark this range filter as user-selected
      tempUserSelectedFilters[key] = true;
      setUserSelectedFilters(tempUserSelectedFilters);

      // Build query string and fetch data
      const queryString = buildFilterURL(tempCopy, {}, tempUserSelectedFilters);
      fetchData(queryString, false, tempUserSelectedFilters);

      // Update URL
      updateURLWithFilters(tempCopy, tempUserSelectedFilters);
    }
  };

  const clearAllFilters = () => {
    const initialFilters = setInitialFilterHandler();
    setFilters(initialFilters);
    setUserSelectedFilters({}); // Clear user selections

    // Clear URL completely when clearing all filters
    router.replace(
      {
        pathname: "/properties",
        query: {},
      },
      undefined,
      { shallow: true }
    );

    // Fetch data without filters
    fetchData("", true);
  };

  const hasActiveFilters = () => {
    return (
      filters.propertyType.length > 0 ||
      filters.listingType.length > 0 ||
      filters.city.length > 0 ||
      filters.status.length > 0 ||
      filters.stateName.length > 0 ||
      filters.furnishingStatus.length > 0 ||
      filters.possession.length > 0 ||
      filters.parkingType.length > 0 ||
      filters.commercialType.length > 0 ||
      filters.plotType.length > 0 ||
      filters.amenities.length > 0 ||
      userSelectedFilters.priceMin ||
      userSelectedFilters.totalArea ||
      userSelectedFilters.carpetArea ||
      userSelectedFilters.rooms ||
      userSelectedFilters.noFloors ||
      userSelectedFilters.propertyAge
    );
  };

  return (
    <main className="bg-brand-gray-300">
      <div className="container--boxed">
        <div>
          <BreadcrumbMenu />
        </div>
        <div className="grid grid-cols-12 lg:gap-6 xl:gap-8">
          <div className="col-span-3 hidden lg:block pb-8">
            <Filters
              facets={facets}
              filters={filters}
              filtersChangeHandler={filtersChangeHandler}
              clearAllFilters={clearAllFilters}
              hasActiveFilters={hasActiveFilters()}
              isFiltering={isFiltering}
            />
          </div>
          <div className="col-span-12 lg:col-span-9">
            <h1 className="heading--h3 text-brand-blue-700 font-semibold mb-4">
              Properties for Sale and Rent
            </h1>
            <div className="mb-10">
              <div className="mb-4">
                <p className="text-brand-gray mb-4">
                  We've found <strong>{totalCount || properties.length}</strong>{" "}
                  result{totalCount !== 1 ? "s" : ""} that match
                  {totalCount !== 1 ? "" : "es"} your criteria. All of our
                  properties are carefully verified to ensure they meet your
                  expectations. Learn more about them below.
                </p>
                {hasActiveFilters() && (
                  <div className="mb-4 p-4 bg-brand-theme/5 border border-brand-theme/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-brand-theme">
                        Active Filters:
                      </span>
                      <button
                        onClick={clearAllFilters}
                        className="text-sm text-brand-theme hover:underline font-medium"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {filters.propertyType.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Property Type:{" "}
                          {filters.propertyType
                            .map(formatPropertyType)
                            .join(", ")}
                        </span>
                      )}
                      {filters.listingType.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Listing Type:{" "}
                          {filters.listingType
                            .map(formatListingType)
                            .join(", ")}
                        </span>
                      )}
                      {filters.city.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme capitalize">
                          City: {filters.city.join(", ")}
                        </span>
                      )}
                      {filters.furnishingStatus.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Furnishing:{" "}
                          {filters.furnishingStatus
                            .map(formatFurnishingStatus)
                            .join(", ")}
                        </span>
                      )}
                      {filters.possession.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Possession:{" "}
                          {filters.possession.map(formatPossession).join(", ")}
                        </span>
                      )}
                      {filters.amenities.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Amenities:{" "}
                          {filters.amenities
                            .map((amenity) =>
                              amenity
                                .split("_")
                                .map(
                                  (word) =>
                                    word.charAt(0) + word.slice(1).toLowerCase()
                                )
                                .join(" ")
                            )
                            .join(", ")}
                        </span>
                      )}
                      {userSelectedFilters.priceMin && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Price: ₹{filters.priceMin.min.toLocaleString()} - ₹
                          {filters.priceMin.max.toLocaleString()}
                        </span>
                      )}
                      {userSelectedFilters.totalArea && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Total Area: {filters.totalArea.min.toLocaleString()} -{" "}
                          {filters.totalArea.max.toLocaleString()} sq ft
                        </span>
                      )}
                      {userSelectedFilters.carpetArea && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Carpet Area: {filters.carpetArea.min.toLocaleString()}{" "}
                          - {filters.carpetArea.max.toLocaleString()} sq ft
                        </span>
                      )}

                      {userSelectedFilters.rooms && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Rooms: {filters.rooms.min} - {filters.rooms.max} BHK
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <nav className="border-b border-b-brand-blue-700/25 mb-6 hidden lg:flex ">
                <ul className="flex gap-6">
                  <li
                    onClick={() => setViewMode("list")}
                    className={`-mb-px transition-opacity h-10 inline-flex items-center cursor-pointer border-b-2 ${
                      viewMode === "list"
                        ? "border-b-brand-theme text-brand-theme font-semibold"
                        : "border-b-transparent text-brand-gray"
                    } text-sm`}
                  >
                    <FaListUl className="mr-2" />
                    List view
                  </li>
                  <li
                    onClick={() => setViewMode("grid")}
                    className={`-mb-px transition-opacity h-10 inline-flex items-center cursor-pointer border-b-2 ${
                      viewMode === "grid"
                        ? "border-b-brand-theme text-brand-theme font-semibold"
                        : "border-b-transparent text-brand-gray"
                    } text-sm`}
                  >
                    <BsFillGrid3X3GapFill className="mr-2" />
                    Grid view
                  </li>

                  <li
                    className={`-mb-px transition-opacity h-10 inline-flex items-center text-brand-gray cursor-not-allowed text-sm`}
                  >
                    <FaMapMarkerAlt className="mr-2" />
                    Map view (coming soon)
                  </li>
                </ul>
              </nav>
              <div className={`lg:hidden mt-8 flex gap-4 mb-8`}>
                <button
                  onClick={() => setMobileFiltersMenu(true)}
                  className="text-brand-gray rounded-md flex items-center gap-1.5 flex-1 justify-center py-3 px-4 border border-solid border-brand-gray-500 transition-all duration-300 hover:bg-brand-theme/10 hover:border-brand-theme hover:text-brand-theme font-semibold"
                >
                  <VscSettings className="mr-2 font-semibold text-lg" />
                  Filters
                </button>
                <div className="flex border border-solid border-brand-gray-500 rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-1.5 px-4 py-3 transition-all duration-300 font-semibold text-sm ${
                      viewMode === "list"
                        ? "bg-brand-theme text-white"
                        : " text-brand-gray hover:bg-brand-theme/10"
                    }`}
                  >
                    <FaListUl className="text-lg" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-1.5 px-4 py-3 transition-all duration-300 font-semibold text-sm ${
                      viewMode === "grid"
                        ? "bg-brand-theme text-white"
                        : " text-brand-gray hover:bg-brand-theme/10"
                    }`}
                  >
                    <BsFillGrid3X3GapFill className="text-lg" />
                  </button>
                </div>
              </div>

              {viewMode === "grid" ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 ">
                  {properties.length > 0 ? (
                    properties.map((property, key) => (
                      <PropertyCard key={key} property={property} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="max-w-md mx-auto">
                        <div className="text-6xl mb-4">🏠</div>
                        <h3 className="text-xl font-semibold text-brand-gray-700 mb-2">
                          No properties found
                        </h3>
                        <p className="text-brand-gray mb-6">
                          {hasActiveFilters()
                            ? "Try adjusting your filters or clearing some of them to see more results."
                            : "There are currently no properties available. Please check back later."}
                        </p>
                        {hasActiveFilters() && (
                          <button
                            onClick={clearAllFilters}
                            className="inline-flex items-center px-4 py-2 bg-brand-theme text-white rounded-md hover:bg-brand-theme/90 transition-colors"
                          >
                            Clear All Filters
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid gap-4 grid-cols-1 ">
                  {properties.length > 0 ? (
                    properties.map((property, key) => (
                      <PropertyCardHorizontal key={key} property={property} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="max-w-md mx-auto">
                        <div className="text-6xl mb-4">🏠</div>
                        <h3 className="text-xl font-semibold text-brand-gray-700 mb-2">
                          No properties found
                        </h3>
                        <p className="text-brand-gray mb-6">
                          {hasActiveFilters()
                            ? "Try adjusting your filters or clearing some of them to see more results."
                            : "There are currently no properties available. Please check back later."}
                        </p>
                        {hasActiveFilters() && (
                          <button
                            onClick={clearAllFilters}
                            className="inline-flex items-center px-4 py-2 bg-brand-theme text-white rounded-md hover:bg-brand-theme/90 transition-colors"
                          >
                            Clear All Filters
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between flex-col sm:flex-row gap-4 mb-16">
              <ResultPerPage
                currentLimit={resultsPerPage || 12}
                onLimitChange={(newLimit) => {
                  const newQuery = {
                    ...router.query,
                    limit: newLimit,
                    page: 1,
                  };
                  router.push(
                    {
                      pathname: router.pathname,
                      query: newQuery,
                    },
                    undefined,
                    { shallow: true }
                  );

                  // Build query string with current filters and new limit
                  const queryString = buildFilterURL(filters, {
                    limit: newLimit,
                    page: 1,
                  });
                  fetchData(queryString);
                }}
              />
              <Pagination
                currentPage={currentPage || 1}
                totalPages={Math.ceil(
                  (totalCount || properties.length) / (resultsPerPage || 12)
                )}
                onPageChange={(page) => {
                  const newQuery = { ...router.query, page };
                  router.push(
                    {
                      pathname: router.pathname,
                      query: newQuery,
                    },
                    undefined,
                    { shallow: true }
                  );

                  // Build query string with current filters and new page
                  const queryString = buildFilterURL(filters, { page });
                  fetchData(queryString);

                  // Scroll to top when page changes
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <MobileFiltersMenu
        mobileFiltersMenu={mobileFiltersMenu}
        setMobileFiltersMenu={setMobileFiltersMenu}
        facets={facets}
        filters={filters}
        filtersChangeHandler={filtersChangeHandler}
        clearAllFilters={clearAllFilters}
        hasActiveFilters={hasActiveFilters()}
        isFiltering={isFiltering}
      />
    </main>
  );
};

const Properties = ({ data, initialFilters }) => {
  const { facets, properties, totalCount, currentPage, resultsPerPage } = data;
  return (
    <>
      <SEO
        title="Properties for Sale and Rent | 11yards Real Estate"
        description="Browse thousands of verified properties for sale, rent and lease across India. Find apartments, houses, commercial properties and plots with detailed information, virtual tours and RERA verification."
        keywords="properties for sale, properties for rent, real estate listings, apartments, houses, commercial properties, plots, property search, 11yards, India"
        url="/properties"
      />
      <Layout>
        <PropertyCardProvider>
          <PropertiesContent
            facets={facets}
            properties={properties}
            totalCount={totalCount}
            currentPage={currentPage}
            resultsPerPage={resultsPerPage}
            initialFilters={initialFilters}
          />
        </PropertyCardProvider>
      </Layout>
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    const queryFilters = {};
    // Build query string for backend
    const queryParams = new URLSearchParams();

    // Add filter parameters and build initial filters object
    if (query.propertyType) {
      if (Array.isArray(query.propertyType)) {
        query.propertyType.forEach((type) => {
          queryParams.append("propertyType", type.toUpperCase());
        });
        queryFilters.propertyType = [
          ...query.propertyType.map((type) => type.toUpperCase()),
        ];
      } else {
        queryParams.append("propertyType", query.propertyType.toUpperCase());
        queryFilters.propertyType = [query.propertyType.toUpperCase()];
      }
    }

    if (query.listingType) {
      if (Array.isArray(query.listingType)) {
        query.listingType.forEach((type) => {
          queryParams.append("listingType", type.toUpperCase());
        });
        queryFilters.listingType = [
          ...query.listingType.map((type) => type.toUpperCase()),
        ];
      } else {
        queryParams.append("listingType", query.listingType.toUpperCase());
        queryFilters.listingType = [query.listingType.toUpperCase()];
      }
    }

    if (query.city) {
      if (Array.isArray(query.city)) {
        query.city.forEach((city) => {
          queryParams.append(
            "city",
            city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
          );
        });
        queryFilters.city = [
          ...query.city.map(
            (city) => city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
          ),
        ];
      } else {
        queryParams.append(
          "city",
          query.city.charAt(0).toUpperCase() + query.city.slice(1).toLowerCase()
        );
        queryFilters.city = [
          query.city.charAt(0).toUpperCase() +
            query.city.slice(1).toLowerCase(),
        ];
      }
    }

    if (query.furnishingStatus) {
      if (Array.isArray(query.furnishingStatus)) {
        query.furnishingStatus.forEach((status) => {
          queryParams.append("furnishingStatus", status.toUpperCase());
        });
        queryFilters.furnishingStatus = [
          ...query.furnishingStatus.map((status) => status.toUpperCase()),
        ];
      } else {
        queryParams.append(
          "furnishingStatus",
          query.furnishingStatus.toUpperCase()
        );
        queryFilters.furnishingStatus = [query.furnishingStatus.toUpperCase()];
      }
    }

    if (query.possession) {
      if (Array.isArray(query.possession)) {
        query.possession.forEach((pos) => {
          queryParams.append("possession", pos.toUpperCase());
        });
        queryFilters.possession = [
          ...query.possession.map((pos) => pos.toUpperCase()),
        ];
      } else {
        queryParams.append("possession", query.possession.toUpperCase());
        queryFilters.possession = [query.possession.toUpperCase()];
      }
    }

    if (query.amenities) {
      if (Array.isArray(query.amenities)) {
        query.amenities.forEach((amenity) => {
          queryParams.append("amenities", amenity.toUpperCase());
        });
        queryFilters.amenities = [
          ...query.amenities.map((amenity) => amenity.toUpperCase()),
        ];
      } else {
        queryParams.append("amenities", query.amenities.toUpperCase());
        queryFilters.amenities = [query.amenities.toUpperCase()];
      }
    }

    // Add range filter parameters
    if (query.priceMin || query.priceMax) {
      if (query.priceMin) {
        queryParams.append("priceMin", query.priceMin);
      }
      if (query.priceMax) {
        queryParams.append("priceMax", query.priceMax);
      }
      queryFilters.priceMin = {
        min: query.priceMin ? parseInt(query.priceMin) : undefined,
        max: query.priceMax ? parseInt(query.priceMax) : undefined,
      };
    }

    if (query.totalAreaMin || query.totalAreaMax) {
      if (query.totalAreaMin) {
        queryParams.append("totalAreaMin", query.totalAreaMin);
      }
      if (query.totalAreaMax) {
        queryParams.append("totalAreaMax", query.totalAreaMax);
      }
      queryFilters.totalArea = {
        min: query.totalAreaMin ? parseInt(query.totalAreaMin) : undefined,
        max: query.totalAreaMax ? parseInt(query.totalAreaMax) : undefined,
      };
    }

    if (query.carpetAreaMin || query.carpetAreaMax) {
      if (query.carpetAreaMin) {
        queryParams.append("carpetAreaMin", query.carpetAreaMin);
      }
      if (query.carpetAreaMax) {
        queryParams.append("carpetAreaMax", query.carpetAreaMax);
      }
      queryFilters.carpetArea = {
        min: query.carpetAreaMin ? parseInt(query.carpetAreaMin) : undefined,
        max: query.carpetAreaMax ? parseInt(query.carpetAreaMax) : undefined,
      };
    }

    // Add rooms filter parameters
    if (query.roomsMin || query.roomsMax) {
      if (query.roomsMin) {
        queryParams.append("roomsMin", query.roomsMin);
      }
      if (query.roomsMax) {
        queryParams.append("roomsMax", query.roomsMax);
      }
      queryFilters.rooms = {
        min: query.roomsMin ? parseInt(query.roomsMin) : undefined,
        max: query.roomsMax ? parseInt(query.roomsMax) : undefined,
      };
    }

    // Add pagination parameters
    if (query.page) queryParams.append("page", query.page);
    if (query.limit) queryParams.append("limit", query.limit);

    const queryString = queryParams.toString();
    const url = `${baseUrl}/properties${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url);
    const data = await res.json();
    return {
      props: {
        data: data.data || {
          facets: {},
          properties: [],
          totalCount: 0,
          currentPage: 1,
          resultsPerPage: 12,
        },
        initialFilters:
          Object.keys(queryFilters).length > 0 ? queryFilters : null,
      },
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return {
      props: {
        data: {
          facets: {},
          properties: [],
          totalCount: 0,
          currentPage: 1,
          resultsPerPage: 12,
        },
        initialFilters: null,
      },
    };
  }
}

export default Properties;
