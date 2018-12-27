import types from "../Actions/types";
import { combineReducers } from "redux";
import { mergeItemInArray, mergeObj } from "../Utils/utils";

const type = (state = [], action) => {
  switch (action.type) {
    case types.ADD_CART_ITEM:
      return [
        ...state,
        {
          id: action.payload.id,
          count: 1
        }
      ];
    case types.REMOVE_CART_ITEM:
      // eslint-disable-next-line no-case-declarations
      let itemIdx = state.findIndex(
        service => service.id === action.payload.id
      );
      return [...state.slice(0, itemIdx), ...state.slice(itemIdx + 1)];
    case types.CHANGE_CART_ITEM_COUNT:
      return mergeItemInArray(state, action.payload.id, item =>
        mergeObj(item, { count: action.payload.count })
      );
    default:
      return state;
  }
};

const items = (
  state = {
    rooms: [],
    services: []
  },
  action
) => {
  switch (action.type) {
    case types.ADD_CART_ITEM:
    case types.REMOVE_CART_ITEM:
    case types.CHANGE_CART_ITEM_COUNT:
      return mergeObj(state, {
        [action.payload.type]: type(state[action.payload.type], action)
      });
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

export default combineReducers({ items, info });
