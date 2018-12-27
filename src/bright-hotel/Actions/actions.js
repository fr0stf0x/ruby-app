import { makeGetBookingFields } from "../Reducers/selectors";
import { ROOMTYPE_FILTER_AVAILABLE, SHOW_ALL } from "../Reducers/Ui";
import END_POINTS, { mapEndpoint, mapEndpointId, mapQuery } from "../Utils/api";
import { fetchDataFromServer, scrollTo } from "../Utils/utils";
import types from "./types";

// fields
const changeFields = fields => {
  return {
    type: types.CHANGE_FIELDS,
    payload: { fields }
  };
};

const changeCustomerInfo = fields => dispatch => {
  Object.entries(fields).forEach(([key, value]) =>
    dispatch(changeCustomerField(key, value))
  );
};

const changeCustomerField = (name, value) => {
  return {
    type: types.CHANGE_CUSTOMER_FIELD,
    payload: { name, value }
  };
};

const getCustomerInfo = phoneNumber => dispatch => {
  return fetchDataFromServer(END_POINTS.MY_INFO, { phoneNumber })
    .then(fields => dispatch(changeCustomerInfoIfNeeded(fields)))
    .catch(err => dispatch(showSnackBar(err.message)));
};

const changeCustomerInfoIfNeeded = fields => (dispatch, getState) => {
  if ((!Object.is(getCustomerInfo(getState())), fields)) {
    localStorage.setItem("phoneNumber", fields.phoneNumber);
    dispatch(changeCustomerInfo(fields));
  }
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
      dispatch(showSnackBar("Can not get data, check your connection"));
      return Promise.reject(err);
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

const makeCheckForRoomsAvailability = () => dispatch =>
  dispatch(checkForRoomsAvailability()).then(res => {
    dispatch(
      setHotelFilter({
        specific: res.payload[mapQuery(END_POINTS.HOTELS).allIds].sort()[0]
      })
    );
    dispatch(setRoomTypeFilter(ROOMTYPE_FILTER_AVAILABLE));
    return res;
  });

// cart

const setCartAt = at => {
  return {
    type: types.SET_CART_AT,
    payload: {
      at
    }
  };
};

const makeAddRoomToCart = ({ roomTypeId, hotelName }) => (
  dispatch,
  getState
) => {
  const cart = getState().cart;
  if (cart.rooms.length === 0) {
    dispatch(setCartAt(hotelName));
  }
  if (cart.info.at && cart.info.at !== hotelName) {
    return dispatch(
      showSnackBar("You can not book rooms in different hotels", () =>
        dispatch(toggleShowCart())
      )
    );
  }
  dispatch(addRoomToCart({ roomTypeId }));
  dispatch(toggleShowCart());
};

const addRoomToCart = ({ roomTypeId }) => {
  return {
    type: types.ADD_ROOM_TO_CART,
    payload: {
      roomTypeId
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

const makeAddServiceToCart = serviceId => (dispatch, getState) => {
  const cart = getState().cart;
  if (cart.rooms.length === 0) {
    return dispatch(
      showSnackBar("You haven't booked a room yet!", () => {
        scrollTo("box");
      })
    );
  }
  dispatch(addServiceToCart(serviceId));
  dispatch(toggleShowCart());
};

const addServiceToCart = serviceId => {
  return {
    type: types.ADD_SERVICE_TO_CART,
    payload: { serviceId }
  };
};

const removeItemFromCart = (id, type) => dispatch => {
  dispatch(removeItem({ id, type }));
  dispatch(afterRemove());
};

const afterRemove = () => (dispatch, getState) => {
  const cart = getState().cart;
  if (cart.rooms.length === 0) {
    cart.services.forEach(service =>
      dispatch(removeItem({ id: service.id, type: "services" }))
    );
    dispatch(toggleShowCart());
    dispatch(setCartAt());
  }
};

const removeItem = ({ id, type }) => {
  return {
    type:
      (type === "rooms" && types.REMOVE_ROOM_FROM_CART) ||
      types.REMOVE_SERVICE_FROM_CART,
    payload: {
      id
    }
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

const toggleCheckoutForm = () => {
  return {
    type: types.TOGGLE_CHECKOUT_FORM
  };
};

const showSnackBar = (message, onClose) => {
  return {
    type: types.SHOW_SNACKBAR,
    payload: {
      message,
      onClose
    }
  };
};

const hideSnackBar = () => {
  return {
    type: types.HIDE_SNACKBAR
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
    changeFieldsIfNeeded,
    changeCustomerInfoIfNeeded,
    changeCustomerField
  },
  server: {
    getCustomerInfo,
    invalidateData,
    getDataIfNeeded,
    makeCheckForRoomsAvailability
  },
  cart: {
    makeAddRoomToCart,
    makeAddServiceToCart,
    changeNumRooms,
    changeNumServices,
    removeItemFromCart
  },
  ui: {
    toggleShowCart,
    showSnackBar,
    hideSnackBar,
    toggleBookingBox,
    toggleCheckoutForm
  },
  filter: {
    setHotelFilter,
    setRoomTypeFilter
  }
};

export default actions;
