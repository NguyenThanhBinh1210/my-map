import React from "react";
import InstructionHeader from "./InstructionHeader";
import InstructionMain from "./InstructionMain";
import { Stack } from "@mui/material";
import "./instruction.css";

const Instruction = ({ showDirect }) => {
  return (
    <>
      <Stack
        className="instruction"
        sx={{
          transform: showDirect ? "" : "translateX(-100%)",
        }}
      >
        <Stack
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
