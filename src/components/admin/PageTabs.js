import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

import { useRouter } from "next/router";

export default function PageTabs({ lists, handle, value, path }) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider", px: 0 }}>
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
              <Link href={{ query: { tab: tab.text } }} key={index}>
                <Tab
                  selected={router.query.tab}
                  label={tab.text}
                  icon={
                    tab.src && (
                      <img src={tab.src} style={{ maxWidth: "25px" }} />
                    )
                  }
                  sx={{ minWidth: "170px", fontSize: "1.25rem" }}
                />
              </Link>
            );
          })}
      </Tabs>
    </Box>
  );
}
