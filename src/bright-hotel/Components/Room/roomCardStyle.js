import { FaceRounded } from "@material-ui/icons";
import React from "react";

const styles = theme => ({
  media: {
    objectFit: "cover",
    width: "100%",
    height: "100%"
  },
  imgWrapper: {
    [theme.breakpoints.down("sm")]: {
      height: "40vh"
    },
    [theme.breakpoints.up("sm")]: {
      height: "60vh"
    },
    [theme.breakpoints.up("md")]: {
      height: "85vh"
    },
    cursor: "pointer",
    "&:hover": {
      opacity: "0.7"
    }
  },
  container: {
    height: "100%",
    backgroundColor: "#ffffff",
    margin: "1.75rem 0",
    boxShadow: "rgba(0,0,0,0.3) 0px 0px 30px 0px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      margin: "0.5rem 0"
    }
  },
  inner: {
    padding: 0,
    display: "table-cell",
    verticalAlign: "middle",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#ffffff",
    boxShadow: "rgba(0,0,0,0.3) 0px 0px 30px 0px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  },
  roomName: {
    fontWeight: "350",
    fontSize: "30px"
  },
  marginVertical: {
    [theme.breakpoints.down("sm")]: {
      margin: "5px 0"
    },
    [theme.breakpoints.up("sm")]: {
      margin: "10px 0"
    },
    lineHeight: "1.6"
  },
  marginHorizontal: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 5px"
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 10px"
    },
    lineHeight: "1.6"
  },
  textBox: {
    padding: "1rem 2em"
  },
  roomDescription: {
    whiteSpace: "no-wrap",
    overflow: "hidden"
  },
  attribute: {
    lineHeight: "1.6",
    fontWeight: "400",
    fontSize: "18px",
    textOverflow: "ellipsis",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  attributeNoHidden: {
    lineHeight: "1.6",
    fontWeight: "400",
    fontSize: "18px",
    textOverflow: "ellipsis"
  },
  description: {
    color: "#817a6b",
    "&:before": {
      content: '" "'
    }
  },
  letterSpacing: {
    letterSpacing: "3px"
  },
  money: {
    fontWeight: "400",
    fontSize: "26px"
  }
});

export const renderCapacityIcon = maxCapacity => {
  let icons = [];
  for (let i = 0; i < maxCapacity; i++) {
    icons.push(<FaceRounded key={i} />);
  }
  return icons;
};

export default styles;
