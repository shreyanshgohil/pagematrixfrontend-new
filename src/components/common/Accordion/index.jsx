// import Arrow from "@/images/icons/arrow.svg";
import { useEffect, useRef, useState } from "react";
import ToolTip from "../ToolTip";
import Image from "next/image";

const labels = {
  weekday_daytime: "Weekday daytime",
  weekday_evening: "Weekday evening",
  weekends: "Weekends",
  OAPs: "OAP",
  ADHD: "ADHD coaching",
  Confidence: "Confidence coaching",
  "Career coaching": "Career development",
  "Stop smoking": "Quit smoking",
  "Face to face": "In person",
};

const AccordionWrapper = ({
  title,
  children,
  index,
  isOpen,
  toggleAccordionHandler,
  tooltip,
  anchorSelect,
  alwaysOpen = false,
  isLast = false,
  data,
  type,
}) => {
  const [height, setHeight] = useState(0);
  const outerContentRef = useRef(null);
  const innerContentRef = useRef(null);
  const [isAnimationRunning, setAnimationRunning] = useState(false);

  const onClickHandler = () => {
    if (alwaysOpen) return;
    toggleAccordionHandler(index);
    setAnimationRunning(true);
  };

  const heightChangeHandler = () => {
    if (isOpen) {
      if (outerContentRef.current && innerContentRef.current) {
        const innerHeight = innerContentRef.current.scrollHeight;
        setHeight(innerHeight);
      }
    } else {
      setHeight(0);
    }
  };

  useEffect(() => {
    heightChangeHandler();
  }, [isOpen, JSON.stringify(data)]);

  return (
    <div className="w-full">
      <div
        className="cursor-pointer flex items-center justify-between gap-4 p-4 sm:p-6 hover:bg-brand-theme/5 transition-colors"
        onClick={onClickHandler}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-theme/10 rounded-lg flex items-center justify-center">
            <Image
              src={"/images/icons/arrow.svg"}
              width={12}
              height={8}
              alt=""
              className={`text-brand-theme transition-all duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <div>
            <p className="cursor-pointer font-bold text-lg text-brand-blue-700 leading-tight">
              {title}
            </p>
            {tooltip && (
              <ToolTip
                content={
                  <>
                    <span className="text-brand-neutral-900 font-semibold text-base block">
                      {title}
                    </span>
                    <span className="text-brand-neutral text-sm mt-2 block font-normal">
                      {tooltip}
                    </span>
                  </>
                }
                position="right"
                anchorSelect={anchorSelect}
                otherStyles={{ zIndex: 100 }}
                wrapperProps={{ className: "flex items-center justify-center" }}
              />
            )}
          </div>
        </div>
      </div>
      <div
        onTransitionEnd={() => {
          setAnimationRunning(false);
        }}
        className={`transition-all duration-300 ${
          !isOpen
            ? isAnimationRunning
              ? "overflow-y-clip"
              : "overflow-y-hidden"
            : isAnimationRunning
            ? "overflow-y-clip"
            : "overflow-y-visible"
        }`}
      >
        <div
          className={` ${
            type === "checkbox" && "overflow-hidden"
          } transition-all duration-500`}
          style={{ height: `${height}px` }}
          ref={outerContentRef}
        >
          <div ref={innerContentRef}>{children}</div>
        </div>
      </div>
      {/* {!isOpen && (
        <div>
          <div className="flex flex-wrap items-center gap-1">
            {appliedFilters.slice(0, 2).map((item, index) => {
              const label =
                attribute === "accessibility"
                  ? "Accessible"
                  : labels[item.label]
                  ? labels[item.label]
                  : item.label;
              return (
                <div className="flex">
                  <span className="text-brand-purple text-sm">
                    Hello world
                    {`${getFilterLabel(item)}${
                      appliedFilters[index + 1] ? "," : ""
                    }`}
                  </span>
                </div>
              );
            })}
            {appliedFilters.slice(2, appliedFilters.length).length > 0 && (
              <span className="text-brand-purple text-sm">{`+ ${
                appliedFilters.slice(2, appliedFilters.length).length
              } more`}</span>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AccordionWrapper;
