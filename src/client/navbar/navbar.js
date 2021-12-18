import React, { useState, useRef } from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
const pages = [
  { title: "Home", path: "/" },
  { title: "Book Now", path: "/book" },
  { title: "Meet the Team", path: "/about" },
  { title: "Our Rooms", path: "/rooms" },
  { title: "Christmas 2021", path: "/xmas-2021" },
  { title: "Testimonials", path: "/testimonials" },
];

const NavBar = () => {
  const [menuOpen, setMenu] = useState(false);
  const anchorEl = useRef();
  const toggleMenu = () => setMenu((state) => !state);
  const navigate = useNavigate();
  const navigateHandler = (page, fromMenu) => () => {
    navigate(page.path);
    fromMenu && toggleMenu();
  };
  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          size="large"
          ref={anchorEl}
          onClick={toggleMenu}
          sx={{ color: "white" }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          color="inherit"
          keepMounted
          open={menuOpen}
          anchorEl={anchorEl.current}
          onClose={toggleMenu}
        >
          {pages.map((page, index) => (
            <MenuItem key={index} onClick={navigateHandler(page, true)}>
              <Typography component={Typography} to={page.path} key={index}>
                {page.title}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Stack
        sx={{
          display: { xs: "none", sm: "flex" },
          backgroundColor: "primary.main",
          alignItems: "center",
        }}
        direction="row"
      >
        {pages.map((page, index) => (
          <Button
            onClick={navigateHandler(page)}
            sx={{ color: "white" }}
            key={index}
          >
            {page.title}
          </Button>
        ))}
      </Stack>
    </>
  );
};

export { NavBar };
