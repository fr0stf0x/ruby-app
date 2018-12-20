import { combineReducers } from "redux";
import cart from "./Cart";
import bookingFields from "./Booking";
import server from "./Server";
import uiState from "./Ui";

const BrightHotelApp = combineReducers({
  bookingFields,
  cart,
  uiState,
  data: server
});

export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) =>
    handlers[action.type](state, action) || state;
};

export default BrightHotelApp;
