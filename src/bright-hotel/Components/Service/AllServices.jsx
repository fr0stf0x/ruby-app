import React from "react";
import GridItem from "../../../components/Grid/GridItem";
import Zoom from "@material-ui/core/Zoom/Zoom";
import GridContainer from "../../../components/Grid/GridContainer";
import ServiceCard from "./ServiceCard";
import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { API_URL } from "../../Utils/api";

class AllServices extends React.Component {
  state = {
    services: []
  };

  componentDidMount() {
    this.getAllServices();
  }

  getAllServices = () => {
    fetch(`${API_URL}/services`)
      .then(res => res.json())
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
            <h2 className={classes.title}>More services</h2>
          </GridItem>
          {services.map((service, key) => (
            <GridItem key={key} xs={12} md={6} lg={4} xl={2}>
              <Zoom in>
                <ServiceCard service={service} />
              </Zoom>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(productStyle)(AllServices);
