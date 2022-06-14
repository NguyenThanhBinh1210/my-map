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
  const { value: inputValue } = useSelector((state) => state.input);
  const { value: valueMap } = useSelector((state) => state.map);
  const { value: valuePolyline } = useSelector((state) => state.polyline);
  const [listLocation, setListLocation] = useState([]);

  useEffect(() => {
    getPolyline(valuePolyline, valueMap, inputValue);
  }, [inputValue, valuePolyline]);

  useEffect(() => {
    getMarker(valueMap, setListLocation, uuidv4);
  }, []);

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
          <InstructionMain></InstructionMain>
        </Stack>
      </Stack>
    </>
  );
};

export default Instruction;
