import { useEffect, useRef, useState } from "react";
import {
  FaChevronDown,
  FaTimes,
  FaBed,
  FaBath,
  FaRulerCombined,
} from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const FloorPlanSection = ({
  floorPlanDetails,
  propertyName,
  propertyLocation,
}) => {
  const [openAccordion, setOpenAccordion] = useState(0); // First accordion open by default
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentFloorPlanIndex, setCurrentFloorPlanIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef(null);
  const swiperRef = useRef(null);

  if (!floorPlanDetails || floorPlanDetails.length === 0) {
    return null;
  }

  // Focus modal when it opens for keyboard navigation
  useEffect(() => {
    if (isSliderOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isSliderOpen]);

  // Sync Swiper with currentImageIndex when it changes externally
  useEffect(() => {
    if (swiperRef.current && isSliderOpen) {
      swiperRef.current.slideTo(currentImageIndex);
    }
  }, [currentImageIndex, isSliderOpen]);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  const openImageSlider = (floorPlanIndex, imageIndex = 0) => {
    setCurrentFloorPlanIndex(floorPlanIndex);
    setCurrentImageIndex(imageIndex);
    setIsSliderOpen(true);
  };

  const closeImageSlider = () => {
    setIsSliderOpen(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isSliderOpen) return;

    switch (e.key) {
      case "Escape":
        closeImageSlider();
        break;
      case "ArrowLeft":
        if (swiperRef.current) {
          swiperRef.current.slidePrev();
        }
        break;
      case "ArrowRight":
        if (swiperRef.current) {
          swiperRef.current.slideNext();
        }
        break;
      default:
        break;
    }
  };

  const getCurrentFloorPlanImages = () => {
    return floorPlanDetails[currentFloorPlanIndex]?.floorPlanImages || [];
  };

  const formatPrice = (price) => {
    if (!price || price === 0) return "Price on Request";
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const sectionTitle = propertyName
    ? `${propertyName} Price & Floor Plan`
    : "Price & Floor Plan";

  return (
    <>
      {/* Floor Plan Section */}
      <div className="bg-white sm:rounded-2xl sm:shadow-xl px-4 py-4 sm:py-6 md:px-6 md:py-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-4 sm:mb-6 lg:mb-8">
          <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-brand-blue-700 to-brand-blue-800 rounded-full"></div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-brand-blue-700">
            {sectionTitle}
          </h2>
        </div>

        <div className="space-y-4">
          {floorPlanDetails.map((floorPlan, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              <div
                className="flex flex-row flex-wrap gap-4 items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-brand-theme/5 transition-colors"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                    <FaChevronDown
                      className={`text-brand-theme transition-transform duration-300 ${
                        openAccordion === index ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-0.5">
                    <span className="text-lg sm:text-xl font-bold text-brand-blue-700">
                      {floorPlan.configuration || `${floorPlan.rooms} BHK`}
                    </span>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-brand-gray">
                      <span className="inline-flex items-center gap-1 bg-brand-theme/10 text-brand-blue-700 px-2 py-0.5 rounded-md">
                        <FaRulerCombined className="text-brand-theme text-xs" />
                        {floorPlan.totalArea} Sq.Ft.
                      </span>
                      {floorPlan.bathroom ? (
                        <span className="inline-flex items-center gap-1 bg-brand-theme/10 text-brand-blue-700 px-2 py-0.5 rounded-md">
                          <FaBath className="text-brand-theme text-xs" />{" "}
                          {floorPlan.bathroom} Bath
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="inline-flex items-center gap-1 sm:gap-2 bg-brand-theme/10 text-brand-blue-700 px-2 sm:px-3 py-1 rounded-lg font-semibold text-sm sm:text-base">
                    <span className="hidden sm:inline">Starting</span>
                    <span className="sm:hidden">From</span>
                    <span className="text-brand-theme">
                      {formatPrice(floorPlan.price)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openAccordion === index ? "max-h-[2000px]" : "max-h-0"
                }`}
              >
                <div className="px-3 pb-3 sm:px-4 sm:pb-4 lg:px-6 lg:pb-6 space-y-3 sm:space-y-4 lg:space-y-6">
                  {/* Quick Specs */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 my-4 sm:mt-6">
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl border border-gray-100 bg-white">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                        <FaBed className="text-brand-theme text-sm sm:text-base" />
                      </div>
                      <div>
                        <p className="text-xs text-brand-gray">BHK</p>
                        <p className="font-semibold text-brand-blue-700 text-sm sm:text-base">
                          {floorPlan.rooms}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl border border-gray-100 bg-white">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                        <FaBath className="text-brand-theme text-sm sm:text-base" />
                      </div>
                      <div>
                        <p className="text-xs text-brand-gray">Bathrooms</p>
                        <p className="font-semibold text-brand-blue-700 text-sm sm:text-base">
                          {floorPlan.bathroom}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl border border-gray-100 bg-white">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                        <FaRulerCombined className="text-brand-theme text-sm sm:text-base" />
                      </div>
                      <div>
                        <p className="text-xs text-brand-gray">Area</p>
                        <p className="font-semibold text-brand-blue-700 text-sm sm:text-base">
                          {floorPlan.totalArea} Sq.Ft.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl border border-gray-100 bg-white">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                        <span className="text-brand-theme font-bold text-sm sm:text-base">
                          ₹
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-brand-gray">Price</p>
                        <p className="font-semibold text-brand-blue-700 text-sm sm:text-base">
                          {formatPrice(floorPlan.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Large Floor Plan Image Display */}
                  {floorPlan.floorPlanImages &&
                    floorPlan.floorPlanImages.length > 0 && (
                      <div className="relative bg-gradient-to-br from-brand-gray-300 to-white rounded-xl p-3 sm:p-5 shadow-sm border border-gray-100 mt-4 sm:mt-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 sm:mb-4">
                          <h4 className="text-base sm:text-lg font-semibold text-brand-blue-700">
                            Floor Plan View
                          </h4>
                          <button
                            onClick={() => openImageSlider(index, 0)}
                            className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
                          >
                            <MdFullscreen className="text-base sm:text-lg" />
                            <span className="hidden sm:inline">
                              View All {floorPlan.floorPlanImages.length} Images
                            </span>
                            <span className="sm:hidden">
                              View {floorPlan.floorPlanImages.length} Images
                            </span>
                          </button>
                        </div>
                        <div className="relative group">
                          <img
                            src={floorPlan.floorPlanImages[0].url}
                            alt={
                              floorPlan.floorPlanImages[0].caption ||
                              `${
                                floorPlan.configuration || floorPlan.rooms
                              } BHK Floor Plan`
                            }
                            className="w-full h-[240px] sm:h-[320px] lg:h-[420px] object-contain rounded-lg shadow-lg"
                          />
                          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs font-medium">
                            1 / {floorPlan.floorPlanImages.length}
                          </div>
                          <button
                            onClick={() => openImageSlider(index, 0)}
                            className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
                            aria-label="Open full screen gallery"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                              <MdFullscreen className="text-brand-theme text-lg sm:text-xl lg:text-2xl" />
                            </div>
                          </button>
                        </div>
                        {/* Inline Thumbnails */}
                        <div className="mt-3 sm:mt-4 flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1">
                          {floorPlan.floorPlanImages.map((image, imgIdx) => (
                            <button
                              key={imgIdx}
                              onClick={() => openImageSlider(index, imgIdx)}
                              className="relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border border-gray-200 hover:border-brand-theme transition-colors"
                              aria-label={`Open image ${imgIdx + 1}`}
                            >
                              <img
                                src={image.url}
                                alt={image.caption || `Thumbnail ${imgIdx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Image Slider Modal */}
      {isSliderOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center !mt-0"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative w-full h-full flex flex-col">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-50 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm">
                    {currentImageIndex + 1}/{getCurrentFloorPlanImages().length}
                  </span>
                  <div>
                    <h3 className="font-semibold">{propertyName}</h3>
                    <p className="text-sm text-gray-300">{propertyLocation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={closeImageSlider}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    >
                      <FaTimes className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Image Slider */}
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="relative w-full max-w-4xl">
                <Swiper
                  ref={swiperRef}
                  spaceBetween={10}
                  navigation={false}
                  modules={[Navigation]}
                  className="main-swiper"
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    // Ensure the swiper starts at the correct slide
                    if (currentImageIndex > 0) {
                      swiper.slideTo(currentImageIndex);
                    }
                  }}
                  onSlideChange={(swiper) => {
                    setCurrentImageIndex(swiper.activeIndex);
                  }}
                  initialSlide={currentImageIndex}
                  allowTouchMove={true}
                  keyboard={{ enabled: true }}
                  loop={false}
                >
                  {getCurrentFloorPlanImages().map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image.url}
                        alt={image.caption || `Floor Plan ${index + 1}`}
                        className="w-full h-full object-contain max-h-[70vh]"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-black bg-opacity-50 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm">
                    {currentImageIndex + 1}/{getCurrentFloorPlanImages().length}
                  </span>
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex items-center gap-2">
                  {getCurrentFloorPlanImages().map((image, index) => (
                    <div
                      key={index}
                      className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-blue-500"
                          : "border-transparent hover:border-white"
                      }`}
                      onClick={() => {
                        if (swiperRef.current) {
                          swiperRef.current.slideTo(index);
                        }
                      }}
                    >
                      <img
                        src={image.url}
                        alt={image.caption || `Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:bg-white hover:bg-opacity-20 p-3 rounded-full transition-colors ${
                !swiperRef.current ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slidePrev();
                }
              }}
              disabled={!swiperRef.current}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:bg-white hover:bg-opacity-20 p-3 rounded-full transition-colors ${
                !swiperRef.current ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideNext();
                }
              }}
              disabled={!swiperRef.current}
            >
              <svg
                className="w-6 h-6"
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
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloorPlanSection;
