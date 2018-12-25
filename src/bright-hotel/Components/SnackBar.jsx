import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import actions from "../Actions/actions";
import { Fade } from "@material-ui/core/es";

class SnackBar extends React.Component {
  closeSnackBar = () => {
    const { snackBar, dispatch } = this.props;
    snackBar.onClose && snackBar.onClose();
    dispatch(actions.ui.hideSnackBar());
  };

  render() {
    const { snackBar } = this.props;
    return (
      <div>
        <Snackbar
          TransitionComponent={Fade}
          open={snackBar.open}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          onClose={this.closeSnackBar}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{snackBar.message}</span>}
          action={[
            snackBar.onClose && (
              <Button
                key="undo"
                color="secondary"
                size="small"
                onClick={this.closeSnackBar}
              >
                UNDO
              </Button>
            ),
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.closeSnackBar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}
export default connect(state => ({
  snackBar: state.uiState.snackBar
}))(SnackBar);
