import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/lab";
import {
  Grid,
  TextField,
  Card,
  Stack,
  Typography,
  CardContent,
  CardActionArea,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import moment from "moment";
import { RoomsList } from "../rooms";

const Booking = (props) => {
  const [checkIn, setCheckIn] = useState(moment());
  const [checkOut, setCheckOut] = useState(moment());
  const now = moment();

  const [dates, updateDates] = useState("");
  useEffect(() => {
    updateDates(
      `${checkIn.format("DD/MM/YY")} - ${checkOut.format(
        "DD/MM/YY"
      )} (${checkOut.diff(
        checkIn.clone().subtract(1, "minute"),
        "days"
      )} nights)`
    );
  }, [checkIn, checkOut]);
  return (
    <Grid container spacing={1}>
      <Grid
        item
        container
        xs="4"
        sm="2"
        spacing={1}
        sx={{ alignItems: "flex-start" }}
      >
        <Grid item>
          <DatePicker
            onChange={setCheckIn}
            value={checkIn}
            label="Check in:"
            minDate={now}
            format="DD/MM/YY"
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item>
          <DatePicker
            onChange={setCheckOut}
            value={checkOut}
            label="Check out:"
            minDate={checkIn}
            format="DD/MM/YY"
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
      </Grid>
      <Grid item xs="8" sm="9">
        <Stack spacing={1}>
          <Typography>{`Rooms available for ${dates}`}</Typography>
          {RoomsList.map((room) => (
            <Card variant="outlined">
              <CardActionArea>
                <CardContent>
                  <Typography>{room.title}</Typography>
                  <Typography variant="caption">{room.summary}</Typography>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ alignItems: "center", display: "flex" }}
                    >
                      Sleeps: {room.icon.map(React.createElement)}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Grid>
      <Grid item sm="1" />
    </Grid>
  );
};

export { Booking };
