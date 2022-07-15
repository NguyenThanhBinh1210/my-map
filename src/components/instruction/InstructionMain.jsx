import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ListIconRender from "./Main/ListIconRender";
import { useSelector } from "react-redux";
import {
  setListPolyline,
  setPolyline,
} from "../../redux/features/polylineSlice";
import { useDispatch } from "react-redux";
import MainSelected from "./Main/MainSelected";
import MainAddInput from "./Main/MainAddInput";
import MainDragDrop from "./Main/MainDragDrop";
import getRouter from "../../constants/getRouter";
import decodePolyline from "../../constants/decodePolyline";
import swap from "../../constants/swap";

const InstructionMain = ({
  values,
  setValues,
  listValue,
  showAdd,
  setShowAdd,
  suggest,
  setSuggest,
  arrText,
  setArrText,
  listMarker,
  setListMarker,
  polylineGlobal,
  listPolylineGlobal,
}) => {
  const [router, setRouter] = useState([]);
  const realMap = useRef(null);
  realMap.current = useSelector((state) => state.map.value);
  const [weighting, setWeighting] = useState(1);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [points, setPoints] = useState("");
  const dispatch = useDispatch();
  const { value: modeValue } = useSelector((state) => state.mode);
  const listRouter = router?.result?.routes;
  const [items, setItems] = useState([]);
  const [height, setHeight] = useState(100);

  /* dispatch polyline */
  const setOverview = (value) => {
    var list = decodePolyline(value.trim(), 5);
    dispatch(setPolyline(list));
  };

  /* dispatch list polyline */
  const setListOverview = (value) => {
    const list = value.map((item) => {
      return decodePolyline(item.trim(), 5);
    });
    dispatch(setListPolyline(list));
  };

  /* Thêm 1 ô input */
  const handleAddInput = () => {
    setItems([
      ...items,
      {
        id: uuidv4(),
        content: "Chọn điểm đến",
      },
    ]);
    setHeight(height + 50);
    polylineGlobal.setMap(null);
    listPolylineGlobal?.map((item) => item?.setMap(null));
    setShowAdd(false);
  };

  /* Đổi vị trí */
  const handleSwap = () => {
    if (listValue.length === 2 && listValue.every((item) => item !== null)) {
      swap(items, setItems);
      swap(values, setValues);
      swap(arrText, setArrText);
      swap(suggest, setSuggest);
      swap(listMarker, setListMarker);
    }
  };

  /* Lấy dữ liệu lng, lat trả về từ API */
  useEffect(() => {
    if (listRouter) {
      if (listRouter?.length > 1) {
        const listOverview = router?.result?.routes.map(
          (item) => item.overviewPolyline
        );
        setListOverview(listOverview);
      }
      if (listRouter?.length === 1) {
        const overview = router?.result?.routes[0]?.overviewPolyline;
        setOverview(overview);
      }
    }
  }, [router]);

  /* Tạo diểm đầu, điểm cuối và giữa cho Router */
  useEffect(() => {
    if (listValue.length !== 0) {
      const realStart = listValue[0];
      const realEnd = listValue[listValue.length - 1];
      setStart(realStart);
      setEnd(realEnd);
      setPoints("");
      if (listValue.length > 3) {
        const other = listValue
          .slice(1, listValue.length - 1)
          .join(";")
          .replace(/\s/g, "");
        setPoints(other);
      }
      if (listValue.length === 3) {
        const other = listValue.slice(1, listValue.length - 1).join("");
        setPoints(other);
      }
    }
  }, [listValue, values]);

  /* Kết nối API Router */
  useEffect(() => {
    if (start || end) {
      getRouter(start, end, points, modeValue, weighting, setRouter);
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
          setItems={setItems}
          values={values}
          setValues={setValues}
          suggest={suggest}
          setSuggest={setSuggest}
          arrText={arrText}
          setArrText={setArrText}
          listMarker={listMarker}
          setListMarker={setListMarker}
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
