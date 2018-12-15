import { applyMiddleware, createStore } from "redux";
import BrightHotelApp from "./bright-hotel/Reducers";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const logger = createLogger();

const configureStore = preloadedState => {
  return createStore(
    BrightHotelApp,
    preloadedState,
    applyMiddleware(thunk, logger)
  );
};

export default configureStore;
