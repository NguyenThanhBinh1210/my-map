import React from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PlaceIcon from "@mui/icons-material/Place";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Tooltip } from "@mui/material";

const ListIconRender = ({ items, handleSwap }) => {
  return (
    <div>
      <CircleOutlinedIcon
        fontSize="small"
        sx={{
          color: "white",
          paddingBottom: "10px",
          display: "flex",
          position: "absolute",
          top: "65px",
          left: "19px",
        }}
      />
      <MoreVertIcon
        fontSize="small"
        sx={{
          color: "white",
          position: "absolute",
          top: "90px",
          left: "19px",
        }}
      />
      {items.length < 3 && (
        <>
          <Tooltip
            title="Đảo ngược điểm xuất phát và điểm đến"
            arrow
            placement="right"
          >
            <SwapVertIcon
              fontSize="large"
              onClick={handleSwap}
              sx={{
                color: "white",
                position: "absolute",
                top: "90px",
                right: "10px",
                zIndex: "1000",
                cursor: "pointer",
              }}
            />
          </Tooltip>
          <PlaceIcon
            fontSize="small"
            sx={{
              color: "white",
              paddingBottom: "10px",
              position: "absolute",
              top: "115px",
              left: "19px",
            }}
          />
        </>
      )}
      {items.length >= 3 && (
        <>
          <MoreVertIcon
            fontSize="small"
            sx={{
              color: "white",
              position: "absolute",
              top: "137px",
              left: "19px",
            }}
          />
          <CircleOutlinedIcon
            fontSize="small"
            sx={{
              color: "white",
              paddingBottom: "10px",
              display: "flex",
              position: "absolute",
              top: "115px",
              left: "19px",
            }}
          />
        </>
      )}
      {items.length === 3 && (
        <PlaceIcon
          fontSize="small"
          sx={{
            color: "white",
            paddingBottom: "10px",
            position: "absolute",
            top: "160px",
            left: "19px",
          }}
        />
      )}
      {items.length >= 4 && (
        <>
          <MoreVertIcon
            fontSize="small"
            sx={{
              color: "white",
              position: "absolute",
              top: "185px",
              left: "19px",
            }}
          />
          <CircleOutlinedIcon
            fontSize="small"
            sx={{
              color: "white",
              paddingBottom: "10px",
              display: "flex",
              position: "absolute",
              top: "160px",
              left: "19px",
            }}
          />
        </>
      )}
      {items.length === 4 && (
        <PlaceIcon
          fontSize="small"
          sx={{
            color: "white",
            paddingBottom: "10px",
            position: "absolute",
            top: "210px",
            left: "19px",
          }}
        />
      )}
      {items.length >= 5 && (
        <>
          <CircleOutlinedIcon
            fontSize="small"
            sx={{
              color: "white",
              paddingBottom: "10px",
              display: "flex",
              position: "absolute",
              top: "210px",
              left: "19px",
            }}
          />
          <MoreVertIcon
            fontSize="small"
            sx={{
              color: "white",
              position: "absolute",
              top: "235px",
              left: "19px",
            }}
          />
        </>
      )}
      {items.length === 5 && (
        <PlaceIcon
          fontSize="small"
          sx={{
            color: "white",
            paddingBottom: "10px",
            position: "absolute",
            top: "255px",
            left: "19px",
          }}
        />
      )}
      {items.length >= 6 && (
        <>
          <CircleOutlinedIcon
            fontSize="small"
            sx={{
              color: "white",
              paddingBottom: "10px",
              display: "flex",
              position: "absolute",
              top: "258px",
              left: "19px",
            }}
          />
          <MoreVertIcon
            fontSize="small"
            sx={{
              color: "white",
              position: "absolute",
              top: "285px",
              left: "19px",
            }}
          />
        </>
      )}
      {items.length === 6 && (
        <PlaceIcon
          fontSize="small"
          sx={{
            color: "white",
            paddingBottom: "10px",
            position: "absolute",
            top: "310px",
            left: "19px",
          }}
        />
      )}
    </div>
  );
};

export default ListIconRender;
