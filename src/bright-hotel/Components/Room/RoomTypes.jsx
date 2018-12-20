import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { connect } from "react-redux";
import { selectRoomTypes } from "../../Reducers/selectors";
import BookableRoomCard from "./BookableRoomCard";

class RoomTypes extends React.Component {
  render() {
    const { items, isFetching } = this.props;
    const roomTypeIds = items.allIds;
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

const mapStateToProps = state => {
  const roomTypes = selectRoomTypes(state);
  const { isFetching, items } = roomTypes || {
    isFetching: true,
    items: {}
  };
  return { isFetching, items };
};

export default connect(mapStateToProps)(RoomTypes);
