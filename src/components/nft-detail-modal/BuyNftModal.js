import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Divider,
  Stack,
  Card,
  TextField,
  Tooltip,
} from "@mui/material";
import { CustomModal, LoadingModal } from "../../components/shared";
// NFT
import web3Connection from "../../utils/web3Connection";
import contract721 from "../../artifacts/contracts/etherum/etherum.json";
import contract1155 from "../../artifacts/contracts/etherum/etherum1155.json";
import {
  buyLazyMintedNft721,
  purchaseNftForFixPrice721,
  purchaseNftForFixPrice1155,
  checkMintedNFTs,
  buyLazyMintedNft1155,
} from "../../apis/blockchain/BlockChain";
import { getUserCookie } from "../../utils/getCookies";
import { converter } from "../../utils/ethConverter";
import { toast } from "react-toastify";
import moment from "moment";
import { STAGE_PERCENTAGE, ERC_721, ERC_1155 } from "../../config";
import { createActivity } from "../../apis";
import { useAppContext } from "src/context-api/appContext";
import { toFixedNumber } from "../../utils/formatNumber";
export default function BuyNftModal({
  openSuccessModal,
  handleSuccessModalClose,
}) {
  const { state, dispatch } = useAppContext();
  const { userData } = state;
  const [nftValue, setNftValue] = useState("");
  const [nftPriceValue, setPriceNftValue] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [tokenUri, setTokenUri] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [mint, setMint] = useState("");
  const [creatorAddress, setCreatorAddress] = useState("");
  const [checkedPutOnSale, setCheckedPutOnSale] = useState(false);
  const [collectionType, setCollectionType] = useState("single");
  const [checkSaleType, setCheckSaleType] = useState("price");
  const [royalties, setRoyalties] = useState("");
  const [price, setPrice] = useState("");
  const [bidStartDate, setBidStartDate] = useState("");
  const [bidEndDate, setBidEndDate] = useState("");
  const [balance, setBalance] = useState("");
  const [ethers, setEthers] = useState(0);
  const [contractType, setContractType] = useState("");
  const [ownerData, setOwnerData] = useState(null);
  useEffect(async () => {
    const token = getUserCookie();
    if (token) {
      if (typeof window !== "undefined") {
        if (typeof window.ethereum !== "undefined") {
          const web3 = await web3Connection();
          if (web3 === "error") {
            return;
          }
          const accounts = await web3.eth.getAccounts();
          const accountAddress = accounts[0];
          web3.eth.getBalance(accountAddress).then((value) => {
            setBalance(converter(value, "wei", "eth"));
          });
        }
      }
    }
  }, [state.nftData, userData]);
  useEffect(() => {
    if (state?.nftData) {
      let ownerData = state?.nftData?.nft_owners.filter((data) => {
        return (
          data?.owner_address.toLowerCase() === state?.nftOwner.toLowerCase()
        );
      });
      setOwnerData(ownerData[0]);
      setTokenUri(state.nftData?.token_id);
      setMint(state.nftData?.free_mint);
      setCollectionType(state.nftData?.nft_type);
      setFileHash(state.nftData?.file_hash);
      setCreatorAddress(state.nftData?.creator_address);
      setRoyalties(state.nftData?.royalties);
      setContractType(state.nftData?.contract_type);
    }
  }, [state?.nftOwner, state.nftData]);
  useEffect(() => {
    if (ownerData) {
      const value = ownerData?.nft_price;
      setPrice(value ? converter(value, "wei", "eth") : "");
      let etherPrice = (value * STAGE_PERCENTAGE) / 100;
      setEthers(etherPrice ? converter(etherPrice, "wei", "eth") : "");
      setCheckedPutOnSale(ownerData?.put_on_sale);
      setCheckSaleType(ownerData?.sale_type);
      setBidStartDate(ownerData?.start_date);
      setBidEndDate(ownerData?.end_date);
    }
  }, [ownerData, state.nftData]);
  const handleChangePutOnSale = (event) => {
    setCheckedPutOnSale(event.target.checked);
  };
  const handleBuyNow = async () => {
    try {
      const token = getUserCookie();
      if (token) {
        // Create Wen3 Connection
        const web3 = await web3Connection();
        const accounts = await web3.eth.getAccounts();
        const accountAddress = accounts[0];
        // Get Contrat Address
        const contractAddress =
          collectionType === "single"
            ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_ETH_721
            : process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_ETH_1155;
        // Set Contract ABI File
        const nftContract =
          collectionType === "single"
            ? new web3.eth.Contract(
                JSON.parse(JSON.stringify(contract721)),
                contractAddress
              )
            : new web3.eth.Contract(
                JSON.parse(JSON.stringify(contract1155)),
                contractAddress
              );

        if (
          contractType === ERC_721 &&
          ownerData?.sale_type === "price" &&
          ownerData?.put_on_sale
        ) {
          setLoadingModal(true);
          setLoadingText("Buying nft...");
          if (mint) {
            const payload = {
              owner_address: accountAddress.toLowerCase(),
              nft_buyer: accountAddress.toLowerCase(),
              nft_seller: ownerData?.owner_address.toLowerCase(),
              copies: ownerData?.copies,
              put_on_sale: false,
              sale_type: ownerData?.sale_type,
              nft_price: ownerData?.nft_price,
              start_date: "",
              end_date: "",
              transaction_hash: "",
              nft: state?.nftData?._id,
              status: "buySell",
              free_mint: false,
              service_percentage: STAGE_PERCENTAGE,
            };
            const ethPrice = ownerData?.nft_price.toString();

            const transactionData = await buyLazyMintedNft721(
              nftContract,
              payload?.owner_address,
              tokenUri,
              fileHash,
              creatorAddress,
              royalties,
              ethPrice,
              ownerData?.nft_price.toString(),
              payload?.owner_address
            );
            if (transactionData) {
              setLoadingText("Please wait nft is transferring to you...");
              payload.transaction_hash = transactionData.transactionHash;
              const nftDataResult = await createActivity(payload, token);
              let data = nftDataResult?.data?.data;
              dispatch({ type: "NFT_DATA", value: data[0] });
              setLoadingModal(false);
              handleSuccessModalClose();
              toast.success("Buy NFT Successfully.", { autoClose: 1000 });
            } else {
              setLoadingModal(false);
              handleSuccessModalClose();
            }
          } else {
            const payload = {
              owner_address: accountAddress.toLowerCase(),
              nft_buyer: accountAddress.toLowerCase(),
              nft_seller: ownerData?.owner_address.toLowerCase(),
              copies: ownerData?.copies,
              put_on_sale: false,
              sale_type: ownerData?.sale_type,
              nft_price: ownerData?.nft_price,
              start_date: "",
              end_date: "",
              transaction_hash: "",
              nft: state?.nftData?._id,
              status: "buySell",
              free_mint: false,
              service_percentage: STAGE_PERCENTAGE,
            };
            const ethPrice = ownerData?.nft_price.toString();
            const dataBytes = "0x00";
            setLoadingText("Please wait while nft is transferring to you...");
            const transactionData = await purchaseNftForFixPrice721(
              nftContract,
              ethPrice,
              tokenUri,
              payload?.owner_address,
              dataBytes,
              payload?.owner_address
            );
            if (transactionData) {
              payload.transaction_hash = transactionData.transactionHash;
              const nftDataResult = await createActivity(payload, token);
              let data = nftDataResult?.data?.data;
              dispatch({ type: "NFT_DATA", value: data[0] });
              setLoadingModal(false);
              handleSuccessModalClose();
              toast.success("Buy NFT Successfully.", { autoClose: 1000 });
            } else {
              setLoadingModal(false);
              handleSuccessModalClose();
            }
          }
        } else if (
          contractType === ERC_1155 &&
          ownerData?.sale_type === "price" &&
          ownerData?.put_on_sale
        ) {
          if (parseInt(nftValue) > parseInt(ownerData?.copies)) {
            return toast.error("Please choose availble copies", {
              autoClose: 1500,
            });
          }
          setLoadingModal(true);
          setLoadingText("Buying nft...");
          const payload = {
            owner_address: accountAddress.toLowerCase(),
            nft_buyer: accountAddress.toLowerCase(),
            nft_seller: ownerData?.owner_address.toLowerCase(),
            copies: parseInt(nftValue),
            put_on_sale: false,
            sale_type: ownerData?.sale_type,
            nft_price: converter(nftPriceValue, "eth", "wei"),
            start_date: "",
            end_date: "",
            transaction_hash: "",
            nft: state?.nftData?._id,
            status: "buySell",
            free_mint: false,
            contract: ERC_1155,
            ownerCopies: parseInt(ownerData?.copies) - parseInt(nftValue),
            service_percentage: STAGE_PERCENTAGE,
          };
          let price = ownerData?.nft_price * parseInt(nftValue);
          payload.nft_price = price;
          const ethPrice = price.toString();
          setLoadingText("Please wait while nft is transferring to you...");
          let checkMintStatus = await checkMintedNFTs(
            nftContract,
            payload.nft_seller,
            tokenUri
          );
          let miscData = "0x00";
          if (parseInt(checkMintStatus) < 1) {
            const transactionData = await buyLazyMintedNft1155(
              nftContract,
              ethPrice,
              payload?.owner_address,
              tokenUri,
              payload?.copies,
              miscData,
              state?.nftData?.file_hash,
              ownerData?.nft_price.toString(),
              payload?.nft_seller,
              state?.nftData?.royalties
            );

            if (transactionData) {
              payload.transaction_hash = transactionData.transactionHash;
              console.log("PAU", payload);
              const nftDataResult = await createActivity(payload, token);
              let data = nftDataResult?.data?.data;
              dispatch({ type: "NFT_DATA", value: data[0] });
              setLoadingModal(false);
              handleSuccessModalClose();
              toast.success("Buy NFT Successfully.", { autoClose: 1000 });
            } else {
              setLoadingModal(false);
              handleSuccessModalClose();
            }
          } else {
            const transactionData = await purchaseNftForFixPrice1155(
              nftContract,
              ethPrice.toString(),
              payload?.nft_seller,
              payload?.owner_address,
              tokenUri,
              payload?.copies,
              payload?.owner_address
            );

            if (transactionData) {
              payload.transaction_hash = transactionData.transactionHash;
              console.log("payload", payload);
              const nftDataResult = await createActivity(payload, token);
              let data = nftDataResult?.data?.data;
              dispatch({ type: "NFT_DATA", value: data[0] });
              setLoadingModal(false);
              handleSuccessModalClose();
              toast.success("Buy NFT Successfully.", { autoClose: 1000 });
            } else {
              setLoadingModal(false);
              handleSuccessModalClose();
            }
          }
        }
      } else {
        toast.info("Please sign in again", { autoClose: 1000 });
        setLoadingModal(false);
        handleSuccessModalClose();
      }
    } catch (error) {
      console.log(error);
      setLoadingModal(false);
      handleSuccessModalClose();
    }
  };

  useEffect(() => {
    if (nftValue) {
      let priceValue = price * nftValue;
      setPriceNftValue(toFixedNumber(priceValue, 4));
    }
  }, [nftValue]);
  return (
    <>
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
            Checkout
          </Typography>
          <Typography gutterBottom variant="body1" pt="10px">
            You are about to purchase a <b>{state?.nftData?.nft_name}</b>
          </Typography>
        </Box>
        <Divider sx={{ height: 12, mb: 2 }} />

        <Box>
          {contractType && contractType === ERC_1155 && (
            <Box
              flexDirection="row"
              spacing={1}
              display="flex"
              justifyContent={"space-between"}
            >
              <Typography gutterBottom variant="h6" pt="8px">
                Enter quantity. {ownerData?.copies} available
              </Typography>

              <TextField
                hiddenLabel
                id="filled-hidden-label-normal"
                placeholder="Enter quantity"
                variant="outlined"
                sx={{ width: "40%" }}
                //value={nftValue}
                onChange={(e) => {
                  setNftValue(e.target.value);
                }}
                type="number"
              />
            </Box>
          )}

          {contractType && contractType === ERC_1155 && (
            <Divider sx={{ height: 12, mb: 2 }} />
          )}

          <Box
            flexDirection="row"
            spacing={1}
            display="flex"
            justifyContent={"space-between"}
            width="100"
          >
            <Typography gutterBottom variant="h6" pt="8px">
              Balance
            </Typography>

            <Typography gutterBottom variant="h6" pt="8px">
              {toFixedNumber(balance, 4)} ETH
            </Typography>
          </Box>

          <Divider sx={{ height: 12, mb: 2 }} />

          {/* <Box
            flexDirection="row"
            spacing={1}
            display="flex"
            justifyContent={"space-between"}
            width="100"
          >
            <Typography gutterBottom variant="h6">
              Service Fee 2.5%
            </Typography>

            <Typography gutterBottom variant="h6">
              {toFixedNumber(ethers, 4)} ETH
            </Typography>
          </Box>

          <Divider sx={{ height: 24, mb: 4 }} /> */}

          <Box
            flexDirection="row"
            spacing={1}
            display="flex"
            justifyContent={"space-between"}
            width="100"
          >
            <Typography gutterBottom variant="h6">
              You will pay
            </Typography>
            <Tooltip
              title={contractType === ERC_721 ? price : nftPriceValue}
              placement="top"
            >
              {/* <Typography gutterBottom variant="h6"> */}
              <span style={{ fontWeight: "bold", fontSize: "1.125rem" }}>
                {contractType === ERC_721
                  ? toFixedNumber(price, 4)
                  : nftPriceValue}{" "}
                ETH
              </span>
              {/* </Typography>{" "} */}
            </Tooltip>
          </Box>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          display="flex"
          justifyContent={"center"}
          pb="24px"
          pt="24px"
        >
          <Button
            variant="containedInherit"
            sx={{
              display: "flex",
              width: "300px",
              justifyContent: "center",
            }}
            onClick={() => handleBuyNow()}
          >
            Proceed
          </Button>
        </Stack>
      </CustomModal>
      <LoadingModal openSuccessModal={loadingModal} text={loadingText} />
    </>
  );
}
