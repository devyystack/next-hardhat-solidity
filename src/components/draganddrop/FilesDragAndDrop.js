import React from "react";
// mui
import { Box, Typography } from "@mui/material";
import { Image } from "../";
import { useTheme } from "@mui/material/styles";
import { validateFile } from "../../utils/imageUpload";
import { toast } from "react-toastify";

export default function FilesDragAndDrop({
  isNFT,
  isTitle,
  isBanner,
  isProfile,
  setSelectedFiles,
  setErrorMessage,
  setSelectedImageFiles,
  setErrorImageMessage,
}) {
  const theme = useTheme();
  // drag and drop file
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const checkType = files[0].type;
    console.log(checkType);
    if (checkType === "video/mp4") {
      if (isBanner) {
        setSelectedFiles(null);
        setErrorMessage("File type not permitted");
        return;
      } else if (isProfile) {
        setSelectedImageFiles(null);
        setErrorImageMessage("File type not permitted");
        return;
      } else if (isNFT) {
        if (newFiles.length) {
          handleFiles(newFiles);
        }
      }
    } else if (files.length) {
      handleFiles(files);
    }
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const { files: newFiles } = e.target;
    const checkType = newFiles[0].type;
    console.log(checkType);
    if (checkType === "video/mp4") {
      if (isBanner) {
        setSelectedFiles(null);
        setErrorMessage("File type not permitted");
        return;
      } else if (isProfile) {
        setSelectedImageFiles(null);
        setErrorImageMessage("File type not permitted");
        return;
      } else if (isNFT) {
        if (newFiles.length) {
          handleFiles(newFiles);
        }
      }
    } else if (newFiles.length) {
      handleFiles(newFiles);
    }
  };

  // handle file size
  const handleFiles = (files) => {
    for (const element of files) {
      if (validateFile(element)) {
        // add to an array so we can display the name of file
        if (isBanner) {
          setSelectedFiles(element);
        } else if (isProfile) {
          setSelectedImageFiles(element);
        } else if (isNFT) {
          setSelectedImageFiles(element);
        }
      } else {
        // add a new property called invalid
        // add to the same array so we can display the name of the file
        // set error message
        element["invalid"] = true;
        if (isBanner) {
          setSelectedFiles(null);
          setErrorMessage("File type not permitted");
        } else if (isProfile) {
          setSelectedImageFiles(null);
          setErrorImageMessage("File type not permitted");
        } else if (isNFT) {
          setSelectedImageFiles(null);
          setErrorImageMessage("File type not permitted");
        }
      }
    }
  };
  //(prevArray) => [...prevArray, element]
  return (
    <>
      <Box
        className="drop-container"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
      >
        {isTitle && (
          <Box
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            textAlign={"center"}
            pb="30px"
          >
            <Box sx={{ flexWrap: "wrap", px: { xs: "10px", sm: "70px" } }}>
              <Typography variant="body1">
                <b>
                  {isProfile ? "Profile Image" : isNFT ? "NFT" : "Logo Image"}
                </b>{" "}
                &nbsp;(
                {isNFT
                  ? "Format: .JPG, .PNG, .GIF, .SVG Size recommended 700 x 1300px"
                  : "Maximum file size 3 MB Format: .JPG, .PNG, .GIF, .SVG Size recommended 400 x 400px"}
                )
              </Typography>
            </Box>
          </Box>
        )}
        <Box>
          <Image src="/assets/images/svgs/draganddrop.svg" />
        </Box>
        <Box mt="35px" fontWeight={700} display="flex">
          <Typography variant="body3">
            {isBanner
              ? "DRAG & DROP FILE FOR YOUR BANNER OR "
              : "DRAG & DROP FILE OR "}
          </Typography>
          <Typography
            variant="body3"
            color={theme.palette.brandpurple.primary}
            component="label"
            sx={{ cursor: "pointer" }}
          >
            &nbsp; UPLOAD FROM YOUR DEVICE
            <input
              type="file"
              hidden
              onChange={(e) => uploadFile(e)}
              onClick={(e) => (e.target.value = null)}
            />
          </Typography>
        </Box>
      </Box>
      {/* <Box>
        <Box className="file-display-container">
          {selectedFiles?.map((data, i) => (
            <Box className="file-status-bar" key={i}>
              <Box>
                <Box className="file-type-logo"></Box>
                <Box className="file-type">{fileType(data.name)}</Box>
                <span
                  className={`file-name ${data.invalid ? "file-error" : ""}`}
                >
                  {data.name}
                </span>
                <span className="file-size">({fileSize(data.size)})</span>{" "}
                {data.invalid && (
                  <span className="file-error-message">({errorMessage})</span>
                )}
              </Box>
              <Box className="file-remove">X</Box>
            </Box>
          ))}
        </Box>
      </Box> */}
    </>
  );
}
