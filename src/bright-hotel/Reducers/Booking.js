import types from "../Actions/types";
import { mergeObj } from "../Utils/utils";
import moment from "moment";

const initialFields = {
  isEmpty: true,
  fields: {
    arrive: moment(new Date())
      .add(1, "day")
      .toDate(),
    depart: moment(new Date())
      .add(2, "day")
      .toDate(),
    numOfAdults: "2",
    numOfChildren: "0"
  }
};

const bookingFields = (state = initialFields, action) => {
  switch (action.type) {
    case types.CHANGE_FIELDS:
      return mergeObj(state, {
        fields: action.payload.fields,
        isEmpty: false
      });
    case types.CHANGE_CUSTOMER_FIELDS:
      return mergeObj(state, {
        customerInfo: action.payload.fields
      });
    default:
      return state;
  }
};

export default bookingFields;
