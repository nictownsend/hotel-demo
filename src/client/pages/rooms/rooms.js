import React, { useState } from "react";
import {
  Card,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardContent,
  CardActions,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import BungalowIcon from "@mui/icons-material/Bungalow";
import ShowerIcon from "@mui/icons-material/Shower";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const RoomsList = [
  {
    title: "Wizard experience",
    summary: "A cosy room under the stairs",
    icon: [AutoFixHighIcon],
  },
  {
    title: "The Attic Suite",
    icon: [BungalowIcon],
    summary: "The warmest place in hotel, but mind your head",
  },
  {
    title: "Glamping",
    summary: "Experience the great outdoors",
    icon: [NightsStayIcon, NightsStayIcon],
  },
  {
    title: "The Royal Chamber",
    summary: "Don't forget to flush",
    icon: [ShowerIcon],
  },
  {
    title: "The Spare",
    summary: "Size doesn't matter",
    icon: [PersonIcon, PersonIcon],
  },
  { title: "The Nook", summary: "Bedtime reading", icon: [MenuBookIcon] },
  {
    title: "The Master",
    summary: "A safe bet when you need to reinvigorate a tired formula",
    icon: [PersonIcon, PersonIcon],
  },
];
const Rooms = (props) => {
  const [open, setOpen] = useState(false);
  const [modal, updateModal] = useState({});
  const handler = (room) => () => {
    console.log(room);
    setOpen((open) => !open);
    updateModal(room || {});
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Grid container spacing="20">
        {RoomsList.map((room, index) => (
          <Grid item key={`room-${index}`}>
            {createRoom(room, handler(room))}
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handler()} fullScreen={fullScreen}>
        <DialogTitle>
          {modal.title}
          <IconButton
            aria-label="close"
            onClick={handler()}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>Photo plus summary here please</DialogContent>
      </Dialog>
    </>
  );
};

const createRoom = ({ title }, moreDetails) => (
  <Card>
    <CardContent>{title}</CardContent>
    <CardActions>
      <Button size="small" onClick={moreDetails}>
        Learn More
      </Button>
    </CardActions>
  </Card>
);

export { Rooms, RoomsList };
