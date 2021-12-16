import React, { useState } from "react";
import {
  Card,
  Grid,
  Button,
  Modal,
  CardContent,
  CardActions,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PersonIcon from "@mui/icons-material/Person";
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
  return (
    <>
      <Grid container spacing="20">
        {RoomsList.map((room, index) => (
          <Grid item key={`room-${index}`}>
            {createRoom(room, handler(room))}
          </Grid>
        ))}
      </Grid>
      <Modal open={open} onClose={handler()}>
        <Grid container className="modal">
          <Grid item>
            <Card>
              <CardContent>{modal.title}</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Modal>
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
