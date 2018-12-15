import React, { Suspense } from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Button from "../../components/CustomButtons/Button";
import Footer from "../../components/Footer/Footer";
import landingPageStyle from "../../assets/jss/material-kit-react/views/landingPage";
import classNames from "classnames";
import AllRoomTypes from "./Room/AllRoomTypes";
import NavHeader from "../Layouts/NavHeader";
import NavBar from "../Layouts/NavBar";

class RoomPage extends React.Component {
  state = {
    fetched: false
  };

  toggleFetchAllRooms = () => {
    this.setState({
      fetched: !this.state.fetched
    });
  };

  render() {
    const { classes } = this.props;
    const { fetched } = this.state;
    const FeaturedRoomTypes = React.lazy(() =>
      import("./Room/FeaturedRoomTypes")
    );
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
              <FeaturedRoomTypes />
            </Suspense>
            {fetched ? (
              <AllRoomTypes />
            ) : (
              <div align="center">
                <Button
                  size="lg"
                  color="info"
                  onClick={this.toggleFetchAllRooms}
                >
                  See all
                </Button>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(RoomPage);
