import types from "../Actions/types";
import { mergeObj } from "../Utils/utils";

const initialFields = {
  isEmpty: true
};

const bookingFields = (state = initialFields, action) => {
  const { type, fields } = action;

  switch (type) {
    case types.CHANGE_FIELDS:
      return mergeObj(state, {
        fields,
        isEmpty: false
      });
    default:
      return state;
  }
};

export default bookingFields;
