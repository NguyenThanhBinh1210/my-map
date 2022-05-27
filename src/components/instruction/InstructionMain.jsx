import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PlaceIcon from "@mui/icons-material/Place";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  InputLabel,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  NativeSelect,
  Select,
  Tooltip,
} from "@mui/material";
import { arrayMoveImmutable } from "array-move";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Container, Draggable } from "react-smooth-dnd";

const InstructionMain = () => {
  const [items, setItems] = useState([
    {
      id: "1",
      text: "Chọn điểm đi hoặc click trên bản đồ",
      value: "",
      label: "Vị trí của tôi",
      color: "white",
    },
    {
      id: "2",
      text: "Chọn điểm đến",
      value: "",
      label: "Vị trí của tôi 2",
      color: "white",
    },
  ]);
  const onDrop = ({ removedIndex, addedIndex }) => {
    setItems((items) => arrayMoveImmutable(items, removedIndex, addedIndex));
  };

  return (
    <>
      <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
        {items.map(({ id, text, value }) => (
          <Draggable className="drag-handle" key={id}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: 400,
                display: "flex",
                alignItems: "flex-end",
                marginLeft: "10px",
                paddingLeft: "30px",
                zIndex: 100,
              }}
            >
              <Autocomplete
                className="autocomplete-css"
                sx={{ width: 320, display: "flex" }}
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
                    placeholder={text}
                    variant="standard"
                    onChange={(e) => console.log(e.target.value)}
                    sx={{
                      color: "white",
                    }}
                  />
                )}
              />
            </Stack>
          </Draggable>
        ))}
      </Container>
      <>
        <MoreVertIcon
          fontSize="small"
          sx={{
            color: "white",
            position: "absolute",
            top: "90px",
            left: "19px",
          }}
        ></MoreVertIcon>
        <Tooltip
          title="Đảo ngược điểm xuất phát và điểm đến"
          arrow
          placement="right"
        >
          <SwapVertIcon
            fontSize="large"
            sx={{
              color: "white",
              position: "absolute",
              top: "90px",
              right: "10px",
            }}
          />
        </Tooltip>
        <CircleOutlinedIcon
          fontSize="small"
          sx={{
            color: "white",
            paddingBottom: "10px",
            display: "flex",
            position: "absolute",
            top: "70px",
            left: "19px",
          }}
        />
        <PlaceIcon
          fontSize="small"
          sx={{
            color: "white",
            paddingBottom: "10px",
            position: "absolute",
            top: "110px",
            left: "19px",
          }}
        />
      </>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "300px",
          backgroundColor: "white",
          margin: "15px auto",
          borderRadius: "5px",
          overflow: "hidden",
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
const top100Films = [
  { label: "Vị trí của tôi", year: 1994, color: "white" },
  { label: "Vị trí của tôi 2", year: 1994, color: "white" },
];

export default InstructionMain;
