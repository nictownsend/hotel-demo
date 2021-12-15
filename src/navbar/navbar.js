import React from "react";
import { Button, AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
const NavBar = () => (
  <AppBar position="static">
    <Toolbar sx={{ justifyContent: "space-around" }}>
      <Button component={Link} to="/" color="inherit">
        Home
      </Button>
      <Button component={Link} to="/book" color="inherit">
        Book Now
      </Button>
      <Button component={Link} to="/about" color="inherit">
        About Us
      </Button>
      <Button component={Link} to="/rooms" color="inherit">
        Our Rooms
      </Button>
      <Button component={Link} to="/xmas-2021" color="inherit">
        Christmas 2021
      </Button>
      <Button component={Link} to="/testimonials" color="inherit">
        Testimonials
      </Button>
    </Toolbar>
  </AppBar>
);

export { NavBar };
