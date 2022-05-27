import React, { useState } from "react";
import { Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectIcon from "../../assets/direction-right-solid-24.png";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import { setToggle } from "../../redux/features/toggleSlice";
import { setSuccess } from "../../redux/features/suggestSlice";

const Input = () => {
  const [toggle1] = useState(false);
  const dispatch = useDispatch();
  const handleShowSuggest = () => {
    dispatch(setSuccess(true));
  };
  const handleToogle = () => {
    dispatch(setToggle(!toggle1));
  };
  return (
    <>
      <Stack
        direction="row"
        p={1}
        borderRadius="5px"
        boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "5px",
          backgroundColor: "white",
          padding: "5px ",
        }}
      >
        <Tooltip title="Menu">
          <IconButton>
            <MenuIcon fontSize="medium" color="primary" />
          </IconButton>
        </Tooltip>
        <Stack
          direction="row"
          flexGrow={1}
          sx={{
            display: "flex",
            alignItems: "center",
            paddingRight: "8px",
            marginRight: "8px",
            borderRight: "2px solid #ccc",
          }}
        >
          <input
            onFocus={handleShowSuggest}
            type="text"
            style={{
              padding: "2px 10px",
              fontSize: "16px",
              border: "none",
              outline: "none",
              flexGrow: "1",
            }}
            placeholder="Tìm kiếm Map4D"
          />
          <Tooltip title="Tìm kiếm">
            <IconButton>
              <SearchIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Stack>
        <Tooltip title="Chỉ đường">
          <IconButton onClick={handleToogle}>
            <img
              src={DirectIcon}
              alt=""
              style={{
                width: "23px",
              }}
            />
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  );
};

export default Input;
