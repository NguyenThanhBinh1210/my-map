import { IconButton, Stack, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Address from "../Address/Address";
import Input from "../Input/Input";
import Loadmore from "../Loadmore/Loadmore";
import Suggest from "../suggest/Suggest";
import { useDispatch } from "react-redux";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import "./direct.css";
import { setSuggest } from "../../redux/features/booleanSlice";

const Direct = ({ showDirect, setShowDirect }) => {
  const dispatch = useDispatch();
  const { valueSuggest, valueMore } = useSelector((state) => state.boolean);
  const handleShowDirect = () => {
    setShowDirect(!showDirect);
  };
  useEffect(() => {
    dispatch(setSuggest(true));
  }, []);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (valueMore === true) {
      setTimeout(() => {
        setShow(valueMore);
      }, 250);
    } else {
      setShow(valueMore);
    }
    return () => {
      clearTimeout();
    };
  }, [valueMore]);
  return (
    <Stack
      className="direct"
      sx={{
        backgroundColor: valueMore ? "white" : "",
        height: valueMore ? "100vh" : "",
        boxShadow: valueMore ? "rgba(0, 0, 0, 0.16) 0px 1px 4px" : "",
        transform: showDirect ? "" : "translateX(-100%)",
      }}
    >
      <Input></Input>
      {show && <Address></Address>}
      {valueSuggest || show ? <Suggest></Suggest> : null}
      <Loadmore></Loadmore>
      {valueMore && (
        <Tooltip
          title={
            showDirect ? "Thu gọn bảng điều khiển" : "Mở rộng bảng điều khiển"
          }
          placement="right"
          className="direct-tooltip"
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
