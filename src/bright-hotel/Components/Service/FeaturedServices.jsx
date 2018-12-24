import Zoom from "@material-ui/core/es/Zoom/Zoom";
import Grid from "@material-ui/core/Grid";
import React from "react";
import FeaturedServiceCard from "./FeaturedServiceCard";
import TopServices from "./TopServices";

class FeaturedServices extends React.Component {
  render() {
    return (
      <div>
        <h2 align="center">We also provide best services</h2>
        <Grid container spacing={16}>
          {TopServices.map((service, key) => (
            <Grid item xs={12} key={key}>
              <Zoom in>
                <FeaturedServiceCard
                  service={service}
                  direction={key % 2 ? "row" : "row-reverse"}
                />
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default FeaturedServices;
