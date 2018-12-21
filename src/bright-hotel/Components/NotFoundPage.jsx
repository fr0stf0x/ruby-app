import React from "react";
import NavBar from "../Layouts/NavBar";
import NavHeader from "../Layouts/NavHeader";
import withStyles from "@material-ui/core/es/styles/withStyles";
import landingPageStyle from "../../assets/jss/material-kit-react/views/landingPage";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const NotFoundPage = props => (
  <div>
    <NavBar />
    <NavHeader
      image={require("assets/img/bright-hotel/bg_005.jpg")}
      title={"Page Not Found"}
      content={
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/"
        >
          Go back
        </Button>
      }
    />
    <Footer />
  </div>
);

export default withStyles(landingPageStyle)(NotFoundPage);
