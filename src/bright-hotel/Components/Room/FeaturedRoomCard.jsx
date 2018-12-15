import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Button from "@material-ui/core/Button";
import classNames from "classnames";

const styles = theme => ({
  media: {
    objectFit: "cover",
    width: "100%",
    height: "100%"
  },
  imgWrapper: {
    padding: "0px",
    [theme.breakpoints.up("xs")]: {
      height: 250
    },
    [theme.breakpoints.up("sm")]: {
      height: 400
    },
    [theme.breakpoints.up("md")]: {
      height: 500
    },
    [theme.breakpoints.up("lg")]: {
      height: 650
    }
  },
  container: {
    padding: "0px",
    backgroundColor: "#ffffff",
    margin: "1.5rem",
    boxShadow: "rgba(0,0,0,0.3) 0px 0px 30px 0px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  },
  roomName: {
    fontWeight: "350",
    fontSize: "30px"
  },
  marginVertical: {
    [theme.breakpoints.down("sm")]: {
      margin: "10px 0"
    },
    [theme.breakpoints.up("sm")]: {
      margin: "30px 0"
    },
    lineHeight: "1.6"
  },
  textBox: {
    padding: "1rem 2em"
  },
  attribute: {
    fontWeight: "400",
    lineHeight: "1.6",
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  description: {
    color: "#817a6b"
  },
  letterSpacing: {
    letterSpacing: "3px"
  }
});

const randomImage = () => {
  return [
    require("assets/img/bright-hotel/bg_1.jpg"),
    require("assets/img/bright-hotel/img_2.jpg"),
    require("assets/img/bright-hotel/img_3.jpg"),
    require("assets/img/bright-hotel/img_4.jpg"),
    require("assets/img/bright-hotel/img_5.jpg"),
    require("assets/img/bright-hotel/img_6.jpg")
  ][Math.floor(Math.random() * 6)];
};

const FeaturedRoomCard = ({ roomType, direction = "row", classes }) => {
  return (
    <div className={classes.container}>
      <Grid
        container
        direction={direction}
        justify={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12} md={6}>
          <div className={classes.imgWrapper}>
            <img
              alt={roomType.name}
              className={classes.media}
              src={randomImage()}
              // src={roomType.image}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.textBox}>
            <p
              className={classNames(
                classes.roomName,
                classes.letterSpacing,
                classes.marginVertical
              )}
            >
              {roomType.name}
            </p>
            <h3>
              <b>
                <sup>$</sup>
                <span className="number">{roomType.price}</span>
              </b>
              <sub>/night</sub>
            </h3>
            <div className={classes.attribute}>
              {roomType.descr}
              <br />
              Categories:
              <span className={classes.description}> Single</span>
              <br />
              Facilities:
              <span className={classes.description}>
                {" "}
                Closet with hangers, HD flat-screen TV, Telephone
              </span>
              <br />
              Size:
              <span className={classes.description}> 20m2</span>
              <br />
            </div>
            <div className={classes.marginVertical}>
              <Button size={"large"} variant={"contained"} color={"secondary"}>
                <span className={classes.letterSpacing}>LEARN MORE</span>
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(FeaturedRoomCard);
