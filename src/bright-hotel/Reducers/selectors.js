import END_POINTS, { mapEndpoint } from "../Utils/api";

export const selectRoomTypes = state =>
  state.data[mapEndpoint(END_POINTS.ALL_ROOM_TYPES)];

export const selectRoomTypeById = (state, props) =>
  selectRoomTypes(state).items.byId[props.id];

export const selectHotels = state =>
  state.server[mapEndpoint(END_POINTS.HOTELS)];

// export const selectAvailabilityById = (state, roomTypeId) =>
//   selectRoomTypeById(state, roomTypeId).availableIn;
