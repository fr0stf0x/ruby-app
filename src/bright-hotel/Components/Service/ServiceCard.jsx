import React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import { cardTitle } from "../../../assets/jss/material-kit-react";
import imagesStyles from "../../../assets/jss/material-kit-react/imagesStyles";
import Button from "../../../components/CustomButtons/Button";

const styles = {
  ...imagesStyles,
  cardTitle
};

const ServiceCard = ({ classes, service }) => {
  return (
    <Card>
      <img
        className={classes.imgCardTop}
        src={service.image}
        alt="Contemplative Reptile"
      />
      <CardBody>
        <h4 className={classes.cardTitle}>
          {service.name}, {service.serviceType}
        </h4>
        <h4>
          {service.descr}
        </h4>
        <Button size="sm" color="primary">
          Share
        </Button>
        <Button size="sm" color="transparent">
          Learn More
        </Button>
      </CardBody>
    </Card>
  );
};

export default withStyles(styles)(ServiceCard);