import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DeleteIcon from "../../DeleteIcon/DeleteIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";
import { initialData } from "../../../data";
import getSuggest from "../../../constants/getSuggest";
import deleteL from "../../../constants/deleteL";
import { v4 as uuidv4 } from "uuid";

const MainDragDrop = ({
  height,
  setHeight,
  items,
  setItems,
  setShowAdd,
  listValue,
  values,
  setValues,
  suggest,
  setSuggest,
  arrText,
  setArrText,
  listMarker,
  setListMarker,
}) => {
  const realMap = useRef(null);
  realMap.current = useSelector((state) => state.map.value);
  const [active, setActive] = useState("");

  /* Kéo thả thay đổi dữ liệu */
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
      values,
      result.source.index,
      result.destination.index
    );

    const reorderedSuggest = reorder(
      suggest,
      result.source.index,
      result.destination.index
    );
    const reorderedArrText = reorder(
      arrText,
      result.source.index,
      result.destination.index
    );
    const reorderedlistMarker = reorder(
      listMarker,
      result.source.index,
      result.destination.index
    );
    if (listValue.length !== 0) {
      setValues(reorderedList);
      setItems(reorderedItems);
      setArrText(reorderedArrText);
      setSuggest(reorderedSuggest);
      setListMarker(reorderedlistMarker);
    }
  };

  /* Xóa location */
  const handleDeleteLocation = (index) => {
    deleteL(items, setItems, index);
    deleteL(values, setValues, index);
    deleteL(suggest, setSuggest, index);
    deleteL(arrText, setArrText, index);
    const newlistMarker = [...listMarker];
    newlistMarker.map((item) => {
      item.setMap(null);
      item === null;
    });
    newlistMarker.splice(index, 1);
    newlistMarker.map((item) => {
      item.setMap(realMap.current);
    });
    setListMarker(newlistMarker);
    setHeight(height - 50);
    setActive("");
    setShowAdd(true);
  };

  /* Thay đổi input và list value */
  const handleChangeInput = (index, value) => {
    if (value === null) {
      const newlistMarker = [...listMarker];
      const listTextReal = [...values];
      const newArrText = [...arrText];
      const newSuggest = [...suggest];
      newlistMarker.map((item) => {
        item?.setMap(null);
        item === null;
      });
      newlistMarker.splice(index, 1, null);
      newlistMarker.map((item) => {
        if (item !== null) {
          item.setMap(realMap.current);
        }
      });
      setListMarker(newlistMarker);
      newSuggest.splice(index, 1, null);
      listTextReal.splice(index, 1, null);
      newArrText.splice(index, 1, null);
      setValues(listTextReal);
      setArrText(newArrText);
      setSuggest(newSuggest);
      setShowAdd(false);
    } else {
      const newList = [...values];
      const newArrText = [...arrText];
      newArrText.splice(index, 1, value.address);
      newList.splice(index, 1, { id: uuidv4(), label: value.label });
      setValues(newList);
      setArrText(newArrText);
      // Tạo đối tượng marker từ MarkerOption
      let marker = new map4d.Marker(
        {
          position: value.location,
          draggable: true,
          iconView: `<div style=\"width: 10px; height: 10px; background-color: white;border: 4px solid black;border-radius:100rem; text-align: center; \"></div>`,
        },
        { marker: true }
      );
      const newlistMarker = [...listMarker];
      newlistMarker.map((item) => {
        item.setMap(null);
        item === null;
      });
      marker.setMap(realMap.current);
      newlistMarker.splice(index, 1, marker);
      newlistMarker.map((item) => {
        item.setMap(realMap.current);
      });
      setListMarker(newlistMarker);
    }
  };

  const handleChangeText = (index, value) => {
    getSuggest(index, value, suggest, setSuggest);
  };

  /* Render list input lần đầu */
  useEffect(() => {
    initialData[0].content = "Chọn điểm đi hoặc click trên bản đồ";
    setItems(initialData);
  }, []);

  /* Giới hạn add thêm input */
  useEffect(() => {
    if (values.some((value) => value === null)) {
      setShowAdd(false);
    }
    if (values.length >= 2 && !values.some((item) => item === null)) {
      setShowAdd(true);
    }
  }, [listValue, values]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="nammoadidaphat"
            style={{ height: `${height}px` }}
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
                        value={arrText[index] || null}
                        onChange={(event, value) => {
                          handleChangeInput(index, value);
                        }}
                        // inputValue={test[index] || ""}
                        onInputChange={(event, value) =>
                          // setInputSearchText(value)
                          handleChangeText(index, value)
                        }
                        options={suggest[index] || []}
                        isOptionEqualToValue={(option, value) =>
                          option !== value
                        }
                        renderOption={(props, option) =>
                          option && (
                            <Box
                              component="li"
                              {...props}
                              sx={{ display: "flex" }}
                            >
                              <LocationOnIcon
                                sx={{
                                  marginRight: "10px",
                                  color: "rgb(80, 143, 244)",
                                }}
                              />
                              <div>
                                <div className="option-name">{option.name}</div>
                                <div className="option-address">
                                  {option.address}
                                </div>
                              </div>
                            </Box>
                          )
                        }
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
