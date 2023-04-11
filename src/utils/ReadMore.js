import React, { useState, useEffect } from "react";

// mui
import { Box, Typography } from "@mui/material";

const ReadMore = ({ text, length }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  //const [description, setDescription] = useState("");
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  // useEffect(() => {
  //   if (text) setDescription(text[0]?.props?.children[0]);
  // }, [text]);

  return (
    <Box>
      <Typography variant="body1">
        {/* <span className="read-more">{text} </span> */}
        {isReadMore ? text.slice(0, length) : text}
        {text && text?.length > length && (
          <span
            onClick={toggleReadMore}
            style={{
              fontSize: "24",
              fontWeight: "700",
              color: "#692ADC",
              cursor: "pointer",
            }}
          >
            {isReadMore ? "...Read more" : "Show less"}
          </span>
        )}
      </Typography>
    </Box>
  );
};

export default ReadMore;
