import ListItem from "@material-ui/core/es/ListItem/ListItem";
import withStyles from "@material-ui/core/es/styles/withStyles";
import List from "@material-ui/core/List/List";
import {
  HomeRounded,
  MeetingRoomRounded,
  RoomServiceRounded
} from "@material-ui/icons";
import React from "react";
import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import Header from "../../components/Header/Header";
import { scrollTop, scrollTo } from "../Utils/utils";
import { Link } from "react-scroll";

const RightLinks = withStyles(headerLinksStyle)(({ ...props }) => {
  const { classes } = props;
  return (
    <div>
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <span style={{ cursor: "pointer" }}>
            <Link
              to=""
              className={classes.navLink}
              activeClass={classes.navLinkActive}
              onClick={scrollTop}
            >
              <HomeRounded />
              Home
            </Link>
          </span>
        </ListItem>
        <ListItem className={classes.listItem}>
          <span style={{ cursor: "pointer" }}>
            <Link
              to="rooms"
              className={classes.navLink}
              activeClass={classes.navLinkActive}
              onClick={() => scrollTo("rooms")}
            >
              <MeetingRoomRounded />
              Rooms
            </Link>
          </span>
        </ListItem>
        <ListItem className={classes.listItem}>
          <span style={{ cursor: "pointer" }}>
            <Link
              to="services"
              className={classes.navLink}
              activeClass={classes.navLinkActive}
              onClick={() => scrollTo("services")}
            >
              <RoomServiceRounded />
              Services
            </Link>
          </span>
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
