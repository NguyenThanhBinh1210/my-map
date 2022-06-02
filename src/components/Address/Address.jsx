import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import HomeIcon from "@mui/icons-material/Home";
import { Stack, Typography } from "@mui/material";
import CircleIcon from "../CircleIcon/CircleIcon";

const style = {
  width: "99.5%",
  bgcolor: "background.paper",
  borderRadius: "5px",
  padding: 0,
  border: "1px solid rgb(225, 225, 225)",
  marginBottom: "5px",
};

const Address = () => {
  return (
    <>
      <List sx={style} component="nav" aria-label="address">
        <ListItem
          button
          sx={{
            padding: "15px 17px",
          }}
        >
          <CircleIcon>
            <HomeIcon
              sx={{
                color: "white",
              }}
            />
          </CircleIcon>
          <Stack pl={2}>
            <Typography>Nhà riêng</Typography>
            <Typography variant="caption">Đặt vị trí</Typography>
          </Stack>
        </ListItem>
        <ListItem
          button
          sx={{
            padding: "15px 17px",
          }}
        >
          <CircleIcon>
            <BusinessCenterIcon
              sx={{
                color: "white",
              }}
            />
          </CircleIcon>
          <Stack pl={2}>
            <Typography>Cơ quan</Typography>
            <Typography variant="caption">Đặt vị trí</Typography>
          </Stack>
        </ListItem>
      </List>
    </>
  );
};

export default Address;
