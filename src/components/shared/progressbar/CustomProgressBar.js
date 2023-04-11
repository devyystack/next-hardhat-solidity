import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2">{props.text}</Typography>
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2">{`${Math.round(
            props.minvalue
          )} of ${Math.round(props.maxvalue)}`}</Typography>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={props.value} {...props} />
      </Box>
    </>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function CustomProgressBar({ data }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const getValue = (parseInt(data?.minVal) / parseInt(data?.maxVal)) * 100;
    setProgress(getValue);
  }, [data]);
  return (
    <Box>
      <LinearProgressWithLabel
        text={data?.name}
        value={progress}
        maxvalue={data?.maxVal}
        minvalue={data?.minVal}
      />
    </Box>
  );
}
