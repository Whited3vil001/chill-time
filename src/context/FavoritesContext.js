// src/context/FavoritesContext.js
import React, { createContext, useState, useContext } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (show) => {
    setFavorites((prev) =>
      prev.find((fav) => fav.id === show.id)
        ? prev.filter((fav) => fav.id !== show.id)
        : [...prev, show]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
