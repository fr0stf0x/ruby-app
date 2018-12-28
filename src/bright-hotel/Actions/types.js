const INVALIDATE_DATA = "invalidate_data";
const REQUEST_DATA = "request_data";
const RECEIVE_DATA = "receive_data";

const CALCULATE_REMAINING = "cal_remain";
const CLEAR_CART = "clear_cart";
const SET_CART_AT = "set_hotel_cart";
const ADD_CART_ITEM = "add_cart_item";
const CHANGE_CART_ITEM_COUNT = "CHANGE_CART_ITEM_COUNT";
const REMOVE_CART_ITEM = "remove_cart_item";

const ADD_ROOM_DETAIL = "add_room_detail";
const CHANGE_ROOM_DETAIL = "change_room_detail";
const REMOVE_ROOM_DETAIL = "remove_room_detail";

const CHANGE_FIELDS = "change_fields";
const CHANGE_CUSTOMER_FIELD = "change_customer_field";
const CHANGE_CUSTOMER_FIELDS = "change_customer_fields";
const CHECK_AVAILABILITY = "check_rooms";

const TOGGLE_PROGRESS = "toggle_progress";
const TOGGLE_SHOW_CART = "toggle_cart";
const TOGGLE_SHOW_BOOKING_BOX = "toggle_booking_box";
const TOGGLE_CHECKOUT_FORM = "toggle_checkout_form";

const SHOW_SNACKBAR = "show_snackbar";
const HIDE_SNACKBAR = "hide_snackbar";

const SET_HOTEL_FILTER = "set_hotel_filter";
const TOGGLE_ROOMTYPE_FILTER = "toggle_roomtype_filter";

const types = {
  INVALIDATE_DATA,
  REQUEST_DATA,
  RECEIVE_DATA,

  CALCULATE_REMAINING,
  CLEAR_CART,
  ADD_CART_ITEM,
  CHANGE_CART_ITEM_COUNT,
  REMOVE_CART_ITEM,
  SET_CART_AT,
  ADD_ROOM_DETAIL,
  CHANGE_ROOM_DETAIL,
  REMOVE_ROOM_DETAIL,

  CHANGE_FIELDS,
  CHANGE_CUSTOMER_FIELD,
  CHANGE_CUSTOMER_FIELDS,
  CHECK_AVAILABILITY,

  TOGGLE_PROGRESS,
  TOGGLE_SHOW_CART,
  TOGGLE_SHOW_BOOKING_BOX,
  TOGGLE_CHECKOUT_FORM,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,

  SET_HOTEL_FILTER,
  TOGGLE_ROOMTYPE_FILTER
};

export default types;
