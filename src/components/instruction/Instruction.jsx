import React, { useState } from "react";
import InstructionHeader from "./InstructionHeader";
import InstructionMain from "./InstructionMain";
import { Stack } from "@mui/material";
import "./instruction.css";

const Instruction = ({ showDirect }) => {
  const [mode, setMode] = useState("car");
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
          <InstructionHeader setMode={setMode}></InstructionHeader>
          <InstructionMain mode={mode}></InstructionMain>
        </Stack>
      </Stack>
    </>
  );
};

export default Instruction;
