import React from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PlaceIcon from "@mui/icons-material/Place";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Tooltip } from "@mui/material";

const ListIconRender = ({ items, handleSwap }) => {
  return (
    <div>
      <CircleOutlinedIcon className="circle-icon" />
      <MoreVertIcon className="more-icon" />
      {items.length < 3 && (
        <>
          <Tooltip
            title="Đảo ngược điểm xuất phát và điểm đến"
            arrow
            placement="right"
          >
            <SwapVertIcon className="swap-icon" onClick={handleSwap} />
          </Tooltip>
          <PlaceIcon className="place-icon" />
        </>
      )}
      {items.length >= 3 && (
        <>
          <MoreVertIcon className="more-icon" sx={{ top: "137px" }} />
          <CircleOutlinedIcon className="circle-icon" sx={{ top: "115px" }} />
        </>
      )}
      {items.length === 3 && (
        <PlaceIcon className="place-icon" sx={{ top: "160px" }} />
      )}
      {items.length >= 4 && (
        <>
          <MoreVertIcon className="more-icon" sx={{ top: "185px" }} />
          <CircleOutlinedIcon className="circle-icon" sx={{ top: "160px" }} />
        </>
      )}
      {items.length === 4 && (
        <PlaceIcon className="place-icon" sx={{ top: "210px" }} />
      )}
      {items.length >= 5 && (
        <>
          <CircleOutlinedIcon className="circle-icon" sx={{ top: "210px" }} />
          <MoreVertIcon className="more-icon" sx={{ top: "235px" }} />
        </>
      )}
      {items.length === 5 && (
        <PlaceIcon className="place-icon" sx={{ top: "255px" }} />
      )}
      {items.length >= 6 && (
        <>
          <CircleOutlinedIcon className="circle-icon" sx={{ top: "258px" }} />
          <MoreVertIcon className="more-icon" sx={{ top: "285px" }} />
        </>
      )}
      {items.length === 6 && (
        <PlaceIcon className="place-icon" sx={{ top: "310px" }} />
      )}
    </div>
  );
};

export default ListIconRender;
