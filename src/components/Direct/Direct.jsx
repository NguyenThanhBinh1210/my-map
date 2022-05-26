import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Address from "../Address/Address";
import Input from "../Input/Input";
import Loadmore from "../Loadmore/Loadmore";

const Direct = () => {
  const [realValue, setRealValue] = useState(false);
  const { value } = useSelector((state) => state.more);
  useEffect(() => {
    setRealValue(value);
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
      {/* <Address></Address> */}
      <Loadmore></Loadmore>
    </Stack>
  );
};

export default Direct;
