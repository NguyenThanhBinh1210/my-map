import { IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import "./delete_icon.css";

const DeleteIcon = ({ title, handleRemoveLocation, index, right = "55px" }) => {
  return (
    <Tooltip title={title} placement="right" arrow>
      <IconButton
        className="delete-icon"
        onClick={handleRemoveLocation}
        sx={{
          right: { right },
          zIndex: { index },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteIcon;
