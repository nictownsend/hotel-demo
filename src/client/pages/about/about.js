import { Typography, Grid } from "@mui/material";
import React from "react";

const About = (props) => (
  <Grid container spacing={1}>
    <Grid item xs={12} sm={6}>
      <Typography variant="h6">Nic</Typography>
      <Typography>
        Sarcastic, statirical and sweaty, Nic's histroy in the software industry
        means he is absolutely uselss at cleaning toilets but can turn any plug
        on and off again.
      </Typography>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="h6">Katy</Typography>
      <Typography>
        Sarcastic, statirical and sweaty, Nic's histroy in the software industry
        means he is absolutely uselss at cleaning toilets but can turn any plug
        on and off again.
      </Typography>
    </Grid>
  </Grid>
);

export { About };
