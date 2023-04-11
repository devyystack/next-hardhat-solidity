import React from "react";
// mui
import {
  Grid,
  Box,
  Typography,
  Card,
  TextField,
  InputAdornment,
} from "@mui/material";
import Image from "src/components/Image";

export default function SocialLinks({
  webLink,
  setWebLink,
  instagramLink,
  setInstagramLink,
  twitterLink,
  setTwitterLink,
  discordLink,
  setDiscordLink,
  redditLink,
  setRedditLink,
}) {
  return (
    <Card>
      <Box padding={"49px 32px"}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">Links</Typography>
            <Box display="flex">
              <Typography variant="body1">
                Add your links here to display your collection in a better way
                to user
              </Typography>
            </Box>
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="Enter your webiste link"
              variant="outlined"
              sx={{ width: "100%", pt: "12px" }}
              value={webLink}
              onChange={(e) => setWebLink(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" component="div">
                    <div
                      style={{
                        padding: "10px 50px 10px 20px",
                        width: "26px",
                      }}
                    >
                      <Image
                        src="/assets/images/svgs/websiteIcon.svg"
                        sx={{ width: "30px" }}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="Enter your Instagram profile link"
              variant="outlined"
              sx={{ width: "100%", pt: "12px" }}
              value={instagramLink}
              onChange={(e) => setInstagramLink(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" component="div">
                    <div
                      style={{
                        padding: "10px 50px 10px 20px",
                        width: "26px",
                      }}
                    >
                      <Image
                        src="/assets/images/svgs/instagramIcon.svg"
                        sx={{ width: "30px" }}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="Enter your Twitter profile link"
              variant="outlined"
              sx={{ width: "100%", pt: "12px" }}
              value={twitterLink}
              onChange={(e) => setTwitterLink(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" component="div">
                    <div
                      style={{
                        padding: "10px 50px 10px 20px",
                        width: "26px",
                      }}
                    >
                      <Image
                        src="/assets/images/svgs/twitterIcon.svg"
                        sx={{ width: "30px" }}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="Enter your Discord profile link"
              variant="outlined"
              sx={{ width: "100%", pt: "12px" }}
              value={discordLink}
              onChange={(e) => setDiscordLink(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" component="div">
                    <div
                      style={{
                        padding: "10px 50px 10px 20px",
                        width: "26px",
                      }}
                    >
                      <Image
                        src="/assets/images/svgs/discordIcon.svg"
                        sx={{ width: "30px" }}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="Enter your reddit profile link"
              variant="outlined"
              sx={{ width: "100%", pt: "12px" }}
              value={redditLink}
              onChange={(e) => setRedditLink(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" component="div">
                    <div
                      style={{
                        padding: "10px 50px 10px 20px",
                        width: "26px",
                      }}
                    >
                      <Image
                        src="/assets/images/svgs/redditIcon.svg"
                        sx={{ width: "30px" }}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
