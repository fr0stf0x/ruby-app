import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import actions from "./bright-hotel/Actions/actions";
import END_POINTS from "./bright-hotel/Utils/api";
import { Button, withStyles } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import Cart from "./bright-hotel/Components/Booking/Cart";

const styles = theme => ({
  cartPopup: {
    position: "fixed",
    bottom: "0.5rem",
    right: "1rem",
    zIndex: 999
  },
  fab: {
    marginTop: "0.5rem",
    float: "right"
  }
});

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

  showCart = () => {
    this.props.dispatch(actions.ui.toggleShowCart());
  };

  render() {
    const { children, classes, showButton } = this.props;
    return (
      <div>
        {children}
        <div className={classes.cartPopup}>
          <Cart />
          {showButton && (
            <Button
              className={classes.fab}
              variant="fab"
              color="primary"
              onClick={this.showCart}
            >
              <ShoppingCart />
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({ showButton: state.cart.rooms.length > 0 }))(
    withStyles(styles)(App)
  )
);
