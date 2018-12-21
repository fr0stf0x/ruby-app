const INVALIDATE_DATA = "invalidate_data";
const REQUEST_DATA = "request_data";
const RECEIVE_DATA = "receive_data";

const RECEIVE_DATA_HOTELS = "receive_data_hotels";
const RECEIVE_DATA_ROOMS = "receive_data_rooms";
const RECEIVE_DATA_ROOMTYPES = "receive_data_roomtypes";

const ADD_ROOM_TO_CART = "add_room";
const REMOVE_ROOM_FROM_CART = "add_room";

const ADD_SERVICE_TO_CART = "add_service";
const REMOVE_SERVICE_FROM_CART = "add_service";

const CHANGE_FIELDS = "change_fields";
const CHECK_AVAILABILITY = "check_rooms";

// const SET_CURRENT_ROOM = "set_current_room";
const TOGGLE_SHOW_DATA = "toggle_detail";

const SET_HOTEL_FILTER = "set_hotel_filter";
const SET_ROOMTYPE_FILTER = "set_roomtype_filter";

const types = {
  INVALIDATE_DATA,
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_DATA_HOTELS,
  RECEIVE_DATA_ROOMS,
  RECEIVE_DATA_ROOMTYPES,
  ADD_ROOM_TO_CART,
  REMOVE_ROOM_FROM_CART,
  ADD_SERVICE_TO_CART,
  REMOVE_SERVICE_FROM_CART,
  CHANGE_FIELDS,
  CHECK_AVAILABILITY,
  TOGGLE_SHOW_DATA,
  SET_HOTEL_FILTER,
  SET_ROOMTYPE_FILTER
};

export default types;
