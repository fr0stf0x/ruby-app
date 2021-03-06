import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import withStyles from "@material-ui/core/es/styles/withStyles";
import React from "react";
import RoomCard from "./RoomCard";
import styles from "./roomCardStyle";

const FullScreenableRoomCard = props => {
  const {
    classes,
    roomType,
    direction = "row",
    toggleDialog,
    bookHandler,
    fullScreen,
    image,
    functional
  } = props;

  const closeDialogButton = (
    <Button variant={"outlined"} size={"large"} onClick={toggleDialog}>
      Close
    </Button>
  );

  const roomCard = (
    <RoomCard
      functional={functional}
      image={image}
      roomType={roomType}
      classes={classes}
      direction={direction}
      toggleDialog={toggleDialog}
      bookHandler={bookHandler}
    />
  );

  const fullScreenCard = React.cloneElement(roomCard, {
    fullScreen: true,
    children: closeDialogButton
  });

  return (
    <div>
      {(fullScreen && (
        <Dialog fullScreen open onClose={toggleDialog}>
          <DialogContent>{fullScreenCard}</DialogContent>
        </Dialog>
      )) ||
        roomCard}
    </div>
  );
};

export default withStyles(styles)(FullScreenableRoomCard);
