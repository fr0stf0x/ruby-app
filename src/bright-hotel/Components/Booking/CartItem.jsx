import { FormControl, Input } from "@material-ui/core";
import { Grid, withStyles } from "@material-ui/core/es";
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

class CartItem extends React.Component {
  onNumChange = id => event => {
    const { dispatch } = this.props;
    dispatch(actions.cart.changeNumRooms({ id, count: event.target.value }));
  };

  render() {
    const { cartItem, classes } = this.props;
    const item = cartItem.item;
    const count = cartItem.count;
    return (
      <div>
        <Grid
          container
          justify={"center"}
          alignContent={"center"}
          alignItems={"center"}
          spacing={16}
        >
          <Grid item xs={6}>
            <span>{item.name}</span>
          </Grid>
          <Grid item xs={2}>
            <FormControl className={classes.formControl}>
              <Input
                type={"number"}
                value={count}
                onChange={this.onNumChange(item.id)}
                inputProps={{ min: "0", max: "10", step: "1" }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            {formatMoney(item.price)}$
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
})(withStyles(styles)(CartItem));
