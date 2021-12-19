import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Home,
  About,
  Booking,
  Rooms,
  Xmas,
  Testimonials,
  BookingForm,
  Contact,
} from "../pages";
const Content = (props) => (
  <Box sx={{ padding: "2rem" }}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/book" element={<Booking />} />
      <Route path="/booking-form" element={<BookingForm />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/xmas-2021" element={<Xmas />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </Box>
);
export { Content };
