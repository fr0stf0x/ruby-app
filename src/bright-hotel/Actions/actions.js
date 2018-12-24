import { makeGetBookingFields } from "../Reducers/selectors";
import { ROOMTYPE_FILTER_AVAILABLE, SHOW_ALL } from "../Reducers/Ui";
import END_POINTS, { mapEndpoint, mapEndpointId, mapQuery } from "../Utils/api";
import { fetchDataFromServer } from "../Utils/utils";
import types from "./types";

// fields
const changeFields = fields => {
  return {
    type: types.CHANGE_FIELDS,
    payload: { fields }
  };
};

const shouldChangeFields = fields => getState => {
  return !Object.is(getState().bookingFields.fields, fields);
};

const changeFieldsIfNeeded = fields => dispatch => {
  if (shouldChangeFields(fields)) {
    dispatch(invalidateData(END_POINTS.CHECK_AVAILABLE));
    dispatch(changeFields(fields));
  }
};

const makeCheckForRoomsAvailability = () => dispatch => {
  dispatch(checkForRoomsAvailability()).then(res => {
    dispatch(
      setHotelFilter({
        specific: res.payload[mapQuery(END_POINTS.HOTELS).allIds].sort()[0]
      })
    );
    dispatch(setRoomTypeFilter(ROOMTYPE_FILTER_AVAILABLE));
  });
};

// server
function invalidateData(endpoint, error) {
  return {
    type: types.INVALIDATE_DATA,
    meta: { endpoint: mapEndpoint(endpoint) },
    error
  };
}

const requestData = endpoint => {
  return {
    type: types.REQUEST_DATA,
    meta: { endpoint: mapEndpoint(endpoint) }
  };
};

const receiveData = (endpoint, data) => {
  return {
    type: types.RECEIVE_DATA,
    payload: mapDataWithId(data, endpoint),
    meta: { endpoint: mapEndpoint(endpoint) }
  };
};

const mapDataWithId = (data, endpoint) => {
  return {
    [mapQuery(endpoint).byId]: data.reduce((obj, item) => {
      obj[item[mapEndpointId(endpoint)]] = item;
      return obj;
    }, {}),
    [mapQuery(endpoint).allIds]: data.map(item => item[mapEndpointId(endpoint)])
  };
};

const fetchData = (endpoint, queryParams) => dispatch => {
  dispatch(requestData(endpoint));
  return fetchDataFromServer(endpoint, queryParams)
    .then(res => dispatch(receiveData(endpoint, res)))
    .catch(err => {
      dispatch(invalidateData(endpoint, err));
    });
};

const shouldGetData = (state, endpoint) => {
  const data = state.data[mapEndpoint(endpoint)];
  if (!data) {
    return true;
  } else if (data.isFetching) {
    return false;
  } else {
    return data.didInvalidate;
  }
};

const getDataIfNeeded = (endpoint, queryParams) => {
  return (dispatch, getState) => {
    if (shouldGetData(getState(), endpoint)) {
      return dispatch(fetchData(endpoint, queryParams));
    }
  };
};

const checkForRoomsAvailability = () => (dispatch, getState) => {
  const query = makeGetBookingFields()(getState());
  return dispatch(getDataIfNeeded(END_POINTS.CHECK_AVAILABLE, query));
};

// cart

const addRoomToCart = ({ roomTypeId, hotelName = "" }) => {
  return {
    type: types.ADD_ROOM_TO_CART,
    payload: {
      roomTypeId,
      hotelName
    }
  };
};

const changeNumRooms = ({ id, count }) => {
  return {
    type: types.CHANGE_NUM_ROOMS,
    payload: { id, count }
  };
};

const changeNumServices = ({ id, count }) => {
  return {
    type: types.CHANGE_NUM_SERVICES,
    payload: { id, count }
  };
};

const addServiceToCart = serviceId => {
  return {
    type: types.ADD_SERVICE_TO_CART,
    payload: { serviceId }
  };
};

const toggleShowCart = () => {
  return {
    type: types.TOGGLE_SHOW_CART
  };
};

const toggleBookingBox = () => {
  return {
    type: types.TOGGLE_SHOW_BOOKING_BOX
  };
};

const toggleSnackBar = ({ message, onClose }) => {
  return {
    type: types.TOGGLE_SNACKBAR,
    payload: {
      message,
      onClose
    }
  };
};

const setHotelFilter = ({ filter = SHOW_ALL, specific }) => {
  return {
    type: types.SET_HOTEL_FILTER,
    payload: { filter, specific }
  };
};

const setRoomTypeFilter = filter => {
  return {
    type: types.TOGGLE_ROOMTYPE_FILTER,
    payload: { filter }
  };
};

const actions = {
  bookingFields: {
    changeFieldsIfNeeded
  },
  server: {
    invalidateData,
    getDataIfNeeded,
    makeCheckForRoomsAvailability
  },
  cart: {
    addServiceToCart,
    addRoomToCart,
    changeNumRooms,
    changeNumServices
  },
  ui: {
    toggleShowCart,
    toggleSnackBar,
    toggleBookingBox
  },
  filter: {
    setHotelFilter,
    setRoomTypeFilter
  }
};

export default actions;
