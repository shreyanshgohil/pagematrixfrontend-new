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
      minHeight: "60px",
      border: state.isFocused ? "2px solid #008080" : "2px solid #F6F2F2",
      borderRadius: "16px",
      boxShadow: state.isFocused
        ? "0 0 0 3px rgba(0, 128, 128, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1)"
        : "0 2px 8px rgba(0, 0, 0, 0.05)",
      backgroundColor: "white",
      transition: "all 0.3s ease",
      "&:hover": {
        border: "2px solid #008080",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#5e5e5f",
      fontSize: "16px",
      fontWeight: "500",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#07234a",
      fontSize: "16px",
      fontWeight: "600",
    }),
    input: (provided) => ({
      ...provided,
      color: "#07234a",
      fontSize: "16px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#008080"
        : state.isFocused
        ? "rgba(0, 128, 128, 0.1)"
        : "white",
      color: state.isSelected ? "white" : "#07234a",
      fontSize: "16px",
      fontWeight: state.isSelected ? "600" : "500",
      padding: "12px 16px",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: state.isSelected
          ? "#008080"
          : "rgba(0, 128, 128, 0.1)",
        transform: "translateX(4px)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      maxHeight: "240px",
      overflowY: "auto",
      borderRadius: "16px",
      boxShadow:
        "0 10px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
      border: "none",
      marginTop: "8px",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "240px",
      padding: "8px",
      borderRadius: "16px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#008080",
      transform: state.selectProps.menuIsOpen
        ? "rotate(180deg)"
        : "rotate(0deg)",
      transition: "transform 0.3s ease",
      "&:hover": {
        color: "#007373",
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#5e5e5f",
      "&:hover": {
        color: "#008080",
      },
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
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-theme-800"></div>

      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-brand-theme rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-brand-theme rounded-full blur-2xl"></div>
      </div>

      {/* Hero illustration */}
      <Image
        src={"/images/home/hero-illustration.png"}
        height={600}
        width={1000}
        alt="Decorative illustration of a modern home and city skyline"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none hidden xl:block opacity-90"
        style={{ width: "1000px", height: "600px" }}
        aria-hidden="true"
      />

      <div className="container--boxed relative z-10 w-full">
        <div className="flex justify-center lg:justify-start">
          <div
            className="px-6 py-10 md:px-12 md:py-16 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl relative w-full max-w-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Header */}
            <div className="text-center lg:text-left mb-8">
              <h1
                id="hero-heading"
                className="font-bold text-4xl lg:text-5xl xl:text-6xl text-brand-blue-800 mb-4 leading-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #07234a 0%, #008080 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Find Your Perfect
                <span className="block text-brand-theme">Property</span>
              </h1>
              <p className="text-lg text-brand-gray-500 max-w-md mx-auto lg:mx-0">
                Discover your dream home with our advanced search and
                personalized recommendations
              </p>
            </div>

            {/* Property Type Selection */}
            <fieldset className="mb-8">
              <legend className="text-brand-blue-800 font-bold text-xl mb-4 sr-only">
                Property type selection
              </legend>
              <p className="text-brand-blue-800 font-bold text-xl mb-6 text-center lg:text-left">
                What type of property are you looking for?
              </p>
              <div
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
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
                        className={`group relative flex flex-col items-center gap-3 justify-center py-6 px-4 border-2 transition-all duration-300 transform hover:scale-105 button-accessible ${
                          isSelected
                            ? "bg-gradient-to-br from-brand-theme to-brand-theme-600 border-brand-theme text-white shadow-lg shadow-brand-theme/25"
                            : "bg-white border-brand-gray-300 text-brand-gray hover:border-brand-theme hover:bg-brand-theme/5 hover:text-brand-theme shadow-md hover:shadow-lg"
                        }`}
                        style={{ borderRadius: "16px" }}
                        aria-pressed={isSelected}
                        aria-label={`Select ${
                          getPropertyTypeIcon(propertyType).label
                        } property type`}
                      >
                        <div
                          className={`text-2xl transition-transform duration-300 ${
                            isSelected ? "scale-110" : "group-hover:scale-110"
                          }`}
                          aria-hidden="true"
                        >
                          {getPropertyTypeIcon(propertyType).icon}
                        </div>
                        <span className="font-semibold text-sm">
                          {getPropertyTypeIcon(propertyType).label}
                        </span>
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-brand-theme rounded-full"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
              </div>
            </fieldset>

            {/* City Selection */}
            <div className="mb-8">
              <label
                htmlFor="city-select"
                className="text-brand-blue-800 font-bold text-xl mb-4 block text-center lg:text-left"
              >
                Which city are you looking in?
              </label>
              <div className="relative">
                <Select
                  id="city-select"
                  instanceId="city-select"
                  placeholder="Select a city..."
                  options={cityOptions}
                  value={selectedCity}
                  onChange={setSelectedCity}
                  isClearable={true}
                  isSearchable={true}
                  styles={customStyles}
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
              className="group relative w-full bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-brand-theme/25 flex items-center justify-center gap-3 button-accessible"
              aria-label="Search for properties with selected criteria"
            >
              <IoSearch
                className="text-xl transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              <span className="text-lg">Search Properties</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Stats or additional info */}
            <div className="mt-8 pt-6 border-t border-brand-gray-300">
              <div className="flex justify-center lg:justify-start gap-8 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-bold text-brand-theme">
                    500+
                  </div>
                  <div className="text-sm text-brand-gray-500">Properties</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-theme">50+</div>
                  <div className="text-sm text-brand-gray-500">Cities</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-theme">
                    1000+
                  </div>
                  <div className="text-sm text-brand-gray-500">
                    Happy Clients
                  </div>
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
