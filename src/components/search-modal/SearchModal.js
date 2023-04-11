import React, { useState, useCallback, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Divider,
  Stack,
  Card,
  TextField,
} from "@mui/material";
import Routes from "src/routes";
import { CustomModal, LoadingModal, AvatarTypo } from "../../components/shared";
import _debounce from "lodash/debounce";
import { getUserCookie } from "../../utils/getCookies";
import { converter } from "../../utils/ethConverter";
import { toast } from "react-toastify";
import moment from "moment";
import { mainSearch } from "../../apis";
import { useAppContext } from "src/context-api/appContext";
import { toFixedNumber } from "../../utils/formatNumber";
export default function SearchModal({
  openSearchModal,
  handleSearchModalClose,
}) {
  const { state } = useAppContext();
  const { userData } = state;
  const [search, setSearch] = useState("");
  const [data, setData] = useState(undefined);
  const debounce = useCallback(
    _debounce(async function (value) {
      if (value !== "") {
        const result = await mainSearch(value);
        if (result?.data?.is_success) setData(result?.data?.data);
      } else {
        setData("");
      }
    }, 500),
    []
  );

  const handleSearch = (value) => {
    setSearch(value);
    debounce(value);
  };

  useEffect(() => {
    if (!openSearchModal) setSearch("");
  }, [openSearchModal]);
  return (
    <>
      <CustomModal
        openModal={openSearchModal}
        handleClose={handleSearchModalClose}
      >
        <Box
          display="flex"
          justifyContent={"center"}
          flexDirection="column"
          alignItems={"center"}
          textAlign="center"
        >
          <Typography gutterBottom variant="h4">
            Search NFTs & Collections
          </Typography>
        </Box>
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          placeholder="Search..."
          variant="outlined"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{ width: "100%" }}
        />
        {data && data?.nftSearch?.count > 0 ? (
          <Card sx={{ marginTop: "5px" }}>
            <Box width={"100%"} height="auto" p="20px">
              <Typography variant="h6"> NFT's</Typography>
              <Divider sx={{ height: 10, mb: 1 }} />
              {data &&
                data?.nftSearch?.count > 0 &&
                data?.nftSearch?.results.map((nft, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        handleSearchModalClose();
                        setSearch("");
                        setData(undefined);
                      }}
                    >
                      <AvatarTypo
                        src={
                          nft?.profile_image
                            ? process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                              nft?.profile_image
                            : "/assets/images/svgs/avatar1.svg"
                        }
                        text={nft?.nft_name}
                        slice={false}
                        isLight={true}
                        opacity={false}
                        isColored={false}
                        link={`${Routes.nfts}/${nft?._id}`}
                      />

                      <Divider sx={{ height: 10, mb: 1 }} />
                    </Box>
                  );
                })}
            </Box>
          </Card>
        ) : null}
        {data && data?.collectionSearch?.count > 0 ? (
          <Card sx={{ marginTop: "5px" }}>
            <Box width={"100%"} height="auto" p="20px">
              <Typography variant="h6"> Collection's</Typography>
              <Divider sx={{ height: 10, mb: 1 }} />
              {data &&
                data?.collectionSearch?.count > 0 &&
                data?.collectionSearch?.results.map((collection, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        handleSearchModalClose();
                        setSearch("");
                        setData(undefined);
                      }}
                    >
                      <AvatarTypo
                        src={
                          collection?.profile_image
                            ? process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                              collection?.profile_image
                            : "/assets/images/svgs/avatar1.svg"
                        }
                        text={collection?.collection_name}
                        slice={false}
                        isLight={true}
                        opacity={false}
                        isColored={false}
                        link={`/collection-detail/${collection?._id}`}
                      />
                      <Divider sx={{ height: 10, mb: 1 }} />
                    </Box>
                  );
                })}
            </Box>
          </Card>
        ) : null}
      </CustomModal>
    </>
  );
}
