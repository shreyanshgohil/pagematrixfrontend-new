import { useState } from "react";
import FloorPlanSection from "@/components/common/FloorPlanSection";
import AmenitiesSection from "@/components/common/AmenitiesSection";

const FloorPlanDemo = () => {
  // Sample floor plan data for demonstration
  const sampleFloorPlanDetails = [
    {
      rooms: 3,
      balcony: 1,
      bathroom: 3,
      totalArea: 2709,
      carpetArea: 2400,
      price: 8500000,
      configuration: "3 BHK",
      floorPlanImages: [
        {
          url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
          index: 0,
          caption: "3 BHK Corner Unit",
        },
        {
          url: "https://images.unsplash.com/photo-1560448204-603df3b7d67c?w=800&h=600&fit=crop",
          index: 1,
          caption: "3 BHK Center Unit",
        },
        {
          url: "https://images.unsplash.com/photo-1560448204-5c9a73d7b9b4?w=800&h=600&fit=crop",
          index: 2,
          caption: "3 BHK Layout",
        },
      ],
    },
    {
      rooms: 4,
      balcony: 2,
      bathroom: 4,
      totalArea: 3200,
      carpetArea: 2800,
      price: 12000000,
      configuration: "4 BHK",
      floorPlanImages: [
        {
          url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
          index: 0,
          caption: "4 BHK Master Plan",
        },
        {
          url: "https://images.unsplash.com/photo-1560448204-603df3b7d67c?w=800&h=600&fit=crop",
          index: 1,
          caption: "4 BHK Detailed View",
        },
      ],
    },
    {
      rooms: 4,
      balcony: 2,
      bathroom: 4,
      totalArea: 3500,
      carpetArea: 3100,
      price: 15000000,
      configuration: "4 BHK Premium",
      floorPlanImages: [
        {
          url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
          index: 0,
          caption: "4 BHK Premium Layout",
        },
        {
          url: "https://images.unsplash.com/photo-1560448204-603df3b7d67c?w=800&h=600&fit=crop",
          index: 1,
          caption: "4 BHK Premium View",
        },
        {
          url: "https://images.unsplash.com/photo-1560448204-5c9a73d7b9b4?w=800&h=600&fit=crop",
          index: 2,
          caption: "4 BHK Premium Details",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Floor Plan Section Demo
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This is a demonstration of the FloorPlanSection component. The first
            accordion is open by default. Click on any floor plan image to open
            the full-screen slider. Use arrow keys or click navigation to browse
            through images. Also includes the new AmenitiesSection component.
          </p>
        </div>

        {/* Floor Plan Section Component */}
        <FloorPlanSection
          floorPlanDetails={sampleFloorPlanDetails}
          propertyName="Mahalaxmi Satvam Skyline"
          propertyLocation="Sargasan, Sargasan, Gandhinagar"
        />

        {/* Amenities Section Component */}
        <div className="mt-6">
          <AmenitiesSection
            amenities={[
              "SECURITY",
              "SECURITY_PERSONNEL",
              "LIFT",
              "PARKING",
              "GYMNASIUM",
              "SWIMMING_POOL",
              "CLUB_HOUSE",
              "GARDEN",
              "TERRACE",
              "BALCONY",
              "POWER_BACKUP",
              "MODULAR_KITCHEN",
              "AIR_CONDITIONING",
              "INTERNET",
              "SHOPPING_CENTER",
              "HOSPITAL",
              "SCHOOL",
              "METRO_STATION",
            ]}
          />
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            How to Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">
                Accordion Features:
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• First accordion opens by default</li>
                <li>• Click on accordion headers to expand/collapse</li>
                <li>• View floor plan details and specifications</li>
                <li>• See all available floor plan images</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">
                Image Slider Features:
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Click any image to open full-screen slider</li>
                <li>• Use arrow keys for navigation</li>
                <li>• Click thumbnail images to jump to specific images</li>
                <li>• Press ESC to close the slider</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanDemo;
