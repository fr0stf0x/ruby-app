import { applyMiddleware, createStore, compose } from "redux";
import BrightHotelApp from "./bright-hotel/Reducers";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = preloadedState => {
  return createStore(
    BrightHotelApp,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;
