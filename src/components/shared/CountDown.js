import React from "react";
// import ReactDOM from 'react-dom';
import Countdown from "react-countdown";
import { Typography } from "@mui/material";

function CountDown({ time }) {
  return (
    <Countdown date={Date.now() + time}>
      <Typography variant="h6">Bidding Closed!</Typography>
    </Countdown>
  );
}

export default CountDown;
