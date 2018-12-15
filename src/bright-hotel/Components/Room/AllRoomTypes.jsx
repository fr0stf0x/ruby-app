import React from "react";
import GridItem from "../../../components/Grid/GridItem";
import Zoom from "@material-ui/core/Zoom/Zoom";
import RoomCard from "./RoomCard";
import GridContainer from "../../../components/Grid/GridContainer";
import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { API_URL } from "../../Utils/apiCall";

class AllRoomTypes extends React.Component {
  state = {
    rooms: []
  };

  componentDidMount() {
    this.getAllRooms();
  }

  getAllRooms = () => {
    fetch(`${API_URL}/rooms`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          rooms: res
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { rooms } = this.state;
    return (
      <div>
        <div className={classes.section} align="center">
          <GridContainer>
            <GridItem xs={12}>
              <h2 className={classes.title}>More rooms</h2>
            </GridItem>
            {rooms.map((room, key) => (
              <GridItem key={key} xs={12} md={6} lg={4} xl={2}>
                <Zoom in>
                  <RoomCard room={room} />
                </Zoom>
              </GridItem>
            ))}
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(AllRoomTypes);
