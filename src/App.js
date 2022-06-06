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

function App() {
  const { value } = useSelector((state) => state.map);
  const { value: valuePolyline } = useSelector((state) => state.polyline);
  console.log(valuePolyline);
  const dispatch = useDispatch();
  // const getMap2 = useRef({});
  const [realToggle, setRealToggle] = useState(false);
  const [showDirect, setShowDirect] = useState(true);
  const [listLocation, setListLocation] = useState([]);
  const { value: valueToggle } = useSelector((state) => state.toggle);
  const handleRequest = (map) => {
    try {
      if (map) {
        dispatch(setMap(map));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getMap2 = () => {
    if (!value) {
      let options = {
        center: { lat: 16.072163491469226, lng: 108.22690536081757 },
        zoom: 15,
        controls: true,
        mapType: "roadmap",
      };
      let map = new map4d.Map(document.getElementById("map"), options);

      let polyline = new map4d.Polyline({
        path: [],
        strokeColor: "#508ff4",
        strokeOpacity: 1.0,
        strokeWidth: 10,
      });
      // Thêm polyline vào bản đồ
      polyline.setMap(map);

      handleRequest(map);
      map.addListener("click", function (args) {
        let marker = new map4d.Marker({
          position: args.location,
        });
        marker.setMap(map);
        const markerValueNumber = [args.location.lat, args.location.lng];
        const locationMarker = markerValueNumber.join(", ");
        setListLocation((prev) => [
          ...prev,
          {
            id: uuidv4(),
            label: locationMarker,
          },
        ]);
      });
    }
  };

  useEffect(() => {
    getMap2();
  }, [value]);

  useEffect(() => {
    setRealToggle(valueToggle);
  }, [valueToggle]);

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
      {realToggle && <Instruction showDirect={showDirect} />}
    </div>
  );
}

export default App;
