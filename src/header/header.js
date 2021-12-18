import React from "react";
import { ReactComponent as Logo } from "../images/logo-sm.svg";
import { Grid } from "@mui/material";
import { NavBar } from "../navbar";
import { Box } from "@mui/system";
const Header = () => (
  <Grid
    container
    sx={{
      backgroundColor: "primary.main",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Grid item lg={2} />
    <Grid item xs={2.5} lg={2.5}>
      <Logo style={{ fill: "white", height: "3rem" }} />
    </Grid>
    <Grid item xs={9.5} lg={6.5}>
      <NavBar />
    </Grid>
    <Grid item lg={2} />
  </Grid>
);

export { Header };
