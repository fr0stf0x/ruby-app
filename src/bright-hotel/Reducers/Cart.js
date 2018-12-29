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
          count: action.payload.count,
          availableType: action.payload.availableType
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
    case types.CLEAR_CART:
      return mergeObj(state, { rooms: [], services: [] });
    default:
      return state;
  }
};

const info = (
  state = {
    roomDetails: [],
    at: ""
  },
  action
) => {
  switch (action.type) {
    case types.CLEAR_CART:
      return mergeObj(state, { at: "", roomDetails: [] });
    case types.SET_CART_AT:
      return mergeObj(state, { at: action.payload.at });
    case types.CALCULATE_REMAINING:
      return mergeObj(state, {
        remaining: action.payload
      });
    case types.ADD_ROOM_DETAIL:
      return mergeObj(state, {
        roomDetails: mergeObj(state.roomDetails, {
          [action.payload.roomTypeId]: {
            rooms: action.payload.details
          }
        })
      });
    case types.CHANGE_ROOM_DETAIL:
      return mergeObj(state, {
        roomDetails: mergeObj(state.roomDetails, {
          [action.payload.roomTypeId]: mergeObj({
            rooms: mergeObj(
              state.roomDetails[action.payload.roomTypeId].rooms,
              {
                [action.payload.id]: mergeObj(
                  state.roomDetails[action.payload.roomTypeId].rooms[
                    action.payload.id
                  ],
                  action.payload.change
                )
              }
            )
          })
        })
      });
    case types.REMOVE_ROOM_DETAIL:
      // eslint-disable-next-line no-case-declarations
      let itemIdx = state.roomDetails.findIndex(
        item => item.id === action.payload.id
      );
      return mergeObj(state, {
        roomDetails: [
          ...state.roomDetails.slice(0, itemIdx),
          ...state.roomDetails.slice(itemIdx + 1)
        ]
      });
    default:
      return state;
  }
};

export default combineReducers({ items, info });
