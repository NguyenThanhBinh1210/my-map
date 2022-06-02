import { v4 as uuidv4 } from "uuid";

export const ImageList = [
  {
    name: "Roadmap",
    image: "https://map.map4d.vn/mapAppRoot/image/mapTypeSelect/roadMap.png",
    new: true,
  },
  {
    name: "Raster",
    image: "https://map.map4d.vn/mapAppRoot/image/mapTypeSelect/raster.png",
    new: false,
  },
  {
    name: "Satellite",
    image: "https://map.map4d.vn/mapAppRoot/image/mapTypeSelect/satellite.png",
    new: true,
  },
  {
    name: "Map3d",
    image: "https://map.map4d.vn/mapAppRoot/image/mapTypeSelect/map3d.png",
    new: false,
  },
];

export const vehicleType = [
  {
    id: 1,
    name: "Lái xe",
  },
  {
    id: 2,
    name: "Đi xe máy",
  },
  {
    id: 3,
    name: "Đi xe đạp",
  },
  {
    id: 4,
    name: "Đi bộ",
  },
];

export const initialData = [
  {
    id: uuidv4(),
    content: "Chọn điểm đến",
  },
  {
    id: uuidv4(),
    content: "Chọn điểm đến",
  },
];
