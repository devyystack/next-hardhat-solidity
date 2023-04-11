import React, { useState, useEffect } from "react";

// mui
import {
  Grid,
  Box,
  Card,
  Typography,
  Autocomplete,
  TextField,
  Select,
  OutlinedInput,
  InputLabel,
  MenuItem,
} from "@mui/material";

import { getUserCookie } from "../../utils/getCookies";

// API
import { getCategories } from "../../apis";
export default function CollectionCategory({ category, setCategory }) {
  const [categoriesData, setCategoriesData] = useState([]);
  const [token, setToken] = useState("");

  useEffect(async () => {
    const categories = await getCategories();
    if (categories?.data?.data?.length > 0) {
      setCategoriesData(categories?.data?.data);
    } else {
      return;
    }
  }, [category]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <Typography variant="h6">Category</Typography>
      <Box display="flex">
        <Typography variant="body1">
          Add your category here to place your collection in relevant category.
        </Typography>
      </Box>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        value={category === "" ? "none" : category}
        onChange={handleChange}
        input={<OutlinedInput />}
        sx={{ width: "100%" }}
      >
        <MenuItem key="0" disabled value="none">
          Select Category
        </MenuItem>

        {categoriesData?.map((data, index) => (
          <MenuItem key={index} value={data?._id}>
            {data?.category_name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
