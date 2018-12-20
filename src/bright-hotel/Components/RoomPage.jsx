import React, { Suspense } from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Footer from "../../components/Footer/Footer";
import landingPageStyle from "../../assets/jss/material-kit-react/views/landingPage";
import classNames from "classnames";
import NavHeader from "../Layouts/NavHeader";
import NavBar from "../Layouts/NavBar";
import { END_POINTS } from "../Utils/apiCall";

class RoomPage extends React.Component {
  state = {
    fetched: false
  };

  render() {
    const { classes } = this.props;
    const RoomTypes = React.lazy(() => import("./Room/RoomTypes"));
    return (
      <div>
        <NavBar />
        <NavHeader
          title={"Room & Suites"}
          image={require("assets/img/bright-hotel/bg_2.jpg")}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <Suspense fallback={<div>Loading</div>}>
              <RoomTypes type={END_POINTS.allRoomTypes} />
            </Suspense>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(RoomPage);
