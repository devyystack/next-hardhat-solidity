import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// share
import { Image } from "../../../components";

export default function CustomeTabs({ lists, handle, value, path }) {
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider", px: 4 }}>
      <Tabs
        value={value}
        path={path}
        onChange={handle}
        variant="scrollable"
        scrollButtons={false}
        TabIndicatorProps={{
          style: {
            background: theme.palette.gradients.buttongradient,
            height: 5,
            borderRadius: 50,
          },
        }}
      >
        {lists &&
          lists.length > 0 &&
          lists.map((tab, index) => {
            return (
              <Tab
                key={index}
                label={tab.text}
                icon={
                  tab.src && <img src={tab.src} style={{ maxWidth: "25px" }} />
                }
                sx={{ minWidth: "100px", fontSize: "1.25rem" }}
              />
            );
          })}
      </Tabs>
    </Box>
  );
}
