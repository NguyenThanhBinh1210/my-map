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
import { vehicleType } from "../../data";

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
                className="icon-button-type"
                sx={{
                  borderRadius: "20px",
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
