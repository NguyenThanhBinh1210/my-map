import * as React from "react";
import Box from "@mui/material/Box";
import ItemMap from "../ItemMap/ItemMap";
import { ImageList } from "../../data";
import { useSelector } from "react-redux";
import "./list_map.css";

export default function BoxSx({ showDirect }) {
  const { valueMore } = useSelector((state) => state.boolean);

  const [dataList, setDataList] = React.useState(ImageList);

  return (
    <Box
      className="list-img"
      sx={{ left: valueMore && showDirect ? "430px" : "15px" }}
    >
      <Box className="list-img-content">
        <div className="list-img-item">
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
