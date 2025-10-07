import { useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCompress,
  FaExpand,
  FaPause,
  FaPlay,
} from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import PhotoGalleryModal from "../PhotoGalleryModal";

const ModernImageSlider = ({
  images = [],
  property = null,
  showControls = true,
  showThumbnails = true,
  autoPlay = true,
  autoPlayInterval = 5000,
  className = "",
  selectedIndex = 0,
  onImageSelect = null,
  onPlayChange = null,
  modernSliderRef: sliderRef,
}) => {
  const currentIndex = selectedIndex;
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const intervalRef = useRef(null);

  // Keep isFullscreen in sync when user exits with Esc or browser UI
  useEffect(() => {
    const syncFullscreenState = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", syncFullscreenState);
    document.addEventListener("webkitfullscreenchange", syncFullscreenState);
    document.addEventListener("mozfullscreenchange", syncFullscreenState);
    document.addEventListener("MSFullscreenChange", syncFullscreenState);
    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
      document.removeEventListener(
        "webkitfullscreenchange",
        syncFullscreenState
      );
      document.removeEventListener("mozfullscreenchange", syncFullscreenState);
      document.removeEventListener("MSFullscreenChange", syncFullscreenState);
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(() => {
        const newIndex =
          selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
        if (onImageSelect) onImageSelect(newIndex);
      }, autoPlayInterval);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [
    isPlaying,
    images.length,
    autoPlayInterval,
    selectedIndex,
    onImageSelect,
  ]);

  // Sync isPlaying with autoPlay prop on mount/prop change
  useEffect(() => {
    setIsPlaying(Boolean(autoPlay));
  }, [autoPlay]);

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < images.length - 1) {
      nextSlide();
    }
    if (isRightSwipe && currentIndex > 0) {
      prevSlide();
    }
  };

  // Note: current index is fully controlled by parent via selectedIndex

  const nextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    if (onImageSelect) onImageSelect(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    if (onImageSelect) onImageSelect(newIndex);
  };

  const goToSlide = (index) => {
    if (onImageSelect) onImageSelect(index);
  };

  const togglePlayPause = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (onPlayChange) onPlayChange(nextState);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      sliderRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const handleGalleryIndexChange = (newIndex) => {
    if (onImageSelect) onImageSelect(newIndex);
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr.`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L.`;
    } else {
      return `₹${price.toLocaleString()}`;
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

  if (!images || images.length === 0) {
    return (
      <div
        className="relative bg-gray-200 rounded-2xl overflow-hidden"
        style={{ height: "500px" }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-lg font-medium">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Slider Container */}
      <div
        ref={sliderRef}
        className="relative bg-white rounded-2xl shadow-2xl overflow-hidden group"
        style={{ height: isFullscreen ? "100vh" : "500px" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image Container */}
        <div className="relative h-full">
          <img
            src={images[currentIndex]?.url}
            alt={
              images[currentIndex]?.caption ||
              `Property image ${currentIndex + 1}`
            }
            className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            style={{
              objectPosition: "center",
              objectFit: "cover",
            }}
          />

          {/* Gradient Overlay - Simplified for mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            {/* Property Info Overlay - Mobile Optimized */}
            {property && (
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
                <div className="text-white">
                  {/* Mobile: Show only essential info */}
                  <div className="block md:hidden">
                    <h1 className="text-2xl font-bold mb-2 leading-tight">
                      {property.name}
                    </h1>
                    <div className="flex items-center gap-2 mb-2">
                      <svg
                        className="w-4 h-4 text-brand-theme"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">
                        {property.city}, {property.stateName}
                      </span>
                    </div>
                    <div className="text-xl font-bold">
                      {property.priceMin === property.priceMax
                        ? formatPrice(parseInt(property.priceMin))
                        : `${formatPrice(
                            parseInt(property.priceMin)
                          )} - ${formatPrice(parseInt(property.priceMax))}*`}
                    </div>
                  </div>

                  {/* Desktop: Show full info */}
                  <div className="hidden md:block">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                      {property.name}
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-brand-theme"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-lg">
                          {property.city}, {property.stateName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-brand-theme/20 text-brand-theme rounded-full text-sm font-medium">
                          {formatListingType(property.listingType)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                        {property.priceMin === property.priceMax
                          ? formatPrice(parseInt(property.priceMin))
                          : `${formatPrice(
                              parseInt(property.priceMin)
                            )} - ${formatPrice(parseInt(property.priceMax))}*`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons - Simplified for mobile */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            {/* Mobile: Show only essential buttons */}
            {/* <div className="flex gap-2 md:hidden">
              <button
                onClick={togglePlayPause}
                className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-200"
              >
                {isPlaying ? (
                  <FaPause className="text-sm" />
                ) : (
                  <FaPlay className="text-sm" />
                )}
              </button>
              <button className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-200">
                <FiShare2 className="text-sm" />
              </button>
            </div> */}

            {/* Desktop: Show all buttons */}
            <div className="flex gap-2">
              <button
                onClick={togglePlayPause}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-105"
              >
                {isPlaying ? (
                  <FaPause className="text-brand-theme text-lg" />
                ) : (
                  <FaPlay className="text-brand-theme text-lg" />
                )}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-105"
              >
                {isFullscreen ? (
                  <FaCompress className="text-brand-theme text-lg" />
                ) : (
                  <FaExpand className="text-brand-theme text-lg" />
                )}
              </button>
              <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-105">
                <FiShare2 className="text-brand-theme text-lg" />
              </button>
            </div>
          </div>

          {/* Navigation Arrows - Mobile Optimized */}
          {showControls && images.length > 1 && (
            <>
              {/* Mobile: Always visible, smaller */}
              <button
                onClick={prevSlide}
                className="hidden md:hidden absolute left-3 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-200 z-10"
              >
                <FaChevronLeft className="text-base" />
              </button>
              <button
                onClick={nextSlide}
                className="hidden md:hidden absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-200 z-10"
              >
                <FaChevronRight className="text-base" />
              </button>

              {/* Desktop: Hover to show */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-105 opacity-0 group-hover:opacity-100 z-10 hidden md:block"
              >
                <FaChevronLeft className="text-brand-theme text-lg" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-105 opacity-0 group-hover:opacity-100 z-10 hidden md:block"
              >
                <FaChevronRight className="text-brand-theme text-lg" />
              </button>
            </>
          )}

          {/* Slide Indicators - Mobile Optimized */}
          {/* {images.length > 1 && (
            <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex gap-2 z-10 md:bottom-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-brand-theme scale-125"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )} */}

          {/* Image Counter - Mobile Optimized */}
          {images.length > 1 && (
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium z-10 md:px-3 md:text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* See All Photos Button - Mobile Optimized */}
          {images.length > 1 && !isFullscreen && (
            <div className="absolute bottom-4 right-4 z-10">
              <button
                onClick={toggleFullscreen}
                className="bg-brand-theme text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-brand-theme-600 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 md:px-4 md:py-2 md:text-sm"
              >
                <span className="hidden sm:inline">
                  See All {images.length} Photos
                </span>
                <span className="sm:hidden">All Photos</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {showThumbnails && images.length > 1 && (
        <div className="mt-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 group cursor-pointer transition-all duration-200 ${
                  index === currentIndex ? "scale-105" : "hover:scale-102"
                }`}
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.caption || `Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-200"
                  />
                  <div
                    className={`absolute inset-0 rounded-xl transition-all duration-200 ${
                      index === currentIndex
                        ? "bg-brand-theme/30 ring-2 ring-brand-theme"
                        : "bg-brand-theme/0 group-hover:bg-brand-theme/20"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Photo Gallery Modal */}
      <PhotoGalleryModal
        isOpen={isGalleryOpen}
        onClose={closeGallery}
        images={images}
        currentIndex={currentIndex}
        onIndexChange={handleGalleryIndexChange}
        property={property}
      />
    </div>
  );
};

export default ModernImageSlider;
