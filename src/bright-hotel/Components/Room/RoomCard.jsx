import React, { Component } from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import { cardTitle } from "../../../assets/jss/material-kit-react";
import imagesStyles from "../../../assets/jss/material-kit-react/imagesStyles";
import Button from "../../../components/CustomButtons/Button";

const styles = {
  ...imagesStyles,
  cardTitle,
  textCenter: {
    textAlign: "center"
  }
};

class RoomCard extends Component {
  state = {};

  render() {
    const { room, classes } = this.props;

    return (
      <Card className={classes.textCenter}>
        <img
          className={classes.imgCardTop}
          src={room.image}
          alt="Contemplative Reptile"
        />
        <CardBody>
          <h4 className={classes.cardTitle}>
            {room.hotelName}, {room.roomNum}
          </h4>
          <h4>{room.descr}</h4>
          <Button size="sm" color={"primary"}>
            Share
          </Button>
          <Button size="sm" color={"transparent"}>
            Learn More
          </Button>
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(styles)(RoomCard);
