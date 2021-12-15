import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, About, Booking, Rooms, Xmas, Testimonials } from "../pages";
const Content = (props) => (
  <div className="content">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/book" element={<Booking />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/xmas-2021" element={<Xmas />} />
      <Route path="/testimonials" element={<Testimonials />} />
    </Routes>
  </div>
);
export { Content };
