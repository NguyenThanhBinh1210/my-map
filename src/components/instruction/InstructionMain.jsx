import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { Box, Tooltip, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ListIconRender from "./ListIconRender";
import { initialData } from "../../data";
import { useSelector } from "react-redux";
import { setPolyline } from "../../redux/features/polylineSlice";
import { useDispatch } from "react-redux";
import { setInput } from "../../redux/features/inputSlice";

const InstructionMain = ({ mode }) => {
  const dispatch = useDispatch();
  const [listValue, setListValue] = useState([]);

  const [router, setRouter] = useState([]);
  const listSteps = router?.result?.routes[0]?.legs[0]?.steps;
  const listPolyline = listSteps?.map((step) => {
    return [step.startLocation.lng, step.startLocation.lat];
  });
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const { locations } = useSelector((state) => state.location);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const [items, setItems] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const [height, setHeight] = useState(100);
  const [active, setActive] = useState("");

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
  const handleRouter = () => {
    dispatch(setPolyline(listPolyline));
  };

  useEffect(() => {
    if (listValue.length !== 0) {
      if (listValue[0]) {
        const realStart = listValue[0].split(" ").join("");
        setStart(realStart);
      }
      if (listValue[listValue.length - 1]) {
        const realEnd = listValue[listValue.length - 1].split(" ").join("");
        setEnd(realEnd);
      }
    }
  }, [listValue]);

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
  useEffect(() => {
    const someListValue = listValue.some((value) => value === null);
    if (someListValue) {
      setShowAdd(false);
    }
    dispatch(setInput(listValue));
  }, [listValue]);
  useEffect(() => {
    initialData[0].content = "Chọn điểm đi hoặc click trên bản đồ";
    setItems(initialData);
  }, []);
  useEffect(() => {
    if (start && end) {
      async function getResults() {
        const results = await axios(
          `http://api.map4d.vn/sdk/route?key=c806ce773871e686ff4c5429d1ac56a6&origin=${start}&destination=${end}&mode=${mode}`
        );
        setRouter(results.data);
      }
      getResults();
    }
  }, [start, end]);
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
                          <Tooltip title="Xóa địa điểm này" placement="right">
                            <button
                              className="button-delete-location"
                              onClick={() => handleDeleteLocation(index)}
                              style={{
                                display:
                                  item.id === active && items.length > 2
                                    ? "flex"
                                    : "none",
                              }}
                            >
                              <CloseIcon sx={{ color: "white" }}></CloseIcon>
                            </button>
                          </Tooltip>
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
        <Stack className="stack-add-input" onClick={handleAddInput}>
          <AddLocationAltIcon
            sx={{
              marginRight: "5px",
              color: "white",
              fontSize: "20px",
            }}
          />
          <Typography variant="subtext1" sx={{ color: "white" }}>
            Thêm điểm đến
          </Typography>
        </Stack>
      ) : null}
      <Stack className="stack-wrapper-search" direction="row">
        <Box className="box-wrapper-button" variant="contained">
          <button className="button-search" onClick={handleRouter}>
            Tìm kiếm
          </button>
        </Box>
        <select
          defaultValue="Cân bằng"
          id="selection"
          style={{
            flex: "1",
            outline: "none",
            border: "1px solid #ccc",
          }}
        >
          <option value="volvo">Ngắn nhất</option>
          <option value="saab">Nhanh nhất</option>
          <option value="vw">Cân bằng</option>
        </select>
      </Stack>
    </>
  );
};

export default InstructionMain;
