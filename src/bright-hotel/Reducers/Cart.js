import types from "../Actions/types";
import { combineReducers } from "redux";
import { mergeItemInArray, mergeObj } from "../Utils/utils";

const rooms = (state = [], action) => {
  switch (action.type) {
    case types.ADD_ROOM_TO_CART:
      return [
        ...state,
        {
          id: action.payload.roomTypeId,
          at: action.payload.hotelName,
          count: 1
        }
      ];
    case types.REMOVE_ROOM_FROM_CART:
      // eslint-disable-next-line no-case-declarations
      let itemIdx = state.findIndex(room => room.id === action.payload.roomId);
      return [...state.slice(0, itemIdx), ...state.slice(itemIdx + 1)];
    case types.CHANGE_NUM_ROOMS:
      return mergeItemInArray(state, action.payload.id, item =>
        mergeObj(item, { count: action.payload.count })
      );
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
