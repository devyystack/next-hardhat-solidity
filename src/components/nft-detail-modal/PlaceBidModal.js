import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Divider,
  Stack,
  Card,
  TextField,
  Grid,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { CustomModal, LoadingModal } from "../../components/shared";
import { Image } from "../../components";
// NFT
import web3Connection from "../../utils/web3Connection";
import contract721 from "../../artifacts/contracts/etherum/etherum.json";
import contract1155 from "../../artifacts/contracts/etherum/etherum1155.json";
import {
  placeBidOnLazyMintedNFT721,
  placeBidNFT721,
  getHeighestIndexValue,
} from "../../apis/blockchain/BlockChain";
import { getUserCookie } from "../../utils/getCookies";
import { converter } from "../../utils/ethConverter";
import { percentage } from "../../utils/percentageCalc";
import { toast } from "react-toastify";
import moment from "moment";
import { STAGE_PERCENTAGE, STAGE_BID_PERCENTAGE } from "../../config";
import { createBid, getAllBidsByActivityId, getBidsByNftId } from "../../apis";
import { useAppContext } from "src/context-api/appContext";
import subString from "../../utils/subString";
import { toFixedNumber } from "../../utils/formatNumber";
export default function PlaceBidModal({
  openSuccessModal,
  handleSuccessModalClose,
}) {
  const { state, dispatch } = useAppContext();
  const { userData } = state;
  const [nftValue, setNftValue] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [activities, setActivities] = useState("");
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
  const [accountAddress, setAccountAddress] = useState("");
  const [image, setImage] = useState("");
  const [bidPrice, setBidPrice] = useState("");
  const [activity, setActivity] = useState("");
  const [imageType, setImageType] = useState("");
  const [ownerData, setOwnerData] = useState(null);
  useEffect(async () => {
    const token = getUserCookie();
    if (token) {
      const web3 = await web3Connection();
      const accounts = await web3.eth.getAccounts();
      const accountAddress = accounts[0];
      setAccountAddress(accountAddress);
      web3.eth.getBalance(accountAddress).then((value) => {
        setBalance(converter(value, "wei", "eth"));
      });
    }
  }, [state.nftData, userData]);
  useEffect(() => {
    if (state.nftData) {
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
      setImage(state.nftData?.profile_image);
      setImageType(state.nftData?.image_type);
    }
  }, [state?.nftOwner, state.nftData]);
  useEffect(() => {
    if (ownerData) {
      const value = ownerData?.nft_price;
      setPrice(value ? converter(value, "wei", "eth") : "");
      setCheckedPutOnSale(ownerData?.put_on_sale);
      setCheckSaleType(ownerData?.sale_type);
      setBidStartDate(ownerData?.start_date);
      setBidEndDate(ownerData?.end_date);
    }
  }, [ownerData, state.nftData]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      let etherPrice =
        (state?.nftData?.bids?.length > 0 || ownerData?.nft_price) &&
        converter(
          state?.nftData?.bids.length > 0 && state?.nftData?.bids.length === 1
            ? state?.nftData?.bids[0]?.bid_price +
                percentage(
                  STAGE_BID_PERCENTAGE,
                  state?.nftData?.bids[0]?.bid_price
                )
            : state?.nftData?.bids.length > 0 &&
              state?.nftData?.bids[state?.nftData?.bids.length - 1]
            ? state?.nftData?.bids[state?.nftData?.bids.length - 1]?.bid_price +
              percentage(
                STAGE_BID_PERCENTAGE,
                state?.nftData?.bids[state?.nftData?.bids.length - 1]?.bid_price
              )
            : ownerData?.nft_price,
          "wei",
          "eth"
        );
      // let etherPrice = (bidPrice * STAGE_PERCENTAGE) / 100;
      setEthers(etherPrice);
    }
  }, [state?.nftData, ownerData]);
  const handleChangePutOnSale = (event) => {
    setCheckedPutOnSale(event.target.checked);
  };
  const handlePlaceBid = async () => {
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
        // Validations
        if (bidPrice === "") {
          return toast.error("Please enter Bid price.", { autoClose: 1000 });
        } else if (parseFloat(bidPrice) <= 0) {
          return toast.error("Bid price should be greater than 0.", {
            autoClose: 1000,
          });
        }
        if (ethers > bidPrice) {
          toast.error("Bid price should  be greater than minimum bid price.", {
            autoClose: 1000,
          });
          return;
        }
        const result = await getBidsByNftId(
          state?.nftData?._id,
          state?.nftOwner
        );
        if (result && result?.data?.data.length > 0) {
          const checkBidder =
            result?.data?.data.filter((bidder) => {
              return (
                bidder?.bidder_address.toLocaleLowerCase() ===
                accountAddress.toLocaleLowerCase()
              );
            }).length > 0;
          if (checkBidder > 0) {
            return toast.error("You have already bid on it!", {
              autoClose: 1000,
            });
          }
        }

        let endTime = ownerData?.end_date;
        let nowTime = moment.utc().format();
        const endTimeInMoment = moment(endTime); // in moment time format
        let nowTimelocal = moment.utc(nowTime).local().format();
        let secondsDiff = endTimeInMoment.diff(nowTimelocal, "miliseconds");
        if (secondsDiff < 1)
          return toast.error("Bid time out!", {
            autoClose: 1000,
          });
        if (
          state?.nftData?.contract_type === "721" &&
          ownerData?.sale_type === "time" &&
          ownerData?.put_on_sale
        ) {
          setLoadingModal(true);
          setLoadingText("Placing a bid...");
          if (mint) {
            const payload = {
              bidder_address: accountAddress.toLowerCase(),
              bid_price: bidPrice && converter(bidPrice, "eth", "wei"),
              bid_transaction: "",
              owner_address: state?.nftOwner.toLowerCase(),
              nft: state?.nftData?._id,
            };
            const transactionData = await placeBidOnLazyMintedNFT721(
              nftContract,
              creatorAddress,
              ownerData?.nft_price.toString(),
              payload?.bid_price.toString(),
              royalties,
              tokenUri,
              fileHash,
              moment(ownerData?.start_date).unix(),
              moment(ownerData?.end_date).unix(),
              accountAddress
            );
            if (transactionData) {
              setLoadingText("Please wait while you are bidding...");
              payload.bid_transaction = transactionData.transactionHash;

              const nftDataResult = await createBid(payload, token);
              //setData(nftDataResult?.data?.data[0]);
              let data = nftDataResult?.data?.data;
              dispatch({ type: "NFT_DATA", value: data[0] });
              setLoadingModal(false);
              handleSuccessModalClose();
              toast.success("Bid Placed Successfully.", { autoClose: 1000 });
            } else {
              setLoadingModal(false);
              handleSuccessModalClose();
            }
          } else {
            if (result && result?.data?.data.length > 0) {
              // const bidData = await getHeighestIndexValue(
              //   nftContract,
              //   tokenUri
              // );
              // let bccValue = bidData[1]
              //   ? converter(bidData[1], "wei", "eth")
              //   : "";
              // let percentageValue = (bccValue * 10) % 100;
              // let updatePrice =
              //   parseFloat(bccValue) + parseFloat(percentageValue);
              if (ethers > bidPrice) {
                setLoadingModal(false);
                return toast.error(
                  "Bid price should be greater than 10% of last bid price.",
                  {
                    autoClose: 1500,
                  }
                );
              }
            }

            const payload = {
              bidder_address: accountAddress.toLowerCase(),
              bid_price: bidPrice && converter(bidPrice, "eth", "wei"),
              bid_transaction: "",
              owner_address: state?.nftOwner.toLowerCase(),
              nft: state?.nftData?._id,
            };
            const transactionData = await placeBidNFT721(
              nftContract,
              tokenUri,
              payload?.bid_price.toString(),
              accountAddress
            );
            if (transactionData) {
              setLoadingText("Please wait while you are bidding...");
              payload.bid_transaction = transactionData.transactionHash;
              const nftDataResult = await createBid(payload, token);
              //setData(nftDataResult?.data?.data[0]);
              let data = nftDataResult?.data?.data;
              dispatch({ type: "NFT_DATA", value: data[0] });
              setLoadingModal(false);
              handleSuccessModalClose();
              toast.success("Bid Placed Successfully.", { autoClose: 1000 });
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
  return (
    <>
      <CustomModal
        openModal={openSuccessModal}
        handleClose={handleSuccessModalClose}
      >
        <Grid
          container
          display="flex"
          justifyContent={"center"}
          alignItems="center"
          textAlign={"center"}
        >
          <Grid item xs={12}>
            <Typography variant="h4">Place a bid</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" pt="10px">
              You are about to place a bid for <b>{state?.nftData?.nft_name}</b>{" "}
              by
              <b> {subString(accountAddress.toLocaleLowerCase())}</b>
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 1 }} />
        <Grid container>
          <Grid item xs={12} sm={6} order={{ xs: "2", sm: "1" }}>
            <Typography variant="body1">
              Minimum Bid Price is: <b>{ethers}</b>
            </Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography variant="h6">Your Bid</Typography>

            <OutlinedInput
              id="outlined-adornment-weight"
              type="number"
              value={bidPrice}
              onChange={(e) => setBidPrice(e.target.value)}
              placeholder="Enter bid amount"
              endAdornment={<InputAdornment position="end">ETH</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            justifyContent={"center"}
            flexDirection="column"
            alignItems={"center"}
            order={{ xs: "1", sm: "2" }}
          >
            <Image
              src={
                image && imageType === "video"
                  ? "/assets/images/svgs/video.svg"
                  : imageType === "image"
                  ? process.env.NEXT_PUBLIC_PINATA_BASE_URL + image
                  : "/assets/images/svgs/noteable1.svg"
              }
              sx={{ width: "153px", height: "150px" }}
            />
          </Grid>
        </Grid>
        <Divider sx={{ mt: 1 }} />
        {/* <Grid container>
          <Grid item xs={12} sm={3}>
            <Typography gutterBottom variant="h6" pt="8px">
              Your Bidding Balance
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            display="flex"
            justifyContent={{ sm: "flex-end", xs: "flex-start" }}
          >
            <Typography gutterBottom variant="h6" pt="8px">
              {bidPrice} {toFixedNumber(bidPrice, 4) && "ETH"}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 1 }} /> */}
        <Grid container>
          <Grid item xs={12} sm={3}>
            <Typography gutterBottom variant="h6" pt="8px">
              Balance
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            display="flex"
            justifyContent={{ sm: "flex-end", xs: "flex-start" }}
          >
            <Typography gutterBottom variant="h6" pt="8px">
              {toFixedNumber(balance, 4)} ETH
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 1 }} />
        {/* <Grid container>
          <Grid item xs={12} sm={4}>
            <Typography gutterBottom variant="h6">
              Service Fee 2.5%
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            display="flex"
            justifyContent={{ sm: "flex-end", xs: "flex-start" }}
          >
            <Typography gutterBottom variant="h6">
              {ethers} {toFixedNumber(ethers, 4) && "ETH"}
            </Typography>
          </Grid>
        </Grid> */}
        {/* <Divider sx={{ mb: 1 }} /> */}
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Typography gutterBottom variant="h6">
              You will pay
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            display="flex"
            justifyContent={{ sm: "flex-end", xs: "flex-start" }}
          >
            <Typography gutterBottom variant="h6">
              {bidPrice} {toFixedNumber(bidPrice, 4) && "ETH"}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mb: 1 }} />
        <Grid container>
          <Grid
            item
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            textAlign={"center"}
            xs={12}
            pb="24px"
            pt="14px"
          >
            <Button
              variant="containedInherit"
              sx={{
                minWidth: { sm: "300px", sx: "200px" },
              }}
              onClick={() => handlePlaceBid()}
            >
              Proceed
            </Button>
          </Grid>
        </Grid>
      </CustomModal>
      <LoadingModal openSuccessModal={loadingModal} text={loadingText} />
    </>
  );
}
