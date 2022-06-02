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

const data = [
  {
    id: uuidv4(),
    content: "Chọn điểm đi",
  },
  {
    id: uuidv4(),
    content: "Chọn điểm đến",
  },
];
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
  ];

  const [items, setItems] = useState([]);
  const [listValue, setListValue] = useState([]);
  const [visible, setVisible] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [height, setHeight] = useState(100);
  const [active, setActive] = useState("");

  const handleVisible = (e) => {
    setVisible(true);
  };
  const handleNotVisible = () => {
    setVisible(false);
  };
  useEffect(() => {
    setItems(data);
  }, []);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
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
  const handleAddList = (_, value) => {
    setListValue([...listValue, value]);
    if (listValue.length > 0) {
      setShowAdd(true);
    }
    // console.log(listValue);
  };
  const handleDeleteLocation = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    setHeight(height - 50);
    setActive("");
  };
  const handleSwap = () => {
    const newItems = [...items];
    const tmp = newItems[0];
    newItems[0] = newItems[1];
    newItems[1] = tmp;
    setItems(newItems);
  };
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
                          direction="row"
                          spacing={1}
                          onMouseOver={() => setActive(item.id)}
                          onMouseOut={() => setActive("")}
                          sx={{
                            width: 400,
                            display: "flex",
                            alignItems: "flex-end",
                            marginLeft: "10px",
                            paddingLeft: "30px",
                            zIndex: 100,
                            position: "relative",
                          }}
                        >
                          <Autocomplete
                            className="autocomplete-css"
                            sx={{
                              width: 320,
                              display: "flex",
                            }}
                            onChange={handleAddList}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            id="open-on-focus"
                            options={top100Films}
                            renderOption={(props, option) => (
                              <Box
                                component="li"
                                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                {...props}
                              >
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
                              onClick={() => handleDeleteLocation(index)}
                              style={{
                                position: "absolute",
                                top: "10px",
                                right: "40px",
                                backgroundColor: "transparent",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
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
        <Stack
          onClick={handleAddInput}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            cursor: "pointer",
            marginBottom: "10px",
            transform: "translateX(10px)",
          }}
        >
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
      <Stack
        direction="row"
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "300px",
          backgroundColor: "white",
          margin: "15px auto",
          // paddingTop: "100px",
          borderRadius: "5px",
          overflow: "hidden",
          marginTop: "auto",
        }}
      >
        <Box
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "rgb(123, 123, 123)",
            fontSize: "12px",
            width: "80px",
          }}
        >
          <button
            className="button-search"
            style={{
              width: "100%",
              color: "rgb(123, 123, 123)",
              padding: "10px",
              outline: "none",
              border: "none",
              cursor: "pointer",
              transition: "all 300ms ease",
            }}
          >
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
