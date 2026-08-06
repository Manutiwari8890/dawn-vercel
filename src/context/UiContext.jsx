"use client";

import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export function UIProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);

  const toggleCart = () => {
    document.documentElement.style.overflow = isCartOpen ? "auto" : "hidden";
    setIsCartOpen(prev => !prev);
    setIsOverlay(prev => !prev);
  };

  return (
    <UIContext.Provider
      value={{
        isCartOpen,
        isOverlay,
        toggleCart,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used within UIProvider");
  }

  return context;
};