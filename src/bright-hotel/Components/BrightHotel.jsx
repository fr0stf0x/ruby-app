import React, { Suspense } from "react";
import classNames from "classnames";
import TeamSection from "../../views/LandingPage/Sections/TeamSection";
import Footer from "../../components/Footer/Footer";
import BookingBox from "./Booking/BookingBox";
import Button from "../../components/CustomButtons/Button";
import NavHeader from "../Layouts/NavHeader";
import NavBar from "../Layouts/NavBar";
import landingPageStyle from "../../assets/jss/material-kit-react/views/landingPage";
import withStyles from "@material-ui/core/es/styles/withStyles";
import PropTypes from "prop-types";

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
    const { classes } = this.props;
    const FeaturedRoomTypes = React.lazy(() =>
      import("./Room/FeaturedRoomTypes")
    );
    return (
      <div>
        <NavBar />
        <NavHeader
          image={require("assets/img/bright-hotel/bg_1.jpg")}
          title={"Enjoy luxury experience"}
          subtitle={"Scroll down to see more"}
          content={<HeaderButton />}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <BookingBox />
            <Suspense fallback={<div>Loading</div>}>
              <h2 align="center">Featured rooms</h2>
              <FeaturedRoomTypes />
            </Suspense>
            <TeamSection />
          </div>
        </div>
        <Footer />;
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(BrightHotel);
