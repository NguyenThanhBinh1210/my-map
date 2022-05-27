import React from "react";
import InstructionHeader from "./InstructionHeader";
import InstructionMain from "./InstructionMain";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { setToggle } from "../../redux/features/toggleSlice";

const Instruction = () => {
  return (
    <>
      <Stack
        maxWidth="420px"
        position="fixed"
        top="0"
        left="0"
        zIndex={100}
        boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
        sx={{
          backgroundColor: "white",
          width: "100%",
          height: "100vh",
        }}
      >
        <Stack
          height="200px"
          p={1}
          sx={{
            backgroundColor: "rgb(80, 143, 244)",
          }}
        >
          <InstructionHeader></InstructionHeader>
          <InstructionMain></InstructionMain>
        </Stack>
      </Stack>
    </>
  );
};

export default Instruction;
