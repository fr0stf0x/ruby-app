import types from "./types";
import END_POINTS, { mapEndpoint } from "../Utils/api";
import { fetchDataFromServer } from "../Utils/utils";

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
    dispatch(invalidateData(END_POINTS.CHECK_AVAILABLE));
  }
};

// server
function invalidateData(endpoint, error) {
  return {
    type: types.INVALIDATE_DATA,
    endpoint: mapEndpoint(endpoint),
    error
  };
}

const requestData = endpoint => {
  return {
    type: types.REQUEST_DATA,
    endpoint: mapEndpoint(endpoint)
  };
};

const receiveData = ({ endpoint, data }) => {
  return {
    type: types.RECEIVE_DATA,
    endpoint: mapEndpoint(endpoint),
    data: mapDataWithId(data)
  };
  // return {
  //   type: mapEndpointToActionType(endpoint),
  //   data: mapDataWithId(data)
  // };
};

const mapDataWithId = data => ({
  byId: data.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {}),
  allIds: data.map(item => item.id)
});

const fetchData = (endpoint, options) => dispatch => {
  dispatch(requestData(endpoint));
  return fetchDataFromServer(endpoint, options)
    .then(res => {
      dispatch(receiveData({ endpoint, data: res }));
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

const getDataIfNeeded = (endpoint, options) => {
  return (dispatch, getState) => {
    if (shouldGetData(getState(), endpoint)) {
      return dispatch(fetchData(endpoint, options));
    }
  };
};

const checkForRoomsAvailability = bookingFields => {
  return (dispatch, getState) => {
    if (shouldGetData(getState(), END_POINTS.CHECK_AVAILABLE)) {
      return dispatch(fetchData(END_POINTS.CHECK_AVAILABLE, bookingFields));
    }
  };
};

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

const toggleRoomDetailDialog = id => {
  return {
    type: types.TOGGLE_SHOW_DATA,
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
