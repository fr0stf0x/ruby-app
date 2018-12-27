import { combineReducers } from "redux";
import cart from "./Cart";
import bookingFields from "./Booking";
import data from "./Server";
import uiState from "./Ui";
import customerInfo from "./CustomerInfo";

const BrightHotelApp = combineReducers({
  bookingFields,
  cart,
  data,
  uiState,
  customerInfo
});

export const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

export default BrightHotelApp;
