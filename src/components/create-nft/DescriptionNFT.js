import React from "react";

// mui
import { Card, Box, Grid, Typography, OutlinedInput } from "@mui/material";
import { CustomEditor } from "../shared";

// shared

export default function DescriptionNFT({
  isCollection,
  isProfile,
  editorState,
  setEditorState,
}) {
  const handleIsProfile = (profile) => {
    if (profile) {
      return "469px";
    } else {
      return "620px";
    }
  };
  return (
    <Card
      sx={{ height: isCollection ? "370px" : isProfile ? "469px" : "620px" }}
    >
      <Box padding={"49px 32px"}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">Description</Typography>
          </Grid>
          <Grid item xs={12} pt="12px">
            <OutlinedInput
              multiline
              cols="40"
              rows={isCollection ? "9" : isProfile ? "13" : "20"}
              sx={{ width: "100%", height: "100%" }}
              onChange={(e) => setEditorState(e.target.value)}
              value={editorState}
            />
            {/* Comment Custom Editor due to Client Requirnments */}
            {/* <CustomEditor
              isCollection={isCollection}
              isProfile={isProfile}
              editorState={editorState}
              setEditorState={setEditorState}
            /> */}
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
