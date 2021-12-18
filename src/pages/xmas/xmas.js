import React from "react";
import { Stack, Typography } from "@mui/material";

const Xmas = (props) => (
  <Typography variant="body1">
    <Stack sx={{ alignItems: "center" }} spacing={2}>
      <p>
        This year, all food and drink is included as part of any bookings over
        the Christmas period.
      </p>
      <p> Eat, drink, and be merry!</p>
      <Typography variant="h5">Xmas Eve</Typography>
      <Typography variant="h6">Drinks</Typography>
      <Typography variant="h6">Main</Typography>
      <Typography variant="subtitle1">~ ~ ~</Typography>
      <Typography variant="h5">Xmas Day</Typography>
      <Typography variant="h6">Starter</Typography>
      <Typography variant="h6">Main</Typography>
      <Typography variant="h6">Dessert</Typography>
      <Typography variant="h6">Drinks</Typography>
      <Typography variant="subtitle1">~ ~ ~</Typography>
      <Typography variant="h5">Boxing Day</Typography>
      <Typography variant="h6">Drinks</Typography>
      <Typography variant="h6">Nibbles</Typography>
    </Stack>
  </Typography>
);

export { Xmas };
