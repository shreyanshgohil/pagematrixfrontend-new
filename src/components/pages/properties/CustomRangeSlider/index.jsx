import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Rheostat from "rheostat";
import "rheostat/css/rheostat.css";
import "rheostat/initialize";

const CustomRangeSlider = ({
  attribute,
  filters = { min: 0, max: 10000 },
  filtersChangeHandler,
  min = 0,
  max = 10000,
  symbol = "",
  facetData = null,
}) => {
  const router = useRouter();
  // Use facet data for dynamic min/max if available
  const dynamicMin = facetData?.min || min;
  const dynamicMax = facetData?.max || max;

  const [values, setValues] = useState([
    filters.min || dynamicMin,
    filters.max || dynamicMax,
  ]);

  // Update local values when filters prop changes (e.g., when clearing filters)
  useEffect(() => {
    setValues([filters.min || dynamicMin, filters.max || dynamicMax]);
  }, [filters.min, filters.max, dynamicMin, dynamicMax]);

  const onChange = ({ values }) => {
    const newFilters = { min: values[0], max: values[1] };
    if (values[0] && values[1]) {
      filtersChangeHandler({
        type: "range",
        key: attribute,
        value: newFilters,
      });
    }
  };

  const onValuesUpdated = ({ values }) => {
    if (values[0] && values[1]) {
      setValues(values);
    }
  };

  const formatValue = (value) => {
    if (attribute === "priceMin") {
      if (value >= 10000000) {
        return `${symbol}${(value / 10000000).toFixed(1)}Cr`;
      } else if (value >= 100000) {
        return `${symbol}${(value / 100000).toFixed(1)}L`;
      } else {
        return `${symbol}${value.toLocaleString()}`;
      }
    }
    if (attribute === "totalArea" || attribute === "carpetArea") {
      return `${value.toLocaleString()} sq ft`;
    }
    if (attribute === "rooms") {
      return `${value} room${value !== 1 ? "s" : ""}`;
    }
    return value.toLocaleString();
  };
  return (
    <div className="mt-2">
      <Rheostat
        min={dynamicMin}
        max={dynamicMax}
        values={values}
        onChange={onChange}
        onValuesUpdated={onValuesUpdated}
      >
        <div className="flex justify-between pt-4">
          <div
            className="rheostat-marker rheostat-marker--large"
            style={{ left: 0 }}
          >
            <div className="rheostat-value font-semibold text-brand-neutral-500 text-sm">
              {formatValue(values[0])}
            </div>
          </div>
          <div
            className="rheostat-marker rheostat-marker--large"
            style={{ right: 0 }}
          >
            <div className="rheostat-value font-semibold text-brand-neutral-500 text-sm">
              {formatValue(values[1])}
            </div>
          </div>
        </div>
      </Rheostat>
    </div>
  );
};

export default CustomRangeSlider;
