import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import CircleIcon from "../CircleIcon/CircleIcon";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CoffeeIcon from "@mui/icons-material/Coffee";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Suggest = () => {
  return (
    <Stack
      sx={{
        borderRadius: "5px",
        border: "1px solid rgb(225, 225, 225)",
        backgroundColor: "white",
        padding: "10px 10px 0 10px",
        paddingBottom: "20px",
      }}
    >
      <Typography
        align="left"
        sx={{
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        Địa điểm gợi ý
      </Typography>
      <Stack
        direction="row"
        sx={{
          padding: "16px 16px 0 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <CircleIcon color="#5F9500" margin={true} hover>
            <RestaurantIcon
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
            Nhà hàng
          </Typography>
        </Box>
        <Box>
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
        <Box>
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
        <Box>
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
        <Box>
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
