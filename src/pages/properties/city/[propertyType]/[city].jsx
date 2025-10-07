import BreadcrumbMenu from "@/components/common/BreadcrumbMenu";
import PropertyCard from "@/components/common/PropertyCard";
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
    displayPropertyType,
    displayCity,
  } = props;

  // State for dynamic data
  const [properties, setProperties] = useState(initialProperties);
  const [facets, setFacets] = useState(initialFacets);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [resultsPerPage, setResultsPerPage] = useState(initialResultsPerPage);

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
    async (queryParams, isClear = false) => {
      try {
        setIsFiltering(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

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
              if (!userSelectedFilters.priceMin) {
                updatedFilters.priceMin = {
                  min: newFacets?.priceMin?.min || 0,
                  max: newFacets?.priceMin?.max || 100000000,
                };
              }
              if (!userSelectedFilters.totalArea) {
                updatedFilters.totalArea = {
                  min: newFacets?.totalArea?.min || 0,
                  max: newFacets?.totalArea?.max || 10000,
                };
              }
              if (!userSelectedFilters.carpetArea) {
                updatedFilters.carpetArea = {
                  min: newFacets?.carpetArea?.min || 0,
                  max: newFacets?.carpetArea?.max || 10000,
                };
              }
              if (!userSelectedFilters.rooms) {
                updatedFilters.rooms = {
                  min: newFacets?.rooms?.min || 1,
                  max: newFacets?.rooms?.max || 10,
                };
              }
              if (!userSelectedFilters.noFloors) {
                updatedFilters.noFloors = {
                  min: newFacets?.noFloors?.min || 1,
                  max: newFacets?.noFloors?.max || 50,
                };
              }
              if (!userSelectedFilters.propertyAge) {
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

  const buildFilterURL = (filters, additionalParams = {}) => {
    const queryParams = new URLSearchParams();

    // Add array filters
    if (filters.propertyType?.length > 0) {
      filters.propertyType.forEach((type) => {
        queryParams.append("propertyType", type.toLowerCase());
      });
    }

    if (filters.listingType?.length > 0) {
      filters.listingType.forEach((type) => {
        queryParams.append("listingType", type.toLowerCase());
      });
    }

    if (filters.city?.length > 0) {
      filters.city.forEach((city) => {
        queryParams.append("city", city.toLowerCase());
      });
    }

    if (filters.status?.length > 0) {
      filters.status.forEach((status) => {
        queryParams.append("status", status.toLowerCase());
      });
    }

    if (filters.stateName?.length > 0) {
      filters.stateName.forEach((state) => {
        queryParams.append("stateName", state.toLowerCase());
      });
    }

    if (filters.furnishingStatus?.length > 0) {
      filters.furnishingStatus.forEach((status) => {
        queryParams.append("furnishingStatus", status.toLowerCase());
      });
    }

    if (filters.possession?.length > 0) {
      filters.possession.forEach((pos) => {
        queryParams.append("possession", pos.toLowerCase());
      });
    }

    if (filters.parkingType?.length > 0) {
      filters.parkingType.forEach((type) => {
        queryParams.append("parkingType", type.toLowerCase());
      });
    }

    if (filters.commercialType?.length > 0) {
      filters.commercialType.forEach((type) => {
        queryParams.append("commercialType", type.toLowerCase());
      });
    }

    if (filters.plotType?.length > 0) {
      filters.plotType.forEach((type) => {
        queryParams.append("plotType", type.toLowerCase());
      });
    }

    if (filters.amenities?.length > 0) {
      filters.amenities.forEach((amenity) => {
        queryParams.append("amenities", amenity.toLowerCase());
      });
    }

    // Add range filters (only if user has actually selected them)
    if (userSelectedFilters.priceMin) {
      if (filters.priceMin.min > (facets?.priceMin?.min || 0)) {
        queryParams.append("priceMin", filters.priceMin.min);
      }
      if (filters.priceMin.max < (facets?.priceMin?.max || 100000000)) {
        queryParams.append("priceMax", filters.priceMin.max);
      }
    }

    if (userSelectedFilters.totalArea) {
      if (filters.totalArea.min > (facets?.totalArea?.min || 0)) {
        queryParams.append("totalAreaMin", filters.totalArea.min);
      }
      if (filters.totalArea.max < (facets?.totalArea?.max || 10000)) {
        queryParams.append("totalAreaMax", filters.totalArea.max);
      }
    }

    if (userSelectedFilters.carpetArea) {
      if (filters.carpetArea.min > (facets?.carpetArea?.min || 0)) {
        queryParams.append("carpetAreaMin", filters.carpetArea.min);
      }
      if (filters.carpetArea.max < (facets?.carpetArea?.max || 10000)) {
        queryParams.append("carpetAreaMax", filters.carpetArea.max);
      }
    }

    if (userSelectedFilters.rooms) {
      if (filters.rooms.min > (facets?.rooms?.min || 1)) {
        queryParams.append("roomsMin", filters.rooms.min);
      }
      if (filters.rooms.max < (facets?.rooms?.max || 10)) {
        queryParams.append("roomsMax", filters.rooms.max);
      }
    }

    if (userSelectedFilters.noFloors) {
      if (filters.noFloors.min > (facets?.noFloors?.min || 1)) {
        queryParams.append("noFloorsMin", filters.noFloors.min);
      }
      if (filters.noFloors.max < (facets?.noFloors?.max || 50)) {
        queryParams.append("noFloorsMax", filters.noFloors.max);
      }
    }

    if (userSelectedFilters.propertyAge) {
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
        queryParams.append(key, value.toLowerCase());
      }
    });

    return queryParams.toString();
  };

  const updateURLWithFilters = useCallback(
    (newFilters) => {
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
      if (userSelectedFilters.priceMin) {
        query.priceMin = newFilters.priceMin.min;
        query.priceMax = newFilters.priceMin.max;
      }

      if (userSelectedFilters.totalArea) {
        query.totalAreaMin = newFilters.totalArea.min;
        query.totalAreaMax = newFilters.totalArea.max;
      }

      if (userSelectedFilters.carpetArea) {
        query.carpetAreaMin = newFilters.carpetArea.min;
        query.carpetAreaMax = newFilters.carpetArea.max;
      }

      if (userSelectedFilters.rooms) {
        query.roomsMin = newFilters.rooms.min;
        query.roomsMax = newFilters.rooms.max;
      }

      if (userSelectedFilters.noFloors) {
        query.noFloorsMin = newFilters.noFloors.min;
        query.noFloorsMax = newFilters.noFloors.max;
      }

      if (userSelectedFilters.propertyAge) {
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
      router.replace({
        pathname: `/properties`,
        query: queryString,
      });
      // fetchData(queryString);

      // Update URL
      // updateURLWithFilters(tempCopy);
    } else if (type === "range") {
      tempCopy[key] = value;

      // For range filters, update local state and immediately apply
      setFilters(tempCopy);

      // Mark this range filter as user-selected
      setUserSelectedFilters((prev) => ({
        ...prev,
        [key]: true,
      }));

      // Build query string and fetch data
      const queryString = buildFilterURL(tempCopy);
      router.replace({
        pathname: `/properties`,
        query: queryString,
      });
      // fetchData(queryString);

      // Update URL
      // updateURLWithFilters(tempCopy);
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
              {displayPropertyType}s for Sale and Rent in {displayCity}
            </h1>
            <div className="mb-10">
              <div className="mb-4">
                <p className="text-brand-gray mb-4">
                  We've found <strong>{totalCount || properties.length}</strong>{" "}
                  {displayPropertyType.toLowerCase()}
                  {totalCount !== 1 ? "s" : ""} in {displayCity} that match
                  {totalCount !== 1 ? "" : "es"} your criteria. All of our
                  {displayPropertyType.toLowerCase()} properties are carefully
                  verified to ensure they meet your expectations. Browse through
                  our curated selection below.
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
                    className={`-mb-px transition-opacity h-10 inline-flex items-center cursor-pointer border-b-2 border-b-brand-theme text-brand-theme font-semibold text-sm`}
                  >
                    <FaListUl className="mr-2" />
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
              <div className={`lg:hidden mt-8 grid gap-22`}>
                <button
                  onClick={() => setMobileFiltersMenu(true)}
                  className="text-brand-gray rounded-md flex items-center gap-1.5 flex-1 justify-center py-3 px-4 border border-solid border-brand-gray-500 transition-all duration-300 hover:bg-brand-theme/10 hover:border-brand-theme hover:text-brand-theme font-semibold mb-8"
                >
                  <VscSettings className="mr-2 font-semibold text-lg" />
                  Filters
                </button>
              </div>

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

      {/* FAQ Section for SEO - Hidden from view but present for search engines */}
      <section className="sr-only" aria-hidden="true">
        <div className="container--boxed">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading--h2 text-brand-blue-700 font-semibold mb-8 text-center">
              Frequently Asked Questions about {displayPropertyType}s in{" "}
              {displayCity}
            </h2>
            <div className="space-y-6">
              <div className="bg-brand-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-brand-blue-700 mb-3">
                  What types of {displayPropertyType.toLowerCase()}s are
                  available in {displayCity}?
                </h3>
                <p className="text-brand-gray">
                  We offer a wide range of {displayPropertyType.toLowerCase()}s
                  in {displayCity} including properties for sale, rent and
                  lease. Our listings include verified properties with detailed
                  information, virtual tours and competitive pricing to help you
                  find the perfect {displayPropertyType.toLowerCase()}.
                </p>
              </div>

              <div className="bg-brand-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-brand-blue-700 mb-3">
                  How can I find the best {displayPropertyType.toLowerCase()}{" "}
                  deals in {displayCity}?
                </h3>
                <p className="text-brand-gray">
                  Use our advanced filters to narrow down your search by price
                  range, area, amenities and more. All our{" "}
                  {displayPropertyType.toLowerCase()} listings in {displayCity}{" "}
                  are verified and include comprehensive details to help you
                  make an informed decision.
                </p>
              </div>

              <div className="bg-brand-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-brand-blue-700 mb-3">
                  Are all {displayPropertyType.toLowerCase()} properties in{" "}
                  {displayCity} verified?
                </h3>
                <p className="text-brand-gray">
                  Yes, all {displayPropertyType.toLowerCase()} properties listed
                  on our platform in {displayCity} are carefully verified to
                  ensure authenticity and quality. We work with trusted real
                  estate agents and property owners to provide you with reliable
                  listings.
                </p>
              </div>

              <div className="bg-brand-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-brand-blue-700 mb-3">
                  What amenities are commonly available in{" "}
                  {displayPropertyType.toLowerCase()}s in {displayCity}?
                </h3>
                <p className="text-brand-gray">
                  {displayPropertyType.toLowerCase()}s in {displayCity}{" "}
                  typically come with modern amenities including parking,
                  security, power backup and more. Use our amenity filters to
                  find properties with specific features that match your
                  requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

const Properties = ({ data, initialFilters, params }) => {
  const { facets, properties, totalCount, currentPage, resultsPerPage } = data;

  // Extract and format parameters for SEO
  const propertyType = params?.propertyType || "";
  const city = params?.city || "";

  // Format property type and city for display
  const formatPropertyTypeForDisplay = (type) => {
    switch (type.toLowerCase()) {
      case "apartment":
        return "Apartment";
      case "house":
        return "House";
      case "commercial":
        return "Commercial";
      case "plot":
        return "Plot";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const formatCityForDisplay = (cityName) => {
    return cityName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const displayPropertyType = formatPropertyTypeForDisplay(propertyType);
  const displayCity = formatCityForDisplay(city);

  // Generate SEO content
  const seoTitle = `${displayPropertyType}s for Sale and Rent in ${displayCity} | Find ${displayPropertyType} Properties | 11yards`;

  const seoDescription = `Discover ${displayPropertyType.toLowerCase()} properties for sale and rent in ${displayCity}. Browse verified ${displayPropertyType.toLowerCase()} listings with detailed information, virtual tours and competitive prices. Find your dream ${displayPropertyType.toLowerCase()} in ${displayCity} with 11yards.`;

  const seoKeywords = `${displayPropertyType.toLowerCase()}s in ${displayCity}, ${displayPropertyType.toLowerCase()} for sale ${displayCity}, ${displayPropertyType.toLowerCase()} for rent ${displayCity}, ${displayCity} real estate, ${displayPropertyType.toLowerCase()} properties ${displayCity}, buy ${displayPropertyType.toLowerCase()} ${displayCity}, rent ${displayPropertyType.toLowerCase()} ${displayCity}, real estate ${displayCity}, property listings ${displayCity}, 11yards ${displayCity}`;

  // Generate structured data for the property listing page
  const listingPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${displayPropertyType} Properties in ${displayCity}`,
    description: `Browse ${displayPropertyType.toLowerCase()} properties for sale and rent in ${displayCity}`,
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"
    }/properties/city/${propertyType}/${city}`,
    numberOfItems: totalCount || 0,
    itemListElement: properties.slice(0, 10).map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "RealEstateListing",
        name: property.name || `${displayPropertyType} in ${displayCity}`,
        description:
          property.description ||
          `${displayPropertyType} property in ${displayCity}`,
        url: `${
          process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"
        }/properties/${property._id}`,
        image:
          property.images && property.images.length > 0
            ? property.images[0].url
            : undefined,
        address: {
          "@type": "PostalAddress",
          addressLocality: property.city || displayCity,
          addressRegion: property.stateName || "",
          addressCountry: "India",
        },
        offers: {
          "@type": "Offer",
          price: property.priceMin || 0,
          priceCurrency: "INR",
          availability:
            property.listingType === "SALE"
              ? "https://schema.org/InStock"
              : "https://schema.org/InStock",
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Property Type",
            value: property.propertyType || displayPropertyType,
          },
          {
            "@type": "PropertyValue",
            name: "Listing Type",
            value: property.listingType || "SALE",
          },
          {
            "@type": "PropertyValue",
            name: "Total Area",
            value:
              property.floorPlanDetails && property.floorPlanDetails.length > 0
                ? `${property.floorPlanDetails[0].totalArea} sq ft`
                : undefined,
          },
        ],
      },
    })),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Properties",
          item: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"
          }/properties`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: displayPropertyType,
          item: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"
          }/properties/city/${propertyType}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: displayCity,
          item: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"
          }/properties/city/${propertyType}/${city}`,
        },
      ],
    },
  };

  // Additional structured data for the organization
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "11yards",
    description: "Leading real estate platform for properties in India",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com",
    logo: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"
    }/images/logos/logo-header.svg`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "India",
    },
    areaServed: {
      "@type": "City",
      name: displayCity,
    },
    serviceType: `${displayPropertyType} Properties`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${displayPropertyType} Properties in ${displayCity}`,
      itemListElement: properties.slice(0, 5).map((property) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "RealEstateListing",
          name: property.name,
          description: property.description,
        },
      })),
    },
  };

  // FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What types of ${displayPropertyType.toLowerCase()}s are available in ${displayCity}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `We offer a wide range of ${displayPropertyType.toLowerCase()}s in ${displayCity} including properties for sale, rent and lease. Our listings include verified properties with detailed information, virtual tours and competitive pricing to help you find the perfect ${displayPropertyType.toLowerCase()}.`,
        },
      },
      {
        "@type": "Question",
        name: `How can I find the best ${displayPropertyType.toLowerCase()} deals in ${displayCity}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Use our advanced filters to narrow down your search by price range, area, amenities and more. All our ${displayPropertyType.toLowerCase()} listings in ${displayCity} are verified and include comprehensive details to help you make an informed decision.`,
        },
      },
      {
        "@type": "Question",
        name: `Are all ${displayPropertyType.toLowerCase()} properties in ${displayCity} verified?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, all ${displayPropertyType.toLowerCase()} properties listed on our platform in ${displayCity} are carefully verified to ensure authenticity and quality. We work with trusted real estate agents and property owners to provide you with reliable listings.`,
        },
      },
      {
        "@type": "Question",
        name: `What amenities are commonly available in ${displayPropertyType.toLowerCase()}s in ${displayCity}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${displayPropertyType.toLowerCase()}s in ${displayCity} typically come with modern amenities including parking, security, power backup and more. Use our amenity filters to find properties with specific features that match your requirements.`,
        },
      },
    ],
  };

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        url={`/properties/city/${propertyType}/${city}`}
        type="website"
        structuredData={listingPageStructuredData}
        tags={[
          displayPropertyType.toLowerCase(),
          displayCity,
          "real estate",
          "properties",
          "property listings",
          "buy property",
          "rent property",
          "real estate agent",
          "property search",
        ]}
        canonical={`${
          process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"
        }/properties/city/${propertyType}/${city}`}
      />

      {/* Additional structured data for organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />

      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
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
            displayPropertyType={displayPropertyType}
            displayCity={displayCity}
          />
        </PropertyCardProvider>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    // Fetch all property types and cities
    const res = await fetch(`${baseUrl}/properties/static-data`);
    const data = await res.json();

    if (!data.data) {
      console.log("No data received from API");
      return {
        paths: [],
        fallback: false,
      };
    }

    const { propertyTypes, cities } = data.data;

    // Generate all possible combinations
    const paths = [];
    propertyTypes.forEach((propertyType) => {
      cities.forEach((city) => {
        // Convert property type to lowercase for URL
        const urlPropertyType = propertyType.toLowerCase();

        // Convert city to URL format (lowercase, replace spaces with hyphens)
        const urlCity = city.toLowerCase().replace(/\s+/g, "-");

        paths.push({
          params: {
            propertyType: urlPropertyType,
            city: urlCity,
          },
        });
      });
    });

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error generating static paths:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/properties/?propertyType=${params.propertyType}&city=${params.city}`;
    const res = await fetch(url);
    const data = await res.json();
    const queryFilters = {};
    if (params.propertyType) {
      queryFilters.propertyType = [params.propertyType.toUpperCase()];
    }
    if (params.city) {
      queryFilters.city = [
        params.city.charAt(0).toUpperCase() +
          params.city.slice(1).toLowerCase(),
      ];
    }

    return {
      props: {
        data: data.data || {
          facets: {},
          properties: [],
          totalCount: 0,
          currentPage: 1,
          resultsPerPage: 12,
        },
        initialFilters: queryFilters,
        params: params,
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
        params: null,
      },
    };
  }
}

export default Properties;
