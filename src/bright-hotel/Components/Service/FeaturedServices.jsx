import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Zoom from "@material-ui/core/es/Zoom/Zoom";
import React from "react";
import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";
import withStyles from "@material-ui/core/es/styles/withStyles";
import FeaturedServiceCard from "./FeaturedServiceCard";
import { API_URL } from "../../Utils/apiCall";

class FeaturedServices extends React.Component {
  state = {
    services: []
  };

  componentDidMount() {
    this.getFeaturedServices();
  }

  getFeaturedServices = () => {
    fetch(`${API_URL}/services`)
      .then(res => res.json())
      .then(res => res.slice(0, 4))
      .then(res => {
        this.setState({
          services: res
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { services } = this.state;
    return (
      <div className={classes.section} align="center">
        <GridContainer>
          <GridItem xs={12}>
            <h2 className={classes.title}>Top services</h2>
          </GridItem>
          {services.map((service, key) => (
            <GridItem xs={12} key={key}>
              <Zoom in>
                <FeaturedServiceCard
                  service={service}
                  direction={key % 2 ? "row" : "row-reverse"}
                /></Zoom>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(productStyle)(FeaturedServices);
