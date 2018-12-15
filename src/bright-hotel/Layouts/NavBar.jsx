import React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header/Header";
import {
  HomeRounded,
  MeetingRoomRounded,
  RoomServiceRounded
} from "@material-ui/icons";

const RightLinks = withStyles(headerLinksStyle)(({ ...props }) => {
  const { classes } = props;
  return (
    <div>
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <NavLink
            exact
            to="/"
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
          >
            <HomeRounded />
            Home
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink
            to="/rooms"
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
          >
            <MeetingRoomRounded />
            Rooms
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink
            to="/services"
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
          >
            <RoomServiceRounded />
            Services
          </NavLink>
        </ListItem>
      </List>
    </div>
  );
});

const Brand = "BrightHotel";

class NavBar extends React.Component {
  render() {
    const { ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          brand={Brand}
          rightLinks={<RightLinks />}
          fixed
          changeColorOnScroll={{
            height: 350,
            color: "white"
          }}
          {...rest}
        />
      </div>
    );
  }
}

export default NavBar;
