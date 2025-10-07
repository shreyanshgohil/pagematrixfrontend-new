import AmenitiesSection from "@/components/common/AmenitiesSection";

const AmenitiesDemo = () => {
  // Sample amenities data for demonstration
  const sampleAmenities = [
    "SECURITY",
    "SECURITY_PERSONNEL",
    "CCTV_CAMERAS",
    "LIFT",
    "PARKING",
    "COVERED_PARKING",
    "GYMNASIUM",
    "SWIMMING_POOL",
    "CHILDRENS_PLAY_AREA",
    "CLUB_HOUSE",
    "GARDEN",
    "TERRACE",
    "BALCONY",
    "POWER_BACKUP",
    "GAS_PIPELINE",
    "INTERNET",
    "MODULAR_KITCHEN",
    "WARDROBES",
    "AIR_CONDITIONING",
    "SHOPPING_CENTER",
    "HOSPITAL",
    "SCHOOL",
    "METRO_STATION",
    "BUS_STOP",
    "BARBECUE_AREA",
    "JOGGING_TRACK",
    "TENNIS_COURT",
    "BADMINTON_COURT",
    "BASKETBALL_COURT",
    "YOGAROOM",
    "MEDITATION_ROOM",
    "COMMUNITY_HALL",
    "PARTY_LAWN",
    "ROOFTOP_ACCESS",
    "WATER_SUPPLY",
    "ELECTRICITY",
    "MAINTENANCE_STAFF",
    "HOUSEKEEPING",
    "SUPERMARKET",
    "CONVENIENCE_STORE",
    "PHARMACY",
    "ATM",
    "BANK",
    "CLINIC",
    "COLLEGE",
    "UNIVERSITY",
    "LIBRARY",
    "HEATING",
    "VASTU_COMPLIANT",
    "MOVIE_THEATER",
    "GAMING_ZONE",
    "KIDS_ZONE",
    "RESTAURANT",
    "CAFE",
    "FOOD_COURT",
    "CO_WORKING_SPACE",
    "BUSINESS_CENTER",
    "CONFERENCE_ROOM",
    "MEETING_ROOM",
    "PET_FRIENDLY",
    "BIKE_FRIENDLY",
    "SENIOR_FRIENDLY",
    "DISABILITY_FRIENDLY",
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Amenities Section Demo
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This demonstrates the new AmenitiesSection component that displays
            amenities in a clean, simple grid layout with theme-colored
            checkboxes. All amenities are shown in a responsive grid without
            category grouping.
          </p>
        </div>

        {/* Amenities Section Component */}
        <AmenitiesSection amenities={sampleAmenities} />

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Layout:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Simple grid layout (2-5 columns)</li>
                <li>• Theme-colored checkboxes</li>
                <li>• Responsive design</li>
                <li>• Clean, minimal interface</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Features:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• All amenities visible at once</li>
                <li>• Automatic text formatting</li>
                <li>• Total amenities count</li>
                <li>• Consistent with theme colors</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sample Data Info */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Sample Data Used
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            This demo uses {sampleAmenities.length} sample amenities covering
            all major categories:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {sampleAmenities.map((amenity, index) => (
              <div key={index} className="bg-gray-50 px-2 py-1 rounded">
                {amenity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesDemo;
