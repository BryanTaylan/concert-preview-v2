import React from "react";
import "../css/ConcertCard.css";

function ConcertCard({ concert }) {
  return (
    <div className="concert-card">
      <div className="concert-image">
        <img src={concert.images?.[0]?.url || ""} alt={concert.name} />
      </div>

      <div className="concert-info">
        <h3>{concert.name}</h3>
        <p>{concert.dates?.start?.localDate}</p>
        <p>{concert._embedded?.venues?.[0]?.name}</p>
      </div>
    </div>
  );
}
export default ConcertCard;
