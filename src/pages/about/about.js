import { Typography, Grid, Stack } from "@mui/material";
import React from "react";

const About = (props) => (
  <Grid container spacing={10}>
    <Grid item xs={12} sm={6}>
      <Stack spacing={2}>
        <Typography variant="h6">Nic</Typography>
        <Typography>
          Sarcastic, statirical and sweaty, Nic's history in the software
          industry means he is absolutely uselss at cleaning toilets but can
          turn any plug on and off again.
        </Typography>
        <Typography variant="subtitle1">Responsibilities include:</Typography>
        <Typography>
          <ui>
            <li>Cook</li>
            <li>Valet</li>
            <li>Bell boy (and end)</li>
          </ui>
        </Typography>
      </Stack>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Stack spacing={2}>
        <Typography variant="h6">Katy</Typography>
        <Typography>
          Eloquent, enunciating and excentric, Katy always brings a unique
          energy to any occasion. Her recent time away from the workplace has
          given her time to brush up on essential research using educational
          resources such as "Four in a Bed" and "Come Dine With Me".
        </Typography>
        <Typography variant="subtitle1">Responsibilities include:</Typography>
        <Typography>
          <ui>
            <li>Custodial</li>
            <li>Pillow plumper</li>
            <li>Quality control</li>
          </ui>
        </Typography>
      </Stack>
    </Grid>
  </Grid>
);

export { About };
