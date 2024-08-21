// src/components/Search.js
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setRecommendations(response.data.results);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);

  const fetchData = async (searchQuery) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchQuery}`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const debouncedFetchData = useCallback(debounce(fetchData, 500), []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      debouncedFetchData(value);
    } else {
      setResults([]);
    }
  };

  const handleSearchClick = () => {
    if (query) {
      fetchData(query);
    }
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for TV shows..."
          value={query}
          onChange={handleInputChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>

      <div className="search-results">
        {results.map((result) => (
          <div key={result.id} className="search-item">
            <Link to={`/show/${result.id}`}>
              {result.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                  alt={result.name}
                />
              ) : (
                <div className="placeholder">No Image</div>
              )}
            </Link>
            <div className="show-details">
              <Link to={`/show/${result.id}`}>
                <h3>{result.name}</h3>
              </Link>
              <p>{result.overview}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Recommended Shows</h2>
      <div className="recommendations">
        {recommendations.map((show) => (
          <div key={show.id} className="recommendation-item">
            <Link to={`/show/${show.id}`}>
              {show.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                  alt={show.name}
                />
              ) : (
                <div className="placeholder">No Image</div>
              )}
            </Link>
            <div className="show-details">
              <Link to={`/show/${show.id}`}>
                <h3>{show.name}</h3>
              </Link>
              <p>{show.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
