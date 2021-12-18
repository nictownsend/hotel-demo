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
  Alert,
} from "@mui/material";
import moment from "moment";
import { RoomsList } from "../rooms";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [checkIn, setCheckIn] = useState(moment());
  const [checkOut, setCheckOut] = useState(moment());
  const now = moment();
  const navigate = useNavigate();
  const onSelectHandler = (id) => () => {
    navigate(`/booking-form?id=${id}&checkin=${checkIn}&checkout=${checkOut}`);
  };
  const [dates, updateDates] = useState("");
  const [validDate, setValidDate] = useState(false);

  useEffect(() => {
    const nights = checkOut.diff(checkIn.clone().subtract(1, "minute"), "days");
    nights > 0 ? setValidDate(true) : setValidDate(false);
    updateDates(
      `${checkIn.format("DD/MM/YY")} - ${checkOut.format(
        "DD/MM/YY"
      )} (${nights} nights)`
    );
  }, [checkIn, checkOut]);
  return (
    <Grid
      container
      spacing={5}
      sx={{
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Grid
        item
        container
        xs={12}
        md={4}
        spacing={3}
        sx={{
          flexDirection: { xs: "row", sm: "column" },
          justifyContent: { xs: "space-around", sm: "flex-start" },
        }}
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
      <Grid item xs={12} md={8}>
        {validDate ? (
          <>
            <Typography>{`Rooms available for ${dates}`}</Typography>
            <Stack spacing={1} sx={{ maxHeight: "50rem", overflow: "auto" }}>
              {RoomsList.map((room, index) => (
                <Card
                  variant="outlined"
                  key={index}
                  sx={{ overflow: "initial" }}
                  onClick={onSelectHandler(index)}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography>{room.title}</Typography>
                      <Typography variant="caption">{room.headline}</Typography>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ alignItems: "center", display: "flex" }}
                        >
                          Sleeps:{" "}
                          {room.icon.map((icon, index) =>
                            React.createElement(icon, { key: index })
                          )}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Stack>
          </>
        ) : (
          <Alert severity="error">Please select a valid date range</Alert>
        )}
      </Grid>
      {/* <Grid item sm="1" /> */}
    </Grid>
  );
};

export { Booking };
