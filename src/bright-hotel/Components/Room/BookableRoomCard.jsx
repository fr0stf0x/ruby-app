import React from "react";
import { connect } from "react-redux";
import actions from "../../Actions/actions";
import { getHotelFilter, selectRoomTypeById } from "../../Reducers/selectors";
import { randomImage, scrollTo } from "../../Utils/utils";
import FullScreenableRoomCard from "./FullScreenableRoomCard";

class BookableRoomCard extends React.Component {
  state = {
    dialogOpen: false
  };

  toggleDialog = () => {
    this.setState({
      dialogOpen: !this.state.dialogOpen
    });
  };

  image = randomImage();

  bookHandler = () => {
    const { canBook, addRoomToCart, roomType, hotel } = this.props;
    if (!canBook) {
      scrollTo("box");
    } else {
      addRoomToCart({
        roomTypeId: roomType.id,
        hotelName: hotel.specific
      });
      this.props.showCart();
    }
  };

  render() {
    const { roomType, direction = "row", canBook } = this.props;
    const functional = (canBook && <span>Book now</span>) || (
      <span>Check availability</span>
    );
    return (
      <div>
        <FullScreenableRoomCard
          image={this.image}
          fullScreen={this.state.dialogOpen}
          roomType={roomType}
          direction={direction}
          toggleDialog={this.toggleDialog}
          bookHandler={this.bookHandler}
          functional={functional}
        />
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    return {
      roomType: selectRoomTypeById(state, props),
      hotel: getHotelFilter(state)
    };
  },
  dispatch => ({
    addRoomToCart: roomTypeId =>
      dispatch(actions.cart.addRoomToCart(roomTypeId)),
    showCart: () => dispatch(actions.ui.toggleShowCart())
  })
)(BookableRoomCard);
