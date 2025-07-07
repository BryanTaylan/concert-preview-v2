import React from "react";
import "../css/ConcertCard.css";
import { Calendar, MapPin, Ticket, Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function ConcertCard({ concert }) {
  const navigate = useNavigate();

  const handleViewSeatMap = () => {
    navigate(`/seatmap/${concert.id}`);
  };

  const hasSeatMap = !!concert.seatmap?.staticUrl;

  return (
    <div className="concert-card">
      <div className="concert-image">
        <img
          src={
            concert.images?.[0]?.url ||
            "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800"
          }
          alt={concert.name}
        />
      </div>

      <div className="concert-info">
        <h3>{concert.name}</h3>

        {concert.dates?.start?.localDate && (
          <div className="concert-date">
            <Calendar className="icon" />
            <p>{concert.dates.start.localDate}</p>
          </div>
        )}

        {concert._embedded?.venues?.[0]?.name && (
          <div className="concert-venue">
            <MapPin className="icon" />
            <p>{concert._embedded.venues[0].name}</p>
          </div>
        )}

        <div className="concert-actions">
          <a
            className="concert-link"
            href={concert.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Ticket className="icon" />
            View Tickets
          </a>

          <button
            className="seatmap-btn"
            onClick={handleViewSeatMap}
            disabled={!hasSeatMap}
          >
            {hasSeatMap ? (
              <>
                <Eye className="icon" alt="view seat map" />
                View Seat Map
              </>
            ) : (
              <>
                <EyeOff className="icon" />
                Seat Map Unavailable
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConcertCard;
