const INVALIDATE_DATA = "invalidate_data";
const REQUEST_DATA = "request_data";
const RECEIVE_DATA = "receive_data";

const ADD_ROOM_TO_CART = "add_room";
const ADD_SERVICE_TO_CART = "add_service";

const CHANGE_NUM_ROOMS = "change_rooms";
const CHANGE_NUM_SERVICES = "change_services";

const SET_CART_AT = "set_hotel_cart";
const REMOVE_ROOM_FROM_CART = "remove_room";
const REMOVE_SERVICE_FROM_CART = "remove_service";

const ADD_CART_ITEM = "add_cart_item";
const CHANGE_CART_ITEM_COUNT = "CHANGE_CART_ITEM_COUNT";
const REMOVE_CART_ITEM = "remove_cart_item";

const CHANGE_FIELDS = "change_fields";
const CHANGE_CUSTOMER_FIELD = "change_customer_field";
const CHANGE_CUSTOMER_FIELDS = "change_customer_fields";
const CHECK_AVAILABILITY = "check_rooms";

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

  ADD_ROOM_TO_CART,
  ADD_SERVICE_TO_CART,

  ADD_CART_ITEM,
  CHANGE_CART_ITEM_COUNT,
  REMOVE_CART_ITEM,

  SET_CART_AT,
  CHANGE_NUM_ROOMS,
  REMOVE_ROOM_FROM_CART,
  CHANGE_NUM_SERVICES,
  REMOVE_SERVICE_FROM_CART,

  CHANGE_FIELDS,
  CHANGE_CUSTOMER_FIELD,
  CHANGE_CUSTOMER_FIELDS,
  CHECK_AVAILABILITY,

  TOGGLE_SHOW_CART,
  TOGGLE_SHOW_BOOKING_BOX,
  TOGGLE_CHECKOUT_FORM,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,

  SET_HOTEL_FILTER,
  TOGGLE_ROOMTYPE_FILTER
};

export default types;
