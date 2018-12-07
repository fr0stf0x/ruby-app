import React from "react";
import classNames from "classnames";
import landingPageStyle from "../../assets/jss/material-kit-react/views/landingPage";
import withStyles from "@material-ui/core/es/styles/withStyles";
import NavBar from "../Layouts/NavBar";
import NavHeader from "../Layouts/NavHeader";
import queryString from "query-string";
import FeaturedRoomTypes from "./Room/FeaturedRoomTypes";

class SearchResult extends React.Component {
  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    console.log(query);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavBar/>
        <NavHeader image={require("assets/img/bright-hotel/bg_1.jpg")}/>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container} align="center">
            <FeaturedRoomTypes/>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(SearchResult);