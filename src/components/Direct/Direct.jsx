import { IconButton, Stack, Tooltip } from "@mui/material";
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
import "./direct.css";

const Direct = ({ showDirect, setShowDirect }) => {
  const dispatch = useDispatch();
  const { value: successValue } = useSelector((state) => state.suggest);
  const handleShowDirect = () => {
    setShowDirect(!showDirect);
  };
  useEffect(() => {
    dispatch(setSuccess(true));
  }, []);
  const [show, setShow] = useState(false);
  const { value: moreValue } = useSelector((state) => state.more);
  useEffect(() => {
    if (moreValue === true) {
      setTimeout(() => {
        setShow(moreValue);
      }, 250);
    } else {
      setShow(moreValue);
    }
    return () => {
      clearTimeout();
    };
  }, [moreValue]);
  return (
    <Stack
      className="direct"
      sx={{
        backgroundColor: moreValue ? "white" : "",
        height: moreValue ? "100vh" : "",
        transform: showDirect ? "" : "translateX(-100%)",
      }}
    >
      <Input></Input>
      {show && <Address></Address>}
      {successValue || show ? <Suggest></Suggest> : null}
      <Loadmore></Loadmore>
      {moreValue && (
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
