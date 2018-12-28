import axios from "axios";
import { stringify } from "query-string";
import { animateScroll as scroll, scroller } from "react-scroll";
import { API_URL } from "./api";

export const formatMoney = money =>
  (money === 0 && "FREE") ||
  (+money / 23000).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "$";

export const randomImage = () => {
  return [
    require("assets/img/bright-hotel/bg_1.jpg"),
    require("assets/img/bright-hotel/img_2.jpg"),
    require("assets/img/bright-hotel/img_3.jpg"),
    require("assets/img/bright-hotel/img_4.jpg"),
    require("assets/img/bright-hotel/img_5.jpg"),
    require("assets/img/bright-hotel/img_6.jpg")
  ][Math.floor(Math.random() * 6)];
};

export const scrollTo = el => {
  scroller.scrollTo(el, {
    duration: 400,
    delay: 0,
    smooth: "easeInOutQuart",
    offset: -90
  });
};

export const scrollTop = () => {
  scroll.scrollToTop();
};

export const mergeObj = (target, ...source) =>
  Object.assign({}, target, ...source);

export const mergeItemInArray = (array, itemId, callback) => {
  return array.map(item => {
    if (item.id !== itemId) {
      return item;
    }
    return callback(item);
  });
};

export const fetchDataFromServer = (
  endpoint,
  queryParams,
  options = { limit: 10 }
) => {
  let url = `${API_URL}/${endpoint}?${stringify(queryParams)}&${stringify(
    options
  )}`;
  console.log(url);
  return axios.get(url).then(res => res.data);
};

export const postData = (data, endpoint) =>
  axios.post(`${API_URL}/${endpoint}`, data).then(res => res.data);

export const AVAILABLE_TYPE = {
  SUITABLE: "suitableRooms",
  NON_SUITABLE: "nonSuitableRooms"
};
