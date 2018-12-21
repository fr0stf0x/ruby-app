import React from "react";

import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Zoom from "@material-ui/core/Zoom";
import withStyles from "@material-ui/core/es/styles/withStyles";

import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import actions from "../../Actions/actions";
import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";

const styles = {
  ...productStyle,
  bookingBox: {
    background: "linear-gradient(to bottom right, rgb(164, 214, 247), #fccafd)",
    boxShadow: "rgba(0,0,0,0.45) 0px 5px 30px 0px"
  },
  textBold: {
    fontWeight: "bold"
  },
  formControl: {
    minWidth: "100% !important"
  },
  dateSelectField: {
    width: "100%",
    fontSize: "0.75em"
  }
};

class BookingBox extends React.Component {
  initialFields = () => ({
    fields: this.props.bookingFields.fields || {
      arrive: moment(new Date())
        .add(1, "day")
        .toDate(),
      depart: moment(new Date())
        .add(2, "day")
        .toDate(),
      numOfAdults: "2",
      numOfChildren: "0"
    },
    snackbar: {
      open: false
    }
  });

  componentWillUnmount() {
    this.props.dispatch(
      actions.bookingFields.changeFieldsAndInvalidateAvailableRooms(
        this.state.fields
      )
    );
  }

  state = this.initialFields();

  checkAvailability = () => {
    if (this.validateFields()) {
      this.props.dispatch(
        actions.bookingFields.changeFieldsAndInvalidateAvailableRooms(
          this.state.fields
        )
      );
      this.props.history.push("/search");
    }
  };

  onCloseSnackBar = () => {
    const defaultFields = this.initialFields();
    this.setState(
      {
        fields: {
          ...defaultFields.fields,
          arrive: defaultFields.fields.arrive,
          depart: defaultFields.fields.depart
        },
        snackbar: {
          open: false
        }
      },
      this.state.snackbar.onclose
    );
  };

  showSnackBar = (message, callback) => {
    this.setState({
      snackbar: {
        open: true,
        message,
        onclose: callback
      }
    });
  };

  validateFields = () => {
    const { arrive, depart } = this.state.fields;
    if (!(arrive instanceof Date)) {
      return this.showSnackBar("Check-in field is not valid!", () =>
        this.fromField.getInput().focus()
      );
    }
    if (!(depart instanceof Date)) {
      return this.showSnackBar("Check-out field is not valid!", () =>
        this.toField.getInput().focus()
      );
    }
    if (moment(depart).isBefore(moment(arrive))) {
      return this.showSnackBar("Can not check-out before check-in!");
    }
    if (moment(depart).diff(moment(arrive), "month") >= 2) {
      return this.showSnackBar("Can not stay more than 2 months!");
    }
    return true;
  };

