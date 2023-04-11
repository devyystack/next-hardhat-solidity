import React from "react";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Image } from "../../";
export default function LevelsInput({
  name,
  minVal,
  maxVal,
  index,
  updateLevel,
  removeLevels,
}) {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography gutterBottom variant="h5">
          Name
        </Typography>
        <Box display={"flex"}>
          <Box
            sx={{
              borderRadius: "8px 0px 0px 8px",
              borderTop: `2px solid ${theme.palette.brandpurple.primary}`,
              borderLeft: `2px solid ${theme.palette.brandpurple.primary}`,
              borderBottom: `2px solid ${theme.palette.brandpurple.primary}`,
              padding: "15px 10px",
              cursor: "pointer",
            }}
            onClick={() => removeLevels(index)}
          >
            <Image src="/assets/images/svgs/andornmentClose.svg" />
          </Box>
          <TextField
            fullWidth
            placeholder="Speed"
            value={name}
            onChange={(e) =>
              updateLevel(index, {
                name: e.target.value,
              })
            }
            variant="standard"
            InputProps={{
              style: {
                borderRadius: "0px 0px 0px 0px",
                borderTop: `2px solid ${theme.palette.brandpurple.primary}`,
                borderLeft: `2px solid ${theme.palette.brandpurple.primary}`,
                borderBottom: `2px solid ${theme.palette.brandpurple.primary}`,
                padding: "5px 10px",
              },
              disableUnderline: true,
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Typography gutterBottom variant="h5">
          Value
        </Typography>
        <Box display="flex">
          <TextField
            fullWidth
            type={"number"}
            placeholder="3"
            value={minVal}
            onChange={(e) =>
              updateLevel(index, {
                minVal: e.target.value,
              })
            }
            variant="standard"
            InputProps={{
              style: {
                borderRadius: "0px 0px 0px 0px",
                borderTop: `2px solid ${theme.palette.brandpurple.primary}`,
                //   borderRight: `2px solid ${theme.palette.brandpurple.primary}`,
                borderLeft: `2px solid ${theme.palette.brandpurple.primary}`,
                borderBottom: `2px solid ${theme.palette.brandpurple.primary}`,
                padding: "5px 10px",
              },
              disableUnderline: true,
              inputProps: { min: 0 },
            }}
          />
          <Box
            sx={{
              borderRadius: "0px 0px 0px 0px",
              borderTop: `2px solid ${theme.palette.brandpurple.primary}`,
              borderLeft: `2px solid ${theme.palette.brandpurple.primary}`,
              borderBottom: `2px solid ${theme.palette.brandpurple.primary}`,
              padding: "7px 10px",
            }}
          >
            of
          </Box>
          <TextField
            fullWidth
            type={"number"}
            value={maxVal}
            onChange={(e) =>
              updateLevel(index, {
                maxVal: e.target.value,
              })
            }
            placeholder="5"
            variant="standard"
            InputProps={{
              style: {
                borderRadius: "0px 8px 8px 0px",
                borderTop: `2px solid ${theme.palette.brandpurple.primary}`,
                borderRight: `2px solid ${theme.palette.brandpurple.primary}`,
                borderLeft: `2px solid ${theme.palette.brandpurple.primary}`,
                borderBottom: `2px solid ${theme.palette.brandpurple.primary}`,
                padding: "5px 10px",
              },
              disableUnderline: true,
              inputProps: { min: 0 },
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
