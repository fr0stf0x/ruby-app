import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Element } from "react-scroll";
import {
  areAllRoomsAvailable,
  getRoomTypeFilter
} from "../../Reducers/selectors";
import { ROOMTYPE_FILTER_AVAILABLE } from "../../Reducers/Ui";
import SmallDescription from "../Booking/SmallDescription";

class RoomSection extends React.Component {
  render() {
    const { roomTypeFilter, notAllRoomsAvailable } = this.props;
    const RoomTypes = React.lazy(() => import("./RoomTypes"));
    return (
      <div>
        <SmallDescription />
        <Suspense fallback={<h2>Loading</h2>}>
          <Element name="rooms" id="rooms">
            <RoomTypes />
          </Element>
        </Suspense>
        <Suspense fallback={<h2>Loading</h2>}>
          {roomTypeFilter.filter === ROOMTYPE_FILTER_AVAILABLE &&
            notAllRoomsAvailable && (
              <div>
                <div align="center">
                  <h2>You can pick multiple non-suitlable rooms below</h2>
                </div>
                <RoomTypes availableType="nonSuitableRooms" />
              </div>
            )}
        </Suspense>
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  const allRoomsAvailable = areAllRoomsAvailable();
  const mapStateToProps = (state, props) => {
    return {
      roomTypeFilter: getRoomTypeFilter(state),
      notAllRoomsAvailable: !allRoomsAvailable(state, props)
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(RoomSection);
