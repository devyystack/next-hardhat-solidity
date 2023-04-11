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
export default function PropertiesInput({
  name,
  type,
  index,
  updatePropertiesData,
  removePropertiesData,
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
            onClick={() => removePropertiesData(index)}
          >
            <Image src="/assets/images/svgs/andornmentClose.svg" />
          </Box>
          <TextField
            fullWidth
            placeholder="Male"
            variant="standard"
            value={name}
            onChange={(e) =>
              updatePropertiesData(index, {
                name: e.target.value,
              })
            }
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
          Type
        </Typography>
        <TextField
          fullWidth
          placeholder="Character"
          variant="standard"
          value={type}
          onChange={(e) =>
            updatePropertiesData(index, {
              type: e.target.value,
            })
          }
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
          }}
        />
      </Grid>
    </Grid>
  );
}
