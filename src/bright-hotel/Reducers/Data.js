import types from "../Actions/types";
import { mergeItemInArray } from "../Utils/utils";

export const roomTypes = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_DATA_ROOMTYPES:
      return mergeItemInArray(state, action.data);
    default:
      return state;
  }
};

export const hotels = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_DATA_HOTELS:
      return mergeItemInArray(state, action.data);
    default:
      return state;
  }
};

export const rooms = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_DATA_ROOMS:
      return mergeItemInArray(state, action.data);
    default:
      return state;
  }
};
