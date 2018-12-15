import * as types from "../Utils/ActionTypes";

const initialFields = {
  isEmpty: true
};

const bookingFields = (state = initialFields, action) => {
  const { type, fields } = action;

  switch (type) {
    case types.CHANGE_FIELDS:
      return Object.assign({}, state, fields, {
        isEmpty: false
      });
    default:
      return state;
  }
};

export default bookingFields;
