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
import {
  calculateMoney,
  getCart,
  makeGetCustomerInfo
} from "../Reducers/selectors";
import { formatMoney } from "../Utils/utils";
import CheckoutItem from "./Booking/CheckoutItem";
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
  title: {
    fontWeight: "400",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px"
    }
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
  },
  cartItem: {
    [theme.breakpoints.up("xs")]: {
      padding: "1rem",
      boxShadow: "rgba(0,0,0,0.45) 0px 5px 15px 0px"
    }
  },
  cartItems: {
    maxHeight: "40vh",
    overflow: "auto"
  }
});

class CheckoutForm extends React.Component {
  getMyInfo = () => {
    this.props.dispatch(
      actions.server.getCustomerInfo(this.props.customerInfo.phoneNumber)
    );
  };

  handleDateChange = date => {
    this.props.dispatch(actions.bookingFields.changeCustomerField("dob", date));
  };

  handleFieldChange = name => event => {
    this.props.dispatch(
      actions.bookingFields.changeCustomerField(name, event.target.value)
    );
  };

  closeDialog = () => {
    this.props.dispatch(
      actions.bookingFields.changeCustomerInfoIfNeeded(this.state)
    );
    this.props.dispatch(actions.ui.toggleCheckoutForm());
  };

  checkOut = () => {
    console.log(this.props.customerInfo);
  };

  render() {
    const { cart, dialogOpen, classes, totalMoney, customerInfo } = this.props;
    const {
      dob = new Date(),
      gender = "M",
      name = "",
      address = "",
      phoneNumber = "",
      email = "",
      idCard = ""
    } = customerInfo;
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
              <Grid container alignItems="center">
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
                </Grid>
              </Grid>
            </Grid>
            {/* gender */}
            <Grid item xs={12} sm={6}>
              <Grid container alignItems="center">
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
            {/* phone */}
            <Grid item xs={12} sm={6}>
              <Grid container alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    required
                    id="phoneNumber"
                    value={phoneNumber}
                    label="Phone number"
                    className={classes.formControl}
                    margin="normal"
                    onChange={this.handleFieldChange("phoneNumber")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    color={"primary"}
                    onClick={this.getMyInfo}
                    variant={"raised"}
                    size={"small"}
                  >
                    Get my info
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
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
                id="address"
                required
                value={address}
                label="Address"
                className={classes.formControl}
                margin="normal"
                onChange={this.handleFieldChange("address")}
              />
            </Grid>
            {/* email */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
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
                id="idCard"
                required
                value={idCard}
                label="ID Card"
                className={classes.formControl}
                onChange={this.handleFieldChange("idCard")}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container alignItems={"flex-start"} spacing={16}>
            {/* rooms */}
            <Grid item xs={12} sm={6}>
              <h2 align="center">Rooms</h2>
              <div className={classes.cartItems}>
                {cart.items.rooms.map((room, key) => (
                  <div
                    style={{
                      backgroundColor: (key % 2 && "#ccf2ff") || "#eaeae1"
                    }}
                    className={classes.cartItem}
                    key={key}
                  >
                    <CheckoutItem type="rooms" id={room.id} />
                  </div>
                ))}
              </div>
            </Grid>
            {/* services */}
            <Grid item xs={12} sm={6}>
              <h2 align="center">Services</h2>
              <div className={classes.cartItems}>
                {cart.items.services.map((service, key) => (
                  <div
                    style={{
                      backgroundColor: (key % 2 && "#eaeae1") || "#ccf2ff"
                    }}
                    className={classes.cartItem}
                    key={key}
                  >
                    <CheckoutItem type="services" id={service.id} />
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <h3 className={classes.title}>
            Total money: {formatMoney(totalMoney)}
          </h3>
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

export default connect(() => {
  const getTotalMoney = calculateMoney();
  const getCustomerInfo = makeGetCustomerInfo();
  return (state, props) => ({
    cart: getCart(state),
    dialogOpen: state.uiState.checkoutForm,
    totalMoney: getTotalMoney(state, props),
    customerInfo: getCustomerInfo(state)
  });
})(withStyles(styles)(CheckoutForm));
