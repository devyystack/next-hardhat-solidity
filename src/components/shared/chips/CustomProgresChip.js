import { Chip, Box } from "@mui/material";
import { Image } from "../..";
import CustomProgressBar from "../progressbar/CustomProgressBar";

export default function CustomChip({ index, data, levels, setLevels }) {
  const removeLevels = (value) => {
    const updateLevels = [...levels]; // make a separate copy of the array
    if (value !== -1 && updateLevels.length > 1) {
      updateLevels.splice(value, 1);
      setLevels(updateLevels);
    } else {
      updateLevels.splice(value, 1);
      setLevels([{ name: "", minVal: "", maxVal: "" }]);
    }
  };
  return (
    <Chip
      label={<CustomProgressBar data={data} />}
      variant="filled"
      onDelete={() => removeLevels(index)}
      deleteIcon={
        <Image src="/assets/images/svgs/crossicon.svg" sx={{ pl: 1 }} />
      }
      sx={{ minWidth: "100%" }}
    />
  );
}
