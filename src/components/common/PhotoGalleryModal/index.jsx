import React, { useState, useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaDownload,
  FaShare2,
  FaHeart,
} from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

const PhotoGalleryModal = ({
  isOpen,
  onClose,
  images = [],
  currentIndex = 0,
  onIndexChange,
  property = null,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(currentIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  const intervalRef = useRef(null);

  // Update selected index when currentIndex prop changes
  useEffect(() => {
    setSelectedIndex(currentIndex);
  }, [currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(() => {
        nextImage();
      }, 3000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, images.length]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const nextImage = () => {
    const newIndex =
      selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  };

  const prevImage = () => {
    const newIndex =
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  };

  const goToImage = (index) => {
    setSelectedIndex(index);
    if (onIndexChange) onIndexChange(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = images[selectedIndex]?.url;
    link.download = `property-image-${selectedIndex + 1}.jpg`;
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.name || "Property Image",
        text: `Check out this property image`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!isOpen || !images.length) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-full h-full flex flex-col bg-black"
        style={{ maxHeight: "100vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-white text-xl font-bold">
              {property?.name || "Property Gallery"}
            </h2>
            <div className="text-white/70 text-sm">
              {selectedIndex + 1} of {images.length}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={togglePlayPause}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
            <button
              onClick={handleDownload}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <FaDownload />
            </button>
            <button
              onClick={handleShare}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <FiShare2 />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors ml-2"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Main Image Area */}
        <div className="flex-1 flex items-center justify-center p-4 relative">
          <div className="relative max-w-full max-h-full">
            <img
              ref={imageRef}
              src={images[selectedIndex]?.url}
              alt={
                images[selectedIndex]?.caption ||
                `Property image ${selectedIndex + 1}`
              }
              className={`max-w-full max-h-full object-contain transition-all duration-300 ${
                isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={toggleZoom}
              style={{
                maxHeight: isFullscreen ? "calc(100vh - 200px)" : "70vh",
              }}
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            {/* Video indicator */}
            {images[selectedIndex]?.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center">
                  <FaPlay className="text-white text-2xl" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="p-4 bg-black/80 backdrop-blur-sm">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`relative flex-shrink-0 group cursor-pointer transition-all duration-200 ${
                    index === selectedIndex ? "scale-110" : "hover:scale-105"
                  }`}
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.caption || `Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 rounded-lg transition-all duration-200 ${
                        index === selectedIndex
                          ? "bg-brand-theme/30 ring-2 ring-brand-theme"
                          : "bg-brand-theme/0 group-hover:bg-brand-theme/20"
                      }`}
                    />
                    {/* Video indicator */}
                    {image.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                          <FaPlay className="text-white text-xs" />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGalleryModal;
