import Zoom from "@material-ui/core/Zoom/Zoom";
import React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import FeaturedRoomCard from "./FeaturedRoomCard";
import { connect } from "react-redux";
import { getDataIfNeeded } from "../../Actions";
import { END_POINTS } from "../../Utils/apiCall";
import Grid from "@material-ui/core/Grid";

const styles = {};

class FeaturedRoomTypes extends React.Component {
  componentDidMount() {
    const { dispatch, options } = this.props;
    dispatch(getDataIfNeeded(END_POINTS.roomTypes, options));
  }

  render() {
    const { items, isFetching } = this.props;
    return (
      <div>
        {isFetching && <h2 align="center">Loading...</h2>}
        {!isFetching &&
          Array.isArray(items) &&
          items.length > 0 && (
            <Grid container spacing={16}>
              {items.map((roomType, key) => (
                <Grid item xs={12} key={key}>
                  <Zoom in>
                    <FeaturedRoomCard
                      roomType={roomType}
                      direction={key % 2 ? "row-reverse" : "row"}
                    />
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { roomTypes } = state.server;
  const { isFetching, items } = roomTypes || {
    isFetching: true,
    items: []
  };
  return { isFetching, items };
};

export default connect(mapStateToProps)(withStyles(styles)(FeaturedRoomTypes));
