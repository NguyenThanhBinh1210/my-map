import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { Box, Tooltip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import ListIconRender from "./Main/ListIconRender";
import { initialData } from "../../data";
import { useSelector } from "react-redux";
import { setPolyline } from "../../redux/features/polylineSlice";
import { useDispatch } from "react-redux";
import { setInput } from "../../redux/features/inputSlice";
import MainSelected from "./Main/MainSelected";
import MainAddInput from "./Main/MainAddInput";
import DeleteIcon from "../DeleteIcon/DeleteIcon";

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
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  const { value: modeValue } = useSelector((state) => state.mode);
  const { locations } = useSelector((state) => state.location);
  const listRouter = router?.result?.routes;

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    const reorderedList = reorder(
      listValue,
      result.source.index,
      result.destination.index
    );
    if (listValue.length !== 0) {
      setListValue(reorderedList);
      setItems(reorderedItems);
    }
  };

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
  const handleChangeInput = (index, value) => {
    if (value === null) {
      const lastListValue = [...listValue];
      lastListValue.splice(index, 1, null);
      setListValue(lastListValue);
    }
    if (value) {
      const newList = [...listValue];
      newList.splice(index, 1, value.label);
      setListValue(newList);
    }

    if (listValue.length > 0) {
      setShowAdd(true);
    }
  };
  const handleDeleteLocation = (index) => {
    const newItems = [...items];
    const newList = [...listValue];
    newItems.splice(index, 1);
    newList.splice(index, 1);
    setItems(newItems);
    setListValue(newList);
    setHeight(height - 50);
    setActive("");
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
          if (listValue.length > 2) {
            const listOther = listValue.slice(1, listValue.length - 1);
            const splitOther = listOther.map((item) =>
              item.split(" ").join("")
            );
            const realOther = splitOther.join(";");
            // setPoints(realOther);
          }
        }
      }
    }
  }, [listValue]);

  /* Giới hạn add thêm input */
  useEffect(() => {
    const someListValue = listValue.some((value) => value === null);
    if (someListValue) {
      setShowAdd(false);
    }
    dispatch(setInput(listValue));
  }, [listValue]);

  /* Render list input lần đầu */
  useEffect(() => {
    initialData[0].content = "Chọn điểm đi hoặc click trên bản đồ";
    setItems(initialData);
  }, []);

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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="nammoadidaphat"
                style={{
                  height: `${height}px`,
                }}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Stack
                          className="stack-mouse"
                          direction="row"
                          spacing={1}
                          onMouseEnter={() => setActive(item.id)}
                          onMouseLeave={() => setActive("")}
                        >
                          <Autocomplete
                            className="autocomplete-css"
                            sx={{
                              width: 320,
                              display: "flex",
                            }}
                            onChange={(event, value) =>
                              handleChangeInput(index, value)
                            }
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            id="open-on-focus"
                            options={locations}
                            renderOption={(props, option) => (
                              <Box component="li" {...props}>
                                <LocationOnIcon
                                  sx={{
                                    marginRight: "10px",
                                    color: "rgb(80, 143, 244)",
                                  }}
                                />
                                {option.label}
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder={item.content}
                                variant="standard"
                                sx={{
                                  color: "white",
                                }}
                              />
                            )}
                          />
                          <DeleteIcon
                            title="Xóa địa điểm này"
                            handleDeleteLocation={handleDeleteLocation}
                            index={index}
                            item={item}
                            active={active}
                            items={items}
                          />
                        </Stack>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
