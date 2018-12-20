import types from "../Actions/types";
import { mergeItemInArray, mergeObj } from "../Utils/utils";

const toggleFullScreen = (
  state = {
    dialogOpen: false
  },
  action
) => {
  return mergeItemInArray(state, action.id, room =>
    mergeObj(room, {
      dialogOpen: !room.dialogOpen
    })
  );
};

const endpoint = (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case types.INVALIDATE_DATA:
      return invalidateData(state, action);
    case types.REQUEST_DATA:
      return requestData(state, action);
    case types.RECEIVE_DATA:
      return receiveData(state, action);
    case types.TOGGLE_SHOW_DATA:
      return mergeObj(state, {
        items: toggleFullScreen(state.items, action)
      });
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
  return mergeObj(state, {
    isFetching: false,
    didInvalidate: false,
    items: action.data
  });
};

const server = (state = {}, action) => {
  switch (action.type) {
    case types.INVALIDATE_DATA:
    case types.REQUEST_DATA:
    case types.RECEIVE_DATA:
      return mergeObj(state, {
        [action.endpoint]: endpoint(state[action.endpoint], action)
      });
    case types.TOGGLE_SHOW_DATA:
      return mergeObj(state, {
        [action.endpoint]: endpoint(state[action.endpoint], action)
      });
    default:
      return state;
  }
};

export default server;
