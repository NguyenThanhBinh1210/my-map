import { useState } from "react";
export default function handleSlice() {
  const [values, setValues] = useState(initialValue);

  const handleChange = (e) => {
    const type = e.target.type;
    setValues({
      ...values,
      [e.target.name]: type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  return {
    values,
    handleChange,
  };
}
