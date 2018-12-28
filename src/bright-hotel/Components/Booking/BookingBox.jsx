import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/es/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Zoom from "@material-ui/core/Zoom";
import moment from "moment";
import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import actions from "../../Actions/actions";
import { getBookingFields } from "../../Reducers/selectors";
import { scrollTo } from "../../Utils/utils";
import functionalBoxStyle from "./functionalBoxStyle";

const styles = functionalBoxStyle;

class BookingBox extends React.Component {
  initialFields = () => ({
    ...this.props.bookingFields,
    snackBar: {
      open: false
    }
  });

  state = this.initialFields();

  handleCheckAvailability = () => {
    const { changeFieldsIfNeeded, checkAvailability } = this.props;
    if (this.validateFields()) {
      changeFieldsIfNeeded(this.state.fields);
      checkAvailability().then(res => {
        scrollTo("box");
        return res;
      });
    }
  };

  resetFieldValue = field => {
    const defaultFields = this.initialFields();
    const { fields } = this.state;
    this.setState({
      fields: {
        ...fields,
        [field]: defaultFields.fields[field]
      }
    });
  };

  validateFields = () => {
    const { arrive, depart } = this.state.fields;
    const { showSnackBar } = this.props;
    if (!(arrive instanceof Date)) {
      showSnackBar("Check-in field is not valid!", () => {
        this.resetFieldValue("arrive");
        this.fromField.getInput().focus();
      });
      return false;
    }
    if (!(depart instanceof Date)) {
      showSnackBar("Check-out field is not valid!", () => {
        this.resetFieldValue("depart");
        this.toField.getInput().focus();
      });
      return false;
    }
    if (moment(depart).isBefore(moment(arrive))) {
      showSnackBar("Can not check-out before check-in!", () => {
        this.resetFieldValue("arrive");
        this.resetFieldValue("depart");
      });
      return false;
    }
    if (moment(depart).diff(moment(arrive), "month") >= 2) {
      showSnackBar("Can not stay more than 2 months!");
      return false;
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

  onDateFieldChange = name => date => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: date
      }
    });
  };

  render() {
    const { classes } = this.props;
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
              container
              style={{ padding: "1rem" }}
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
                        onDayChange={this.onDateFieldChange("arrive")}
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
                        onDayChange={this.onDateFieldChange("depart")}
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
              <Grid item xs={12} sm={12} md={3}>
                <Grid container direction={"column"} alignItems={"center"}>
                  <Grid item>
                    <FormControl className={classes.formControl}>
                      <Button
                        variant={"extendedFab"}
                        color={"secondary"}
                        onClick={this.handleCheckAvailability}
                      >
                        Check availability
                      </Button>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Helmet>
              <style>
                {`
      .DayPickerInput-Overlay {
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
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
      </Zoom>
    );
  }
}

export default connect(
  state => ({
    bookingFields: getBookingFields(state)
  }),
  dispatch => {
    return {
      changeFieldsIfNeeded: fields =>
        dispatch(actions.bookingFields.changeFieldsIfNeeded(fields)),
      checkAvailability: () =>
        dispatch(actions.server.makeCheckForRoomsAvailability()).then(res => {
          dispatch(actions.ui.toggleBookingBox());
          return res;
        }),
      showSnackBar: (message, onClose) =>
        dispatch(actions.ui.showSnackBar(message, onClose))
    };
  }
)(withStyles(styles)(withRouter(BookingBox)));
