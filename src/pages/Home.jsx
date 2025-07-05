import React, { use } from "react";
import { useState, useEffect } from "react";
import { getConcerts, searchConcert } from "../services/api";
import ConcertCard from "../components/ConcertCard";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [concerts, setConcerts] = useState([]);
  const [filteredConcerts, setFilteredConcerts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConcerts = async () => {
      try {
        const allConcerts = await getConcerts();
        setConcerts(allConcerts);
        setFilteredConcerts(allConcerts);
      } catch (err) {
        console.log(err);
        setError("Failed to load Concerts....");
      } finally {
        setLoading(false);
      }
    };

    loadConcerts();
  }, []);

  // Filter concerts locally when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredConcerts(concerts);
    } else {
      const filtered = concerts.filter((concert) =>
        concert.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConcerts(filtered);
    }
  }, [searchQuery, concerts]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredConcerts(concerts);
      return;
    }
    if (loading) return;

    setLoading(true);

    try {
      const searchResults = await searchConcert(searchQuery);
      setConcerts(searchResults);
      setFilteredConcerts(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search concerts...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="searchbar-title"> Search by Event. Choose by View.</div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for concerts..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="concerts-container">
          <div className="concerts-grid">
            {filteredConcerts.map((concert) => (
              <ConcertCard concert={concert} key={concert.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
