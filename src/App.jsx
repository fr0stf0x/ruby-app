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
    zIndex: 5
  }
};
class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    const phoneNumber = localStorage.getItem("phoneNumber");
    const { dispatch } = this.props;
    dispatch(actions.server.getDataIfNeeded(END_POINTS.ALL_ROOM_TYPES));
    dispatch(actions.server.getDataIfNeeded(END_POINTS.HOTELS));
    dispatch(actions.server.getDataIfNeeded(END_POINTS.SERVICES));
    dispatch(actions.server.getDataIfNeeded(END_POINTS.SERVICE_TYPES));
    phoneNumber && dispatch(actions.server.getCustomerInfo(phoneNumber));
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
