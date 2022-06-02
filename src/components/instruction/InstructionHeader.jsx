import React, { useState } from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { setToggle } from "../../redux/features/toggleSlice";
import { useDispatch } from "react-redux";

const vehicleType = [
  {
    id: 1,
    name: "Lái xe",
  },
  {
    id: 2,
    name: "Đi xe máy",
  },
  {
    id: 3,
    name: "Đi xe đạp",
  },
  {
    id: 4,
    name: "Đi bộ",
  },
];

const InstructionHeader = () => {
  const [active, setActive] = useState("Lái xe");
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setToggle(false));
  };
  return (
    <Stack
      direction="row"
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Tooltip title="Menu">
          <IconButton>
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </div>
      <div style={{ alignItems: "center", display: "flex" }}>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          {vehicleType.map((item) => (
            <Tooltip
              key={item.id}
              title={item.name}
              onClick={() => setActive(item.name)}
            >
              <IconButton
                sx={{
                  width: "60px",
                  height: "30px",
                  borderRadius: "20px",
                  padding: "0",
                  backgroundColor: item.name === active ? "white" : "",
                  ":hover": {
                    backgroundColor: item.name === active ? "white" : "",
                  },
                }}
              >
                {item.name === "Lái xe" && (
                  <DirectionsCarIcon
                    sx={{
                      color:
                        item.name === active ? "rgb(80, 143, 244)" : "white",
                    }}
                  />
                )}
                {item.name === "Đi xe máy" && (
                  <TwoWheelerIcon
                    sx={{
                      color:
                        item.name === active ? "rgb(80, 143, 244)" : "white",
                    }}
                  />
                )}
                {item.name === "Đi xe đạp" && (
                  <DirectionsBikeIcon
                    sx={{
                      color:
                        item.name === active ? "rgb(80, 143, 244)" : "white",
                    }}
                  />
                )}
                {item.name === "Đi bộ" && (
                  <DirectionsWalkIcon
                    sx={{
                      color:
                        item.name === active ? "rgb(80, 143, 244)" : "white",
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
      </div>
      <div>
        <Tooltip title="Đóng">
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </div>
    </Stack>
  );
};

export default InstructionHeader;
