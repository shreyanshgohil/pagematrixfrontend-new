import Filters from "@/components/pages/properties/filters";
import { Transition } from "@headlessui/react";
import { useEffect } from "react";

const MobileFiltersMenu = ({
  mobileFiltersMenu,
  setMobileFiltersMenu,
  facets,
  filters,
  filtersChangeHandler,
  clearAllFilters,
  hasActiveFilters,
  isFiltering,
}) => {
  // Handle Escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && mobileFiltersMenu) {
        setMobileFiltersMenu(false);
      }
    };

    if (mobileFiltersMenu) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [mobileFiltersMenu, setMobileFiltersMenu]);

  if (!mobileFiltersMenu) return null;

  return (
    <Transition
      as="div"
      show={mobileFiltersMenu}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="filter-modal-backdrop fixed w-full h-full !z-[100] inset-0 backdrop-blur-sm bg-black/20"
    >
      <div className="flex flex-col h-full">
        <div
          className="h-20 w-full shrink-0"
          onClick={() => setMobileFiltersMenu(false)}
        />

        {mobileFiltersMenu && (
          <div
            className={`sm:mx-6 h-full shrink-0 overflow-auto no-scrollbar rounded-t-md z-50 bg-white`}
            style={{
              height: "calc(100% - 80px)",
              paddingBottom: "80px", // Add padding for fixed search button
            }}
          >
            <Filters
              facets={facets}
              filters={filters}
              filtersChangeHandler={filtersChangeHandler}
              clearAllFilters={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
              isFiltering={isFiltering}
              closeHandler={() => setMobileFiltersMenu(false)}
            />
          </div>
        )}
      </div>
    </Transition>
  );
};

export default MobileFiltersMenu;
