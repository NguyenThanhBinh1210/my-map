import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import ListIconRender from "./Main/ListIconRender";
import { useSelector } from "react-redux";
import { setPolyline } from "../../redux/features/polylineSlice";
import { useDispatch } from "react-redux";
import MainSelected from "./Main/MainSelected";
import MainAddInput from "./Main/MainAddInput";
import MainDragDrop from "./Main/MainDragDrop";

const InstructionMain = () => {
  const [listValue, setListValue] = useState([]);
  const [router, setRouter] = useState([]);
  const [weighting, setWeighting] = useState(1);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [points, setPoints] = useState("");
  const [items, setItems] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [height, setHeight] = useState(100);
  const dispatch = useDispatch();
  const { value: modeValue } = useSelector((state) => state.mode);
  const listRouter = router?.result?.routes;

  const handleAddInput = () => {
    setShowAdd(false);
    setItems([
      ...items,
      {
        id: uuidv4(),
        content: "Chọn điểm đến",
      },
    ]);
    setHeight(height + 50);
  };

  const handleSwap = () => {
    if (listValue.length === 2 && listValue.every((item) => item !== null)) {
      const newItems = [...items];
      const newValue = [...listValue];
      const tmp1 = newItems[0];
      newItems[0] = newItems[1];
      newItems[1] = tmp1;
      const tmp2 = newValue[0];
      newValue[0] = newValue[1];
      newValue[1] = tmp2;
      setItems(newItems);
      setListValue(newValue);
    }
  };

  /* Lấy dữ liệu lng, lat trả về từ API */
  useEffect(() => {
    if (listRouter) {
      const listSteps = listRouter[0]?.legs[0]?.steps;
      const listPolyline = listSteps?.map((step) => {
        return [step.startLocation.lng, step.startLocation.lat];
      });
      dispatch(setPolyline(listPolyline));
    }
    if (router?.result?.routes.length > 1) {
      console.log("nammo");
    }
  }, [router]);

  /* Tạo diểm đầu và điểm cuối cho Router */
  useEffect(() => {
    if (listValue.length !== 0) {
      if (listValue[0]) {
        const realStart = listValue[0].split(" ").join("");
        setStart(realStart);
        if (listValue[listValue.length - 1]) {
          const realEnd = listValue[listValue.length - 1].split(" ").join("");
          setEnd(realEnd);
        }
      }
    }
  }, [listValue]);

  /* Kết nối API Router */
  useEffect(() => {
    if (start || end) {
      async function getResults() {
        const results = await axios(
          `http://api.map4d.vn/sdk/route?key=c806ce773871e686ff4c5429d1ac56a6&origin=${start}&destination=${end}&points=${points}&mode=${modeValue}&weighting=${weighting}`
        );
        setRouter(results.data);
      }
      getResults();
    }
  }, [start, end, modeValue, weighting, points]);
  return (
    <>
      <div className="main_content">
        <MainDragDrop
          height={height}
          setHeight={setHeight}
          items={items}
          setShowAdd={setShowAdd}
          listValue={listValue}
          setListValue={setListValue}
          setItems={setItems}
        ></MainDragDrop>
      </div>
      <ListIconRender items={items} handleSwap={handleSwap}></ListIconRender>
      {showAdd && items.length < 6 ? (
        <MainAddInput handleAddInput={handleAddInput}></MainAddInput>
      ) : null}
      <MainSelected setWeighting={setWeighting}></MainSelected>
    </>
  );
};

export default InstructionMain;
