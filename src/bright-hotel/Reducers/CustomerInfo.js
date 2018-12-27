import types from "../Actions/types";
import { mergeObj } from "../Utils/utils";
import moment from "moment";

const customerInfo = (
  state = {
    dob: moment(new Date())
      .add(-18, "year")
      .toDate(),
    gender: "M",
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    idCard: ""
  },
  action
) => {
  switch (action.type) {
    case types.CHANGE_CUSTOMER_FIELD:
      // eslint-disable-next-line no-case-declarations
      let value =
        action.payload.name === "dob"
          ? new Date(action.payload.value)
          : action.payload.value;
      return mergeObj(state, {
        [action.payload.name]: value
      });
    case types.CHANGE_CUSTOMER_FIELDS:
      return mergeObj(state, action.payload.fields);
    default:
      return state;
  }
};

export default customerInfo;
