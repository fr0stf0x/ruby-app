import React from "react";
import RoomCard from "./RoomCard";
import { connect } from "react-redux";
import actions from "../../Actions/actions";
import RoomDetailDialog from "./RoomDetailDialog";
import history from "../../../history";

class BookableRoomCard extends React.Component {
  toggleDialog = () => {
    this.props.dispatch(
      actions.rooms.toggleRoomDetailDialog(
        this.props.type,
        this.props.roomType.id
      )
    );
  };

  bookHandler = () => {
    history.push("/");
  };

  render() {
    const { roomType, direction = "row" } = this.props;
    return (
      <div>
        <RoomDetailDialog
          toggleDialog={this.toggleDialog}
          roomType={roomType}
          direction={direction}
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

export default connect(() => ({}))(BookableRoomCard);
