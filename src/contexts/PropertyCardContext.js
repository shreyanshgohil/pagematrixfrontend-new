import { createContext, useContext, useState } from "react";

const PropertyCardContext = createContext();

export const usePropertyCard = () => {
  const context = useContext(PropertyCardContext);
  if (!context) {
    throw new Error(
      "usePropertyCard must be used within a PropertyCardProvider"
    );
  }
  return context;
};

export const PropertyCardProvider = ({ children }) => {
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const setHoveredCard = (cardId) => {
    setHoveredCardId(cardId);
  };

  const clearHoveredCard = () => {
    setHoveredCardId(null);
  };

  const isCardHovered = (cardId) => {
    return hoveredCardId === cardId;
  };

  return (
    <PropertyCardContext.Provider
      value={{
        hoveredCardId,
        setHoveredCard,
        clearHoveredCard,
        isCardHovered,
      }}
    >
      {children}
    </PropertyCardContext.Provider>
  );
};
