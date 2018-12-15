import * as types from "../Utils/ActionTypes";
import { combineReducers } from "redux";

const cart = {
  rooms: [],
  services: []
};

const rooms = (state = cart, action) => {
  switch (action.type) {
    case types.ADD_ROOM_TO_CART:
      return {
        ...state,
        rooms: [...state.rooms, action.roomId]
      };
    case types.REMOVE_ROOM_FROM_CART:
      return state.slice(
        0,
        state.findIndex(room => room.roomId === action.roomId)
      );
    default:
      return state;
  }
};

const services = (state = cart, action) => {
  switch (action.type) {
    case types.ADD_SERVICE_TO_CART:
      return {
        ...state,
        services: [...state.services, action.serviceId]
      };
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
