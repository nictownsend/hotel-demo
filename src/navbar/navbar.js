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
  { title: "About Us", path: "/about" },
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
    <AppBar position="static" variant="dense">
      <Toolbar sx={{ justifyContent: "space-around" }}>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {pages.map((page, index) => (
            <Button onClick={navigateHandler(page)} color="inherit" key={index}>
              {page.title}
            </Button>
          ))}
        </Box>
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            ref={anchorEl}
            onClick={toggleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Stack sx={{ flexGrow: 1, alignItems: "center" }}>
            <Typography variant="subtitle1">Townsend Hotels</Typography>
            <Typography variant="caption">
              When you stay with us, you're family
            </Typography>
          </Stack>
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
      </Toolbar>
    </AppBar>
  );
};

export { NavBar };
