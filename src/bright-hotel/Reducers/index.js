import { combineReducers } from "redux";
import cart from "./Cart";
import server from "./Server";
import bookingFields from "./FormFieldMng";

const BrightHotelApp = combineReducers({
  bookingFields,
  server,
  cart
});

export default BrightHotelApp;
