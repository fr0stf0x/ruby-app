import React from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Parallax from "../../components/Parallax/Parallax";
import withStyles from "@material-ui/core/es/styles/withStyles";

import { container, title } from "../../assets/jss/material-kit-react.jsx";

export const navHeaderStyles = {
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
    letterSpacing: "3px"
  },
  container: {
    ...container,
    zIndex: "12"
  }
};

const NavHeader = props => {
  const { classes, title, image, subtitle, content } = props;
  return (
    <Parallax filter image={image}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <h1 id="page-title" className={classes.title}>
              {title}
            </h1>
            <h3 style={{ color: "white" }}>{subtitle}</h3>
            {content}
          </GridItem>
        </GridContainer>
      </div>
    </Parallax>
  );
};

export default withStyles(navHeaderStyles)(NavHeader);
