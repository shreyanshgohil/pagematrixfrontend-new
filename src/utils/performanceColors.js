/**
 * Performance color utilities matching PageSpeed Insights
 * Good: Green (#0cce6b)
 * Average/Needs Improvement: Orange (#ffa400)
 * Poor: Red (#ff4e42)
 */

export const getPerformanceColor = (score) => {
  if (score >= 90) {
    return {
      text: "text-performance-good",
      bg: "bg-performance-good",
      bgLight: "bg-performance-good/20",
      border: "border-performance-good/30",
      gradient: "from-performance-good to-performance-good-dark",
    };
  } else if (score >= 50) {
    return {
      text: "text-performance-average",
      bg: "bg-performance-average",
      bgLight: "bg-performance-average/20",
      border: "border-performance-average/30",
      gradient: "from-performance-average to-performance-average-dark",
    };
  } else {
    return {
      text: "text-performance-poor",
      bg: "bg-performance-poor",
      bgLight: "bg-performance-poor/20",
      border: "border-performance-poor/30",
      gradient: "from-performance-poor to-performance-poor-dark",
    };
  }
};

export const getMetricColor = (value, thresholds) => {
  // thresholds: { good: max, average: max }
  if (value <= thresholds.good) {
    return {
      text: "text-performance-good",
      bg: "bg-performance-good",
      bgLight: "bg-performance-good/20",
      border: "border-performance-good/30",
      gradient: "from-performance-good to-performance-good-dark",
    };
  } else if (value <= thresholds.average) {
    return {
      text: "text-performance-average",
      bg: "bg-performance-average",
      bgLight: "bg-performance-average/20",
      border: "border-performance-average/30",
      gradient: "from-performance-average to-performance-average-dark",
    };
  } else {
    return {
      text: "text-performance-poor",
      bg: "bg-performance-poor",
      bgLight: "bg-performance-poor/20",
      border: "border-performance-poor/30",
      gradient: "from-performance-poor to-performance-poor-dark",
    };
  }
};

export const getCategoryColor = (category) => {
  // category: "FAST", "AVERAGE", "SLOW"
  if (category === "FAST") {
    return {
      text: "text-performance-good",
      bg: "bg-performance-good",
      bgLight: "bg-performance-good/20",
      border: "border-performance-good/30",
    };
  } else if (category === "AVERAGE") {
    return {
      text: "text-performance-average",
      bg: "bg-performance-average",
      bgLight: "bg-performance-average/20",
      border: "border-performance-average/30",
    };
  } else {
    return {
      text: "text-performance-poor",
      bg: "bg-performance-poor",
      bgLight: "bg-performance-poor/20",
      border: "border-performance-poor/30",
    };
  }
};

export const getScoreBadgeClasses = (score) => {
  // score is 0-1 (Lighthouse score)
  if (score === null || score === undefined) {
    return "bg-gray-100/20 text-gray-500 border-gray-300/30";
  }
  if (score >= 0.9) {
    return "bg-performance-good/20 text-performance-good border-performance-good/30";
  } else if (score >= 0.5) {
    return "bg-performance-average/20 text-performance-average border-performance-average/30";
  } else {
    return "bg-performance-poor/20 text-performance-poor border-performance-poor/30";
  }
};

