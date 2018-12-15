import Zoom from "@material-ui/core/es/Zoom/Zoom";
import React from "react";
import FeaturedServiceCard from "./FeaturedServiceCard";
import TopServices from "./TopServices";
import Grid from "@material-ui/core/Grid";

class FeaturedServices extends React.Component {
  render() {
    return (
      <div>
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
