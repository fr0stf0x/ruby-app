import React from "react";
import { connect } from "react-redux";
import BookingBox from "./BookingBox";
import FilterBox from "./FilterBox";
import { Element } from "react-scroll";

class FunctionalBox extends React.Component {
  render() {
    const { bookingBoxOpen } = this.props;
    return (
      <Element name="box" id="box">
        {(bookingBoxOpen && <BookingBox />) || <FilterBox />}
      </Element>
    );
  }
}

export default connect(state => {
  return {
    bookingBoxOpen: state.uiState.bookingBoxOpen
  };
})(FunctionalBox);
