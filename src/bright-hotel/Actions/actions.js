import types from "./types";
import END_POINTS, { mapEndpoint, mapEndpointId, mapQuery } from "../Utils/api";
import { fetchDataFromServer } from "../Utils/utils";
import { SHOW_ALL } from "../Reducers/Ui";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

// fields
const changeFields = fields => {
  return {
    type: types.CHANGE_FIELDS,
    payload: { fields }
  };
};

const shouldChangeFields = (state, fields) => {
  return !Object.is(state.bookingFields.fields, fields);
};

const changeFieldsAndInvalidateAvailableRooms = fields => (
  dispatch,
  getState
) => {
  if (shouldChangeFields(getState(), fields)) {
    dispatch(invalidateData(END_POINTS.CHECK_AVAILABLE));
    return dispatch(changeFields(fields));
  }
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
    [mapQuery(endpoint)[0]]: data.reduce((obj, item) => {
      obj[item[mapEndpointId(endpoint)]] = item;
      return obj;
    }, {}),
    [mapQuery(endpoint)[1]]: data.map(item => item[mapEndpointId(endpoint)])
  };
};

const fetchData = (endpoint, queryParams) => dispatch => {
  dispatch(requestData(endpoint));
  return fetchDataFromServer(endpoint, queryParams)
    .then(res => {
      dispatch(receiveData(endpoint, res));
    })
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

const checkForRoomsAvailability = bookingFields => dispatch =>
  dispatch(getDataIfNeeded(END_POINTS.CHECK_AVAILABLE, bookingFields));

// cart

const addRoomToCart = roomId => {
  return {
    type: types.ADD_ROOM_TO_CART,
    payload: { roomId }
  };
};

const addServiceToCart = serviceId => {
  return {
    type: types.ADD_SERVICE_TO_CART,
    payload: { serviceId }
  };
};

const toggleRoomDetailDialog = id => {
  return {
    type: types.TOGGLE_SHOW_DATA,
    payload: { id }
  };
};

const setHotelFilter = ({ filter = SHOW_ALL, specific }) => {
  return {
    type: types.SET_HOTEL_FILTER,
    payload: { filter, specific }
  };
};

const setRoomTypeFilter = (filter = SHOW_ALL) => {
  return {
    type: types.SET_ROOMTYPE_FILTER,
    payload: { filter }
  };
};

const actions = {
  bookingFields: {
    changeFieldsAndInvalidateAvailableRooms
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
  ui: {
    toggleRoomDetailDialog
  },
  filter: {
    setHotelFilter,
    setRoomTypeFilter
  }
};

export default actions;
