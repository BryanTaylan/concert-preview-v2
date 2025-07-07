const API_KEY = "faZa4A5lWyAAp7hJn1S4yCoLYzuDcJ6T";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/";

///https://app.ticketmaster.com/discovery/v2/events.json?segmentName=Music&apikey=YOUR_API_KEY

export const getConcerts = async () => {
  const response = await fetch(
    `${BASE_URL}events.json?segmentName=Music&size=100&apikey=${API_KEY}`
  );
  const data = await response.json();
  return data._embedded?.events || [];
};

export const searchConcert = async (query) => {
  const response = await fetch(
    `${BASE_URL}events.json?segmentName=Music&apikey=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );

  const data = await response.json();
  return data._embedded?.events || [];
};

export const getConcertById = async (id) => {
  const response = await fetch(
    `${BASE_URL}events/${id}.json?apikey=${API_KEY}`
  );
  const data = await response.json();
  return data;
};
