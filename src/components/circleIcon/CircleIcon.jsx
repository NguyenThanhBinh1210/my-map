import { Box } from "@mui/material";
import React from "react";

const CircleIcon = ({ children, color, margin = false, hover = false }) => {
  return (
    <Box
      sx={{
        borderRadius: "100rem",
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: "0.9",
        cursor: "pointer",
        margin: margin ? "0 auto" : "",
        backgroundColor: color || "#508FF4",
        ":hover": {
          opacity: hover ? "1" : "0.9",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default CircleIcon;
