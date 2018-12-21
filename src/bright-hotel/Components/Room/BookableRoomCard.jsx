import React from "react";
import { connect } from "react-redux";

import FullScreenableRoomCard from "./FullScreenableRoomCard";
import history from "../../../history";
import { selectRoomTypeById } from "../../Reducers/selectors";

class BookableRoomCard extends React.Component {
  state = {
    dialogOpen: false
  };

  toggleDialog = () => {
    this.setState({ dialogOpen: !this.state.dialogOpen });
  };

  bookHandler = () => {
    history.push("/");
  };

  render() {
    const { roomType, direction = "row" } = this.props;
    return (
      <div>
        <FullScreenableRoomCard
          fullScreen={this.state.dialogOpen}
          roomType={roomType}
          direction={direction}
          toggleDialog={this.toggleDialog}
          bookHandler={this.bookHandler}
        />
      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    roomType: selectRoomTypeById(state, props)
  };
})(BookableRoomCard);
