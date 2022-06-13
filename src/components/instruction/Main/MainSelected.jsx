import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const MainSelected = ({ setWeighting }) => {
  const handleRouter = () => {
    // if (listRouter) {
    //   const listSteps = listRouter[0]?.legs[0]?.steps;
    //   const listPolyline = listSteps?.map((step) => {
    //     return [step.startLocation.lng, step.startLocation.lat];
    //   });
    //   dispatch(setPolyline(listPolyline));
    // }
  };
  const handleSelect = (e) => {
    const weightingType = e.target.value;
    setWeighting(+weightingType);
  };
  return (
    <Stack className="stack-wrapper-search" direction="row">
      <Box className="box-wrapper-button" variant="contained">
        <button className="button-search" onClick={handleRouter}>
          Tìm kiếm
        </button>
      </Box>
      <select
        onChange={handleSelect}
        id="selection"
        style={{ flex: "1", outline: "none", border: "1px solid #ccc" }}
      >
        <option value="0">Ngắn nhất</option>
        <option value="1" selected>
          Nhanh nhất
        </option>
        <option value="2">Cân bằng</option>
      </select>
    </Stack>
  );
};

export default MainSelected;
