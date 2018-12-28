import types from "../Actions/types";
import { mergeObj } from "../Utils/utils";

export const SHOW_ALL = "show_all";
export const HOTEL_FILTER_SPECTIFIC = "hotel_specific";
export const ROOMTYPE_FILTER_AVAILABLE = "room_available";

const uiState = (
  state = {
    hotelFilter: { filter: SHOW_ALL, specific: "not_specific" },
    roomTypeFilter: { filter: SHOW_ALL },
    bookingBoxOpen: true,
    cartOpen: false,
    snackBar: {
      open: false
    },
    checkoutForm: false,
    isLoading: false
  },
  action
) => {
  switch (action.type) {
    case types.SET_HOTEL_FILTER:
      return mergeObj(state, {
        hotelFilter: {
          filter: action.payload.filter,
          specific: action.payload.specific
        }
      });
    case types.TOGGLE_ROOMTYPE_FILTER:
      return mergeObj(state, {
        roomTypeFilter: {
          filter: action.payload.filter
        }
      });
    case types.TOGGLE_SHOW_BOOKING_BOX:
      return mergeObj(state, {
        bookingBoxOpen: !state.bookingBoxOpen
      });
    case types.TOGGLE_SHOW_CART:
      return mergeObj(state, { cartOpen: !state.cartOpen });
    case types.SHOW_SNACKBAR:
      return mergeObj(state, {
        snackBar: {
          open: true,
          message: action.payload.message,
          onClose: action.payload.onClose
        }
      });
    case types.HIDE_SNACKBAR:
      return mergeObj(state, {
        snackBar: {
          open: false
        }
      });
    case types.TOGGLE_CHECKOUT_FORM:
      return mergeObj(state, {
        checkoutForm: !state.checkoutForm
      });
    case types.TOGGLE_PROGRESS:
      return mergeObj(state, {
        isLoading: !state.isLoading
      });
    default:
      return state;
  }
};

export default uiState;
