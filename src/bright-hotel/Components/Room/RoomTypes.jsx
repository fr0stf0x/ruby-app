import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { connect } from "react-redux";
import BookableRoomCard from "./BookableRoomCard";
import { makeGetRoomTypesWithFilters } from "../../Reducers/selectors";

class RoomTypes extends React.Component {
  render() {
    const { allIds: roomTypeIds, isFetching } = this.props;
    return (
      <Fade in>
        <div>
          {isFetching && <h2 align="center">Loading...</h2>}
          {!isFetching &&
            Array.isArray(roomTypeIds) &&
            roomTypeIds.length > 0 && (
              <Grid container spacing={16}>
                {roomTypeIds.map((roomTypeId, key) => (
                  <Grid item xs={12} key={key}>
                    <BookableRoomCard
                      id={roomTypeId}
                      direction={key % 2 ? "row-reverse" : "row"}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
        </div>
      </Fade>
    );
  }
}

const makeMapStateToProps = () => {
  const getRoomTypes = makeGetRoomTypesWithFilters();
  const mapStateToProps = (state, props) => {
    const roomTypes = getRoomTypes(state, props);
    const { isFetching, allIds } = roomTypes || {
      isFetching: true,
      allIds: {}
    };
    return { isFetching, allIds };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(RoomTypes);
