import React from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { Grid } from "@mui/material";
import { NavBar } from "../navbar";
const Header = (props) => (
  <Grid className="header" container>
    <Grid item sx={{ display: { xs: "none", sm: "block" } }}>
      <Logo style={{ fill: "white", height: "7rem" }} />]
    </Grid>
    <Grid item xs={12}>
      <NavBar />
    </Grid>
  </Grid>
);

export { Header };
