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

const styles = {
  ...productStyle,
  bookingBox: {
    color: "#3C4858",
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
  state = {
    from: new Date(),
    to: moment(new Date()).add(1, "day").toDate(),
    numOfAdults: "2",
    numOfChildren: "0"
  };

  checkAvailability = () => {
    const dateFormat = "YYYY-MM-DD";
    console.log(moment(this.state.from).format(dateFormat));
    console.log(moment(this.state.to).format(dateFormat));
    console.log(this.state.numOfAdults);
    console.log(this.state.numOfChildren);
  };

  handleSelectChange = name => event => {
    console.log(event.target.value);
    this.setState({
      [name]: event.target.value
    });
  };

  showFromMonth = () => {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), "months") < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  };

  handleFromChange = (from) => {
    let formatted = moment(from).format("YYYY-MM-DD");
    console.log("Moment format FROM: " + formatted);
    this.setState({ from });
  };

  handleToChange = (to) => {
    let formatted = moment(to).format("YYYY-MM-DD");
    console.log("Moment format TO: " + formatted);
    this.setState({ to }, this.showFromMonth);
  };


  render() {

    const { classes } = this.props;
    const { from, to, numOfAdults, numOfChildren } = this.state;
    const modifiers = { start: from, end: to };

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
            <Grid item xs={12} sm={6} md={3}>
              <Grid container spacing={8} justify={"center"} alignContent={"center"} alignItems={"center"}>
                <Grid item xs={5} sm={12}>Check-in</Grid>
                <Grid item xs={7} sm={12} className={classes.textBold}>
                  <FormControl className={classes.formControl}>
                    <DayPickerInput
                      value={from}
                      placeholder="From"
                      format="LL"
                      formatDate={formatDate}
                      parseDate={parseDate}
                      inputProps={{
                        className: classes.dateSelectField
                      }}
                      dayPickerProps={{
                        selectedDays: [from, { from, to }],
                        disabledDays: { after: to },
                        toMonth: to,
                        modifiers,
                        onDayClick: () => this.to.getInput().focus()
                      }}
                      onDayChange={this.handleFromChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/*depart*/}
            <Grid item xs={12} sm={6} md={3}>
              <Grid container spacing={8} justify={"center"} alignContent={"center"} alignItems={"center"}>
                <Grid item xs={5} sm={12}>Check-out</Grid>
                <Grid item xs={7} sm={12} className={classes.textBold}>
                  <FormControl className={classes.formControl}>
                    <DayPickerInput
                      ref={el => (this.to = el)}
                      value={to}
                      placeholder="To"
                      format="LL"
                      formatDate={formatDate}
                      parseDate={parseDate}
                      inputProps={{
                        className: classes.dateSelectField
                      }}
                      dayPickerProps={{
                        selectedDays: [from, { from, to }],
                        disabledDays: { before: from },
                        modifiers,
                        month: from,
                        fromMonth: from
                      }}
                      onDayChange={this.handleToChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/*num adults*/}
            <Grid item xs={12} sm={6} md={2}>
              <Grid container spacing={8} justify={"center"} alignItems={"center"}>
                <Grid item xs={5} sm={12}>Adults</Grid>
                <Grid item xs={7} sm={12} className={classes.textBold}>
                  <FormControl className={classes.formControl}>
                    <NativeSelect
                      value={numOfAdults}
                      onChange={this.handleSelectChange("numOfAdults")}
                      input={<Input name="numOfAdults" id="age-native-helper"/>}
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
            <Grid item xs={12} sm={6} md={2}>
              <Grid container spacing={8} justify={"center"} alignItems={"center"}>
                <Grid item xs={5} sm={12}>Children</Grid>
                <Grid item xs={7} sm={12} className={classes.textBold}>
                  <FormControl className={classes.formControl}>
                    <NativeSelect
                      value={numOfChildren}
                      input={<Input name="numOfChildren" id="numOfChildren"/>}
                      onChange={this.handleSelectChange("numOfChildren")}
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
            <Grid item xs={12} sm={6} md={2}>
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

          <Helmet>
            <style>{`
            @media screen and (max-width: 600px) {
              .DayPickerInput-Overlay {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
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
  };
}

export default withStyles(styles)(BookingBox);