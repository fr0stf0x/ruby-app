import types from "../Actions/types";
import { combineReducers } from "redux";
import { mergeObj } from "../Utils/utils";

const room = (
  state = {
    roomTypeId: "",
    at: "",
    count: 1,
    totalPrice: ""
  },
  action
) => {
  switch (action.type) {
    case types.INCREASE_ROOM:
      return mergeObj(state, { count: state.count + 1 });
    case types.DECREASE_ROOM:
      return mergeObj(state, { count: state.count - 1 });
    default:
      return state;
  }
};

const rooms = (state = [], action) => {
  switch (action.type) {
    case types.ADD_ROOM_TO_CART:
      return [
        ...state,
        {
          id: [action.payload.roomTypeId],
          at: action.payload.hotelName,
          count: 1
        }
      ];
    case types.REMOVE_ROOM_FROM_CART:
      return state.slice(0, state.findIndex(room => room.id === action.roomId));
    default:
      return state;
  }
};

const services = (state = [], action) => {
  switch (action.type) {
    case types.ADD_SERVICE_TO_CART:
      return [...state, action.payload.serviceId];
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
