import React from "react";
import Stack from "@mui/material/Stack";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Typography } from "@mui/material";

const MainAddInput = ({ handleAddInput }) => {
  return (
    <Stack className="stack-add-input" onClick={handleAddInput}>
      <AddLocationAltIcon
        sx={{
          marginRight: "5px",
          color: "white",
          fontSize: "20px",
        }}
      />
      <Typography variant="subtext1" sx={{ color: "white" }}>
        Thêm điểm đến
      </Typography>
    </Stack>
  );
};

export default MainAddInput;
