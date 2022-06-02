import React from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PlaceIcon from "@mui/icons-material/Place";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Tooltip } from "@mui/material";

const ListIconRender = ({ items, handleSwap }) => {
  return (
    <div>
      <CircleOutlinedIcon className="circle-icon" fontSize="small" />
      <MoreVertIcon className="more-icon" fontSize="small" />
      {items.length < 3 && (
        <>
          <Tooltip
            title="Đảo ngược điểm xuất phát và điểm đến"
            arrow
            placement="right"
          >
            <SwapVertIcon
              className="swap-icon"
              fontSize="large"
              onClick={handleSwap}
            />
          </Tooltip>
          <PlaceIcon className="place-icon" fontSize="small" />
        </>
      )}
      {items.length >= 3 && (
        <>
          <MoreVertIcon
            fontSize="small"
            className="more-icon"
            sx={{ top: "137px" }}
          />
          <CircleOutlinedIcon
            fontSize="small"
            className="circle-icon"
            sx={{ top: "115px" }}
          />
        </>
      )}
      {items.length === 3 && (
        <PlaceIcon
          fontSize="small"
          className="place-icon"
          sx={{ top: "160px" }}
        />
      )}
      {items.length >= 4 && (
        <>
          <MoreVertIcon
            fontSize="small"
            className="more-icon"
            sx={{ top: "185px" }}
          />
          <CircleOutlinedIcon
            fontSize="small"
            className="circle-icon"
            sx={{ top: "160px" }}
          />
        </>
      )}
      {items.length === 4 && (
        <PlaceIcon
          fontSize="small"
          className="place-icon"
          sx={{ top: "210px" }}
        />
      )}
      {items.length >= 5 && (
        <>
          <CircleOutlinedIcon
            fontSize="small"
            className="circle-icon"
            sx={{ top: "210px" }}
          />
          <MoreVertIcon
            fontSize="small"
            className="more-icon"
            sx={{ top: "235px" }}
          />
        </>
      )}
      {items.length === 5 && (
        <PlaceIcon
          fontSize="small"
          className="place-icon"
          sx={{ top: "255px" }}
        />
      )}
      {items.length >= 6 && (
        <>
          <CircleOutlinedIcon
            fontSize="small"
            className="circle-icon"
            sx={{ top: "258px" }}
          />
          <MoreVertIcon
            fontSize="small"
            className="more-icon"
            sx={{ top: "285px" }}
          />
        </>
      )}
      {items.length === 6 && (
        <PlaceIcon
          fontSize="small"
          className="place-icon"
          sx={{ top: "310px" }}
        />
      )}
    </div>
  );
};

export default ListIconRender;
