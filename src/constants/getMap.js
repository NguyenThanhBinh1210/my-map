import { useDispatch } from "react-redux";
import { setMap } from "../redux/features/mapSlice";

export const getMap = () => {
  const dispatch = useDispatch();
  let options = {
    center: { lat: 16.072163491469226, lng: 108.22690536081757 },
    zoom: 15,
    controls: true,
    mapType: "roadmap",
  };

  const map = new map4d.Map(document.getElementById("map"), options);
  dispatch(setMap(map));
};
