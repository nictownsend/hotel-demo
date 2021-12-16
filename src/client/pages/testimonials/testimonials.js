import { Card, CardContent, Grid } from "@mui/material";
import React from "react";

const Testimonials = (props) => (
  <Grid container>
    <Grid item>
      <Card>
        <CardContent>Bruno, 9, Southampton, 'Meow'</CardContent>
      </Card>
    </Grid>

    <Grid item>
      <Card>
        <CardContent>Millie, 4 months, Hampshire, 'A-bu-bu-bu!'</CardContent>
      </Card>
    </Grid>

    <Grid item>
      <Card>
        <CardContent>
          Squirrel, 2, Backyard, 'Tasy lead, 11/10 would eat again'
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export { Testimonials };
