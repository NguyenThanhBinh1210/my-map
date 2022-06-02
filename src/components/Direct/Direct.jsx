import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Address from "../Address/Address";
import Input from "../Input/Input";
import Loadmore from "../Loadmore/Loadmore";
import Suggest from "../suggest/Suggest";
import { setSuccess } from "../../redux/features/suggestSlice";
import { useDispatch } from "react-redux";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Direct = ({ showDirect, setShowDirect }) => {
  const { value: successValue } = useSelector((state) => state.suggest);
  const dispatch = useDispatch();
  const handleShowDirect = () => {
    setShowDirect(!showDirect);
  };
  const [realValue, setRealValue] = useState(false);
  const [suggest, setSuggest] = useState(true);
  useEffect(() => {
    dispatch(setSuccess(suggest));
  }, []);
  const [show, setShow] = useState(false);
  const { value } = useSelector((state) => state.more);
  useEffect(() => {
    setRealValue(value);
  }, [value]);

  useEffect(() => {
    if (value === true) {
      setTimeout(() => {
        setShow(value);
      }, 250);
    } else {
      setShow(value);
    }
    return () => {
      clearTimeout();
    };
  }, [value]);
  return (
    <Stack
      maxWidth="410px"
      position="fixed"
      top="0"
      left="0"
      zIndex={100}
      boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
      sx={{
        width: "100%",
        transition: "all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)",
        backgroundColor: realValue ? "white" : "",
        height: realValue ? "100vh" : "",
        padding: "5px",
        transform: showDirect ? "" : "translateX(-100%)",
        // transition: "transform 300ms ease",
      }}
    >
      <Input></Input>
      {show && <Address></Address>}
      {successValue || show ? <Suggest></Suggest> : null}
      <Loadmore></Loadmore>
      {realValue && (
        <Tooltip
          title={
            showDirect ? "Thu gọn bảng điều khiển" : "Mở rộng bảng điều khiển"
          }
          placement="right"
          sx={{
            position: "absolute",
            right: "-25px",
            width: "20px",
            height: "45px",
            borderRadius: "3px",
            boxShadow: "gray 0px 0px 3px 0px",
            backgroundColor: "white",
            ":hover": {
              backgroundColor: "#ccc",
            },
          }}
        >
          <IconButton onClick={handleShowDirect}>
            {showDirect ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

export default Direct;
