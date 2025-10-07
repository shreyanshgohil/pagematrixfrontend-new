import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaHome, FaBuilding, FaStore, FaMapMarkedAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Select from "react-select";

const Hero = ({ propertyTypes, cities }) => {
  const router = useRouter();

  // State management for property type selection
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  // Handle property type selection/deselection
  const handlePropertyTypeToggle = (propertyType) => {
    // Convert to lowercase for URL display
    const lowerCasePropertyType = propertyType.toLowerCase();
    if (selectedPropertyTypes.includes(lowerCasePropertyType)) {
      setSelectedPropertyTypes(
        selectedPropertyTypes.filter((p) => p !== lowerCasePropertyType)
      );
    } else {
      setSelectedPropertyTypes([
        ...selectedPropertyTypes,
        lowerCasePropertyType,
      ]);
    }
  };

  // Handle search button click - navigate to properties page with refinements
  const handleSearch = () => {
    const query = {};

    // Send property types as an array
    if (selectedPropertyTypes.length > 0) {
      query.propertyType = selectedPropertyTypes;
    }

    // Add selected city if chosen
    if (selectedCity) {
      query.city = selectedCity.value;
    }

    router.push({
      pathname: "/properties", // This will be the properties page
      query,
    });
  };

  // Format cities for react-select
  const cityOptions = cities.map((city) => ({
    value: city,
    label: city,
  }));

  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "50px",
      border: state.isFocused ? "1px solid #1e40af" : "1px solid #d1d5db",
      borderRadius: "4px",
      boxShadow: state.isFocused ? "0 0 0 1px #1e40af" : "none",
      "&:hover": {
        border: "1px solid #1e40af",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#1e40af"
        : state.isFocused
        ? "#eff6ff"
        : "white",
      color: state.isSelected ? "white" : "#374151",
      "&:hover": {
        backgroundColor: state.isSelected ? "#1e40af" : "#eff6ff",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      maxHeight: "200px",
      overflowY: "auto",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "200px",
      padding: 0,
    }),
  };

  const getPropertyTypeIcon = (type) => {
    switch (type) {
      case "APARTMENT":
        return { icon: <FaHome />, label: "Apartment" };
      case "VILLA":
        return { icon: <FaHome />, label: "Villa" };
      case "COMMERCIAL":
        return { icon: <FaStore />, label: "Commercial" };
      case "PLOT":
        return { icon: <FaMapMarkedAlt />, label: "Plot" };
      default:
        return { icon: <FaBuilding />, label: "Property" };
    }
  };

  return (
    <section
      className="relative min-h-[700px] bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none hidden lg:block">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-60"></div>
        <div className="absolute top-40 right-40 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-40"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-50"></div>
      </div>

      <div className="container--boxed relative z-10 flex justify-center lg:justify-start py-12 md:py-16">
        <div className="w-full max-w-lg">
          {/* Main Content Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/30 p-6 md:p-8 relative overflow-hidden">
            {/* Card Background Pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-100 to-transparent rounded-full translate-y-8 -translate-x-8"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-6">
                <h1
                  id="hero-heading"
                  className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 leading-tight"
                >
                  Find Your Dream Property
                </h1>
                <p className="text-gray-600 text-base max-w-lg mx-auto">
                  Discover the perfect home, apartment, or investment property
                </p>
              </div>

              {/* Property Type Selection */}
              <fieldset className="mb-6">
                <legend className="text-gray-800 font-semibold text-base mb-3 text-center">
                  What type of property are you looking for?
                </legend>
                <div
                  className="grid grid-cols-2 gap-2"
                  role="group"
                  aria-label="Property types"
                >
                  {propertyTypes &&
                    propertyTypes.map((item, index) => {
                      if (item.value === "PENTHOUSE") {
                        return null;
                      }
                      const propertyType =
                        typeof item === "string" ? item : item.value;
                      const isSelected = selectedPropertyTypes.includes(
                        propertyType.toLowerCase()
                      );
                      return (
                        <button
                          key={index}
                          onClick={() => handlePropertyTypeToggle(propertyType)}
                          className={`group relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                            isSelected
                              ? "bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-500 text-white shadow-lg scale-105"
                              : "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                          aria-pressed={isSelected}
                          aria-label={`Select ${
                            getPropertyTypeIcon(propertyType).label
                          } property type`}
                        >
                          <div
                            className={`text-lg mb-1 transition-colors duration-300 ${
                              isSelected
                                ? "text-white"
                                : "text-gray-600 group-hover:text-blue-600"
                            }`}
                          >
                            {getPropertyTypeIcon(propertyType).icon}
                          </div>
                          <span
                            className={`font-medium text-xs transition-colors duration-300 ${
                              isSelected
                                ? "text-white"
                                : "text-gray-700 group-hover:text-blue-600"
                            }`}
                          >
                            {getPropertyTypeIcon(propertyType).label}
                          </span>
                          {isSelected && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                </div>
              </fieldset>

              {/* City Selection */}
              <div className="mb-6">
                <label
                  htmlFor="city-select"
                  className="text-gray-800 font-semibold text-base mb-2 block text-center"
                >
                  Which city are you looking in?
                </label>
                <div className="relative">
                  <Select
                    id="city-select"
                    instanceId="city-select"
                    placeholder="Search for a city..."
                    options={cityOptions}
                    value={selectedCity}
                    onChange={setSelectedCity}
                    isClearable={true}
                    isSearchable={true}
                    styles={{
                      ...customStyles,
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: "44px",
                        border: state.isFocused
                          ? "2px solid #3b82f6"
                          : "2px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: state.isFocused
                          ? "0 0 0 3px rgba(59, 130, 246, 0.1)"
                          : "0 1px 3px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "white",
                        "&:hover": {
                          border: "2px solid #3b82f6",
                        },
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: "#9ca3af",
                        fontSize: "14px",
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "#374151",
                        fontSize: "14px",
                      }),
                    }}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    aria-label="Choose city"
                    noOptionsMessage={() => "No cities found"}
                    loadingMessage={() => "Loading cities..."}
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="group relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Search for properties with selected criteria"
              >
                <div className="flex items-center justify-center gap-2">
                  <IoSearch className="text-lg group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-base">Search Properties</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">1000+</div>
                  <div className="text-xs text-gray-600">Properties</div>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">50+</div>
                  <div className="text-xs text-gray-600">Cities</div>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">24/7</div>
                  <div className="text-xs text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
