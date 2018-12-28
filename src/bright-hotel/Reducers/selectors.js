import moment from "moment";
import { createSelector } from "reselect";
import END_POINTS, { mapEndpoint, mapQuery } from "../Utils/api";
import { ROOMTYPE_FILTER_AVAILABLE, SHOW_ALL } from "./Ui";
import { AVAILABLE_TYPE } from "../Utils/utils";

const getRoomTypes = state =>
  state.data[mapEndpoint(END_POINTS.ALL_ROOM_TYPES)];

export const selectRoomTypeById = (state, props) =>
  getRoomTypes(state).byId[props.id];

export const selectRoomTypeByIdWithoutProps = (state, id) =>
  getRoomTypes(state).byId[id];

export const getAllServices = state =>
  state.data[mapEndpoint(END_POINTS.SERVICES)];

export const getServiceTypes = state =>
  state.data[mapEndpoint(END_POINTS.SERVICE_TYPES)];

export const getServiceTypeById = (state, props) =>
  state.data[mapEndpoint(END_POINTS.SERVICE_TYPES)].byId[props.id];

export const selectServiceById = (state, props) =>
  getAllServices(state).byId[props.id];

const getAvailability = (state, props) => {
  const availabilities = state.data[mapEndpoint(END_POINTS.CHECK_AVAILABLE)];
  return { ...availabilities, availableType: props.availableType };
};

export const getHotels = state => state.data[mapEndpoint(END_POINTS.HOTELS)];

export const getRoomTypeFilter = state => state.uiState.roomTypeFilter;

export const getHotelFilter = state => state.uiState.hotelFilter;

export const getBookingFields = state => state.bookingFields;

export const isCartOpen = state => state.uiState.cartOpen;

export const isCartEmpty = state => state.cart.items.rooms.length === 0;

export const getCart = state => state.cart;

export const isDialogOpen = state => state.uiState.dialogOpen;

const getCustomerInfo = state => state.customerInfo;

export const calculateMoney = () =>
  createSelector(
    [getCart, getRoomTypes, getAllServices],
    (cart, roomTypes, services) =>
      cart.items.rooms.reduce(
        (total, item) => total + roomTypes.byId[item.id].price * item.count,
        0
      ) +
      cart.items.services.reduce(
        (total, item) => total + services.byId[item.id].price * item.count,
        0
      )
  );

export const makeGetCustomerInfo = () =>
  createSelector([getCustomerInfo], customerInfo => customerInfo);

export const getCartItem = (state, props) => ({
  item: state.data[props.type].byId[props.id],
  type: props.type
});

export const getRoomDetails = state => state.cart.info.roomDetails;

export const makeGetCartItem = () =>
  createSelector(
    [getCart, getCartItem, getRoomDetails],
    (cart, cartItem, roomDetails) => {
      const result = {
        item: cartItem.item,
        count: cart.items[mapEndpoint(cartItem.type)].find(
          item => item.id === cartItem.item.id
        ).count,
        details: cartItem.type === "rooms" ? roomDetails[cartItem.item.id] : []
      };
      return result;
    }
  );

export const selectRandomRoomNum = (
  state,
  { hotelName, availableType, roomTypeId }
) => {
  const rooms = state.data[mapEndpoint(END_POINTS.CHECK_AVAILABLE)][
    mapQuery(END_POINTS.CHECK_AVAILABLE).byId
  ][hotelName][availableType || AVAILABLE_TYPE.SUITABLE].byId[
    roomTypeId
  ].filter(
    roomNum => !state.cart.items.rooms.some(room => room.roomNum === roomNum)
  );
  return rooms[[Math.floor(Math.random() * rooms.length)]];
};

export const makeGetServiceType = () =>
  createSelector(
    [getAllServices, getServiceTypeById, getCart],
    (services, type, cart) => ({
      id: type.id,
      services: type.services
        .filter(id => !cart.items.services.some(service => service.id === id))
        .map(serviceId => services.byId[serviceId])
        .sort((s1, s2) => s1.price - s2.price)
    })
  );

export const makeGetBookingFields = () =>
  createSelector([getBookingFields], bookingFields => {
    const { fields } = bookingFields;
    return {
      ...fields,
      arrive: moment(fields.arrive).format("YYYY-MM-DD"),
      depart: moment(fields.depart).format("YYYY-MM-DD")
    };
  });

export const createHotelDescription = hotel => {
  const {
    hotelName,
    apartmentNum,
    city,
    descr,
    district,
    provincial,
    street,
    reservationHours
  } = hotel;
  return `${hotelName} is at ${apartmentNum} ${street}.st, District ${district}, ${city}.
  ${hotelName} will reserve your booked rooms for a maximum of ${reservationHours} hours.`;
};

export const makeGetDescription = () => {
  return createSelector(
    [getHotels, getHotelFilter, getRoomTypeFilter],
    (hotels, hotelFilter, roomTypeFilter) => {
      return (
        (roomTypeFilter.filter === SHOW_ALL && "All rooms") ||
        createHotelDescription(
          hotels[mapQuery(END_POINTS.HOTELS).byId][hotelFilter.specific]
        )
      );
    }
  );
};

export const areAllRoomsAvailable = () =>
  createSelector(
    [getRoomTypes, getAvailability, getRoomTypeFilter],
    (allRoomTypes, availabilities, roomTypeFilter) =>
      (allRoomTypes && allRoomTypes.didInvalidate) ||
      (roomTypeFilter.filter === ROOMTYPE_FILTER_AVAILABLE &&
        allRoomTypes.allIds.every(roomTypeId => {
          const query = mapQuery(END_POINTS.CHECK_AVAILABLE);
          return availabilities[query.allIds].every(hotelName => {
            const has =
              availabilities[mapQuery(END_POINTS.CHECK_AVAILABLE).byId][
                hotelName
              ][availabilities.type || AVAILABLE_TYPE.SUITABLE].byId[
                roomTypeId
              ];
            return typeof has !== "undefined" && has.length > 0;
          });
        }))
  );

export const makeGetRoomTypesWithFilters = () => {
  return createSelector(
    [getRoomTypes, getAvailability, getCart, getRoomTypeFilter, getHotelFilter],
    (allRoomTypes, availabilities, cart, roomTypeFilter, hotelFilter) =>
      (roomTypeFilter.filter === ROOMTYPE_FILTER_AVAILABLE && {
        isFetching: false,
        allIds: availabilities[mapQuery(END_POINTS.CHECK_AVAILABLE).byId][
          hotelFilter.specific
        ][
          availabilities.availableType || AVAILABLE_TYPE.SUITABLE
        ].allIds.filter(id => !cart.items.rooms.some(room => room.id === id))
      }) ||
      allRoomTypes
  );
};
