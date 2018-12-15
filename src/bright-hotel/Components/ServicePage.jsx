import React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import landingPageStyle from "../../assets/jss/material-kit-react/views/landingPage";
import Button from "../../components/CustomButtons/Button";
import Footer from "../../components/Footer/Footer";
import classNames from "classnames";
import AllServices from "./Service/AllServices";
import FeaturedServices from "./Service/FeaturedServices";
import NavHeader from "../Layouts/NavHeader";
import NavBar from "../Layouts/NavBar";

class ServicePage extends React.Component {
  state = {
    fetched: false
  };

  toggleGetAllServices = () => {
    this.setState({
      fetched: !this.state.fetched
    });
  };

  render() {
    const { classes } = this.props;
    const { fetched } = this.state;
    return (
      <div>
        <NavBar />
        <NavHeader
          image={require("assets/img/bright-hotel/bg_3.jpg")}
          title={"Facilities & Service"}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <FeaturedServices />
            {fetched ? (
              <AllServices />
            ) : (
              <div align="center">
                <Button
                  size="lg"
                  color="info"
                  onClick={this.toggleGetAllServices}
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

export default withStyles(landingPageStyle)(ServicePage);
