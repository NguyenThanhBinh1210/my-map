import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import { setMore } from "../../redux/features/moreSlice";
import { useDispatch, useSelector } from "react-redux";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { setSuccess } from "../../redux/features/suggestSlice";
import "./loadmore.css";
const Loadmore = () => {
  const { value: valueMore } = useSelector((state) => state.more);
  const dispatch = useDispatch();
  const [loadmore, setLoadmore] = useState(true);
  const handleLoadMore = () => {
    setLoadmore(!loadmore);
    dispatch(setMore(loadmore));
    dispatch(setSuccess(false));
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
