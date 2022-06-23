import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Direct from "./components/Direct/Direct";
import Instruction from "./components/instruction/Instruction";
import ListMap from "./components/ListMap/ListMap";
import { setMap } from "./redux/features/mapSlice.js";

function App() {
  const { valueToggle } = useSelector((state) => state.boolean);
  const [showDirect, setShowDirect] = useState(true);
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
  };
  useEffect(() => {
    getMap();
  }, []);

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
