import * as types from "../Utils/ActionTypes";

const merge = (target, ...source) => Object.assign({}, target, ...source);

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
      return merge(state, {
        didInvalidate: true
      });
    case types.REQUEST_DATA:
      return merge(state, {
        isFetching: true,
        didInvalidate: false
      });
    case types.RECEIVE_DATA:
      return merge(state, {
        isFetching: false,
        didInvalidate: false,
        items: action.data
      });
    default:
      return state;
  }
};

const server = (state = {}, action) => {
  switch (action.type) {
    case types.INVALIDATE_DATA:
    case types.REQUEST_DATA:
    case types.RECEIVE_DATA:
      return merge(state, {
        [action.endpoint]: endpoint(state[action.endpoint], action)
      });
    default:
      return state;
  }
};

export default server;
