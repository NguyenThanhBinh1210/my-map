import * as React from "react";
import Box from "@mui/material/Box";
import ItemMap from "../ItemMap/ItemMap";
import { ImageList } from "../../data";

export default function BoxSx() {
  const [dataList, setDataList] = React.useState(ImageList);
  const [enter, setEnter] = React.useState(false);

  const handleEnter = () => {
    setEnter(true);
  };
  const handleLeave = () => {
    setEnter(false);
  };

  return (
    <Box
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      sx={{
        position: "fixed",
        borderRadius: "10px",
        zIndex: "100",
        bottom: "40px",
        left: "15px",
        width: enter ? 280 : 70,
        height: 70,
        overflow: "hidden",
        backgroundColor: "primary.dark",
        transition: "width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)",
        display: "flex",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: 280,
          height: 70,
          backgroundColor: "white",
          display: "flex",
        }}
      >
        <div className="test" style={{ display: "flex" }}>
          {dataList.map((item, index) => (
            <ItemMap
              key={index}
              image={item.image}
              name={item.name}
              dataList={dataList}
              setDataList={setDataList}
              news={item.new}
            >
              {item.name}
            </ItemMap>
          ))}
        </div>
      </Box>
    </Box>
  );
}
