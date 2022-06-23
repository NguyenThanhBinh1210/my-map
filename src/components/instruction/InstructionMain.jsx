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
import getRouter from "../../constants/getRouter";

const InstructionMain = ({
  values,
  setValues,
  listValue,
  setListValue,
  showAdd,
  setShowAdd,
  listMarker,
  setListMarker,
  listText,
  setListText,
}) => {
  const [router, setRouter] = useState([]);
  const [weighting, setWeighting] = useState(1);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [points, setPoints] = useState("");
  const dispatch = useDispatch();
  const { value: modeValue } = useSelector((state) => state.mode);
  const listRouter = router?.result?.routes;
  const [items, setItems] = useState([]);
  const [height, setHeight] = useState(100);

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
    setShowAdd(false);
  };
  /* Đổi vị trí */
  const handleSwap = () => {
    if (listValue.length === 2 && listValue.every((item) => item !== null)) {
      const newItems = [...items];
      const newValue = [...listValue];
      const newListText = [...listText];
      var tmp1 = newItems[0];
      newItems[0] = newItems[1];
      newItems[1] = tmp1;
      var tmp2 = newValue[0];
      newValue[0] = newValue[1];
      newValue[1] = tmp2;
      var tmp3 = newListText[0];
      newListText[0] = newListText[1];
      newListText[1] = tmp3;
      setItems(newItems);
      setListValue(newValue);
      setListText(newListText);
    }
  };

  /* Lấy dữ liệu lng, lat trả về từ API */
  useEffect(() => {
    if (listRouter) {
      const listLegs = listRouter[0]?.legs;
      if (listLegs.length === 1) {
        const listSteps = listLegs[0]?.steps;
        const listPolyline = listSteps?.map((step) => {
          return [step.startLocation.lng, step.startLocation.lat];
        });
        dispatch(setPolyline(listPolyline));
      }
      if (listLegs.length > 1) {
        const listPolyline = listLegs.map((item) =>
          item.steps?.map((step) => {
            return [step.startLocation.lng, step.startLocation.lat];
          })
        );
        const newListPolyline = listPolyline.flat();
        dispatch(setPolyline(newListPolyline));
      }
    }
    if (listRouter?.length > 1) {
      console.log("Có nhiều hơn 1 cách đi");
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
          setListValue={setListValue}
          setItems={setItems}
          values={values}
          setValues={setValues}
          listText={listText}
          setListText={setListText}
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
