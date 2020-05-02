import { withStyles } from "@material-ui/core";
import { Dialog } from "@material-ui/core/es";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import actions from "./bright-hotel/Actions/actions";
import Cart from "./bright-hotel/Components/Booking/Cart";
import CheckoutForm from "./bright-hotel/Components/CheckoutForm";
import SnackBar from "./bright-hotel/Components/SnackBar";
import END_POINTS from "./bright-hotel/Utils/api";

const styles = {
  cartPopup: {
    position: "fixed",
    bottom: "0.5rem",
    right: "1rem",
    zIndex: 5
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 999
  }
};
class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  componentDidCatch(err, info) {
    console.log(err, info);
  }

  componentDidMount() {
    const phoneNumber = localStorage.getItem("phoneNumber");
    const { dispatch } = this.props;
    dispatch(actions.server.getDataIfNeeded(END_POINTS.ALL_ROOM_TYPES));
    dispatch(actions.server.getDataIfNeeded(END_POINTS.HOTELS));
    dispatch(actions.server.getDataIfNeeded(END_POINTS.SERVICES));
    dispatch(actions.server.getDataIfNeeded(END_POINTS.SERVICE_TYPES));
    phoneNumber &&
      dispatch(actions.server.getCustomerInfoFromServer(phoneNumber));
  }

  render() {
    const { children, classes, isLoading } = this.props;
    return (
      <div>
        <div className={classes.cartPopup}>
          <Cart />
          <SnackBar />
          <CheckoutForm />
          {isLoading && (
            <Dialog fullScreen open>
              <img
                src={require("assets/img/loading.gif")}
                className={classes.progress}
              />
            </Dialog>
          )}
        </div>
        {children}
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({
    isLoading: state.uiState.isLoading
  }))(withStyles(styles)(App))
);