  // TODO map props to state
  onNumChange = name => event => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: event.target.value
      }
    });
  };

  showFromFieldMonth = () => {
    const { arrive, depart } = this.state.fields;
    if (!arrive) {
      return;
    }
    if (moment(depart).diff(moment(arrive), "months") < 2) {
      this.toField.getDayPicker().showMonth(arrive);
    }
  };

  onArriveFieldChange = arrive => {
    this.setState({
      fields: {
        ...this.state.fields,
        arrive
      }
    });
  };

  onDepartFieldChange = depart => {
    this.setState({
      fields: {
        ...this.state.fields,
        depart
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { snackbar } = this.state;
    const { arrive, depart, numOfAdults, numOfChildren } = this.state.fields;
    const modifiers = {
      start: arrive,
      end: depart
    };

    return (
      <Zoom in style={{ transitionDelay: "100ms" }}>
        <div className={classes.section}>
          <div className={classes.bookingBox}>
            <Grid
              style={{ padding: "1rem" }}
              container
              spacing={16}
              justify={"center"}
              alignItems={"center"}
              alignContent={"center"}
            >
              <Grid item xs={12} sm={6} md={2}>
                <Grid
                  container
                  spacing={8}
                  justify={"center"}
                  alignContent={"center"}
                  alignItems={"center"}
                >
                  <Grid item xs={5} sm={12}>
                    Check-in
                  </Grid>
                  <Grid item xs={7} sm={12} className={classes.textBold}>
                    <FormControl className={classes.formControl}>
                      <DayPickerInput
                        ref={el => (this.fromField = el)}
                        value={arrive}
                        placeholder="arrive"
                        format="LL"
                        formatDate={formatDate}
                        parseDate={parseDate}
                        inputProps={{
                          className: classes.dateSelectField
                        }}
                        dayPickerProps={{
                          selectedDays: [arrive, { arrive, depart }],
                          disabledDays: { before: new Date() },
                          modifiers,
                          onDayClick: () => this.toField.getInput().focus()
                        }}
                        onDayChange={this.onArriveFieldChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              {/*depart*/}
              <Grid item xs={12} sm={6} md={2}>
                <Grid
                  container
                  spacing={8}
                  justify={"center"}
                  alignContent={"center"}
                  alignItems={"center"}
                >
                  <Grid item xs={5} sm={12}>
                    Check-out
                  </Grid>
                  <Grid item xs={7} sm={12} className={classes.textBold}>
                    <FormControl className={classes.formControl}>
                      <DayPickerInput
                        ref={el => (this.toField = el)}
                        value={depart}
                        placeholder="To"
                        format="LL"
                        formatDate={formatDate}
                        parseDate={parseDate}
                        inputProps={{
                          className: classes.dateSelectField
                        }}
                        dayPickerProps={{
                          selectedDays: [arrive, { arrive, depart }],
                          disabledDays: { before: arrive },
                          modifiers,
                          month: arrive,
                          fromMonth: arrive
                        }}
                        onDayChange={this.onDepartFieldChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              {/*num adults*/}
              <Grid item xs={12} sm={6} md={2}>
                <Grid
                  container
                  spacing={8}
                  justify={"center"}
                  alignItems={"center"}
                >
                  <Grid item xs={5} sm={12}>
                    Adults
                  </Grid>
                  <Grid item xs={7} sm={12} className={classes.textBold}>
                    <FormControl className={classes.formControl}>
                      <Input
                        type="number"
                        value={numOfAdults}
                        name={"numOfAdults"}
                        onChange={this.onNumChange("numOfAdults")}
                        inputProps={{ min: "0", max: "10", step: "1" }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              {/*num children*/}
              <Grid item xs={12} sm={6} md={2}>
                <Grid
                  container
                  spacing={8}
                  justify={"center"}
                  alignItems={"center"}
                >
                  <Grid item xs={5} sm={12}>
                    Children
                  </Grid>
                  <Grid item xs={7} sm={12} className={classes.textBold}>
                    <FormControl className={classes.formControl}>
                      <Input
                        type="number"
                        value={numOfChildren}
                        name={"numOfChildren"}
                        onChange={this.onNumChange("numOfChildren")}
                        inputProps={{ min: "0", max: "10", step: "1" }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              {/*submit button*/}
              <Grid item xs={12} sm={12} md={2}>
                <Grid container direction={"column"} alignItems={"center"}>
                  <Grid item>
                    <FormControl className={classes.formControl}>
                      <Button
                        variant={"extendedFab"}
                        color={"secondary"}
                        onClick={this.checkAvailability}
                      >
                        Check availability
                      </Button>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={this.onCloseSnackBar}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={<span id="message-id">{snackbar.message}</span>}
              action={[
                <Button
                  key="undo"
                  color="secondary"
                  size="small"
                  onClick={this.onCloseSnackBar}
                >
                  UNDO
                </Button>,
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.onCloseSnackBar}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
            <Helmet>
              <style>
                {`
      .DayPickerInput-Overlay {
        position: fixed; !important;
        top: 50%; !important;
        left: 50%; !important;
        z-index: 999; !important;
        transform: translate(-50%, -50%); !important;
      }
      .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
        background-color: #f0f8ff;
        color: #4a90e2;
      }
      .DayPicker-Day {
        border-radius: 0;
      }
      .DayPicker-Day--start {
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      }
      .DayPicker-Day--end {
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
      }
    `}
              </style>
            </Helmet>
          </div>
        </div>
      </Zoom>
    );
  }
}

export default connect(({ bookingFields }) => ({ bookingFields }))(
  withStyles(styles)(withRouter(BookingBox))
);
