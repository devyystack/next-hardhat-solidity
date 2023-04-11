import { Box, Typography, Chip } from "@mui/material";
import { Image } from "../..";

export default function CustomChip({
  title,
  value,
  index,
  properties,
  setProperties,
  isDelete,
}) {
  const removePropertiesData = (indexValue) => {
    const updateProperties = [...properties]; // make a separate copy of the array
    if (indexValue !== -1 && updateProperties.length > 1) {
      updateProperties.splice(indexValue, 1);
      setProperties(updateProperties);
    } else {
      updateProperties.splice(indexValue, 1);
      setProperties([{ name: "", type: "" }]);
    }
  };
  return isDelete ? (
    <Chip
      label={
        <Box textAlign={"center"} height="auto">
          <Box>
            <Typography variant="body3">{title}</Typography>
          </Box>
          <Box>
            <Typography variant="h6" whiteSpace={"pre-wrap"}>
              {value}
            </Typography>
          </Box>
        </Box>
      }
      variant="filled"
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    />
  ) : (
    <Chip
      label={
        <Box textAlign={"center"} height="auto">
          <Box>
            <Typography variant="body3">{title}</Typography>
          </Box>
          <Box>
            <Typography variant="h6" whiteSpace={"pre-wrap"}>
              {value}
            </Typography>
          </Box>
        </Box>
      }
      variant="filled"
      onDelete={() => removePropertiesData(index)}
      deleteIcon={
        <Image src="/assets/images/svgs/crossicon.svg" sx={{ pl: 1 }} />
      }
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    />
  );
}
