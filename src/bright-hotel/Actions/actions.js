import {
  getBookingFields,
  getCart,
  getHotelFilter,
  makeGetBookingFields,
  selectRandomRoomNum,
  selectRoomTypeByIdWithoutProps,
  isCartEmpty,
  makeGetCustomerInfo
} from "../Reducers/selectors";
import { ROOMTYPE_FILTER_AVAILABLE, SHOW_ALL } from "../Reducers/Ui";
import END_POINTS, { mapEndpoint, mapEndpointId, mapQuery } from "../Utils/api";
import { fetchDataFromServer, scrollTo, postData } from "../Utils/utils";
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

const getCustomerInfoFromServer = phoneNumber => dispatch => {
  return fetchDataFromServer(END_POINTS.MY_INFO, { phoneNumber })
    .then(fields => dispatch(changeCustomerInfoIfNeeded(fields)))
    .catch(err => dispatch(showSnackBar(err.message)));
};

const changeCustomerInfoIfNeeded = fields => (dispatch, getState) => {
  if ((!Object.is(makeGetCustomerInfo()(getState())), fields)) {
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

const checkOut = bookingRequest => dispatch => {
  dispatch(toggleCheckoutForm());
  dispatch(toggleProgress());
  return postData(bookingRequest, END_POINTS.BOOKING);
};

// cart

const clearCart = () => {
  return {
    type: types.CLEAR_CART
  };
};

const setCartAt = at => {
  return {
    type: types.SET_CART_AT,
    payload: {
      at
    }
  };
};

const addRoomDetail = (roomTypeId, details) => {
  return {
    type: types.ADD_ROOM_DETAIL,
    payload: { roomTypeId, details }
  };
};

const changeRoomDetail = (roomTypeId, roomNum, change) => {
  return {
    type: types.CHANGE_ROOM_DETAIL,
    payload: { roomTypeId, id: roomNum, change }
  };
};

const removeRoomDetail = id => {
  return {
    type: types.REMOVE_ROOM_DETAIL,
    payload: { id }
  };
};

const mapRoomDetails = () => (dispatch, getState) => {
  const state = getState();
  const cart = getCart(state);
  const hotelName = getHotelFilter(state).specific;
  const { numOfAdults, numOfChildren } = getBookingFields(state).fields;
  const ratio = Math.floor(+numOfAdults / +numOfChildren);
  let adultsRemaining = numOfAdults,
    childrenRemaining = numOfChildren;
  cart.items.rooms.forEach(roomType => {
    const { id: roomTypeId, count, availableType } = roomType;
    const roomTypeDetail = selectRoomTypeByIdWithoutProps(state, roomTypeId);
    const { maxCapacity } = roomTypeDetail;
    const details = {};
    for (var i = 0; i < count; i++) {
      const adults =
        adultsRemaining > Math.ceil(maxCapacity / ((1 + ratio) / ratio))
          ? Math.ceil(maxCapacity / ((1 + ratio) / ratio))
          : adultsRemaining;
      adultsRemaining = adultsRemaining - adults;
      const children =
        childrenRemaining > maxCapacity - adults
          ? maxCapacity - adults
          : childrenRemaining;
      childrenRemaining = childrenRemaining - children;
      const randomRoomNum = selectRandomRoomNum(state, {
        availableType,
        hotelName,
        roomTypeId
      });
      details[randomRoomNum] = {
        numOfAdults: adults > 0 ? adults : 1,
        numOfChildren: children
      };
    }
    dispatch(addRoomDetail(roomTypeId, details));
  });
};

const makeAddRoomToCart = ({ roomTypeId, hotelName, availableType }) => (
  dispatch,
  getState
) => {
  const state = getState();
  const cart = state.cart;
  if (isCartEmpty(state)) {
    dispatch(setCartAt(hotelName));
  }
  if (cart.info.at && cart.info.at !== hotelName) {
    return dispatch(
      showSnackBar("You can not book rooms in different hotels", () =>
        dispatch(toggleShowCart())
      )
    );
  }
  const { numOfAdults, numOfChildren } = getBookingFields(state).fields;
  let totalPeople = +numOfAdults + +numOfChildren;
  const roomTypeDetail = selectRoomTypeByIdWithoutProps(state, roomTypeId);
  const { maxCapacity } = roomTypeDetail;
  const roomCount = isCartEmpty(state)
    ? Math.ceil(totalPeople / maxCapacity)
    : 1;
  dispatch(addItemToCart("rooms", roomTypeId, roomCount, availableType));

  dispatch(toggleShowCart());
};

const makeAddServiceToCart = serviceId => (dispatch, getState) => {
  const cart = getState().cart;
  if (cart.items.rooms.length === 0) {
    return dispatch(
      showSnackBar("You haven't booked a room yet!", () => {
        scrollTo("box");
      })
    );
  }
  dispatch(addItemToCart("services", serviceId, cart.items.rooms.length));
  dispatch(toggleShowCart());
};

const addItemToCart = (type, itemId, count, availableType) => {
  return {
    type: types.ADD_CART_ITEM,
    payload: { id: itemId, count, type, availableType }
  };
};

const changeCartItemCount = ({ id, type, count }) => {
  return {
    type: types.CHANGE_CART_ITEM_COUNT,
    payload: { id, type, count }
  };
};

const removeItemFromCart = (id, type) => dispatch => {
  dispatch(removeItem({ id, type }));
  dispatch(afterRemove());
};

const afterRemove = () => (dispatch, getState) => {
  const cart = getState().cart;
  if (cart.items.rooms.length === 0) {
    cart.items.services.forEach(service =>
      dispatch(removeItem({ id: service.id, type: "services" }))
    );
    dispatch(toggleShowCart());
    dispatch(setCartAt());
  }
};

const removeItem = ({ id, type }) => {
  return {
    type: types.REMOVE_CART_ITEM,
    payload: {
      id,
      type
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

const toggleProgress = () => {
  return {
    type: types.TOGGLE_PROGRESS
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
    checkOut,
    getCustomerInfoFromServer,
    invalidateData,
    getDataIfNeeded,
    makeCheckForRoomsAvailability
  },
  cart: {
    clearCart,
    mapRoomDetails,
    addRoomDetail,
    changeRoomDetail,
    removeRoomDetail,
    makeAddRoomToCart,
    makeAddServiceToCart,
    changeCartItemCount,
    removeItemFromCart
  },
  ui: {
    toggleProgress,
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
