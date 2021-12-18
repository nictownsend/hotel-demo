import React from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { Grid } from "@mui/material";
import { NavBar } from "../navbar";
import { Box } from "@mui/system";
const Header = (props) => (
  <Box sx={{ backgroundColor: "primary.main" }}>
    <Grid container sx={{ alignItems: "center" }}>
      <Grid item lg={2} />
      <Grid item sx={{ display: { xs: "none", sm: "block" } }} sm={4} lg={2}>
        <Logo style={{ fill: "white", height: "7em" }} />
      </Grid>
      <Grid item xs={12} sm={8} lg={4}>
        <NavBar />
      </Grid>
    </Grid>
  </Box>
);

export { Header };
