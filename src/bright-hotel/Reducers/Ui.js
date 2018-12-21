import types from "../Actions/types";
import { mergeObj } from "../Utils/utils";

export const SHOW_ALL = "show_all";
export const HOTEL_FILTER_SPECTIFIC = "hotel_specific";

export const ROOMTYPE_FILTER_AVAILABLE = "room_available";

const uiState = (
  state = {
    hotelFilter: { filter: SHOW_ALL, specific: {} },
    roomTypeFilter: { filter: SHOW_ALL, specific: {} },
    dialogOpen: false
  },
  action
) => {
  switch (action.type) {
    case types.SET_HOTEL_FILTER:
      return mergeObj(state, {
        hotelFilter: {
          filter: action.payload.filter,
          only: action.payload.specific
        }
      });
    case types.SET_ROOMTYPE_FILTER:
      return mergeObj(state, {
        roomTypeFilter: {
          filter: action.payload.filter,
          only: action.payload.specific
        }
      });
    case types.TOGGLE_SHOW_DATA:
      return mergeObj(state, { dialogOpen: !state.dialogOpen });
    default:
      return state;
  }
};

export default uiState;
