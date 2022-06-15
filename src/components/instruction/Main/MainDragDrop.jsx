import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DeleteIcon from "../../DeleteIcon/DeleteIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";
import { initialData } from "../../../data";
import { useDispatch } from "react-redux";
import { setInput } from "../../../redux/features/inputSlice";

const MainDragDrop = ({
  height,
  setHeight,
  items,
  setItems,
  setShowAdd,
  listValue,
  setListValue,
}) => {
  const { locations } = useSelector((state) => state.location);
  const [active, setActive] = useState("");
  const dispatch = useDispatch();

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

  /* Xóa location */
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

  /* Thay đổi input và list value */
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

  /* Render list input lần đầu */
  useEffect(() => {
    initialData[0].content = "Chọn điểm đi hoặc click trên bản đồ";
    setItems(initialData);
  }, []);

  /* Giới hạn add thêm input */
  useEffect(() => {
    const someListValue = listValue.some((value) => value === null);
    if (someListValue) {
      setShowAdd(false);
    }
    dispatch(setInput(listValue));
  }, [listValue]);
  return (
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
  );
};

export default MainDragDrop;
