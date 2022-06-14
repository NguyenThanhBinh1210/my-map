import { IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import "./delete_icon.css";

const DeleteIcon = ({
  title,
  handleDeleteLocation,
  index,
  item,
  active,
  items,
}) => {
  return (
    <Tooltip title={title} placement="right">
      <button
        className="button-delete-location"
        onClick={() => handleDeleteLocation(index)}
        style={{
          display: item.id === active && items.length > 2 ? "flex" : "none",
        }}
      >
        <CloseIcon sx={{ color: "white" }}></CloseIcon>
      </button>
    </Tooltip>
  );
};

export default DeleteIcon;
