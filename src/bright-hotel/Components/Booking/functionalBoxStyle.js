import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";

const functionalBoxStyle = theme => ({
  ...productStyle,
  bookingBox: {
    background: "linear-gradient(to bottom right, rgb(164, 214, 247), #fccafd)",
    boxShadow: "rgba(0,0,0,0.45) 0px 5px 30px 0px"
  },
  textBold: {
    fontWeight: "bold"
  },
  formControl: {
    minWidth: [["100%"], "!important"]
  },
  dateSelectField: {
    width: "100%",
    fontSize: "0.75em"
  },
  textMedium: {
    fontSize: [["20px"], "!important"]
  },
  radio: {
    padding: "0 5px"
  },
  radioWrapper: {
    margin: "4px 5px",
    [theme.breakpoints.down("sm")]: {
      width: 250
    }
  }
});

export default functionalBoxStyle;
