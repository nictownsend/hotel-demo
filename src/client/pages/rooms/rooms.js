import React, { useState } from "react";
import {
  Card,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CardContent,
  CardActions,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography,
  circularProgressClasses,
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
    title: "Wizard",
    headline: "As lucky as Harry",
    summary:
      "This freshly fragranced cosy space is ideal for those soffering from covid. With an adjacent bathroom you can enjoy all the sounds and smells of your fellow guests.",
    icon: [AutoFixHighIcon],
  },
  {
    title: "The Attic Suite",
    headline: "Mind your head",
    icon: [BungalowIcon],
    summary:
      "Squirrels and spiders and bats, oh my! Sleep among the eaves in this rustic paradise. Cobwebs offer perfect insulation in the spacacious room, but don't worry - the missing lead means there's plenty of ventilation.",
  },
  {
    title: "Glamping",
    headline: "Bring an umbrella",
    summary:
      "Experience the great outdoors in our glamping area. With views across the fence into a wide open forest, who knows who might be watching you back at night.",
    icon: [NightsStayIcon, NightsStayIcon],
  },
  {
    title: "The Royal Chamber",
    headline: "Don't forget to flush",
    summary:
      "Recently decorated, the Royal Chamber has the unique benefit of being the only room that is fit for purpose. Decor taken straight from a council house, you never have to worry about scuffing walls or staining the floor, it's already been done for you!",
    icon: [ShowerIcon],
  },
  {
    title: "The Spare",
    headline: "Size doesn't matter",
    summary:
      "'The Heir and the Spare' - such as in royal circles, the spare is just as equaly unloved and forgotten about. Carpets not replaced, cracks patched badly, and paint job from at least 10 years ago, this is the place no-one wants to be.",
    icon: [PersonIcon, PersonIcon],
  },
  {
    title: "The Nook",
    headline: "Bedtime reading",
    icon: [MenuBookIcon],
    summary:
      "With just enough space to swing a cat (not that we've tried), the nook is perfect for those who prefer the company of books to real people.",
  },
  {
    title: "The Main Act",
    headline: "Room for two",
    summary:
      "With a double bed and a super king duvet, you'll want to stay in bed for you're whole visit (partially as the heating won't be on).",
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
          <Grid item key={`room-${index}`} xs={12} sm={6} md={4}>
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
        <DialogContent>
          <Typography>{modal.summary}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

const createRoom = ({ title, headline }, moreDetails) => (
  <Card
    sx={{
      height: "15rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <Typography>{headline}</Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={moreDetails}>
        Learn More
      </Button>
    </CardActions>
  </Card>
);

export { Rooms, RoomsList };
