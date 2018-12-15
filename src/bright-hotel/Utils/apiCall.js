import fetch from "cross-fetch";
import { stringify } from "query-string";

export const API_URL =
  process.env.BACKEND_REST_URL || "http://localhost:8081/api";
// "https://5bfd126b827c3800139ae8c7.mockapi.io/js-funds";

export const END_POINTS = {
  roomTypes: "roomTypes",
  services: "services",
  checkAvailable: "bookings/checkAvailable"
};

export const fetchDataFromServer = (endpoint, options) => {
  options = {
    ...options,
    limit: 5
  };
  let url = `${API_URL}/${endpoint}?${stringify(options)}`;
  console.log(url);

  return fetch(url)
    .then(res => res.json())
    .then(res => console.log(res))
    .then(res => res.slice(0, options.limit));
};
