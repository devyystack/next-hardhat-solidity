import React, { useState, useEffect } from "react";

// mui
import { Box, Grid, Typography, Card } from "@mui/material";

// shared
import { Image } from "../";
import { ImageBox } from "../shared";
import "/node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";
export default function Preview({
  isCollection,
  selectedFiles,
  selectedImageFiles,
  loading,
  bannerHash,
  profileImageHash,
  imageType,
  setImageType,
}) {
  //*************************************/
  // Preview Banner
  //*************************************/
  // const [bannerHash, setBannerHash] = useState("");
  const [previewBanner, setPreviewBanner] = useState(undefined);
  useEffect(() => {
    if (bannerHash) {
      const url = process.env.NEXT_PUBLIC_PINATA_BASE_URL + bannerHash;
      setPreviewBanner(url);
    } else {
      if (selectedFiles === null) return;
      if (!selectedFiles) {
        setPreviewBanner(undefined);
        return;
      }
      const objectUrl = URL.createObjectURL(selectedFiles);
      setPreviewBanner(objectUrl);
    }

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFiles, bannerHash]);

  //*************************************/
  // Preview Image
  //*************************************/
  const [previewImage, setPreviewImage] = useState(undefined);
  useEffect(() => {
    if (profileImageHash) {
      const url = process.env.NEXT_PUBLIC_PINATA_BASE_URL + profileImageHash;
      setPreviewImage(url);
    } else {
      if (selectedImageFiles === null) return;
      if (!selectedImageFiles) {
        setPreviewImage(undefined);
        return;
      }
      const checkType = selectedImageFiles.type;
      if (checkType === "video/mp4") {
        setImageType("video");
      } else {
        setImageType("image");
      }
      const objectUrl = URL.createObjectURL(selectedImageFiles);
      setPreviewImage(objectUrl);
    }

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImageFiles, profileImageHash]);

  //*************************************/
  // Image Preview Handler
  //*************************************/
  function handlerPreview(image) {
    return image ? image : "";
  }
  return (
    <Card sx={{ minHeight: "311px", height: "100%" }}>
      <Grid container sx={{ p: "17px 41px 0px 41px", height: "100%" }}>
        <Grid item xs={12} display="flex" flexDirection={"column"}>
          <Typography variant="h5">Preview</Typography>
          <Typography variant="body3">
            Your Uploaded Image, Video, or 3D Model.{" "}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
        >
          {isCollection ? (
            <ImageBox
              loading={loading}
              isAvatar={handlerPreview(previewImage)}
              isCover
              coverImage={handlerPreview(previewBanner)}
            />
          ) : (
            <Box
              sx={{
                width: "250px",
                height: "240px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {previewImage ? (
                imageType === "video" ? (
                  <Player
                    playsInline
                    src={previewImage}
                    fluid={false}
                    width={250}
                    height={200}
                  />
                ) : (
                  <Image
                    src={
                      previewImage
                        ? handlerPreview(previewImage)
                        : "/assets/images/svgs/previewImage.svg"
                    }
                    sx={{ height: "100%", width: "100%", p: 3 }}
                  />
                )
              ) : (
                <Image
                  src={"/assets/images/svgs/previewImage.svg"}
                  sx={{ height: "100%", width: "100%", p: 3 }}
                />
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
