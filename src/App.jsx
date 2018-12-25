import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import actions from "./bright-hotel/Actions/actions";
import Cart from "./bright-hotel/Components/Booking/Cart";
import END_POINTS from "./bright-hotel/Utils/api";
import SnackBar from "./bright-hotel/Components/SnackBar";
import { withStyles } from "@material-ui/core";
import CheckoutForm from "./bright-hotel/Components/CheckoutForm";

const styles = {
  cartPopup: {
    position: "fixed",
    bottom: "0.5rem",
    right: "1rem",
    zIndex: 999
  }
};
class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    this.props.dispatch(
      actions.server.getDataIfNeeded(END_POINTS.ALL_ROOM_TYPES)
    );
    this.props.dispatch(actions.server.getDataIfNeeded(END_POINTS.HOTELS));
    this.props.dispatch(actions.server.getDataIfNeeded(END_POINTS.SERVICES));
    this.props.dispatch(
      actions.server.getDataIfNeeded(END_POINTS.SERVICE_TYPES)
    );
  }

  render() {
    const { children, classes } = this.props;
    return (
      <div>
        <div className={classes.cartPopup}>
          <Cart />
          <SnackBar />
          <CheckoutForm />
        </div>
        {children}
      </div>
    );
  }
}

export default withRouter(connect(() => ({}))(withStyles(styles)(App)));
