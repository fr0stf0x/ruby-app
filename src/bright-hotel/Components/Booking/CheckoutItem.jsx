import { TextField } from "@material-ui/core";
import { Grid, IconButton, withStyles } from "@material-ui/core/es";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { connect } from "react-redux";
import actions from "../../Actions/actions";
import { makeGetCartItem } from "../../Reducers/selectors";
import { formatMoney } from "../../Utils/utils";

const styles = {
  formControl: {
    padding: 0,
    margin: 0
  },
  margin: {
    margin: "0 4vw"
  }
};

class CheckoutItem extends React.Component {
  onNumChange = (roomTypeId, roomNum, name) => event => {
    const { dispatch } = this.props;
    dispatch(
      actions.cart.changeRoomDetail(roomTypeId, roomNum, {
        [name]: event.target.value
      })
    );
  };

  clearItem = () => {
    const { dispatch, cartItem, type: cartItemType } = this.props;
    dispatch(actions.cart.removeItemFromCart(cartItem.item.id, cartItemType));
  };

  render() {
    const { classes, cartItem, type: cartItemType } = this.props;
    const { details, count, item } = cartItem;
    const { id: roomTypeId, name } = item;
    const { rooms } = details;

    return (
      <div>
        <Grid
          container
          alignContent={"center"}
          alignItems={"center"}
          spacing={8}
        >
          {/* count */}
          <Grid item xs={12}>
            <Grid
              container
              justify={"space-between"}
              alignContent={"center"}
              alignItems={"center"}
            >
              <Grid item xs={2}>
                <span>{count}</span>
              </Grid>
              {/* name/ */}
              <Grid item xs={4}>
                <span>{name}</span>
              </Grid>
              <Grid item xs={3}>
                {formatMoney(item.price * count)}
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.clearItem}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/* details */}
          <Grid item xs={12}>
            <Grid
              container
              direction={"column"}
              justify={"center"}
              alignContent={"center"}
              alignItems={"center"}
            >
              {cartItemType === "rooms" &&
                rooms &&
                Object.entries(rooms).map(
                  ([roomNum, { numOfAdults, numOfChildren }]) => (
                    <Grid item key={roomNum}>
                      <span className={classes.margin}>{roomNum}</span>
                      <span className={classes.margin}>
                        <TextField
                          label={"Adults"}
                          type={"number"}
                          value={numOfAdults}
                          onChange={this.onNumChange(
                            roomTypeId,
                            roomNum,
                            "numOfAdults"
                          )}
                          inputProps={{ min: "0", max: "10", step: "1" }}
                        />
                      </span>
                      <span className={classes.margin}>
                        <TextField
                          label={"Children"}
                          type={"number"}
                          value={numOfChildren}
                          onChange={this.onNumChange(
                            roomTypeId,
                            roomNum,
                            "numOfChildren"
                          )}
                          inputProps={{ min: "0", max: "10", step: "1" }}
                        />
                      </span>
                    </Grid>
                  )
                )}
            </Grid>
          </Grid>
        </Grid>
        <span />
      </div>
    );
  }
}

export default connect(() => {
  const getCartItem = makeGetCartItem();
  return (state, props) => ({
    cartItem: getCartItem(state, props)
  });
})(withStyles(styles)(CheckoutItem));
