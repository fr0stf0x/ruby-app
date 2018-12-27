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
      <h3 className={classes.description} align="center">
        {allRoomsAvailable && <div>All rooms are available</div>}
        {description}
      </h3>
    </div>
  );
};

export default connect(() => {
  const getDescription = makeGetDescription();
  const allRoomsAvailable = areAllRoomsAvailable();
  return (state, props) => {
    const description = getDescription(state);
    return {
      allRoomsAvailable: allRoomsAvailable(state, props),
      description
    };
  };
})(withStyles(styles)(SmallDescription));
