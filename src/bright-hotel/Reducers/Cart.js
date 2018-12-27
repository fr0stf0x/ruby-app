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
          count: 1
        }
      ];
    case types.REMOVE_ROOM_FROM_CART:
      // eslint-disable-next-line no-case-declarations
      let itemIdx = state.findIndex(room => room.id === action.payload.id);
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
      return [
        ...state,
        {
          id: action.payload.serviceId,
          count: 1
        }
      ];
    case types.REMOVE_SERVICE_FROM_CART:
      // eslint-disable-next-line no-case-declarations
      let itemIdx = state.findIndex(
        service => service.id === action.payload.id
      );
      return [...state.slice(0, itemIdx), ...state.slice(itemIdx + 1)];
    case types.CHANGE_NUM_SERVICES:
      return mergeItemInArray(state, action.payload.id, item =>
        mergeObj(item, { count: action.payload.count })
      );
    default:
      return state;
  }
};

const info = (state = {}, action) => {
  switch (action.type) {
    case types.SET_CART_AT:
      return mergeObj(state, { at: action.payload.at });
    default:
      return state;
  }
};

export default combineReducers({ rooms, services, info });
