import React from "react";
import { Typography, Grid } from "@mui/material";

const Hero = () => (
  <Grid container sx={{ backgroundColor: "secondary.main", padding: "2rem" }}>
    <Grid item lg={3} />
    <Grid item>
      <Typography variant="h3" mb={2}>
        Welcome to Townsend Hotels
      </Typography>
      <Typography variant="h6">When you stay with us, you're family</Typography>
    </Grid>
  </Grid>
);

export { Hero };
