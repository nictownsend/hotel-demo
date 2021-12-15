import React from "react";
import Logo from "../images/logo.png";
import { Grid } from "@mui/material";
const Header = (props) => (
  <Grid className="header" container>
    <Grid item xs="2" />
    <Grid item xs="8" container justifyContent="center">
      <img alt="logo" src={Logo} />
    </Grid>
    <Grid item xs="2" />
  </Grid>
);

export { Header };
