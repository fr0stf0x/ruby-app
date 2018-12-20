import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import styles from "./roomCardStyle";
import RoomCard from "./RoomCard";
import Button from "@material-ui/core/Button";

const RoomDetailDialog = props => {
  const {
    roomType,
    direction = "row",
    classes,
    toggleDialog,
    bookHandler
  } = props;
  return (
    <div>
      <Dialog fullScreen open={roomType.dialogOpen} onClose={toggleDialog}>
        <DialogContent>
          <RoomCard
            fullScreen
            roomType={roomType}
            classes={classes}
            direction={direction}
            toggleDialog={toggleDialog}
            bookHandler={() => {
              toggleDialog();
              bookHandler();
            }}
          >
            <Button variant={"outlined"} size={"large"} onClick={toggleDialog}>
              CLOSE
            </Button>
          </RoomCard>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(RoomDetailDialog);
