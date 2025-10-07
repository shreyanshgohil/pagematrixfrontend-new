import { Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const PropertyMap = ({ property, className = "bg-gray-200 h-72 md:h-96" }) => {
  const map = useMap();
  if (!property?.location?.coordinates) {
    return (
      <div
        className={`${className} relative flex items-center justify-center rounded-lg overflow-hidden`}
      >
        <div className="text-center text-brand-gray">
          <p>Location not available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${className} relative flex items-center justify-center rounded-lg overflow-hidden`}
    >
      <div className="hidden md:block absolute z-50 right-4 bottom-40 xl:bottom-8">
        <button
          className=" flex items-center justify-center bg-white opacity-70 rounded-md h-10 w-10 mb-2 z-10"
          onClick={() => {
            const zoomLevel = map?.getZoom();
            zoomLevel && map?.setZoom(zoomLevel + 1);
          }}
        >
          <FaPlus />
        </button>
        <button
          className=" flex items-center justify-center bg-white opacity-70 rounded-md h-10 w-10 mb-2 z-10"
          onClick={() => {
            const zoomLevel = map?.getZoom();
            zoomLevel && map?.setZoom(zoomLevel - 1);
          }}
        >
          <FaMinus />
        </button>
      </div>
      <div className="text-center">
        <Map
          className="absolute inset-0"
          defaultCenter={{
            lat: property.location.coordinates[1],
            lng: property.location.coordinates[0],
          }}
          defaultZoom={10}
          mapId={"6e120bcd575d29f7"}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <Marker
            position={{
              lat: property.location.coordinates[1],
              lng: property.location.coordinates[0],
            }}
            title={property.name}
          />
        </Map>
      </div>
    </div>
  );
};

export default PropertyMap;
