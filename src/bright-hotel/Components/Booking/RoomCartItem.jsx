import React from "react";
import { connect } from "react-redux";
import { selectRoomTypeById } from "../../Reducers/selectors";
import { withStyles } from "@material-ui/core/es";
import { NativeSelect, FormControl } from "@material-ui/core";

const styles = {
  row: {}
};

class RoomCartItem extends React.Component {
  changeHotel = event => {};

  render() {
    const { roomType, at, classes } = this.props;
    return (
      <div className={classes.row}>
        <span>{roomType.name}</span>
        <span>
          <FormControl fullWidth className={classes.formControl}>
            <NativeSelect value={at} onChange={this.changeHotel}>
              <option value="not_selected">Not selected</option>
            </NativeSelect>
          </FormControl>
        </span>
      </div>
    );
  }
}

export default connect(() => (state, props) => ({
  roomType: selectRoomTypeById(state, props)
}))(withStyles(styles)(RoomCartItem));
