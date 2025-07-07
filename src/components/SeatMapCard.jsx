import React from "react";
import { useState, useEffect } from "react";

export default function SeatMapCard({ concert }) {
  return (
    <div className="seatmap-page">
      <h2>{concert.name}</h2>
      <h2>{concert._embedded.venues[0].name}</h2>
      <h2>{concert.dates.start.localDate}</h2>
      <img
        src={concert.seatmap.staticUrl}
        alt={`${concert.name} seat map`}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
