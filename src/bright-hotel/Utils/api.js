export const API_URL =
  process.env.BACKEND_REST_URL ||
  // "https://5bfd126b827c3800139ae8c7.mockapi.io/js-funds";
  "http://localhost:8080/api";

const ALL_ROOM_TYPES = "rooms/roomTypes";
const CHECK_AVAILABLE = "rooms/checkAvailable";
const BOOKING = "bookings";
const SERVICES = "services";
const HOTELS = "hotels";

const END_POINTS = {
  ALL_ROOM_TYPES,
  CHECK_AVAILABLE,
  BOOKING,
  SERVICES,
  HOTELS
};

export const mapEndpoint = endpoint => {
  switch (endpoint) {
    case END_POINTS.CHECK_AVAILABLE:
    case END_POINTS.ALL_ROOM_TYPES:
      return "roomTypes";
    default:
      return endpoint;
  }
};

export default END_POINTS;
