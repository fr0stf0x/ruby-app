import React from "react";
import classNames from "classnames";
import landingPageStyle from "../../assets/jss/material-kit-react/views/landingPage";
import withStyles from "@material-ui/core/es/styles/withStyles";
import NavBar from "../Layouts/NavBar";
import NavHeader from "../Layouts/NavHeader";
import FeaturedRoomTypes from "./Room/FeaturedRoomTypes";
import { connect } from "react-redux";
import BookingBox from "./Booking/BookingBox";
import Footer from "../../components/Footer/Footer";

class SearchResult extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavBar />
        <NavHeader
          title={"Found some rooms for you"}
          image={require("assets/img/bright-hotel/bg_1.jpg")}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <FeaturedRoomTypes />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(({ bookingFields }) => ({ bookingFields }))(
  withStyles(landingPageStyle)(SearchResult)
);
