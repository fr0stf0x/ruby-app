import { FormControl, Input } from "@material-ui/core";
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
  }
};

class CheckoutItem extends React.Component {
  onNumChange = (id, type) => event => {
    const { dispatch } = this.props;
    dispatch(
      actions.cart.changeCartItemCount({ id, type, count: event.target.value })
    );
  };

  clearItem = () => {
    const { dispatch, cartItem, type } = this.props;
    dispatch(actions.cart.removeItemFromCart(cartItem.item.id, type));
  };

  render() {
    const { cartItem, classes, type } = this.props;
    const item = cartItem.item;
    const count = cartItem.count;
    return (
      <div>
        <Grid
          container
          justify={"center"}
          alignContent={"center"}
          alignItems={"center"}
          spacing={8}
        >
          <Grid item xs={4}>
            <span>{item.name}</span>
          </Grid>
          <Grid item xs={2}>
            <FormControl className={classes.formControl}>
              <Input
                type={"number"}
                value={count}
                onChange={this.onNumChange(item.id, type)}
                inputProps={{ min: "1", max: "10", step: "1" }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              justify={"space-between"}
              alignContent={"center"}
              alignItems={"center"}
            >
              <Grid item>{formatMoney(item.price * count)}</Grid>
              <Grid item>
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
