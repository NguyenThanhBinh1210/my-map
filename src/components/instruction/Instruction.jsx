import React, { useEffect, useState } from "react";
import InstructionHeader from "./InstructionHeader";
import InstructionMain from "./InstructionMain";
import { Stack } from "@mui/material";
import "./instruction.css";
import { getPolyline } from "../../constants/getPolyline";
import { getMarker } from "../../constants/getMarker";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setLocations } from "../../redux/features/locationSlice";
import { useDispatch } from "react-redux";

const Instruction = ({ showDirect }) => {
  const dispatch = useDispatch();
  const [listValue, setListValue] = useState([]);
  const { value: inputValue } = useSelector((state) => state.input);
  const { value: valueMap } = useSelector((state) => state.map);
  const { value: valuePolyline } = useSelector((state) => state.polyline);
  const [listLocation, setListLocation] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [polylineGlobal, setPolylineGlobal] = useState();
  const [values, setValues] = useState([]);
  const [listMarker, setListMarker] = useState([]);

  /* Vẽ polyline */
  useEffect(() => {
    let polyline = new map4d.Polyline({
      path: inputValue.length > 1 ? valuePolyline : [],
      strokeColor: "#508ff4",
      strokeOpacity: 0.9,
      strokeWidth: 8,
    });
    setPolylineGlobal(polyline);
    getPolyline(polylineGlobal, polyline, valueMap, values, showAdd);
  }, [values, valuePolyline]);

  /* Vẽ marker */
  useEffect(() => {
    getMarker(
      valueMap,
      setListLocation,
      uuidv4,
      setValues,
      values,
      listMarker,
      setListMarker
    );
  }, [values]);

  /* @@ */
  useEffect(() => {
    if (values.length >= 2) {
      const realValue = values.map((item) => item?.label);
      setListValue(realValue);
    }
  }, [values]);

  useEffect(() => {
    dispatch(setLocations(listLocation));
  }, [listLocation]);

  return (
    <>
      <Stack
        className="instruction"
        sx={{ transform: showDirect ? "" : "translateX(-100%)" }}
      >
        <Stack p={1} sx={{ backgroundColor: "rgb(80, 143, 244)" }}>
          <InstructionHeader></InstructionHeader>
          <InstructionMain
            values={values}
            setValues={setValues}
            listValue={listValue}
            setListValue={setListValue}
            setShowAdd={setShowAdd}
            showAdd={showAdd}
            listMarker={listMarker}
            setListMarker={setListMarker}
          ></InstructionMain>
        </Stack>
      </Stack>
    </>
  );
};

export default Instruction;
