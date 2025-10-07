export const POSSESSION_VALUES = [
  "READY TO MOVE",
  "IN 1 YEAR",
  "IN 2 YEARS",
  "IN 3 YEARS",
  "3 YEARS+",
];

export const formatPossession = (possession, possessionDate = null) => {
  // If possessionDate is provided, format it as month/year
  if (possessionDate) {
    const date = new Date(possessionDate);
    const currentDate = new Date();

    // Check if the month and year match today's month and year
    if (
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    ) {
      return "Ready to Move";
    }

    // Format as "Month Year" (e.g., "Dec 2024")
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }

  // Fallback to original string-based formatting
  switch (possession) {
    case "3 YEARS+":
      return "3 Years+";
    case "READY TO MOVE":
      return "Ready to Move";
    case "IN 1 YEAR":
      return "In 1 Year";
    case "IN 2 YEARS":
      return "In 2 Years";
    case "IN 3 YEARS":
      return "In 3 Years";
    default:
      return possession;
  }
};

export const getPossessionProgress = (possession, possessionDate = null) => {
  // If possessionDate is provided, calculate progress based on date
  if (possessionDate) {
    const date = new Date(possessionDate);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const targetMonth = date.getMonth();
    const targetYear = date.getFullYear();

    // If it's the current month and year, show 100% (Ready to Move)
    if (targetMonth === currentMonth && targetYear === currentYear) {
      return 100;
    }

    // Calculate months difference
    const monthsDiff =
      (targetYear - currentYear) * 12 + (targetMonth - currentMonth);

    if (monthsDiff <= 0) {
      return 100; // Past due or current month
    } else if (monthsDiff <= 12) {
      return Math.max(70, 100 - monthsDiff * 5); // 70-100% for within 1 year
    } else if (monthsDiff <= 24) {
      return Math.max(45, 70 - (monthsDiff - 12) * 2); // 45-70% for 1-2 years
    } else if (monthsDiff <= 36) {
      return Math.max(25, 45 - (monthsDiff - 24) * 1.5); // 25-45% for 2-3 years
    } else {
      return Math.max(10, 25 - (monthsDiff - 36) * 0.5); // 10-25% for 3+ years
    }
  }

  // Fallback to original logic for string-based possession
  if (!possession) return 0;
  switch (possession) {
    case "READY TO MOVE":
      return 100;
    case "IN 1 YEAR":
      return 70;
    case "IN 2 YEARS":
      return 45;
    case "IN 3 YEARS":
      return 25;
    case "3 YEARS+":
      return 10;
    default:
      return 0;
  }
};
