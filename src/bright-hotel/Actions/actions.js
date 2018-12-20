import types from "./types";
import { END_POINTS, fetchDataFromServer } from "../Utils/apiCall";

// fields
const changeFields = fields => {
  return {
    type: types.CHANGE_FIELDS,
    fields
  };
};

const shouldChangeFields = (state, fields) => {
  return !Object.is(state.bookingFields.fields, fields);
};

const changeFieldsIfNeeded = fields => (dispatch, getState) => {
  if (shouldChangeFields(getState(), fields)) {
    dispatch(changeFields(fields));
  }
};

// server
function invalidateData(endpoint, error) {
  return {
    type: types.INVALIDATE_DATA,
    endpoint,
    error
  };
}

const requestData = endpoint => {
  return {
    type: types.REQUEST_DATA,
    endpoint
  };
};

const receiveData = ({ endpoint, data }) => {
  return {
    type: types.RECEIVE_DATA,
    endpoint,
    data
  };
};

const mapEndpointToActionType = endpoint => {
  switch (endpoint) {
    case "hotels":
      return types.RECEIVE_DATA_HOTELS;
    case "rooms":
      return types.RECEIVE_DATA_ROOMS;
    case "bookings/checkAvailable":
      return types.RECEIVE_DATA_ROOMTYPES;
    default:
      return types.RECEIVE_DATA_ROOMTYPES;
  }
};

const fetchData = (endpoint, options) => dispatch => {
  dispatch(requestData(endpoint));
  return fetchDataFromServer(endpoint, options)
    .then(res => {
      console.log("res", res);
      dispatch(receiveData({ endpoint, data: res }));
    })
    .catch(err => {
      dispatch(invalidateData(endpoint, err));
    });
};

const shouldGetData = (state, endpoint) => {
  const data = state[endpoint];
  if (!data) {
    return true;
  } else if (data.isFetching) {
    return false;
  } else {
    return data.didInvalidate;
  }
};

function getDataIfNeeded(endpoint, options) {
  return (dispatch, getState) => {
    if (shouldGetData(getState(), endpoint)) {
      return dispatch(fetchData(endpoint, options));
    }
  };
}

function checkForRoomsAvailability(bookingFields) {
  return dispatch => {
    return dispatch(fetchData(END_POINTS.availableRooms, bookingFields));
  };
}

// cart

const addRoomToCart = roomId => {
  return {
    type: types.ADD_ROOM_TO_CART,
    roomId
  };
};

const addServiceToCart = serviceId => {
  return {
    type: types.ADD_SERVICE_TO_CART,
    serviceId
  };
};

const toggleRoomDetailDialog = (endpoint, id) => {
  return {
    type: types.TOGGLE_SHOW_DATA,
    endpoint,
    id
  };
};

const actions = {
  bookingFields: {
    changeFieldsIfNeeded
  },
  server: {
    invalidateData,
    getDataIfNeeded,
    checkForRoomsAvailability
  },
  cart: {
    addServiceToCart,
    addRoomToCart
  },
  rooms: {
    toggleRoomDetailDialog
  }
};

export default actions;
