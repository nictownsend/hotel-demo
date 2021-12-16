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
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
            <Grid item sx={{ display: { xs: "none", sm: "block" } }} xs={12}>
              <Header />
            </Grid>
            <Grid item xs={12}>
              <NavBar />
            </Grid>
            <Grid item sm={0.5} md={2} lg={3} />
            <Grid item xs={12} sm={11} md={8} lg={6}>
              <Content />
            </Grid>
            <Grid item sm={0.5} md={2} lg={3} />
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
