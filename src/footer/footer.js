import { Typography, Link, Stack } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
const Footer = (props) => (
  <Stack alignItems="center" spacing={1}>
    <Typography variant="caption">Copyright 2021 Townsend Hotels</Typography>
    <Typography variant="caption">
      <Link component={RouterLink} to="/contact">
        Contact Us
      </Link>
    </Typography>
  </Stack>
);

export { Footer };
