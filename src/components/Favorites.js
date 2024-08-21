// src/components/Favorites.js
import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <h2>Your Favorite Shows</h2>
      {favorites.length === 0 ? (
        <p>No favorite shows yet.</p>
      ) : (
        <div>
          {favorites.map((show) => (
            <div key={show.id}>
              <Link to={`/show/${show.id}`}>
                <h3>{show.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
