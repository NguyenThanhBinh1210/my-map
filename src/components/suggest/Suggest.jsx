import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import CircleIcon from "../circleIcon/CircleIcon";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CoffeeIcon from "@mui/icons-material/Coffee";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./suggest.css";
const Suggest = () => {
  return (
    <Stack className="suggest">
      <Typography align="left" className="suggest-title">
        Địa điểm gợi ý
      </Typography>
      <Stack direction="row" className="suggest-content">
        <Box className="suggest-center">
          <CircleIcon color="#5F9500" margin={true} hover>
            <RestaurantIcon sx={{ color: "white" }} />
          </CircleIcon>
          <Typography align="center" variant="caption" sx={{ width: "100%" }}>
            Nhà hàng
          </Typography>
        </Box>
        <Box className="suggest-center">
          <CircleIcon margin={true} hover>
            <img
              src="https://map.map4d.vn/mapAppRoot/icon/suggestPlaceIcon/ATM.svg"
              alt=""
              height="24"
              width="24"
            />
          </CircleIcon>
          <Typography
            align="center"
            variant="caption"
            sx={{
              width: "100%",
            }}
          >
            ATM
          </Typography>
        </Box>
        <Box className="suggest-center">
          <CircleIcon color="#CB4500" margin={true} hover>
            <CoffeeIcon
              sx={{
                color: "white",
              }}
            />
          </CircleIcon>
          <Typography
            align="center"
            variant="caption"
            sx={{
              width: "100%",
            }}
          >
            Cà phê
          </Typography>
        </Box>
        <Box className="suggest-center">
          <CircleIcon color="#E39F00" margin={true} hover>
            <LocalParkingIcon
              sx={{
                color: "white",
              }}
            />
          </CircleIcon>
          <Typography
            align="center"
            variant="caption"
            sx={{
              width: "100%",
            }}
          >
            Bãi đậu xe
          </Typography>
        </Box>
        <Box className="suggest-center">
          <CircleIcon color="#5C6E8A" margin={true} hover>
            <MoreHorizIcon
              sx={{
                color: "white",
              }}
            />
          </CircleIcon>
          <Typography
            align="center"
            variant="caption"
            sx={{
              width: "100%",
            }}
          >
            Thêm
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Suggest;
