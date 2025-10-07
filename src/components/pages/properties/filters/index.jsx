import FilterAccordionWrapper from "../FilterAccordionWrapper";
import { useState } from "react";
import { VscSettings } from "react-icons/vsc";
import CustomRefinement from "../CustomRefinment";
import CustomRangeSlider from "../CustomRangeSlider";

const Filters = ({
  facets,
  filters,
  filtersChangeHandler,
  clearAllFilters,
  hasActiveFilters,
  isFiltering,
  closeHandler,
}) => {
  const [openAccordions, setOpenAccordions] = useState([]);

  const toggleAccordionHandler = (index) => {
    if (openAccordions.includes(index)) {
      setOpenAccordions(
        openAccordions.filter((filterItem) => filterItem !== index)
      );
    } else {
      setOpenAccordions([...openAccordions, index]);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md" style={{ borderRadius: "4px" }}>
      <div className="flex items-center justify-between border-b border-solid pb-4">
        <div className="flex items-center">
          <VscSettings className="mr-2 font-semibold text-lg" />
          <p className="text-1.5xl font-semibold text-brand-blue-700">
            Filters
          </p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-brand-theme hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterAccordionWrapper
        isOpen={openAccordions.includes(1)}
        index={1}
        title={"Property Type"}
        toggleAccordionHandler={toggleAccordionHandler}
        data={facets?.propertyType}
        type="checkbox"
      >
        <CustomRefinement
          attribute="propertyType"
          data={facets?.propertyType}
          filters={filters.propertyType}
          filtersChangeHandler={filtersChangeHandler}
        />
      </FilterAccordionWrapper>

      <FilterAccordionWrapper
        isOpen={openAccordions.includes(2)}
        index={2}
        title={"Listing Type"}
        toggleAccordionHandler={toggleAccordionHandler}
        attribute="listingType"
        isLast={false}
        data={facets?.listingType}
        type="checkbox"
      >
        <CustomRefinement
          attribute="listingType"
          data={facets?.listingType}
          filters={filters.listingType}
          filtersChangeHandler={filtersChangeHandler}
        />
      </FilterAccordionWrapper>

      <FilterAccordionWrapper
        isOpen={openAccordions.includes(3)}
        index={3}
        title={"Price Range"}
        toggleAccordionHandler={toggleAccordionHandler}
        type="range"
        data={facets?.priceMin}
      >
        <CustomRangeSlider
          attribute="priceMin"
          filters={filters.priceMin}
          filtersChangeHandler={filtersChangeHandler}
          min={facets?.priceMin?.min || 0}
          max={facets?.priceMin?.max || 100000000}
          symbol="₹"
          facetData={facets?.priceMin}
        />
      </FilterAccordionWrapper>

      <FilterAccordionWrapper
        isOpen={openAccordions.includes(4)}
        index={4}
        title={"Rooms"}
        toggleAccordionHandler={toggleAccordionHandler}
        type="range"
        data={facets?.rooms}
      >
        <CustomRangeSlider
          attribute="rooms"
          filters={filters.rooms}
          filtersChangeHandler={filtersChangeHandler}
          min={facets?.rooms?.min || 1}
          max={facets?.rooms?.max || 10}
          facetData={facets?.rooms}
        />
      </FilterAccordionWrapper>

      <FilterAccordionWrapper
        isOpen={openAccordions.includes(5)}
        index={5}
        title={"City"}
        toggleAccordionHandler={toggleAccordionHandler}
        attribute="city"
        isLast={false}
        data={facets?.city}
        type="checkbox"
      >
        <CustomRefinement
          attribute="city"
          data={facets?.city}
          filters={filters.city}
          filtersChangeHandler={filtersChangeHandler}
        />
      </FilterAccordionWrapper>

      <FilterAccordionWrapper
        isOpen={openAccordions.includes(6)}
        index={6}
        title={"Possession"}
        toggleAccordionHandler={toggleAccordionHandler}
        attribute="possession"
        isLast={false}
        data={facets?.possession}
        type="checkbox"
      >
        <CustomRefinement
          attribute="possession"
          data={facets?.possession}
          filters={filters.possession}
          filtersChangeHandler={filtersChangeHandler}
        />
      </FilterAccordionWrapper>

      <FilterAccordionWrapper
        isOpen={openAccordions.includes(7)}
        index={7}
        title={"Total Area"}
        toggleAccordionHandler={toggleAccordionHandler}
        type="range"
        data={facets?.totalArea}
      >
        <CustomRangeSlider
          attribute="totalArea"
          filters={filters.totalArea}
          filtersChangeHandler={filtersChangeHandler}
          min={facets?.totalArea?.min || 0}
          max={facets?.totalArea?.max || 10000}
          facetData={facets?.totalArea}
        />
      </FilterAccordionWrapper>

      <FilterAccordionWrapper
        isOpen={openAccordions.includes(8)}
        index={8}
        title={"Carpet Area"}
        toggleAccordionHandler={toggleAccordionHandler}
        type="range"
        data={facets?.carpetArea}
      >
        <CustomRangeSlider
          attribute="carpetArea"
          filters={filters.carpetArea}
          filtersChangeHandler={filtersChangeHandler}
          min={facets?.carpetArea?.min || 0}
          max={facets?.carpetArea?.max || 10000}
          facetData={facets?.carpetArea}
        />
      </FilterAccordionWrapper>

      <FilterAccordionWrapper
        isOpen={openAccordions.includes(9)}
        index={9}
        title={"Amenities"}
        toggleAccordionHandler={toggleAccordionHandler}
        attribute="amenities"
        isLast={false}
        data={facets?.amenities}
        type="checkbox"
      >
        <CustomRefinement
          attribute="amenities"
          data={facets?.amenities}
          filters={filters.amenities}
          filtersChangeHandler={filtersChangeHandler}
        />
      </FilterAccordionWrapper>

      <FilterAccordionWrapper
        isOpen={openAccordions.includes(10)}
        index={10}
        title={"Furnishing Status"}
        toggleAccordionHandler={toggleAccordionHandler}
        attribute="furnishingStatus"
        isLast={true}
        type="checkbox"
        data={facets?.furnishingStatus}
      >
        <CustomRefinement
          attribute="furnishingStatus"
          data={facets?.furnishingStatus}
          filters={filters.furnishingStatus}
          filtersChangeHandler={filtersChangeHandler}
        />
      </FilterAccordionWrapper>

      {closeHandler && (
        <div className="fixed z-50 bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 sm:mx-6">
          <button
            onClick={closeHandler}
            className="w-full bg-brand-theme text-white py-3 px-4 rounded-md font-semibold text-lg hover:bg-brand-theme/90 transition-colors"
          >
            Search Properties
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;
