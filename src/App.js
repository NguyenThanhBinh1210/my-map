import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Direct from "./components/Direct/Direct";
import Instruction from "./components/instruction/Instruction";
import ListMap from "./components/ListMap/ListMap";
import { setLocations } from "./redux/features/locationSlice";
import { setMap } from "./redux/features/mapSlice.js";
import { v4 as uuidv4 } from "uuid";
import { getPolyline } from "./components/getPolyline";
import { getMarker } from "./components/getMarker";

function App() {
  const { value: inputValue } = useSelector((state) => state.input);
  const { value: valueMap } = useSelector((state) => state.map);
  const { value: valuePolyline } = useSelector((state) => state.polyline);
  const { value: valueToggle } = useSelector((state) => state.toggle);
  const [showDirect, setShowDirect] = useState(true);
  const [listLocation, setListLocation] = useState([]);
  const dispatch = useDispatch();

  const getMap = () => {
    let options = {
      center: { lat: 16.072163491469226, lng: 108.22690536081757 },
      zoom: 15,
      controls: true,
      mapType: "roadmap",
    };
    const map = new map4d.Map(document.getElementById("map"), options);
    dispatch(setMap(map));
    getMarker(map, setListLocation, uuidv4);
  };

  getPolyline(valuePolyline, valueMap, inputValue);

  useEffect(() => {
    getMap();
  }, []);

  useEffect(() => {
    dispatch(setLocations(listLocation));
  }, [listLocation]);

  return (
    <div
      className="App"
      id="map"
      style={{ width: "100%", height: "100vh", position: "relative" }}
    >
      <ListMap showDirect={showDirect} />
      <Direct showDirect={showDirect} setShowDirect={setShowDirect} />
      {valueToggle && <Instruction showDirect={showDirect} />}
    </div>
  );
}

export default App;
