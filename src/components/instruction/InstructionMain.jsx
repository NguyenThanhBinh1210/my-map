import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { Box, Tooltip, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ListIconRender from "./ListIconRender";
import { initialData } from "../../data";

const InstructionMain = () => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const getItemStyle = (_, draggableStyle) => ({
    ...draggableStyle,
  });
  const top100Films = [
    { label: "Bình", id: 1 },
    { label: "Sơn", id: 2 },
    { label: "Tú", id: 3 },
    { label: "Garena", id: 4 },
    { label: "Discord", id: 5 },
    { label: "Tiktok", id: 6 },
  ];
  const [items, setItems] = useState([]);
  const [listValue, setListValue] = useState([]);
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
    setListValue(reorderedList);
    setItems(reorderedItems);
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
    const newList = [...listValue];
    newList.splice(index, 1, value);
    setListValue(newList);

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
  }, [listValue]);
  useEffect(() => {
    initialData[0].content = "Chọn điểm đi hoặc click trên bản đồ";
    setItems(initialData);
  }, []);

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
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Stack
                          className="stack-mouse"
                          direction="row"
                          spacing={1}
                          onMouseOver={() => setActive(item.id)}
                          onMouseOut={() => setActive("")}
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
                            options={top100Films}
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
          <button className="button-search">Tìm kiếm</button>
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
