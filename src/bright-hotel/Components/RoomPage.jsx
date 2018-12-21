import withStyles from "@material-ui/core/es/styles/withStyles";
import classNames from "classnames";
import React, { Suspense } from "react";
import landingPageStyle from "../../assets/jss/material-kit-react/views/landingPage";
import Footer from "../../components/Footer/Footer";
import NavBar from "../Layouts/NavBar";
import NavHeader from "../Layouts/NavHeader";
import END_POINTS from "../Utils/api";

class RoomPage extends React.Component {
  render() {
    const { classes } = this.props;
    const RoomTypes = React.lazy(() => import("./Room/RoomTypes"));
    return (
      <div>
        <NavBar />
        <NavHeader
          title={"Room & Suites"}
          image={require("assets/img/bright-hotel/bg_002.jpg")}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <Suspense fallback={<div>Loading</div>}>
              <RoomTypes endpoint={END_POINTS.ALL_ROOM_TYPES} />
            </Suspense>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(RoomPage);
