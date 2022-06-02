import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Direct from "./components/Direct/Direct";
import Instruction from "./components/instruction/Instruction";
import ListMap from "./components/ListMap/ListMap";
import { setMap } from "./redux/features/mapSlice.js";
function App() {
  const { value } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const getMap2 = useRef({});
  const [realToggle, setRealToggle] = useState(false);
  const [showDirect, setShowDirect] = useState(true);
  const { value: valueToggle } = useSelector((state) => state.toggle);
  useEffect(() => {
    setRealToggle(valueToggle);
  }, [valueToggle]);
  const handleRequest = (map) => {
    try {
      if (map) {
        dispatch(setMap(map));
      }
    } catch (err) {
      console.log(err);
    }
  };
  getMap2.current = () => {
    if (!value) {
      let options = {
        center: { lat: 16.072163491469226, lng: 108.22690536081757 },
        zoom: 15,
        controls: true,
        mapType: "roadmap",
      };
      let map = new map4d.Map(document.getElementById("map"), options);
      map.enable3dMode(true);
      handleRequest(map);
    }
  };

  useEffect(() => {
    getMap2.current();
  });

  return (
    <div
      className="App"
      id="map"
      style={{ width: "100%", height: "100vh", position: "relative" }}
    >
      <ListMap showDirect={showDirect} />
      <Direct showDirect={showDirect} setShowDirect={setShowDirect} />
      {realToggle && <Instruction showDirect={showDirect} />}
    </div>
  );
}

export default App;
