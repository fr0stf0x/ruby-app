import { Divider, Paper } from "@material-ui/core";
import { Badge, Button, withStyles } from "@material-ui/core/es";
import { ShoppingCart } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import actions from "../../Actions/actions";
import {
  calculateMoney,
  getCart,
  getHotelFilter,
  isCartOpen
} from "../../Reducers/selectors";
import { formatMoney, scrollTo } from "../../Utils/utils";
import CartItem from "./CartItem";

const styles = theme => ({
  fab: {
    marginTop: "0.5rem",
    float: "right"
  },
  container: {
    backgroundColor: "#fafafa",
    padding: "0.5rem",
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
    padding: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "40vh",
      width: "80vw"
    },
    [theme.breakpoints.up("sm")]: {
      maxHeight: "55vh",
      width: "45vw"
    },
    overflow: "auto"
  },
  cartItem: {
    [theme.breakpoints.up("xs")]: {
      padding: "0.5rem",
      boxShadow: "rgba(0,0,0,0.45) 0px 5px 15px 0px"
    }
  },
  cartItems: {
    margin: "1rem 0"
  },
  title: {
    fontWeight: "400",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px"
    }
  },
  extraPaper: {
    marginTop: "1rem",
    padding: "0.5rem",
    backgroundColor: "#ffffff"
  },
  extraQuestion: {
    fontSize: "16px",
    fontStyle: "italic"
  },
  extraButtons: {
    marginTop: "0.5rem"
  },
  badge: {
    margin: theme.spacing.unit * 2
  }
});

class Cart extends React.Component {
  state = {
    asked: false
  };

  dontAskAgain = () => {
    this.setState({ asked: true });
  };

  closeCartAndScrollToServices = () => {
    const { dispatch } = this.props;
    dispatch(actions.ui.toggleShowCart());
    scrollTo("services");
  };

  showCart = () => {
    this.props.dispatch(actions.ui.toggleShowCart());
  };

  checkOut = () => {
    this.props.dispatch(actions.ui.toggleShowCart());
    this.props.dispatch(actions.ui.toggleCheckoutForm());
  };

  render() {
    const {
      classes,
      cartOpen,
      cart,
      currentHotel,
      showButton,
      totalMoney
    } = this.props;
    return (
      <div>
        {cartOpen && (
          <div>
            <div className={classes.page} />
            <Paper className={classes.container}>
              <h3 className={classes.title} align="center">
                {currentHotel}
              </h3>
              <div className={classes.cartItemsWrapper}>
                <Divider />
                <div className={classes.cartItems}>
                  {cart.items.rooms.map((room, key) => (
                    <div
                      style={{
                        backgroundColor: (key % 2 && "#ccf2ff") || "#eaeae1"
                      }}
                      className={classes.cartItem}
                      key={key}
                    >
                      <CartItem type="rooms" id={room.id} />
                    </div>
                  ))}
                </div>
                <Divider />
                {!this.state.asked &&
                  cart.items.services.length === 0 && (
                    <Paper className={classes.extraPaper}>
                      <div className={classes.extraQuestion}>
                        Would you like some extra services?
                      </div>
                      <div align="right" className={classes.extraButtons}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.closeCartAndScrollToServices}
                        >
                          Yes, please
                        </Button>
                        <Button onClick={this.dontAskAgain}>No, thanks</Button>
                      </div>
                    </Paper>
                  )}
                <div className={classes.cartItems}>
                  {cart.items.services.map((service, key) => (
                    <div
                      style={{
                        backgroundColor: (key % 2 && "#eaeae1") || "#ccf2ff"
                      }}
                      className={classes.cartItem}
                      key={key}
                    >
                      <CartItem type="services" id={service.id} />
                    </div>
                  ))}
                </div>
                <Divider />
              </div>
              <div align="center">
                <div>
                  <h3 className={classes.title}>
                    Total money: {formatMoney(totalMoney)}
                  </h3>
                </div>
                <Button
                  onClick={this.checkOut}
                  variant={"extendedFab"}
                  color={"secondary"}
                >
                  Check out
                </Button>
              </div>
            </Paper>
          </div>
        )}
        {showButton && (
          <Button
            className={classes.fab}
            variant="fab"
            color="primary"
            onClick={this.showCart}
          >
            <Badge
              className={classes.badge}
              color={"secondary"}
              badgeContent={
                cart.items.rooms.length + cart.items.services.length
              }
            >
              <ShoppingCart />
            </Badge>
          </Button>
        )}
      </div>
    );
  }
}
export default connect(() => {
  const getTotalMoney = calculateMoney();
  return (state, props) => {
    let cartOpen = isCartOpen(state);
    const cart = getCart(state);
    return {
      cartOpen,
      cart,
      currentHotel: getHotelFilter(state).specific,
      totalMoney: getTotalMoney(state, props),
      showButton: cart.items.rooms.length > 0 || cartOpen
    };
  };
})(withStyles(styles)(Cart));
