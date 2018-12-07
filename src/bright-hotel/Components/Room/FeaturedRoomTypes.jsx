import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Zoom from "@material-ui/core/es/Zoom/Zoom";
import React from "react";
import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";
import withStyles from "@material-ui/core/es/styles/withStyles";
import FeaturedRoomCard from "./FeaturedRoomCard";
import { API_URL } from "../../Utils/apiCall";

class FeaturedRoomTypes extends React.Component {

  state = {
    roomTypes: []
  };

  componentDidMount() {
    this.getFeaturedRooms();
  }

  getFeaturedRooms = () => {
    fetch(`${API_URL}/roomTypes`)
      .then(res => res.json())
      .then(res => res.slice(0, 4))
      .then(res => {
        this.setState({
          roomTypes: res
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { roomTypes } = this.state;
    return (
      <div>
        <div className={classes.section} align="center">
          <GridContainer>
            <GridItem>
              <h2 className={classes.title}>Featured Rooms</h2>
            </GridItem>
            {roomTypes.map((roomType, key) => (
              <GridItem xs={12} key={key}>
                <Zoom in>
                  <FeaturedRoomCard
                    roomType={roomType}
                    direction={key % 2 ? "row" : "row-reverse"}
                  />
                </Zoom>
              </GridItem>
            ))}
          </GridContainer>
        </div>
      </div>
    );
  }

}

export default withStyles(productStyle)(FeaturedRoomTypes);
