import END_POINTS, { mapEndpoint, mapEndpointId, mapQuery } from "../Utils/api";
import { createSelector } from "reselect";
import { SHOW_ALL, ROOMTYPE_FILTER_AVAILABLE } from "./Ui";

const getRoomTypes = state =>
  state.data[mapEndpoint(END_POINTS.ALL_ROOM_TYPES)];

const getAllRoomTypes = state =>
  state.data[mapEndpoint(END_POINTS.ALL_ROOM_TYPES)];

export const selectRoomTypeById = (state, props) =>
  getAllRoomTypes(state).byId[props.id];

const getAvailability = state =>
  state.data[mapEndpoint(END_POINTS.CHECK_AVAILABLE)];

export const selectHotels = state =>
  state.server[mapEndpoint(END_POINTS.HOTELS)];

export const getRoomTypeFilter = state => state.uiState.roomTypeFilter;

export const getHotelFilter = state => state.uiState.hotelFilter;

export const makeGetRoomTypesWithFilters = () => {
  return createSelector(
    [getRoomTypes, getAvailability, getRoomTypeFilter, getHotelFilter],
    (allRoomTypes, availabilities, roomTypeFilter, hotelFilter) => {
      if (roomTypeFilter.filter === ROOMTYPE_FILTER_AVAILABLE) {
        if (hotelFilter.filter === SHOW_ALL) {
          let result = [];
          availabilities[mapQuery(END_POINTS.CHECK_AVAILABLE)[0]].forEach(
            id => {
              availabilities[mapQuery(END_POINTS.CHECK_AVAILABLE)[1]][
                id
              ].rooms.allIds.forEach(roomTypeId => {
                if (!result.includes(roomTypeId)) {
                  result.push(roomTypeId);
                }
              });
            }
          );
          return { allIds: result };
        }
        return {
          allIds: availabilities.byId[hotelFilter.specific].allIds
        };
      }
      return allRoomTypes;
    }
  );
};

export const isDialogOpen = state => state.uiState.dialogOpen;
