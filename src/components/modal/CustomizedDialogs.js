import * as React from "react";
import Button from "@mui/material/Button";
//import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { TextField, Box, Divider } from "@mui/material";

// other
import { Image } from "../";

// shared
import { CustomAutoComplete, CustomModal, SuccessModal } from "../shared";

export default function CustomizedDialogs({
  title,
  openModal,
  handleModalClickClose,
}) {
  const [buttonColor] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const handleChange = (event, value) => setSelectedOptions(value);

  //****** Modal Settings ******/
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);

  const handleSuccessModalClickClose = () => {
    setOpenSuccessModal(false);
  };
  const handleReportClick = () => {
    handleModalClickClose();
    setOpenSuccessModal(true);
  };
  return (
    <div>
      <CustomModal openModal={openModal} handleClose={handleModalClickClose}>
        <Typography gutterBottom variant="h3">
          Report this Item
        </Typography>
        <Typography gutterBottom variant="body1">
          Please select the reason below to report this NFT.
        </Typography>
        <Typography gutterBottom variant="h5" pt={3}>
          I think the item is
        </Typography>

        {/* <CustomAutoComplete
            data={topFilms}
            options={options}
            setOptions={setOptions}
            handleChange={handleChange}
          /> */}
        <Box
          width="100%"
          pt={2}
          pb={3}
          display={selectedOptions?.title === "Other" ? "block" : "none"}
        >
          <TextField
            hiddenLabel
            id="filled-hidden-label-normal"
            defaultValue="Tell us some thing details"
            variant="outlined"
            sx={{ width: "100%" }}
          />
        </Box>
        {/* </DialogContent> */}
        <Divider sx={{ height: 24, mt: 2, mb: 4 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleReportClick}
            sx={{
              width: "300px",
              height: "60px",
              background: buttonColor
                ? "linear-gradient(to right, #692adc, #4ec4ce)"
                : "#E0E0E0",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(to right, #692adc, #4ec4ce)",
                cursor: "pointer",
              },
            }}
            disabled={!selectedOptions?.title}
          >
            <Typography variant="h5">Report</Typography>
          </Button>
          <SuccessModal
            openSuccessModal={openSuccessModal}
            handleModalClickClose={handleSuccessModalClickClose}
          />
        </Box>
      </CustomModal>
    </div>
  );
}

const topFilms = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Other", year: 1994 },
];
