import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";

const testimonials = [
  {
    rating: 3,
    name: "Bruno",
    location: "Southampton",
    title: "My review",
    review: "Meow, meow, meow",
  },
  {
    rating: 5,
    name: "Millie",
    location: "Hampshire",
    title: "Feels like home",
    review: "A-gu bluh blah. Ga. A-bu-bu-buh",
  },
  {
    rating: 2,
    name: "Squirrel",
    location: "The Roof",
    title: "Tasty roof leading",
    review: "Rest of the hotel was disappointingly lead free.",
  },
];

const Testimonials = (props) => (
  <Stack spacing={5}>
    {testimonials.map(({ review, title, rating, name, location }, index) => {
      return (
        <Card key={index}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{title}</Typography>

              <Typography variant="body2">{review}</Typography>

              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Box>
                  {Array(rating)
                    .fill(0)
                    .map((_, index) => (
                      <StarRateIcon
                        key={index}
                        sx={{ fill: "text.secondary", fontSize: 15 }}
                      />
                    ))}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {`${name}, ${location}`}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      );
    })}
  </Stack>
);

export { Testimonials };
