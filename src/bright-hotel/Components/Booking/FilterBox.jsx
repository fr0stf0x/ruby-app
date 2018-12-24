import { Grid } from "@material-ui/core";
import { Button, withStyles, Zoom } from "@material-ui/core/es";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";
import { connect } from "react-redux";
import actions from "../../Actions/actions";
import {
  areAllRoomsAvailable,
  getHotelFilter,
  getHotels,
  getRoomTypeFilter
} from "../../Reducers/selectors";
import {
  HOTEL_FILTER_SPECTIFIC,
  ROOMTYPE_FILTER_AVAILABLE,
  SHOW_ALL
} from "../../Reducers/Ui";
import END_POINTS, { mapQuery } from "../../Utils/api";
import { scrollTo } from "../../Utils/utils";
import functionalBoxStyle from "./functionalBoxStyle";

const styles = functionalBoxStyle;

class FilterBox extends React.Component {
  setRoomTypeFilter = event => {
    this.props.showAllRooms(event.target.value);
    scrollTo("rooms");
  };

  reCheckAvailability = () => {
    this.props.toggleBookingBox();
    scrollTo("box");
  };

  setHotel = event => {
    const value = event.target.value;
    if (value === SHOW_ALL) {
      this.props.setHotelFilter({
        filter: SHOW_ALL,
        specific: {}
      });
    } else {
      this.props.setHotelFilter({
        filter: HOTEL_FILTER_SPECTIFIC,
        specific: value
      });
    }
    scrollTo("rooms");
  };

  getHotel = () => {
    const { hotelFilter } = this.props;
    if (hotelFilter.filter === SHOW_ALL) {
      return SHOW_ALL;
    }
    return hotelFilter.specific;
  };

  setAllHotel = () => this.props.setHotelFilter(SHOW_ALL);

  render() {
    const { classes, hotels, roomTypeFilter, allRoomsAvailable } = this.props;
    const hotelQuery = mapQuery(END_POINTS.HOTELS);
    return (
      <Zoom in style={{ transitionDelay: "100ms" }}>
        <div className={classes.section}>
          <div className={classes.bookingBox}>
            <Grid
              container
              style={{ padding: "1rem" }}
              spacing={16}
              justify={"center"}
              alignItems={"center"}
              alignContent={"center"}
            >
              <Grid item xs={12} md={3}>
                {(allRoomsAvailable && <span />) || (
                  <Grid
                    container
                    spacing={8}
                    justify={"center"}
                    alignContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid item xs={12}>
                      Rooms
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container alignItems={"center"} justify="center">
                        <Grid item>
                          <RadioGroup
                            row
                            value={roomTypeFilter.filter}
                            onChange={this.setRoomTypeFilter}
                          >
                            <FormControlLabel
                              className={classes.radioWrapper}
                              value={SHOW_ALL}
                              control={<Radio className={classes.radio} />}
                              label="All"
                            />
                            <FormControlLabel
                              className={classes.radioWrapper}
                              value={ROOMTYPE_FILTER_AVAILABLE}
                              control={<Radio className={classes.radio} />}
                              label="Available only"
                            />
                          </RadioGroup>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} md={5}>
                <Grid
                  container
                  spacing={8}
                  justify={"center"}
                  alignContent={"center"}
                  alignItems={"center"}
                >
                  <Grid item xs={12}>
                    Hotels
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justify="center" alignItems={"center"}>
                      <Grid item>
                        <RadioGroup
                          row
                          value={this.getHotel()}
                          onChange={this.setHotel}
                        >
                          <FormControlLabel
                            value={SHOW_ALL}
                            className={classes.radioWrapper}
                            control={<Radio className={classes.radio} />}
                            label="All"
                          />
                          {hotels[hotelQuery.allIds]
                            .sort()
                            .map((hotelName, idx) => (
                              <FormControlLabel
                                className={classes.radioWrapper}
                                key={idx}
                                value={hotelName}
                                control={<Radio className={classes.radio} />}
                                label={hotelName}
                              />
                            ))}
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
                <Grid container justify={"center"} alignItems={"center"}>
                  <Grid item>
                    <Button
                      variant="extendedFab"
                      color={"secondary"}
                      onClick={this.reCheckAvailability}
                    >
                      Re-check availability
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </Zoom>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showAllRooms: filter => dispatch(actions.filter.setRoomTypeFilter(filter)),
    toggleBookingBox: () => dispatch(actions.ui.toogleBookingBox()),
    setHotelFilter: filter => dispatch(actions.filter.setHotelFilter(filter))
  };
};

export default connect(
  () => {
    return state => {
      const allRoomsAvailable = areAllRoomsAvailable();
      return {
        roomTypeFilter: getRoomTypeFilter(state),
        hotelFilter: getHotelFilter(state),
        hotels: getHotels(state),
        allRoomsAvailable: allRoomsAvailable(state)
      };
    };
  },
  mapDispatchToProps
)(withStyles(styles)(FilterBox));
