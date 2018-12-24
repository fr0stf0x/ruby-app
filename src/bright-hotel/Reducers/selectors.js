import moment from "moment";
import { createSelector } from "reselect";
import END_POINTS, { mapEndpoint, mapQuery } from "../Utils/api";
import { ROOMTYPE_FILTER_AVAILABLE, SHOW_ALL } from "./Ui";

const getAllRoomTypes = state =>
  state.data[mapEndpoint(END_POINTS.ALL_ROOM_TYPES)];

export const selectRoomTypeById = (state, props) =>
  getAllRoomTypes(state).byId[props.id];

const getAllServices = state => state.data[mapEndpoint(END_POINTS.SERVICES)];

export const selectServiceById = (state, props) =>
  getAllServices(state).byId[props.id];

const getAvailability = state =>
  state.data[mapEndpoint(END_POINTS.CHECK_AVAILABLE)];

export const getHotels = state => state.data[mapEndpoint(END_POINTS.HOTELS)];

export const getRoomTypeFilter = state => state.uiState.roomTypeFilter;

export const getHotelFilter = state => state.uiState.hotelFilter;

export const getBookingFields = state => state.bookingFields;

export const getCart = state => state.cart;

export const getCartItem = (state, props) => ({
  item: state.data[mapEndpoint(props.type)].byId[props.id],
  type: props.type
});

export const makeGetCartItem = () =>
  createSelector([getCart, getCartItem], (cart, cartItem) => {
    return {
      item: cartItem.item,
      count: cart[mapEndpoint(cartItem.type)].find(
        item => item.id === cartItem.item.id
      ).count
    };
  });

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
    [getAllRoomTypes, getAvailability, getRoomTypeFilter],
    (allRoomTypes, availabilities, roomTypeFilter) =>
      roomTypeFilter.filter === ROOMTYPE_FILTER_AVAILABLE &&
      (() => {
        const query = mapQuery(END_POINTS.CHECK_AVAILABLE);
        return allRoomTypes.allIds.every(roomTypeId =>
          availabilities[query.allIds].every(hotelName => {
            const has =
              availabilities[query.byId][hotelName].rooms.byId[roomTypeId];
            return typeof has !== "undefined" && has.length > 0;
          })
        );
      })()
  );

export const makeGetRoomTypesWithFilters = () => {
  return createSelector(
    [
      getAllRoomTypes,
      getAvailability,
      getCart,
      getRoomTypeFilter,
      getHotelFilter
    ],
    (allRoomTypes, availabilities, cart, roomTypeFilter, hotelFilter) =>
      (roomTypeFilter.filter === ROOMTYPE_FILTER_AVAILABLE && {
        isFetching: false,
        allIds: availabilities[mapQuery(END_POINTS.CHECK_AVAILABLE).byId][
          hotelFilter.specific
        ].rooms.allIds.filter(id => !cart.rooms.some(room => room.id === id))
      }) ||
      allRoomTypes
  );
};

export const isDialogOpen = state => state.uiState.dialogOpen;
