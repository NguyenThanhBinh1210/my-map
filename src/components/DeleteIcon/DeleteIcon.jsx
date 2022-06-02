import { IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import React from "react";

const DeleteIcon = ({ title, handleRemoveLocation, index, right = "55px" }) => {
  return (
    <Tooltip title={title} placement="right" arrow>
      <IconButton
        onClick={handleRemoveLocation}
        sx={{
          position: "absolute",
          right: { right },
          top: "12px",
          width: 25,
          height: 25,
          color: "white",
          display: "none",
          zIndex: { index },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteIcon;
