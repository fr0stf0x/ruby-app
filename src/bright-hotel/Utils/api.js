export const API_URL = 'https://5bfd126b827c3800139ae8c7.mockapi.io/bright-hotel';
export const API_URL_TYPES = 'https:/5ead8c5e4350860016e13856.mockapi.io/bright-hotel';

const ALL_ROOM_TYPES = "roomTypes";
const CHECK_AVAILABLE = "availableRoomTypes";
const BOOKING = "bookings";
const SERVICES = "services";
const SERVICE_TYPES = "serviceTypes";
const HOTELS = "hotels";
const CHECK_OUT = "bookings/checkout";
const MY_INFO = "myInfo";

const END_POINTS = {
  ALL_ROOM_TYPES,
  CHECK_AVAILABLE,
  BOOKING,
  SERVICES,
  HOTELS,
  SERVICE_TYPES,
  CHECK_OUT,
  MY_INFO
};

export const mapAPIUrl = endpoint => {
  switch (endpoint) {
    case SERVICE_TYPES:
      return API_URL_TYPES;
    case ALL_ROOM_TYPES:
      return API_URL_TYPES;
    default:
      return API_URL;
  }
}

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
