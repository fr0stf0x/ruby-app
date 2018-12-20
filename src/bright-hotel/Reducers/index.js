import { combineReducers } from "redux";
import cart from "./Cart";
import bookingFields from "./Booking";
import { rooms, roomTypes, hotels } from "./Data";
import server from "./Server";

const BrightHotelApp = combineReducers({
  bookingFields,
  cart,
  server,
  rooms,
  roomTypes,
  hotels
});

export function createReducer(initialState, handlers) {
  return (state = initialState, action) =>
    handlers[action.type](state, action) || state;
}

export default BrightHotelApp;
