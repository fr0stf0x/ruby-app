import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { Check } from "@material-ui/icons";

const styles = {
  media: {
    objectFit: "cover",
    width: "100%",
    height: "100%"
  },
  imgWrapper: {
    padding: "0.2rem",
    boxShadow: "rgba(0,0,0,0.5) 0px 5px 20px 0px"
  },
  textWrapper: {
    paddingTop: "1%"
  },
  container: {
    margin: "1.5rem"
  },
  title: {
    fontWeight: "400",
    fontSize: "20px"
  },
  icon: {
    padding: "1rem"
  }
};

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

const FeaturedServiceCard = ({ service, direction, classes }) => {
  return (
    <div className={classes.container}>
      <Grid container direction={direction} spacing={16}>
        <Grid item xs={12} md={8}>
          <div className={classes.imgWrapper}>
            <img
              alt={service.name}
              className={classes.media}
              src={randomImage()}
              // src={roomType.image}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid
            container
            justify={"center"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <div className={classes.textWrapper}>
              {service.contents.map((content, key) => (
                <Grid item key={key} xs={12}>
                  <Grid container spacing={16} direction={"row"}>
                    <Grid item xs={3}>
                      <div align="center">
                        <Check color={"error"} />
                      </div>
                    </Grid>
                    <Grid item xs={8}>
                      <div className={classes.title}>{content.title}</div>
                      <h5>{content.content}</h5>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(FeaturedServiceCard);
