import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Button from "@material-ui/core/Button/Button";
import moment from "moment";
import { Helmet } from "react-helmet";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import NativeSelect from "@material-ui/core/NativeSelect";
// date selector
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import "react-day-picker/lib/style.css";
import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../Actions";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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
    minWidth: "80% !important"
  },
  dateSelectField: {
    width: "100%"
  }
};

class BookingBox extends React.Component {
  initialFields = () => {
    return {
      arrive: new Date(),
      depart: moment(new Date())
        .add(1, "day")
        .toDate(),
      numOfRooms: "1",
      numOfAdults: "2",
      numOfChildren: "0",
      snackbar: {
        open: false
      }
    };
  };

  state = this.initialFields();

  checkAvailability = () => {
    const { dispatch } = this.props;
    if (this.validateFields()) {
      dispatch(actions.changeFields(this.state));
      this.props.history.push("/search");
    }
  };

  onCloseSnackBar = () => {
    const defaultTime = this.initialFields();
    this.setState(
      {
        arrive: defaultTime.arrive,
        depart: defaultTime.depart,
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
    const { arrive, depart } = this.state;
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
    if (moment(depart).diff(moment(arrive), "month") > 2) {
      return this.showSnackBar("Can not stay more than 2 months!");
    }
    return true;
  };

  // TODO map props to state
  onSelectChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  showFromFieldMonth = () => {
    const { arrive, depart } = this.state;
    if (!arrive) {
      return;
    }
    if (moment(depart).diff(moment(arrive), "months") < 2) {
      this.toField.getDayPicker().showMonth(arrive);
    }
  };

  onArriveFieldChange = arrive => {
    this.setState({ arrive });
  };

  onDepartFieldChange = depart => {
    this.setState({ depart }, () => {
      this.showFromFieldMonth();
    });
  };

  render() {
    const { classes } = this.props;
    const {
      arrive,
      depart,
      numOfRooms,
      numOfAdults,
      numOfChildren,
      snackbar
    } = this.state;
    const modifiers = {
      start: arrive,
      end: depart
    };

    return (
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
                        disabledDays: { after: depart },
                        toMonth: depart,
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
            {/*num rooms*/}
            <Grid item xs={12} sm={4} md={2}>
              <Grid
                container
                spacing={8}
                justify={"center"}
                alignItems={"center"}
              >
                <Grid item xs={5} sm={12}>
                  Rooms
                </Grid>
                <Grid item xs={7} sm={12} className={classes.textBold}>
                  <FormControl className={classes.formControl}>
                    <NativeSelect
                      value={numOfRooms}
                      onChange={this.onSelectChange("numOfRooms")}
                      input={<Input name="numOfRooms" id="numOfRooms" />}
                    >
                      <option value={"1"}>1</option>
                      <option value={"2"}>2</option>
                      <option value={"3"}>3</option>
                      <option value={"4+"}>4+</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/*num adults*/}
            <Grid item xs={12} sm={4} md={2}>
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
                    <NativeSelect
                      value={numOfAdults}
                      onChange={this.onSelectChange("numOfAdults")}
                      input={<Input name="numOfAdults" id="numOfAdults" />}
                    >
                      <option value={"0"}>None</option>
                      <option value={"1"}>1</option>
                      <option value={"2"}>2</option>
                      <option value={"2+"}>2+</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/*num children*/}
            <Grid item xs={12} sm={4} md={2}>
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
                    <NativeSelect
                      value={numOfChildren}
                      input={<Input name="numOfChildren" id="numOfChildren" />}
                      onChange={this.onSelectChange("numOfChildren")}
                    >
                      <option value={"0"}>None</option>
                      <option value={"1"}>1</option>
                      <option value={"2"}>2</option>
                      <option value={"2+"}>2+</option>
                    </NativeSelect>
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
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
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
    );
  }
}

export default connect(({ bookingFields }) => ({ bookingFields }))(
  withStyles(styles)(withRouter(BookingBox))
);
