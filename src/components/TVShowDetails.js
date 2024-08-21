// src/components/TVShowDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EpisodeList from "./EpisodeList";
import { useFavorites } from "../context/FavoritesContext";

const TVShowDetails = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setShowDetails(response.data);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    fetchShowDetails();
  }, [id]);

  return (
    <div>
      {showDetails ? (
        <>
          <h1>{showDetails.name}</h1>
          <button onClick={() => toggleFavorite(showDetails)}>
            {favorites.find((fav) => fav.id === showDetails.id)
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </button>
          {showDetails.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${showDetails.backdrop_path}`}
              alt={showDetails.name}
              className="backdrop-image"
            />
          )}
          {showDetails.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${showDetails.poster_path}`}
              alt={showDetails.name}
              className="show-poster"
            />
          )}
          <p>{showDetails.overview}</p>
          <p>First Air Date: {showDetails.first_air_date}</p>
          <p>Rating: {showDetails.vote_average}</p>

          {showDetails.seasons.map((season) => (
            <EpisodeList
              key={season.id}
              showId={id}
              seasonNumber={season.season_number}
            />
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TVShowDetails;
