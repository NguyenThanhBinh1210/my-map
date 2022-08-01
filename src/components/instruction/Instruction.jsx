import React, { useEffect, useState } from "react";
import InstructionHeader from "./InstructionHeader";
import InstructionMain from "./InstructionMain";
import { Stack } from "@mui/material";
import "./instruction.css";
import { getPolyline } from "../../constants/getPolyline";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRef } from "react";
import { getListPolyline } from "../../constants/getListPolyline";

const Instruction = ({ showDirect }) => {
  const realMap = useRef(null);
  realMap.current = useSelector((state) => state.map.value);
  const [listValue, setListValue] = useState([]);
  const { value: valuePolyline, values: listPolyline } = useSelector(
    (state) => state.polyline
  );
  const [showAdd, setShowAdd] = useState(false);
  const [polylineGlobal, setPolylineGlobal] = useState();
  const [listPolylineGlobal, setListPolylineGlobal] = useState();
  const [values, setValues] = useState([]);
  const [listMarker, setListMarker] = useState([]);
  const [suggest, setSuggest] = useState([]);
  const [arrText, setArrText] = useState([]);
  const [location, setLocation] = useState();
  const locationMarkerReal = [];
  const [activePolyline, setActivePolyline] = useState(0);
  const [index, setIndex] = useState();
  const [eventClick, setEventClick] = useState();
  const [maxId, setMaxId] = useState();
  const idMarker = listMarker.find((item) => item?.id === maxId)?.id;
  let markerEnd = useRef();
  /* Lấy index polyline từ click polyline */
  useEffect(() => {
    if (listPolylineGlobal) {
      listPolylineGlobal.map(() => {
        realMap.current.addListener(
          "click",
          (args) => {
            const listIndex = listPolylineGlobal.map((item) => item?.id);
            const index = listIndex.indexOf(args.polyline.id);
            setActivePolyline(index);
          },
          { polyline: true }
        );
      });
    }
  }, [listPolylineGlobal]);

  /* Lấy ra id marker lớn nhất */
  useEffect(() => {
    if (listMarker) {
      const listList = listMarker.map((item) => item?.id);
      const largest = Math.max.apply(Math, listList);
      setMaxId(largest);
    }
  }, [listMarker]);

  /* Vẽ 1 polyline */
  useEffect(() => {
    let polyline = new map4d.Polyline({
      path: values.length > 1 ? valuePolyline : [],
      strokeColor: "#4289fc",
      strokeOpacity: 0.9,
      strokeWidth: 8,
    });
    setPolylineGlobal(polyline);
    getPolyline(
      polylineGlobal,
      polyline,
      realMap.current,
      values,
      listPolylineGlobal
    );
  }, [values, valuePolyline]);

  /* Vẽ nhiều polyline */
  useEffect(() => {
    const listP = listPolyline.map((valuePolyline, index) => {
      const polyline = new map4d.Polyline({
        path: values.length > 1 ? valuePolyline : [],
        strokeColor: index === activePolyline ? "#4289fc" : "#b7b7b7",
        strokeOpacity: 0.9,
        strokeWidth: 8,
        zIndex: index === activePolyline ? 100 : 0,
      });
      return polyline;
    });
    setListPolylineGlobal(listP);
    getListPolyline(
      listPolylineGlobal,
      listP,
      realMap.current,
      values,
      polylineGlobal
    );
  }, [values, listPolyline, activePolyline]);

  /* Lấy toạ độ từ click map */
  useEffect(() => {
    if (showAdd === true) {
      eventClick.remove();
    } else {
      let event = realMap.current.addListener("click", (args) => {
        setLocation(args.location);
      });
      setEventClick(event);
    }
  }, [showAdd]);

  /* Lấy index marker từ dragStart */
  useEffect(() => {
    listMarker.map(() => {
      realMap.current.addListener(
        "dragStart",
        (args) => {
          const listIndex = listMarker.map((item) => item?.id);
          setIndex(listIndex.indexOf(args.marker.id));
        },
        { marker: true }
      );
    });
  }, [listMarker]);

  /* Set lại values khi dragEnd */
  useEffect(() => {
    realMap.current.addListener(
      "dragEnd",
      (args) => {
        const newValues = [...values];
        newValues.splice(index, 1, {
          id: uuidv4(),
          label: [args.location.lat, args.location.lng].join(),
        });
        setValues(newValues);
      },
      { marker: true }
    );
  }, [values, index]);

  /* Vẽ marker */
  useEffect(() => {
    if (location) {
      let markerStart = new map4d.Marker(
        {
          position: location,
          draggable: true,
          anchor: [0.5, 1.0],
          iconView:
            // idMarker === maxId
            // `<div style=\"position: relative; display: flex; flex-direction: column;align-items: center; \"><div style=\"background-color: red;width: 20px;height: 20px;border-radius: 100rem;display: flex;justify-content: center; align-items: center; \">
            // <div style=\"width: 10px;height: 10px;background-color: gray;border-radius: 100rem;\"></div></div>
            // <div style=\"width: 0;height: 0;border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 12px solid #f00; position: absolute;bottom: 8px;\"></div>
            // <div style=\"width: 16px;height: 16px;background-color: black;border-radius: 100rem; display: flex;justify-content: center;align-items: center;\">
            // <div style=\"width: 8px; height: 8px; background-color: white;border-radius: 100rem;\"></div></div> </div>`
            `<div style=\"width: 10px; height: 10px; background-color: white;border: 4px solid black;border-radius:100rem; text-align: center; \"></div>`,
        },
        { marker: true }
      );
      markerStart.setMap(realMap.current);
      setListMarker((prev) => [...prev, markerStart]);

      const locationMarker = [location.lat, location.lng].join(", ");
      locationMarkerReal.push(locationMarker);
      let indexValue = values.findIndex((item) => item === null);
      let indexMarker = listMarker.findIndex((item) => item === null);
      if (location) {
        if (!values.some((item) => item === null)) {
          setValues((prev) => [
            ...prev,
            {
              id: uuidv4(),
              label: locationMarkerReal.join(),
            },
          ]);
        } else {
          const newValue = [...values];
          newValue.splice(indexValue, 1, {
            id: uuidv4(),
            label: locationMarkerReal.join(),
          });
          setValues(newValue);
        }
        if (listMarker.some((item) => item === null)) {
          const newMarker = [...listMarker];
          newMarker.splice(indexMarker, 1, markerStart);
          setListMarker(newMarker);
        }
      }
    }
  }, [location]);

  /* Kết nối API chuyển toạ độ thành chữ */
  useEffect(() => {
    values.map((item, index) => {
      async function getResults() {
        const results = await axios(
          `https://api.map4d.vn/sdk/v2/geocode?key=c806ce773871e686ff4c5429d1ac56a6&location=${item?.label}
              `
        );
        const newArr = [...arrText];
        newArr.splice(index, 1, results.data?.result[0]?.address);
        setArrText(newArr);
      }
      getResults();
    });

    /* Lấy label từ values */
    if (values.length >= 2) {
      const realValue = values.map((item) => item?.label);
      setListValue(realValue);
    }
  }, [values]);

  return (
    <>
      <Stack
        className="instruction"
        sx={{ transform: showDirect ? "" : "translateX(-100%)" }}
      >
        <Stack p={1} sx={{ backgroundColor: "rgb(80, 143, 244)" }}>
          <InstructionHeader
            listMarker={listMarker}
            setListMarker={setListMarker}
            polylineGlobal={polylineGlobal}
            listPolylineGlobal={listPolylineGlobal}
          ></InstructionHeader>
          <InstructionMain
            values={values}
            setValues={setValues}
            listValue={listValue}
            setShowAdd={setShowAdd}
            showAdd={showAdd}
            suggest={suggest}
            setSuggest={setSuggest}
            arrText={arrText}
            setArrText={setArrText}
            listMarker={listMarker}
            setListMarker={setListMarker}
            polylineGlobal={polylineGlobal}
            listPolylineGlobal={listPolylineGlobal}
            location={location}
          ></InstructionMain>
        </Stack>
      </Stack>
    </>
  );
};

export default Instruction;
