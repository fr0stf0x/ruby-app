import React from "react";
import RoomCard from "./RoomCard";
import { connect } from "react-redux";
import RoomDetailDialog from "./RoomDetailDialog";
import history from "../../../history";
import { selectRoomTypeById } from "../../Reducers/selectors";

class BookableRoomCard extends React.Component {
  state = {
    fullScreen: false
  };

  toggleDialog = () => {
    this.setState({
      fullScreen: !this.state.fullScreen
    });
  };

  bookHandler = () => {
    history.push("/");
  };

  render() {
    const { roomType, direction = "row" } = this.props;
    return (
      <div>
        <RoomDetailDialog
          open={this.state.fullScreen}
          roomType={roomType}
          direction={direction}
          toggleDialog={this.toggleDialog}
          bookHandler={this.bookHandler}
        />
        <RoomCard
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
