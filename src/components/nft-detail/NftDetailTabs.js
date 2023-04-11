import * as React from "react";
import { useAppContext } from "src/context-api/appContext";
// mui
import { Card } from "@mui/material";

// shared
import { CustomeTabs } from "../shared";
import { NftDetails, NftHistory, NftBids, NftOwner } from ".";
import NftListing from "./NftListing";
export default function NftDetailTabs({ lists }) {
  const { state } = useAppContext();
  const { userData } = state;
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState(null);
  const [activity, setActivity] = React.useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Set Data for Details
  React.useEffect(() => {
    if (state.nftData) {
      setData(state.nftData);
    }
  }, [state.nftData]);
  return (
    <Card sx={{ minHeight: "540px", height: "auto", my: 5 }}>
      <CustomeTabs lists={lists} handle={handleChange} value={value} />
      {value === 0 ? (
        <NftDetails />
      ) : value === 1 ? (
        <NftHistory />
      ) : value === 2 ? (
        <NftBids id={activity?._id} />
      ) : value === 3 ? (
        <NftOwner />
      ) : (
        <NftListing />
      )}
    </Card>
  );
}
