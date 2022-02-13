import { LocationOn } from "@mui/icons-material";
import {
  Avatar,
  Card,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import { Box } from "@mui/system";

import "./CandidateCard.css";
import { Draggable } from "react-beautiful-dnd";

const CandidateCard = ({
  candidate: { name, picture, cell, location, login },
  index,
}) => {
  return (
    <Draggable draggableId={login.uuid} index={index}>
      {(provided) => (
        <Card
          className="candidate-card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Box sx={{ p: 2, display: "flex" }}>
            <Avatar variant="rounded" src={picture.medium} />
            <Stack spacing={0.5} ml={2}>
              <Typography fontWeight={700}>
                {name.first + " " + name.last}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "end", gap: "5px" }}
                color="text.secondary"
              >
                <CallIcon sx={{ color: "#ddd" }} /> {cell}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "end", gap: "5px" }}
                color="text.secondary"
              >
                <LocationOn sx={{ color: "#ddd" }} /> {location.city},{" "}
                {location.country}
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 2, py: 1, bgcolor: "background.default" }}
          >
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          </Stack>
        </Card>
      )}
    </Draggable>
  );
};

export default CandidateCard;
