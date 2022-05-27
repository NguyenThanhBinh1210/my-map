import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Address from "../Address/Address";
import Input from "../Input/Input";
import Loadmore from "../Loadmore/Loadmore";
import Suggest from "../suggest/Suggest";
import { setSuccess } from "../../redux/features/suggestSlice";
import { useDispatch } from "react-redux";

const Direct = () => {
  const { value: successValue } = useSelector((state) => state.suggest);
  const dispatch = useDispatch();
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
        transition: "height 300ms ease",
        backgroundColor: realValue ? "white" : "",
        height: realValue ? "100vh" : "",
        padding: "5px",
      }}
    >
      <Input></Input>
      {show && <Address></Address>}
      {successValue || show ? <Suggest></Suggest> : null}
      <Loadmore></Loadmore>
    </Stack>
  );
};

export default Direct;
