import React, { useEffect, useState } from "react";
import { CustomModal } from "../../shared";
import { Typography, Box, Button, Grid, Divider, Stack } from "@mui/material";
import { Image } from "../../";
import Routes from "src/routes";
import NextLink from "next/link";
import "/node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";

export default function SuccessNFT({
  openSuccessModal,
  handleSuccessModalClose,
  image,
  imageType,
  url,
}) {
  return (
    <CustomModal
      openModal={openSuccessModal}
      handleClose={handleSuccessModalClose}
    >
      <Box
        display="flex"
        justifyContent={"center"}
        flexDirection="column"
        alignItems={"center"}
        textAlign="center"
      >
        <Typography gutterBottom variant="h4">
          Successfully Created!
        </Typography>
        {imageType === "video" ? (
          <Player
            playsInline
            src={process.env.NEXT_PUBLIC_PINATA_BASE_URL + image}
            fluid={false}
            width={480}
            height={272}
          />
        ) : (
          <Image
            src={
              image
                ? process.env.NEXT_PUBLIC_PINATA_BASE_URL + image
                : "/assets/images/svgs/noteable1.svg"
            }
            sx={{ width: "173px", height: "170px" }}
          />
        )}
        <Typography gutterBottom variant="body1" pt="20px">
          Your NFT is succussfully created. It will be minted in blockchain
          while purchasing or transferring.
        </Typography>
        {/* <Typography gutterBottom variant="h4">
          Let’s show-off a little
        </Typography> */}
      </Box>
      {/* <Stack display={'flex'} direction="row" spacing={4} justifyContent="center" pt="20px">
        <Box display={'flex'} flexDirection="column" justifyContent={'center'} alignItems="center">
          <Image src="/assets/images/svgs/facebookIcon.svg" sx={{ width: '51px' }} />
          <Typography variant="h6" pt="5px">
            Facebook
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection="column" justifyContent={'center'} alignItems="center">
          <Image src="/assets/images/svgs/instagramIcon.svg" sx={{ width: '51px' }} />
          <Typography variant="h6" pt="5px">
            Instagram
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection="column" justifyContent={'center'} alignItems="center">
          <Image src="/assets/images/svgs/twitterIcon.svg" sx={{ width: '51px' }} />
          <Typography variant="h6" pt="5px">
            Twitter
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection="column" justifyContent={'center'} alignItems="center">
          <Image src="/assets/images/svgs/discordIcon.svg" sx={{ width: '51px' }} />
          <Typography variant="h6" pt="5px">
            Discord
          </Typography>
        </Box>
      </Stack> */}
      <Divider sx={{ height: 24, mt: 2, mb: 4 }} />
      <Stack
        direction="row"
        spacing={1}
        display="flex"
        justifyContent={"center"}
        pb="24px"
      >
        <Button
          variant="containedInherit"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minWidth: "104px",
          }}
          onClick={() => window.location.reload()}
        >
          Create Another
        </Button>
        <NextLink href={`${Routes.nfts}/${url}`}>
          {/* <NextLink href={"/nfts/" + url}> */}
          <Button variant="outlinedInherit" sx={{ minWidth: "104px" }}>
            View your NFT
          </Button>
        </NextLink>
      </Stack>
    </CustomModal>
  );
}
