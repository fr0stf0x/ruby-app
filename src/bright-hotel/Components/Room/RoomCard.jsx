import React from "react";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";
import { formatMoney, randomImage } from "../../Utils/utils";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/es/styles/withStyles";
import styles, { renderCapacityIcon } from "./roomCardStyle";

const RoomCard = props => {
  const { roomType, direction = "row", classes } = props;
  const isFullScreen = props.fullScreen;
  const shownDescription = isFullScreen
    ? roomType.descr
    : roomType.descr.substr(0, roomType.descr.indexOf(".")).concat("...");

  return (
    <div>
      <div className={isFullScreen ? {} : classes.container}>
        <Grid
          container
          direction={direction}
          justify={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12} md={6}>
            <div className={isFullScreen ? {} : classes.imgWrapper}>
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
              <div
                className={classNames(classes.money, classes.marginVertical)}
              >
                <b>${formatMoney(roomType.price)}</b>
                <sub>/night</sub>
              </div>
              <div
                className={classNames(
                  props.fullScreen
                    ? classes.attributeNoHidden
                    : classes.attribute,
                  classes.marginVertical,
                  classes.roomDescription
                )}
              >
                {shownDescription}
                {!props.fullScreen && (
                  <div className={classes.marginVertical}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={props.toggleDialog}
                    >
                      READ MORE
                    </Button>
                  </div>
                )}
              </div>
              <div
                className={
                  props.fullScreen
                    ? classes.attributeNoHidden
                    : classes.attribute
                }
              >
                Facilities:
                <span className={classes.description}>
                  Closet with hangers, HD flat-screen TV, Telephone
                </span>
              </div>
              <div
                className={
                  props.fullScreen
                    ? classes.attributeNoHidden
                    : classes.attribute
                }
              >
                Capacity:
                <span className={classes.description}>
                  {renderCapacityIcon(roomType.maxCapacity)}
                </span>
              </div>
              <div className={classes.marginVertical}>
                <Button
                  className={classNames(
                    classes.letterSpacing,
                    classes.marginHorizontal
                  )}
                  variant={"contained"}
                  color={"secondary"}
                  size={"large"}
                  onClick={props.bookHandler}
                >
                  BOOK NOW
                </Button>
                {props.children}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default withStyles(styles)(RoomCard);
