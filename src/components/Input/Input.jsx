import React, { useState } from "react";
import { Divider, InputBase, Paper, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import DirectionsIcon from "@mui/icons-material/Directions";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import { setToggle } from "../../redux/features/toggleSlice";
import { setSuccess } from "../../redux/features/suggestSlice";

const Input = () => {
  const dispatch = useDispatch();
  const handleShowSuggest = () => {
    dispatch(setSuccess(true));
  };
  const handleToogle = () => {
    dispatch(setToggle(true));
  };
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "97.8%",
        marginBottom: "5px",
      }}
    >
      <Tooltip title="Menu">
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <InputBase
        onFocus={handleShowSuggest}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Tìm kiếm map4D"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <Tooltip title="Tìm kiếm">
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Tooltip title="Chỉ đường">
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={handleToogle}
        >
          <DirectionsIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default Input;
