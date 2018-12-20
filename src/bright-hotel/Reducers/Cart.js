import types from "../Actions/types";
import { combineReducers } from "redux";

const rooms = (state = [], action) => {
  switch (action.type) {
    case types.ADD_ROOM_TO_CART:
      return [...state, action.roomId];
    case types.REMOVE_ROOM_FROM_CART:
      return state.slice(
        0,
        state.findIndex(room => room.roomId === action.roomId)
      );
    default:
      return state;
  }
};

const services = (state = [], action) => {
  switch (action.type) {
    case types.ADD_SERVICE_TO_CART:
      return [...state, action.serviceId];
    case types.REMOVE_SERVICE_FROM_CART:
      return state.slice(
        0,
        state.findIndex(service => service.serviceId === action.serviceId)
      );
    default:
      return state;
  }
};

export default combineReducers({ rooms, services });
