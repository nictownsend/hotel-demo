import React from "react";
import { Grid, Typography } from "@mui/material";

const Xmas = () => (
  <Typography variant="body1" className={"menu"}>
    <Grid sx={{ alignItems: "flex-start" }} spacing={5} container>
      <Grid item xs={12}>
        <p>
          This year, all food and drink is included as part of any bookings over
          the Christmas period.
        </p>
        <p> Eat, drink, and be merry!</p>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="h5">Xmas Eve</Typography>
        <Typography variant="h6">Drinks</Typography>
        <Typography variant="caption">
          Mulled Cider
          <br />
          Mulled Wine
        </Typography>
        <Typography variant="h6">Main</Typography>
        <Typography variant="caption">
          Soup of the Day
          <br />
          Rolls of Bread
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="h5">Xmas Day</Typography>
        <Typography variant="h6">Breakfast</Typography>
        <Typography variant="caption">
          Smoked salmon bagels
          <br />
          Buck's Fizz
          <br />
          Fresh Frosties
        </Typography>
        <Typography variant="h6">Main</Typography>
        <Typography variant="caption">
          Turkey crown
          <br />
          Topside of Beef
          <br />
          Honey glazed Gammon
          <br />
          All the trimmings!
          <br />
        </Typography>
        <Typography variant="h6">Dessert</Typography>
        <Typography variant="caption">
          Xmas pudding
          <br />
          Yule log
          <br />
        </Typography>
        <Typography variant="h6">Drinks</Typography>
        <Typography variant="caption">
          Your choice from the cocktail bar
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="h5">Boxing Day</Typography>
        <Typography variant="caption">
          Nibbles to be provided by guests
          <br />
          Cold cuts
          <br />
          Leftover trimmings
        </Typography>
      </Grid>
    </Grid>
  </Typography>
);

export { Xmas };
