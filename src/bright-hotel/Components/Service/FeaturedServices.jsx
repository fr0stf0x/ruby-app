import Zoom from "@material-ui/core/es/Zoom/Zoom";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { connect } from "react-redux";
import { getServiceTypes } from "../../Reducers/selectors";
import FeaturedServiceCard from "./FeaturedServiceCard";
import { randomImage } from "../../Utils/utils";

class FeaturedServices extends React.Component {
  render() {
    const { services } = this.props;
    const { isFetching, allIds } = services;
    return (
      <Zoom in style={{ transitionDelay: "100ms" }}>
        <div>
          {isFetching && <h2 align="center">Loading...</h2>}
          {!isFetching &&
            Array.isArray(allIds) &&
            allIds.length > 0 && (
              <div>
                <h2 align="center">We also provide best services</h2>
                <Grid container spacing={16}>
                  {allIds.map((id, key) => (
                    <Grid item xs={12} key={key}>
                      <Zoom in>
                        <FeaturedServiceCard
                          image={randomImage()}
                          id={id}
                          direction={key % 2 ? "row" : "row-reverse"}
                        />
                      </Zoom>
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
        </div>
      </Zoom>
    );
  }
}

export default connect(state => {
  return {
    services: getServiceTypes(state)
  };
})(FeaturedServices);
