import { Grid } from "@material-ui/core";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  withStyles
} from "@material-ui/core/es";
import React from "react";
import DatePicker from "react-date-picker";
import { connect } from "react-redux";
import actions from "../Actions/actions";
import { getCart } from "../Reducers/selectors";
import "./react-date-picker.css";

const styles = theme => ({
  container: {
    padding: "5vh 5vw"
  },
  formControl: {
    width: "90%",
    padding: 0,
    margin: 0
  },
  radio: {
    padding: "0 5px 0 0"
  },
  radioWrapper: {
    margin: "0 10px 0 0"
  },
  content: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "5vw",
      paddingRight: "5vw"
    }
  }
});

class CheckoutForm extends React.Component {
  getCustomerInfo = () => {
    return (
      this.props.customerInfo || {
        dob: new Date(),
        gender: "male"
      }
    );
  };

  state = this.getCustomerInfo();

  handleDateChange = date => {
    this.setState({ dob: date });
  };

  handleFieldChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  closeDialog = () => {
    this.props.dispatch(
      actions.bookingFields.changeCustomerInfoIfNeeded(this.state)
    );
    this.props.dispatch(actions.ui.toggleCheckoutForm());
  };

  checkOut = () => {
    console.log(this.state);
  };

  render() {
    const { cart, dialogOpen, classes } = this.props;
    const { dob, gender, name, address, phone, email, idCard } = this.state;
    return (
      <Dialog
        className={classes.container}
        fullScreen={true}
        fullWidth
        maxWidth={"md"}
        open={dialogOpen}
        onClose={this.closeDialog}
      >
        <h2 className={classes.title} align="center">
          Your information
        </h2>
        <DialogContent
          className={classes.content}
          style={{ paddingTop: "5vh" }}
        >
          <Grid container alignItems="center" spacing={16}>
            {/* dob */}
            <Grid item xs={12} sm={6}>
              <Grid container alignItems="center" spacing={16}>
                <Grid item xs={4}>
                  <span style={{ fontWeight: "400", color: "#817a6b" }}>
                    Day of birth *
                  </span>
                </Grid>
                <Grid item xs={8}>
                  {/* <Fit> */}
                  <DatePicker
                    style={{
                      margin: 0,
                      padding: 0,
                      position: "relative"
                    }}
                    onChange={this.handleDateChange}
                    value={dob}
                  />
                  {/* </Fit> */}
                </Grid>
              </Grid>
            </Grid>
            {/* gender */}
            <Grid item xs={12} sm={6}>
              <Grid container alignItems="center" spacing={16}>
                <Grid item xs={4}>
                  <span style={{ fontWeight: "400", color: "#817a6b" }}>
                    Gender *
                  </span>
                </Grid>
                <Grid item xs={8}>
                  <RadioGroup
                    row
                    style={{
                      padding: 0,
                      margin: 0
                    }}
                    onChange={this.handleFieldChange("gender")}
                    value={gender}
                  >
                    <FormControlLabel
                      className={classes.radioWrapper}
                      label={"Male"}
                      control={<Radio className={classes.radio} />}
                      value={"M"}
                    />
                    <FormControlLabel
                      className={classes.radioWrapper}
                      label={"Female"}
                      control={<Radio className={classes.radio} />}
                      value={"F"}
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>
            {/* name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="standard-required"
                label="Name"
                value={name}
                className={classes.formControl}
                margin="normal"
                onChange={this.handleFieldChange("name")}
              />
            </Grid>
            {/* address */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                value={address}
                label="Address"
                className={classes.formControl}
                margin="normal"
                onChange={this.handleFieldChange("address")}
              />
            </Grid>
            {/* phone */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                value={phone}
                label="Phone number"
                className={classes.formControl}
                margin="normal"
                onChange={this.handleFieldChange("phone")}
              />
            </Grid>
            {/* email */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                value={email}
                label="Email"
                className={classes.formControl}
                margin="normal"
                onChange={this.handleFieldChange("email")}
              />
            </Grid>
            {/* ID card */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                value={idCard}
                label="ID Card"
                className={classes.formControl}
                onChange={this.handleFieldChange("idCard")}
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            variant={"contained"}
            color="secondary"
            onClick={this.checkOut}
          >
            Checkout
          </Button>
          <Button size="large" onClick={this.closeDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(state => ({
  cart: getCart(state),
  dialogOpen: state.uiState.checkoutForm,
  customerInfo: state.bookingFields.customerInfo
}))(withStyles(styles)(CheckoutForm));
