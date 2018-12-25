import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import { Check } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { makeGetServiceType } from "../../Reducers/selectors";
import { formatMoney, randomImage } from "../../Utils/utils";
import { Button, MenuItem, Paper, Grow } from "@material-ui/core/es";
import actions from "../../Actions/actions";
import { Menu, Popper, ClickAwayListener, MenuList } from "@material-ui/core";

const styles = {
  media: {
    objectFit: "cover",
    width: "100%",
    height: "100%"
  },
  imgWrapper: {
    padding: "0.2rem",
    boxShadow: "rgba(0,0,0,0.5) 0px 5px 20px 0px",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.7"
    }
  },
  content: {
    padding: "1rem"
  },
  container: {
    margin: "1.5rem 0"
  },
  title: {
    fontWeight: "400",
    fontSize: "20px"
  },
  icon: {
    padding: "1rem"
  }
};

class FeaturedServiceCard extends React.Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  handleClicked = id => event => {
    this.handleClose(event);
    this.props.addServiceToCart(id);
  };

  render() {
    const { serviceType, direction, image, classes } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.container}>
        <Grid container direction={direction} spacing={16}>
          <Grid item xs={12} md={8}>
            <div className={classes.imgWrapper}>
              <img
                alt={serviceType.name}
                className={classes.media}
                src={image}
                // src={roomType.image}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.content}>
              <Grid container justify={"center"}>
                {serviceType.services.map((service, key) => (
                  <Grid item key={key} xs={12}>
                    <Grid container spacing={16} direction={"row"}>
                      <Grid item xs={4}>
                        <div align="center">
                          <Check color={"error"} />
                        </div>
                      </Grid>
                      <Grid item xs={8}>
                        <div className={classes.title}>{service.name}</div>
                        <h5>{formatMoney(service.price)}</h5>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <div align="center">
                <Button
                  variant={"extendedFab"}
                  color={"primary"}
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                  aria-owns={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleToggle}
                >
                  Add to cart
                </Button>
                <Popper
                  open={open}
                  anchorEl={this.anchorEl}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-list-grow"
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom"
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                          <MenuList>
                            {serviceType.services.map((service, key) => (
                              <MenuItem
                                key={key}
                                onClick={this.handleClicked(service.id)}
                              >
                                {service.name}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  () => {
    const getService = makeGetServiceType();
    return (state, props) => {
      return {
        serviceType: getService(state, props)
      };
    };
  },
  dispatch => ({
    addServiceToCart: serviceId =>
      dispatch(actions.cart.makeAddServiceToCart(serviceId))
  })
)(withStyles(styles)(FeaturedServiceCard));
