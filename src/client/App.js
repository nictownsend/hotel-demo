import { Grid } from "@mui/material";
import { Content } from "./content";
import { Header } from "./header";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import "./App.scss";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { LiveChat } from "./live-chat";
import { enLocale } from "moment/locale/en-gb";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#424242",
    },
    secondary: {
      main: "#bdbdbd",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter} locale={enLocale}>
        <BrowserRouter>
          <Grid container>
            <Grid item xs={12}>
              <Header />
            </Grid>
            <Grid item xs={12}>
              <Routes>
                <Route path="/" element={<Hero />} />
              </Routes>
            </Grid>
            <Grid item lg={3} />
            <Grid item lg={6}>
              <Content />
            </Grid>
            <Grid item lg={3} />
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
          <LiveChat />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export { App };
