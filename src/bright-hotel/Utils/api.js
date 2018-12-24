export const API_URL =
  process.env.BACKEND_REST_URL ||
  // "https://5bfd126b827c3800139ae8c7.mockapi.io/js-funds";
  "http://localhost:8080/api";

const ALL_ROOM_TYPES = "roomTypes";
const CHECK_AVAILABLE = "availableRoomTypes";
const BOOKING = "bookings";
const SERVICES = "services";
const SERVICE_TYPES = "serviceTypes";
const HOTELS = "hotels";

const END_POINTS = {
  ALL_ROOM_TYPES,
  CHECK_AVAILABLE,
  BOOKING,
  SERVICES,
  HOTELS,
  SERVICE_TYPES
};

export const mapEndpoint = endpoint => {
  switch (endpoint) {
    case CHECK_AVAILABLE:
      return "availability";
    case ALL_ROOM_TYPES:
      return "rooms";
    default:
      return endpoint;
  }
};

export const mapEndpointId = endpoint => {
  switch (endpoint) {
    case CHECK_AVAILABLE:
    case HOTELS:
      return "hotelName";
    default:
      return "id";
  }
};

export const mapQuery = endpoint => {
  switch (endpoint) {
    case HOTELS:
    case CHECK_AVAILABLE:
      return { byId: "byHotelName", allIds: "allHotelNames" };
    default:
      return { byId: "byId", allIds: "allIds" };
  }
};

export default END_POINTS;
