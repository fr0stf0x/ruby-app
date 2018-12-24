const INVALIDATE_DATA = "invalidate_data";
const REQUEST_DATA = "request_data";
const RECEIVE_DATA = "receive_data";

const ADD_ROOM_TO_CART = "add_room";
const REMOVE_ROOM_FROM_CART = "remove_room";
const ADD_SERVICE_TO_CART = "add_service";
const REMOVE_SERVICE_FROM_CART = "remove_service";

const CHANGE_NUM_ROOMS = "change_rooms";
const CHANGE_NUM_SERVICES = "change_services";

const CHANGE_FIELDS = "change_fields";
const CHECK_AVAILABILITY = "check_rooms";

// const SET_CURRENT_ROOM = "set_current_room";
const TOGGLE_SHOW_CART = "toggle_cart";
const TOGGLE_SHOW_BOOKING_BOX = "toggle_booking_box";

const SET_HOTEL_FILTER = "set_hotel_filter";
const TOGGLE_ROOMTYPE_FILTER = "toggle_roomtype_filter";

const types = {
  INVALIDATE_DATA,
  REQUEST_DATA,
  RECEIVE_DATA,

  ADD_ROOM_TO_CART,
  REMOVE_ROOM_FROM_CART,
  ADD_SERVICE_TO_CART,
  REMOVE_SERVICE_FROM_CART,

  CHANGE_NUM_ROOMS,
  CHANGE_NUM_SERVICES,

  CHANGE_FIELDS,
  CHECK_AVAILABILITY,

  TOGGLE_SHOW_CART,
  TOGGLE_SHOW_BOOKING_BOX,

  SET_HOTEL_FILTER,
  TOGGLE_ROOMTYPE_FILTER
};

export default types;
