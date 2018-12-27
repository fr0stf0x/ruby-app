import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Element } from "react-scroll";
import classNames from "classnames";
import withStyles from "@material-ui/core/es/styles/withStyles";

import Button from "../../components/CustomButtons/Button";
import Footer from "../../components/Footer/Footer";
import NavBar from "../Layouts/NavBar";
import NavHeader from "../Layouts/NavHeader";
import FunctionalBox from "./Booking/FunctionalBox";
import { makeGetRoomTypesWithFilters } from "../Reducers/selectors";
import landingPageStyle from "../../assets/jss/material-kit-react/views/landingPage";

const HeaderButton = () => (
  <Button
    color="danger"
    size="lg"
    href="https://www.youtube.com/watch?v=YAVvEz_dAi4"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fas fa-play" />
    Or watch our video
  </Button>
);

class BrightHotel extends React.Component {
  render() {
    const { classes, areNoRoomsAvailable } = this.props;
    const RoomTypes = React.lazy(() => import("./Room/RoomTypes"));
    const FeaturedServices = React.lazy(() =>
      import("./Service/FeaturedServices")
    );
    return (
      <div>
        <NavBar />
        <NavHeader
          image={require("assets/img/bright-hotel/bg_001.jpg")}
          title={"Enjoy luxury experience"}
          subtitle={"Scroll down to see more"}
          content={<HeaderButton />}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <div style={{ position: "relative", zIndex: 999 }}>
              <FunctionalBox />
            </div>
            <Suspense fallback={<h2>Loading</h2>}>
              <Element name="rooms" id="rooms">
                <RoomTypes />
              </Element>
            </Suspense>
            <Suspense fallback={<h2>Loading</h2>}>
              {areNoRoomsAvailable && (
                <div>
                  <div align="center">
                    <h2>But you can pick multiple rooms below</h2>
                  </div>
                  <RoomTypes type="nonSuitableRooms" />
                </div>
              )}
            </Suspense>
            <Suspense fallback={<h2>Loading</h2>}>
              <Element name="services" id="services">
                <FeaturedServices />
              </Element>
            </Suspense>
            {/*<TeamSection />*/}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  const getRoomTypes = makeGetRoomTypesWithFilters();
  const mapStateToProps = (state, props) => {
    const roomTypes = getRoomTypes(state, props);
    const { allIds } = roomTypes || {
      allIds: []
    };
    return {
      areNoRoomsAvailable: allIds && allIds.length === 0
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(
  withStyles(landingPageStyle)(BrightHotel)
);
