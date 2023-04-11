import React, { useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import { AvatarTypo } from "../../shared";

export default function AvatarDetailed({
  title,
  subtitle,
  src,
  avatarText,
  isSlice,
  isLight,
  opacity,
  isColored,
  link,
}) {
  return (
    <Box>
      <Box display={"flex"} alignItems="center">
        <Typography variant="h5" pr={1}>
          {title}
        </Typography>
        <Typography variant="body1">{subtitle}</Typography>
      </Box>
      <Box mt={3}>
        <AvatarTypo
          src={src}
          text={avatarText}
          slice={isSlice}
          isLight={isLight}
          opacity={opacity}
          isColored={isColored}
          link={link}
        />
      </Box>
    </Box>
  );
}
