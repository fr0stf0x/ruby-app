import * as types from "../Utils/ActionTypes";
import moment from "moment";

const initialFields = {
  arrive: new Date(),
  depart: moment(new Date())
    .add(1, "day")
    .toDate(),
  numOfRooms: "1",
  numOfAdults: "2",
  numOfChildren: "0"
};

const bookingFields = (state = initialFields, action) => {
  const { type, fields } = action;

  switch (type) {
    case types.CHANGE_FIELDS:
      return Object.assign({}, state, fields);
    default:
      return state;
  }
};

export default bookingFields;
