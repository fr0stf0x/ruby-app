import moment from "moment";
import { createSelector } from "reselect";
import END_POINTS, { mapEndpoint, mapQuery } from "../Utils/api";
import {
  ROOMTYPE_FILTER_AVAILABLE,
  SHOW_ALL,
  HOTEL_FILTER_SPECTIFIC
} from "./Ui";

const getAllRoomTypes = state =>
  state.data[mapEndpoint(END_POINTS.ALL_ROOM_TYPES)];

export const selectRoomTypeById = (state, props) =>
  getAllRoomTypes(state).byId[props.id];

const getAvailability = state =>
  state.data[mapEndpoint(END_POINTS.CHECK_AVAILABLE)];

export const getHotels = state => state.data[mapEndpoint(END_POINTS.HOTELS)];

export const getRoomTypeFilter = state => state.uiState.roomTypeFilter;

export const getHotelFilter = state => state.uiState.hotelFilter;

export const getBookingFields = state => state.bookingFields;

export const getCart = state => state.cart;

export const makeGetBookingFields = () => {
  return createSelector([getBookingFields], bookingFields => {
    const { fields } = bookingFields;
    return {
      ...fields,
      arrive: moment(fields.arrive).format("YYYY-MM-DD"),
      depart: moment(fields.depart).format("YYYY-MM-DD")
    };
  });
};

const createHotelDescription = hotel => {
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
      if (hotelFilter.filter === HOTEL_FILTER_SPECTIFIC) {
        const query = mapQuery(END_POINTS.HOTELS);
        return createHotelDescription(hotels[query.byId][hotelFilter.specific]);
      }
      return roomTypeFilter.filter === SHOW_ALL
        ? "All rooms"
        : "Available for your need";
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
    [getAllRoomTypes, getAvailability, getRoomTypeFilter, getHotelFilter],
    (allRoomTypes, availabilities, roomTypeFilter, hotelFilter) =>
      roomTypeFilter.filter === ROOMTYPE_FILTER_AVAILABLE
        ? {
            isFetching: false,
            allIds: (() => {
              const query = mapQuery(END_POINTS.CHECK_AVAILABLE);
              if (hotelFilter.filter === SHOW_ALL) {
                let result = [];
                availabilities[query.allIds].forEach(hotelName => {
                  availabilities[query.byId][hotelName].rooms.allIds.forEach(
                    roomTypeId => {
                      if (!result.includes(roomTypeId)) {
                        result.push(roomTypeId);
                      }
                    }
                  );
                });
                return result;
              }
              return availabilities[query.byId][hotelFilter.specific].rooms
                .allIds;
            })()
          }
        : allRoomTypes
  );
};

export const isDialogOpen = state => state.uiState.dialogOpen;
