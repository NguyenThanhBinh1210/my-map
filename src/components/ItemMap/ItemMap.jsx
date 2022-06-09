import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { ImageList } from "../../data.js";
import "./item_map.css";

const ItemMap = ({ children, news, image, name, dataList, setDataList }) => {
  const { value: mapValue } = useSelector((state) => state.map);
  const handleClick = () => {
    const newDataList = [
      dataList.find((item) => item.name === name),
      ...ImageList.filter((item) => item.name !== name),
    ];
    setDataList(newDataList);
    if (name === "Satellite") mapValue.setMapType(map4d.MapType.satellite);
    if (name === "Raster") mapValue.setMapType(map4d.MapType.raster);
    if (name === "Roadmap") mapValue.setMapType(map4d.MapType.roadmap);
    if (name === "Map3d") mapValue.setMapType(map4d.MapType.map3d);
    newDataList[0].active = true;
  };

  return (
    <Box onClick={handleClick} className="img-item">
      <Box className="img-item-content">
        <img src={image} alt="" />
        <p className="img-item-description">{children}</p>
        <div className="overlay"></div>
        {news && <span className="img-item-news">NEW</span>}
      </Box>
    </Box>
  );
};

export default ItemMap;
