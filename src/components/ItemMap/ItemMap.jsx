import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { ImageList } from "../../data.js";

const ItemMap = ({ children, news, image, name, dataList, setDataList }) => {
  const [active, setActive] = React.useState(false);
  const { value } = useSelector((state) => state.map);
  const handleClick = () => {
    const newDataList = [
      dataList.find((item) => item.name === name),
      ...ImageList.filter((item) => item.name !== name),
    ];
    setDataList(newDataList);
    if (name === "Satellite") value.setMapType(map4d.MapType.satellite);
    if (name === "Raster") value.setMapType(map4d.MapType.raster);
    if (name === "Roadmap") value.setMapType(map4d.MapType.roadmap);
    if (name === "Map3d") value.setMapType(map4d.MapType.map3d);
    newDataList[0].active = true;
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: 70,
        height: 70,
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 1000 ease",
      }}
    >
      <Box
        sx={{
          width: 55,
          height: 55,
          borderRadius: "10px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={image}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <p
          style={{
            position: "absolute",
            color: "white",
            bottom: "-10px",
            fontSize: "12px",
            zIndex: 1000,
          }}
        >
          {children}
        </p>
        <div
          className="overlay"
          style={{
            position: "relative",
            backgroundImage:
              "linear-gradient(transparent, transparent, rgb(58, 58, 58))",
            width: "100%",
            height: "100%",
          }}
        ></div>
        {news && (
          <span
            style={{
              position: "absolute",
              backgroundColor: "red",
              fontSize: "8px",
              padding: "2px",
              color: "white",
              top: "4px",
              right: "4px",
            }}
          >
            NEW
          </span>
        )}
      </Box>
    </Box>
  );
};

export default ItemMap;
