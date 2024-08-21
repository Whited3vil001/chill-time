// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Search from "./components/Search";
import TVShowDetails from "./components/TVShowDetails";
import Favorites from "./components/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";
import { Link } from "react-router-dom";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="App">
          <h1>ChillTime</h1>
          <div>
            <nav>
              <button>
                <Link to="/">Home</Link>
              </button>

              <button>
                <Link to="/favorites">Favorites</Link>
              </button>
            </nav>
          </div>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/show/:id" element={<TVShowDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
