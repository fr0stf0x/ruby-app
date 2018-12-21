import fetch from "cross-fetch";
import { stringify } from "query-string";
import { API_URL } from "./api";

export const formatMoney = money =>
  (+money / 23000).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,");

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
  console.log("url", url);
  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
};
