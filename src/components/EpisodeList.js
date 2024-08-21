// src/components/EpisodeList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const EpisodeList = ({ showId, seasonNumber }) => {
  const [episodes, setEpisodes] = useState([]);
  const [watchedEpisodes, setWatchedEpisodes] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setEpisodes(response.data.episodes);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
  }, [showId, seasonNumber]);

  const toggleWatched = (episodeId) => {
    setWatchedEpisodes((prev) =>
      prev.includes(episodeId)
        ? prev.filter((id) => id !== episodeId)
        : [...prev, episodeId]
    );
  };

  return (
    <div>
      <h2>Season {seasonNumber}</h2>
      <ul className="episode-list">
        {episodes.map((episode) => (
          <li key={episode.id} className="episode-item">
            {episode.still_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${episode.still_path}`}
                alt={episode.name}
                className="episode-image"
              />
            ) : (
              <div className="placeholder">No Image</div>
            )}
            <label>
              <input
                type="checkbox"
                checked={watchedEpisodes.includes(episode.id)}
                onChange={() => toggleWatched(episode.id)}
              />
              {episode.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
