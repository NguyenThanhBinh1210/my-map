import React from "react";
import { Divider, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import DirectionsIcon from "@mui/icons-material/Directions";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import { setToggle } from "../../redux/features/toggleSlice";
import { setSuccess } from "../../redux/features/suggestSlice";
import "./input.css";

const Input = () => {
  const dispatch = useDispatch();
  const handleShowSuggest = () => {
    dispatch(setSuccess(true));
  };
  const handleToogle = () => {
    dispatch(setToggle(true));
  };
  return (
    <Paper component="form" className="input-container">
      <Tooltip title="Menu">
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <img
            src="	https://map.map4d.vn/mapAppRoot/icon/Menu-navigation.svg"
            alt=""
            width="24"
            height="24"
          />
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
