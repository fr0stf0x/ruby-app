import fetch from "cross-fetch";
import { stringify } from "query-string";

export const API_URL =
  process.env.BACKEND_REST_URL ||
  // "https://5bfd126b827c3800139ae8c7.mockapi.io/js-funds";
  "http://localhost:8080/api";

export const END_POINTS = {
  allRoomTypes: "rooms/roomTypes",
  // roomTypes: "roomTypes",
  book: "bookings",
  services: "services",
  availableRooms: "rooms/checkAvailable",
  hotels: "hotels"
};

export const fetchDataFromServer = (
  endpoint,
  params,
  options = { limit: 10 }
) => {
  let url = `${API_URL}/${endpoint}?${stringify(params)}&${stringify(options)}`;
  console.log("url", url);
  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
};
