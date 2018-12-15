import * as types from "../Utils/ActionTypes";
import { fetchDataFromServer } from "../Utils/apiCall";

export function invalidate(endpoint) {
  return {
    type: types.INVALIDATE_DATA,
    endpoint
  };
}

export const requestData = endpoint => {
  return {
    type: types.REQUEST_DATA,
    endpoint
  };
};

export const receiveData = ({ endpoint, data }) => {
  return {
    type: types.RECEIVE_DATA,
    endpoint,
    data
  };
};

const fetchData = (endpoint, options) => dispatch => {
  dispatch(requestData(endpoint));
  return fetchDataFromServer(endpoint, options)
    .then(res => {
      dispatch(receiveData({ endpoint, data: res }));
    })
    .catch(err => {
      console.log(err);
      dispatch(invalidate(endpoint));
    });
};

const shouldGetData = (state, endpoint) => {
  const data = state.server[endpoint];
  if (!data) {
    return true;
  } else if (data.isFetching) {
    return false;
  } else {
    return data.didInvalidate;
  }
};

export function getDataIfNeeded(endpoint, options) {
  return (dispatch, getState) => {
    if (shouldGetData(getState(), endpoint)) {
      console.log("fetching data");
      return dispatch(fetchData(endpoint, options));
    }
  };
}

export const addRoomToCart = (roomNum, hotelName) => {
  return {
    type: types.ADD_ROOM_TO_CART,
    roomId: { roomNum, hotelName }
  };
};

export const addServiceToCart = serviceId => {
  return {
    type: types.ADD_SERVICE_TO_CART,
    serviceId
  };
};

export const changeFields = fields => {
  return {
    type: types.CHANGE_FIELDS,
    fields
  };
};
