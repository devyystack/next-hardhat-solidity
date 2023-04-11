import React, { forwardRef, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Iconify } from "../../";
import { Box } from "@mui/material";

import calender from "@iconify/icons-carbon/calendar-heat-map";

const CustomInput = forwardRef((props, ref) => {
  return (
    <Box
      className="react-datepicker-ignore-onclickoutside"
      onClick={() => props.setOpen(!props.open)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <label
        onClick={() => props.setOpen(!props.open)}
        ref={ref}
        style={{ color: props.Color }}
      >
        {props.value || props.placeholder}
      </label>
      <Iconify
        icon={calender}
        onClick={() => props.setOpen(!props.open)}
        style={{ marginRight: "5px" }}
      />
    </Box>
  );
});

export default function CustomDatePicker({ datePick, setDate }) {
  const [open, setOpen] = useState(false);
  return (
    <DatePicker
      selected={datePick}
      placeholderText="Pick a Date"
      onChange={(date) => setDate(date)}
      customInput={<CustomInput setOpen={setOpen} open={open} />}
      open={open}
      onClickOutside={() => setOpen(!open)}
      onSelect={() => setOpen(!open)}
    />
  );
}
