import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";

import classNames from "classnames";

import styles, { renderCapacityIcon } from "./roomCardStyle";
import { formatMoney, randomImage } from "../../Utils/utils";

const RoomCard = props => {
  const {
    roomType,
    direction = "row",
    fullScreen: isFullScreen,
    classes,
    toggleDialog,
    bookHandler
  } = props;
  const shownDescription = isFullScreen
    ? roomType.descr
    : roomType.descr.substr(0, roomType.descr.indexOf(".")).concat("...");

  return (
    <div>
      <div className={classes.container}>
        <Grid
          container
          direction={direction}
          justify={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12} md={6}>
            <div
              className={
                (isFullScreen && classes.imgWrapperFull) || classes.imgWrapper
              }
              onClick={toggleDialog}
            >
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
                  isFullScreen ? classes.attributeNoHidden : classes.attribute,
                  classes.marginVertical,
                  classes.roomDescription
                )}
              >
                {shownDescription}
              </div>
              <div
                className={
                  isFullScreen ? classes.attributeNoHidden : classes.attribute
                }
              >
                Facilities:
                <span className={classes.description}>
                  Closet with hangers, HD flat-screen TV, Telephone
                </span>
              </div>
              <div
                className={
                  isFullScreen ? classes.attributeNoHidden : classes.attribute
                }
              >
                Capacity:
                <span className={classes.description}>
                  {renderCapacityIcon(roomType.maxCapacity)}
                </span>
              </div>
              <div className={classes.marginVertical}>
                <Button
                  className={classes.letterSpacing}
                  variant={"contained"}
                  color={"secondary"}
                  size={"large"}
                  onClick={() => {
                    isFullScreen && toggleDialog();
                    bookHandler();
                  }}
                >
                  Check availability
                </Button>
              </div>
              {!isFullScreen && (
                <div className={classes.marginVertical}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={toggleDialog}
                  >
                    READ MORE
                  </Button>
                </div>
              )}
              <div className={classes.marginVertical}>{props.children}</div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default withStyles(styles)(RoomCard);
