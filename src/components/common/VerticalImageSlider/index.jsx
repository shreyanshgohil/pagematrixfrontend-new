import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import PhotoGalleryModal from "../PhotoGalleryModal";

const VerticalImageSlider = ({
  images = [],
  property = null,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = "",
  onImageSelect = null,
  selectedIndex = 0,
  modernSliderRef,
}) => {
  const currentIndex = selectedIndex;
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const intervalRef = useRef(null);

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

  // Index is fully controlled by parent via selectedIndex

  const goToSlide = (index) => {
    if (onImageSelect) onImageSelect(index);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modernSliderRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const handleGalleryIndexChange = (newIndex) => {
    if (onImageSelect) onImageSelect(newIndex);
  };

  if (!images || images.length === 0) {
    return (
      <div
        className="relative bg-gray-200 rounded-2xl overflow-hidden"
        style={{ height: "600px" }}
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
      {/* Vertical Stack of Images */}
      <div className="space-y-3">
        {images.slice(0, 3).map((image, index) => (
          <div
            key={index}
            className={`relative group cursor-pointer transition-all duration-300 rounded-2xl overflow-hidden ${
              index === currentIndex
                ? "scale-105 shadow-2xl"
                : "hover:scale-102"
            }`}
            onClick={() => goToSlide(index)}
          >
            <div
              className="relative bg-white shadow-xl overflow-hidden"
              style={{ height: index === 0 ? "200px" : "120px" }}
            >
              <img
                src={image.url}
                alt={image.caption || `Property image ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                style={{
                  objectPosition: "center",
                  objectFit: "cover",
                }}
              />

              {/* Image Counter */}
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium z-10">
                {index + 1} / {images.length}
              </div>

              {/* Video indicator */}
              {image.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center">
                    <FaPlay className="text-white text-sm" />
                  </div>
                </div>
              )}

              {/* Image type indicator */}
              {image.type === "image" && (
                <div className="absolute top-3 right-12 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  G
                </div>
              )}

              {/* Selection indicator */}
              {index === currentIndex && (
                <div className="absolute inset-0 bg-brand-theme/20 ring-2 ring-brand-theme rounded-2xl"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* See All Photos Button */}
      {images.length > 3 && (
        <button
          onClick={toggleFullscreen}
          className="w-full mt-4 bg-brand-theme text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-theme-600 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 font-semibold"
        >
          <span>See All {images.length} Photos</span>
        </button>
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

export default VerticalImageSlider;
