import React from "react";
import { connect } from "react-redux";
import {
  makeGetDescription,
  areAllRoomsAvailable,
  getHotelFilter
} from "../../Reducers/selectors";
import { withStyles } from "@material-ui/core/es";
import { SHOW_ALL } from "../../Reducers/Ui";

const styles = theme => ({
  description: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 20
    }
  }
});

const SmallDescription = props => {
  const { description, classes, allRoomsAvailable, hotelFilter } = props;

  return (
    <div>
      <h2 className={classes.description} align="center">
        {(hotelFilter.filter === SHOW_ALL &&
          allRoomsAvailable && <span>All rooms are available</span>) ||
          description}
      </h2>
    </div>
  );
};

export default connect(() => {
  const getDescription = makeGetDescription();
  const allRoomsAvailable = areAllRoomsAvailable();
  return state => {
    const description = getDescription(state);
    return {
      hotelFilter: getHotelFilter(state),
      allRoomsAvailable: allRoomsAvailable(state),
      description
    };
  };
})(withStyles(styles)(SmallDescription));
