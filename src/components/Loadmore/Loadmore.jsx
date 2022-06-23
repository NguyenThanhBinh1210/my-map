import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./loadmore.css";
import { setMore, setSuggest } from "../../redux/features/booleanSlice";
const Loadmore = () => {
  const { valueMore } = useSelector((state) => state.boolean);
  const dispatch = useDispatch();
  const [loadmore, setLoadmore] = useState(true);
  const handleLoadMore = () => {
    setLoadmore(!loadmore);
    dispatch(setMore(loadmore));
    dispatch(setSuggest(false));
  };
  return (
    <div onClick={handleLoadMore} className="loadmore">
      <Typography
        variant="subtitle3"
        pr={1}
        sx={{
          lineHeight: "1px",
        }}
      >
        {valueMore ? "Ẩn tất cả" : "Mở rộng"}
      </Typography>
      {valueMore ? (
        <ExpandLessIcon fontSize="small" />
      ) : (
        <ExpandMoreIcon fontSize="small" />
      )}
    </div>
  );
};

export default Loadmore;
