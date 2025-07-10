import React from "react";
import { useState, useEffect } from "react";
import { getConcertById, getConcerts, searchConcert } from "../services/api";
import { useParams } from "react-router-dom";
import SeatMapCard from "../components/SeatMapCard";

function SeatMap() {
  const { concertId } = useParams();
  const [concert, setConcert] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConcert = async () => {
      try {
        const data = await getConcertById(concertId);
        setConcert(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load Concert Map....");
      } finally {
        setLoading(false);
      }
    };

    loadConcert();
  }, [concertId]);

  if (loading) return <p>Loading...</p>;
  if (!concert?.seatmap?.staticUrl) return <p>No Seat Map Available.</p>;

  return loading ? (
    <div className="loading">Loading...</div>
  ) : error ? (
    <div className="error">{error}</div>
  ) : (
    <div className="map-container">
      <SeatMapCard concert={concert} />
    </div>
  );
}
export default SeatMap;
