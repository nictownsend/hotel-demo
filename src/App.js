import { Grid } from "@mui/material";
import { NavBar } from "./navbar";
import { Content } from "./content";
import { Header } from "./header";
import { Footer } from "./footer";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import "./App.scss";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { LiveChat } from "./live-chat";
import { enLocale } from "moment/locale/en-gb";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale={enLocale}>
      <BrowserRouter>
        <Grid container>
          <Grid item xs="12">
            <Header />
          </Grid>
          <Grid item sm="2" />
          <Grid item xs="12" sm="8">
            <NavBar />
          </Grid>
          <Grid item sm="2" />
          <Grid item sm="2" />
          <Grid item xs="12" sm="8">
            <Content />
          </Grid>
          <Grid item sm="2" />
          <Grid item xs="12">
            <Footer />
          </Grid>
        </Grid>
        <LiveChat />
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export { App };
