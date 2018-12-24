import { Divider, Paper } from "@material-ui/core";
import { Button, withStyles } from "@material-ui/core/es";
import React from "react";
import { connect } from "react-redux";
import { getCart, getHotelFilter } from "../../Reducers/selectors";
import RoomCartItem from "./RoomCartItem";

const styles = theme => ({
  container: {
    backgroundColor: "#fafafa",
    padding: "1rem",
    zIndex: 1
  },
  page: {
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1
  },
  cartItemsWrapper: {
    padding: "1rem",
    [theme.breakpoints.down("sm")]: {
      height: "60vh",
      width: "80vw"
    },
    [theme.breakpoints.up("sm")]: {
      height: "50vh",
      width: "50vw"
    },
    overflow: "auto"
  },
  cartItem: {
    boxShadow: "rgba(0,0,0,0.45) 0px 5px 30px 0px",
    padding: "1rem",
    backgroundColor: "lightblue"
  },
  cartItems: {
    margin: "1rem 0"
  }
});

class Cart extends React.Component {
  render() {
    const { classes, open, cart, hotel } = this.props;
    return (
      open && (
        <div>
          <div className={classes.page} />
          <Paper className={classes.container}>
            <h3>Your pickings at {hotel}</h3>
            <Divider />
            <div className={classes.cartItemsWrapper}>
              <div className={classes.cartItems}>
                {cart.rooms.map((room, key) => (
                  <div className={classes.cartItem} key={key}>
                    <RoomCartItem id={room.id} at={room.at} />
                  </div>
                ))}
              </div>
              <div className={classes.cartItems}>
                {cart.services.map((service, key) => (
                  <div className={classes.cartItem} key={key}>
                    <div>Service {key}</div>
                  </div>
                ))}
              </div>
              <div align="center">
                <Button variant={"extendedFab"} color={"secondary"}>
                  Check out
                </Button>
              </div>
            </div>
          </Paper>
        </div>
      )
    );
  }
}
export default connect(state => ({
  open: state.uiState.cartOpen,
  hotel: getHotelFilter(state).specific,
  cart: getCart(state)
}))(withStyles(styles)(Cart));
