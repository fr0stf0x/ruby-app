import withStyles from "@material-ui/core/es/styles/withStyles";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { connect } from "react-redux";
import BookableRoomCard from "./BookableRoomCard";
import actions from "../../Actions/actions";

const styles = {};

class RoomTypes extends React.Component {


  render() {
    const { items, isFetching, type } = this.props;
    return (
      <Fade in>
        <div>
          {isFetching && <h2 align="center">Loading...</h2>}
          {!isFetching &&
            Array.isArray(items) &&
            items.length > 0 && (
              <Grid container spacing={16}>
                {items.map((roomType, key) => (
                  <Grid item xs={12} key={key}>
                    <BookableRoomCard
                      type={type}
                      roomType={roomType}
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

const mapStateToProps = (state, props) => {
  const roomTypes = state.server[props.type];
  const { isFetching, items } = roomTypes || {
    isFetching: true,
    items: []
  };
  return { isFetching, items };
};

export default connect(mapStateToProps)(withStyles(styles)(RoomTypes));
