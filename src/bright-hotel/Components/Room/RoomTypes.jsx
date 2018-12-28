import { Zoom } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { connect } from "react-redux";
import {
  getRoomTypeFilter,
  makeGetRoomTypesWithFilters
} from "../../Reducers/selectors";
import { ROOMTYPE_FILTER_AVAILABLE } from "../../Reducers/Ui";
import SmallDescription from "../Booking/SmallDescription";
import BookableRoomCard from "./BookableRoomCard";
import { AVAILABLE_TYPE } from "../../Utils/utils";

class RoomTypes extends React.Component {
  render() {
    const {
      allIds: roomTypeIds,
      isFetching,
      canBook,
      availableType
    } = this.props;
    return (
      <Zoom in style={{ transitionDelay: "100ms" }}>
        <div>
          {isFetching && <h2 align="center">Loading...</h2>}
          {(!isFetching &&
            Array.isArray(roomTypeIds) &&
            roomTypeIds.length > 0 && (
              <div>
                <Grid container spacing={16}>
                  {roomTypeIds.sort().map((roomTypeId, key) => (
                    <Grid item xs={12} key={key}>
                      <BookableRoomCard
                        availableType={availableType || AVAILABLE_TYPE.SUITABLE}
                        canBook={canBook(roomTypeId)}
                        id={roomTypeId}
                        direction={key % 2 ? "row-reverse" : "row"}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            )) || (
            <div align="center">
              <h2>No suitable rooms left</h2>
            </div>
          )}
        </div>
      </Zoom>
    );
  }
}

const makeMapStateToProps = () => {
  const getRoomTypes = makeGetRoomTypesWithFilters();
  const mapStateToProps = (state, props) => {
    const roomTypes = getRoomTypes(state, props);
    const { isFetching, allIds } = roomTypes || {
      isFetching: true,
      allIds: []
    };
    const canBook = id =>
      getRoomTypeFilter(state).filter === ROOMTYPE_FILTER_AVAILABLE &&
      allIds.includes(id);
    return {
      isFetching,
      allIds,
      canBook
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(RoomTypes);
