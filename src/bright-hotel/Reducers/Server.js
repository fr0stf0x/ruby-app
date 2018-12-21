import types from "../Actions/types";
import { mergeObj } from "../Utils/utils";

const endpoint = (
  state = {
    isFetching: false,
    didInvalidate: false
  },
  action
) => {
  switch (action.type) {
    case types.INVALIDATE_DATA:
      return invalidateData(state);
    case types.REQUEST_DATA:
      return requestData(state);
    case types.RECEIVE_DATA:
      return receiveData(state, action);
    default:
      return state;
  }
};

const requestData = state => {
  return mergeObj(state, {
    isFetching: true,
    didInvalidate: false
  });
};

const invalidateData = state => {
  return mergeObj(state, {
    didInvalidate: true
  });
};

const receiveData = (state, action) => {
  return mergeObj(
    state,
    {
      isFetching: false,
      didInvalidate: false
    },
    Object.entries(action.payload).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {})
  );
};

const data = (state = {}, action) => {
  switch (action.type) {
    case types.INVALIDATE_DATA:
    case types.REQUEST_DATA:
    case types.RECEIVE_DATA:
      return mergeObj(state, {
        [action.meta.endpoint]: endpoint(state[action.meta.endpoint], action)
      });
    default:
      return state;
  }
};

export default data;
