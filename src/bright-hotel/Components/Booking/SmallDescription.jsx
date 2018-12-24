import { withStyles } from "@material-ui/core/es";
import React from "react";
import { connect } from "react-redux";
import {
  areAllRoomsAvailable,
  makeGetDescription
} from "../../Reducers/selectors";

const styles = theme => ({
  description: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 20
    }
  }
});

const SmallDescription = props => {
  const { description, classes, allRoomsAvailable } = props;

  return (
    <div>
      <h2 className={classes.description} align="center">
        {allRoomsAvailable && <div>All rooms are available</div>}
      </h2>
      <h2 className={classes.description} align="center">
        {description}
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
      allRoomsAvailable: allRoomsAvailable(state),
      description
    };
  };
})(withStyles(styles)(SmallDescription));
