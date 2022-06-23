import React, { useEffect, useState } from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { setToggle } from "../../redux/features/booleanSlice";
import { useDispatch } from "react-redux";
import { setMode } from "../../redux/features/modeSlice";
const vehicleType = [
  {
    id: 1,
    name: "Lái xe",
    icon: DirectionsCarIcon,
  },
  {
    id: 2,
    name: "Đi xe máy",
    icon: DirectionsBikeIcon,
  },
  {
    id: 3,
    name: "Đi xe đạp",
    icon: TwoWheelerIcon,
  },
  {
    id: 4,
    name: "Đi bộ",
    icon: DirectionsWalkIcon,
  },
];
const InstructionHeader = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("Lái xe");
  const handleClose = () => {
    dispatch(setToggle(false));
  };
  const [modeType, setModeType] = useState("car");
  useEffect(() => {
    dispatch(setMode(modeType));
  }, [modeType]);

  const handleSetMode = (type) => {
    setActive(type);
    if (type === "Lái xe") {
      setModeType("car");
    }
    if (type === "Đi xe máy") {
      setModeType("motorcycle");
    }
    if (type === "Đi xe đạp") {
      setModeType("bike");
    }
    if (type === "Đi bộ") {
      setModeType("foot");
    }
  };
  return (
    <Stack
      direction="row"
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <Tooltip title="Menu">
          <IconButton>
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </div>
      <div style={{ alignItems: "center", display: "flex" }}>
        <Stack direction="row" sx={{ alignItems: "center", display: "flex" }}>
          {vehicleType.map((item) => {
            const IconVehicle = item.icon;
            return (
              <Tooltip key={item.id} title={item.name}>
                <IconButton
                  className="icon-button-type"
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: item.name === active ? "white" : "",
                    ":hover": {
                      backgroundColor: item.name === active ? "white" : "",
                    },
                  }}
                  onClick={() => handleSetMode(item.name)}
                >
                  <IconVehicle
                    sx={{
                      color:
                        item.name === active ? "rgb(80, 143, 244)" : "white",
                    }}
                  />
                </IconButton>
              </Tooltip>
            );
          })}
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
