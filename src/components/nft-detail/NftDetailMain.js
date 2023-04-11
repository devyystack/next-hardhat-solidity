import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// mui// material
import { useTheme } from "@mui/material/styles";
import { Grid, Typography, Link, Stack, Button, Box } from "@mui/material";
import { EthPriceSection, LoadingModal } from "../shared";
import { NftDetailHeading, NftDetailTabs } from "./";
import ReadMore from "../../utils/ReadMore";
import NextLink from "next/link";
import { converter } from "../../utils/ethConverter";
import { percentage } from "../../utils/percentageCalc";
import {
  STAGE_PERCENTAGE,
  ERC_721,
  ERC_1155,
  STAGE_BID_PERCENTAGE,
} from "../../config";
import ReactHtmlParser, {
  convertNodeToElement,
  processNodes,
} from "react-html-parser";

import { BuyNftModal, PlaceBidModal, DisclaimerModal } from "../../components";
import { CountDown } from "../../components/shared";

import {
  getAllActivitiesByNftId,
  createActivity,
  GetNftById,
} from "../../apis";
import { getUserCookie } from "../../utils/getCookies";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useAppContext } from "src/context-api/appContext";

// other
import Routes from "src/routes";
import moment from "moment";
import "moment-duration-format";
import DOMPurify from "dompurify";

// NFT
import web3Connection from "../../utils/web3Connection";
import contract721 from "../../artifacts/contracts/etherum/etherum.json";
import contract1155 from "../../artifacts/contracts/etherum/etherum1155.json";
import {
  removeFromSale721,
  getHeighestIndexValue,
  acceptYourHighestBid,
  removeFromSale1155,
  checkMintedNFTs,
} from "../../apis/blockchain/BlockChain";
import NftOnSaleModal from "./NftOnSaleModal";

export default function NftDetailMain() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const { state, dispatch } = useAppContext();
  const { userData } = state;
  const token = getUserCookie();
  const [openBidModal, setOpenBidModal] = useState(false);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openDisclaimerModal, setOpenDisclaimerModal] = useState(false);
  const [data, setData] = useState(null);
  const [activitiesData, setActivitiesData] = useState(null);
  const [description, setDescription] = useState("");
  const [lightButton, setLightButton] = useState("");
  const [darkButton, setDarkButton] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [openSaleModel, setOpenSaleModal] = useState(false);
  const [countDownTime, setCountDownTime] = useState("");
  const [ownerData, setOwnerData] = useState(null);
  const [ethers, setEthers] = useState(0);
  const [nftDetail, setNftDetail] = useState({
    userType: "",
    saleType: "",
    putOnSale: "",
    contractType: "",
    mintType: "",
    isSold: "",
  });
  const lists = [
    { text: "Details" },
    { text: "History" },
    { text: "Bids" },
    { text: "Owner" },
    { text: "Listing" },
  ];
  const buttons = [
    { key: "bid", value: "Place a bid" },
    { key: "buy", value: "Buy Now" },
    { key: "remove", value: "Remove from Sale" },
    { key: "sale", value: "Put on Sale" },
    { key: "edit", value: "Edit NFT" },
  ];
  function transform(node, index) {
    // return null to block certain elements
    // don't allow <span> elements
    if (node.type === "tag" && node.name === "span") {
      return null;
    }

    // Transform <ul> into <ol>
    // A node can be modified and passed to the convertNodeToElement function which will continue to render it and it's children
    if (node.type === "tag" && node.name === "ul") {
      node.name = "ol";
      return convertNodeToElement(node, index, transform);
    }

    // return an <i> element for every <b>
    // a key must be included for all elements
    if (node.type === "tag" && node.name === "b") {
      return <i key={index}>{processNodes(node.children, transform)}</i>;
    }

    // all links must open in a new window
    if (node.type === "tag" && node.name === "a") {
      node.attribs.target = "_blank";

      return convertNodeToElement(node, index, transform);
    }

    if (node.type === "tag" && node.name === "button") {
      return (
        <Button variant="contained" color="primary" key={index}>
          {processNodes(node.children, transform)}
        </Button>
      );
    }
  }
  const options = {
    decodeEntities: true,
    transform,
  };
  useEffect(async () => {
    const result = await GetNftById(id);
    let data = result?.data?.data;
    if (data && data.length > 0) {
      dispatch({ type: "NFT_DATA", value: data[0] });
    }
  }, [userData]);
  // Get data from store and set it to appropriate fields
  useEffect(async () => {
    if (state.nftData) {
      setData(state.nftData);
      // setDescription(ReactHtmlParser(state.nftData?.description, options));
      setDescription(state.nftData?.description);
      let ownerData = null;
      if (state?.nftData?.contract_type === ERC_721) {
        ownerData = state?.nftData?.nft_owners[0];
      } else {
        let reverseArray = state?.nftData?.nft_owners; //reverse(); Removed reverse array function
        if (reverseArray && reverseArray.length > 1) {
          if (token) {
            const decoded = jwt_decode(token);
            const userAddress = decoded.publicAddress.toLowerCase();
            let userData = reverseArray.filter((data) => {
              return data?.owner_address.toLowerCase() === userAddress;
            });
            if (userData.length > 0) {
              ownerData = userData[0];
            } else {
              for (const element of reverseArray) {
                if (element?.put_on_sale) {
                  ownerData = element;
                  break;
                }
              }
            }
          } else {
            for (const element of reverseArray) {
              if (element?.put_on_sale) {
                ownerData = element;
                break;
              }
            }
          }
        } else {
          ownerData = state?.nftData?.nft_owners[0];
        }
      }

      // Time Auction
      if (ownerData?.sale_type === "time") {
        let activityEndDate = ownerData?.end_date;
        let endTime = activityEndDate;
        let nowTime = moment.utc().format();
        const endTimeInMoment = moment(endTime); // in moment time format
        let nowTimeLocal = moment.utc(nowTime).local().format();
        let secondsDiff = endTimeInMoment.diff(nowTimeLocal, "miliseconds");
        setCountDownTime(secondsDiff);
      }
      setOwnerData(ownerData);
    }
  }, [state.nftData, userData]);
  // check user on the behalf token
  useEffect(() => {
    if (token && data) {
      const decoded = jwt_decode(token);
      const userAddress = decoded.publicAddress.toLowerCase();
      const contractType = data?.contract_type;
      if (contractType === ERC_721) {
        const ownerAddress = ownerData?.owner_address;
        const isOwner =
          ownerAddress.toLowerCase() === userAddress.toLowerCase();
        let saleType = ownerData?.sale_type;
        let putOnSale = ownerData?.put_on_sale;
        const isCreator =
          data?.creator_address.toLowerCase() === userAddress.toLowerCase();
        const mintType = data?.free_mint;
        const isSold = data?.is_sold;
        setUserData(
          isCreator,
          isOwner,
          saleType,
          putOnSale,
          mintType,
          contractType,
          isSold
        );
        if (ownerData?.sale_type === "time") {
          let activityEndDate = ownerData?.end_date;
          let endTime = activityEndDate;
          let nowTime = moment.utc().format();
          const endTimeInMoment = moment(endTime); // in moment time format
          let nowTimeLocal = moment.utc(nowTime).local().format();
          let secondsDiff = endTimeInMoment.diff(nowTimeLocal, "miliseconds");
          setCountDownTime(secondsDiff);
        }
      } else {
        const isCreator =
          data?.creator_address.toLowerCase() === userAddress.toLowerCase();
        const ownerAddress = ownerData?.owner_address;
        const isOwner =
          ownerAddress.toLowerCase() === userAddress.toLowerCase();
        let saleType = ownerData?.sale_type;
        let putOnSale = ownerData?.put_on_sale;
        const mintType = state?.isMinted1155; // 1155 mint status
        const isSold = data?.is_sold;
        setUserData(
          isCreator,
          isOwner,
          saleType,
          putOnSale,
          mintType,
          contractType,
          isSold
        );
      }
    }
  }, [token, userData, data]);

  // Handle Light Button
  const handleLightButton = async (key) => {
    if (typeof window.ethereum === "undefined") {
      return toast.error("Install your metamask wallet", { autoClose: 1500 });
    }
    if (!token) {
      return toast.error("Connect you wallet", { autoClose: 1500 });
    }
  };
  // Handle Dark Button
  const handleDarkButton = async (key) => {
    try {
      if (typeof window.ethereum === "undefined") {
        return toast.error("Install your metamask wallet", { autoClose: 1500 });
      }
      if (!token) {
        return toast.error("Connect you wallet", { autoClose: 1500 });
      } else {
        // Create Wen3 Connection
        const web3 = await web3Connection();
        const accounts = await web3.eth.getAccounts();
        const accountAddress = accounts[0];
        // Get Contrat Address
        let contractAddress =
          nftDetail?.contractType === ERC_721
            ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_ETH_721
            : process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_ETH_1155;
        // Set Contract ABI File
        let nftContract =
          nftDetail?.contractType === ERC_721
            ? new web3.eth.Contract(
                JSON.parse(JSON.stringify(contract721)),
                contractAddress
              )
            : new web3.eth.Contract(
                JSON.parse(JSON.stringify(contract1155)),
                contractAddress
              );
        if (key === "remove") {
          if (nftDetail?.contractType === ERC_721) {
            if (nftDetail?.mintType && nftDetail?.putOnSale) {
              const payload = {
                owner_address: accountAddress.toLowerCase(),
                copies: state?.nftData?.nft_owners[0]?.copies,
                put_on_sale: false,
                sale_type: "price",
                nft_price: "",
                start_date: "",
                end_date: "",
                transaction_hash: "",
                nft: state?.nftData?._id,
                status: "remove",
                free_mint: nftDetail?.mintType,
                bids_count: 0,
              };
              setLoadingModal(true);
              setLoadingText("Removing from sale...");
              const nftDataResult = await createActivity(payload, token);
              let data = nftDataResult?.data?.data;
              dispatch({ type: "NFT_DATA", value: data[0] });
              setLoadingModal(false);
            } else if (!nftDetail?.mintType && nftDetail?.putOnSale) {
              setLoadingModal(true);
              setLoadingText("Removing from sale...");

              const result = await removeFromSale721(
                nftContract,
                state?.nftData?.token_id,
                accountAddress
              );
              if (result) {
                const payload = {
                  owner_address: accountAddress.toLowerCase(),
                  copies: state?.nftData?.nft_owners[0]?.copies,
                  put_on_sale: false,
                  sale_type: "price",
                  nft_price: "",
                  start_date: "",
                  end_date: "",
                  transaction_hash: result?.transactionHash,
                  nft: state?.nftData?._id,
                  status: "remove",
                  free_mint: nftDetail?.mintType,
                };
                if (payload?.transaction_hash === "") return;
                const nftDataResult = await createActivity(payload, token);
                let data = nftDataResult?.data?.data;
                dispatch({ type: "NFT_DATA", value: data[0] });
                setLoadingModal(false);
                toast.success("Remove NFT from Sale successfully.", {
                  autoClose: 1000,
                });
              }
              setLoadingModal(false);
            }
          } else if (nftDetail?.contractType === ERC_1155) {
            let checkMintStatus = await checkMintedNFTs(
              nftContract,
              accountAddress,
              state?.nftData?.token_id
            );
            if (parseInt(checkMintStatus) < 1 && nftDetail?.putOnSale) {
              const payload = {
                owner_address: accountAddress.toLowerCase(),
                copies: state?.nftData?.nft_owners[0]?.copies,
                put_on_sale: false,
                sale_type: "price",
                nft_price: "",
                start_date: "",
                end_date: "",
                transaction_hash: "",
                nft: state?.nftData?._id,
                status: "remove",
                // free_mint: nftDetail?.mintType,
                bids_count: 0,
              };
              setLoadingModal(true);
              setLoadingText("Removing from sale...");
              const nftDataResult = await createActivity(payload, token);
              let data = nftDataResult?.data?.data;
              dispatch({ type: "NFT_DATA", value: data[0] });
              setLoadingModal(false);
            } else {
              setLoadingModal(true);
              setLoadingText("Removing from sale...");

              const result = await removeFromSale1155(
                nftContract,
                state?.nftData?.token_id,
                accountAddress
              );
              if (result) {
                const payload = {
                  owner_address: accountAddress.toLowerCase(),
                  copies: state?.nftData?.nft_owners[0]?.copies,
                  put_on_sale: false,
                  sale_type: "price",
                  nft_price: "",
                  start_date: "",
                  end_date: "",
                  transaction_hash: result?.transactionHash,
                  nft: state?.nftData?._id,
                  status: "remove",
                  //  free_mint: nftDetail?.mintType,
                };
                if (payload?.transaction_hash === "") return;
                const nftDataResult = await createActivity(payload, token);
                let data = nftDataResult?.data?.data;
                dispatch({ type: "NFT_DATA", value: data[0] });
                setLoadingModal(false);
                toast.success("Remove NFT from Sale successfully.", {
                  autoClose: 1000,
                });
              }
              setLoadingModal(false);
            }
          }
        } else if (key === "sale") {
          setOpenSaleModal(true);
        } else if (key === "buy") {
          if (
            state?.nftData?.free_mint === true &&
            state?.nftData?.creator_address.toLowerCase() ===
              accountAddress.toLowerCase()
          ) {
            return toast.error("You are not authorized", {
              autoClose: 1500,
            });
          }
          dispatch({ type: "NFT_OWNER", value: ownerData?.owner_address });
          if (
            ownerData?.owner_address.toLowerCase() ===
              state?.nftData?.creator_address.toLowerCase() &&
            state?.nftData?.free_mint === true
          ) {
            handleDisclaimerModalClickOpen();
          } else {
            handleBuyModalClickOpen();
          }
        } else if (key === "bid") {
          dispatch({ type: "NFT_OWNER", value: ownerData?.owner_address });
          handleBidModalClickOpen();
        }
      }
    } catch (err) {
      console.log(err);
      setLoadingModal(false);
    }
  };

  /***************  Modals Handlers*************/
  const handleBidModalClose = () => {
    setOpenBidModal(false);
  };
  const handleBuyModalClose = () => {
    setOpenBuyModal(false);
  };
  const handleCloseSaleModel = () => {
    setOpenSaleModal(false);
  };
  const handleBidModalClickOpen = () => {
    setOpenBidModal(true);
  };
  const handleBuyModalClickOpen = () => {
    setOpenBuyModal(true);
  };
  const handleDisclaimerModalClickOpen = () => {
    setOpenDisclaimerModal(true);
  };
  const handleDisclaimerModalClose = () => {
    setOpenDisclaimerModal(false);
  };
  /***********************************************/
  // Set Buttons according to data and contract type
  const setUserData = (
    isCreator,
    isOwner,
    saleType,
    putOnSale,
    mintType,
    contractType,
    isSold
  ) => {
    if (contractType === ERC_721) {
      //***************************/
      // In Case of Creator & Owner
      //***************************/
      if (isCreator && isOwner) {
        if (isSold === false) {
          if (!mintType && putOnSale) {
            handleButtons(
              "", // buttons[4],
              buttons[2],
              "admin",
              saleType,
              putOnSale,
              contractType,
              mintType
            );
          } else if (mintType && putOnSale) {
            handleButtons(
              "", // buttons[4],
              buttons[2],
              "admin",
              saleType,
              putOnSale,
              contractType,
              mintType
            );
          } else if (!mintType && !putOnSale) {
            handleButtons(
              "", // buttons[4],
              buttons[3],
              "admin",
              saleType,
              putOnSale,
              contractType,
              mintType
            );
          } else if (mintType && !putOnSale) {
            handleButtons(
              "", // buttons[4],
              buttons[3],
              "admin",
              saleType,
              putOnSale,
              contractType,
              mintType
            );
          }
        } else {
          if (!mintType && putOnSale) {
            handleButtons(
              "", // buttons[4],
              buttons[2],
              "owner",
              saleType,
              putOnSale,
              contractType,
              mintType
            );
          } else if (!mintType && !putOnSale) {
            handleButtons(
              "", // buttons[4],
              buttons[3],
              "owner",
              saleType,
              putOnSale,
              contractType,
              mintType
            );
          }
        }
      }
      //***************************/
      // In Case of User
      //***************************/
      else if (!isCreator && !isOwner) {
        if (!mintType && putOnSale) {
          if (contractType === ERC_721 && saleType === "price") {
            handleButtons(
              "",
              buttons[1],
              "user",
              saleType,
              putOnSale,
              contractType,
              mintType
            );
          } else if (contractType === ERC_721 && saleType === "time") {
            handleButtons(
              "",
              buttons[0],
              "user",
              saleType,
              putOnSale,
              contractType,
              mintType
            );
          }
        } else if (mintType && putOnSale) {
          if (contractType === ERC_721 && saleType === "price") {
            handleButtons(
              "",
              buttons[1],
              "user",
              saleType,
              putOnSale,
              contractType,
              mintType
            );
          } else if (contractType === ERC_721 && saleType === "time") {
            handleButtons(
              "",
              buttons[0],
              "user",
              saleType,
              putOnSale,
              contractType,
              mintType
            );
          }
        } else if (mintType && !putOnSale) {
          handleButtons(
            "",
            "",
            "user",
            saleType,
            putOnSale,
            contractType,
            mintType
          );
        } else if (!mintType && !putOnSale) {
          handleButtons(
            "",
            "",
            "user",
            saleType,
            putOnSale,
            contractType,
            mintType
          );
        }
      }
      //***************************/
      // In Case of Owner
      //***************************/
      else if (!isCreator && isOwner) {
        if (!mintType && putOnSale) {
          handleButtons(
            "", // buttons[4],
            buttons[2],
            "owner",
            saleType,
            putOnSale,
            contractType,
            mintType
          );
        } else if (!mintType && !putOnSale) {
          handleButtons(
            "",
            buttons[3],
            "owner",
            saleType,
            putOnSale,
            contractType,
            mintType
          );
        }
      }
      //***************************/
      // In Case of Creator
      //***************************/
      else if (isCreator && !isOwner) {
        if (!mintType && putOnSale) {
          if (contractType === ERC_721 && saleType === "price") {
            handleButtons(
              "",
              buttons[1],
              "creator",
              saleType,
              putOnSale,
              contractType,
              mintType
            );
          } else if (contractType === ERC_721 && saleType === "time") {
            handleButtons(
              "",
              buttons[0],
              "creator",
              saleType,
              putOnSale,
              contractType,
              mintType
            );
          }
        } else if (!mintType && !putOnSale) {
          handleButtons(
            "",
            "",
            "creator",
            saleType,
            putOnSale,
            contractType,
            mintType
          );
        }
      }
    } else if (contractType === ERC_1155) {
      //***************************/
      // In Case of Creator & Owner
      //***************************/
      if (isCreator && isOwner) {
        if (putOnSale) {
          handleButtons(
            "", // buttons[4],
            buttons[2],
            "admin",
            saleType,
            putOnSale,
            contractType,
            mintType
          );
        } else {
          handleButtons(
            "",
            buttons[3],
            "admin",
            saleType,
            putOnSale,
            contractType,
            mintType
          );
        }
      }
      //***************************/
      // In Case of User
      //***************************/
      else if (!isCreator && !isOwner) {
        if (putOnSale) {
          handleButtons(
            "",
            buttons[1],
            "user",
            saleType,
            putOnSale,
            contractType,
            mintType
          );
        } else {
          handleButtons(
            "",
            "",
            "user",
            saleType,
            putOnSale,
            contractType,
            mintType
          );
        }
      }
      //***************************/
      // In Case of Owner
      //***************************/
      else if (!isCreator && isOwner) {
        if (putOnSale) {
          handleButtons(
            "", // buttons[4],
            buttons[2],
            "owner",
            saleType,
            putOnSale,
            contractType,
            mintType
          );
        } else {
          handleButtons(
            "",
            buttons[3],
            "owner",
            saleType,
            putOnSale,
            contractType,
            mintType
          );
        }
      }
      //***************************/
      // In Case of Creator
      //***************************/
      else if (isCreator && !isOwner) {
        if (putOnSale) {
          handleButtons(
            "",
            buttons[1],
            "creator",
            saleType,
            putOnSale,
            contractType,
            mintType
          );
        } else {
          handleButtons(
            "",
            "",
            "creator",
            saleType,
            putOnSale,
            contractType,
            mintType
          );
        }
      }
    }
  };
  // Set Button Data according to setUserData function
  const handleButtons = (
    lightBtn,
    darkBtn,
    userType,
    saleType,
    putOnSale,
    contractType,
    mintType,
    isSold
  ) => {
    setLightButton(lightBtn);
    setDarkButton(darkBtn);
    setNftDetail({
      userType: userType,
      saleType: saleType,
      putOnSale: putOnSale,
      contractType: contractType,
      mintType: mintType,
      isSold: isSold,
    });
  };

  // Handle Highest Bid Accepted
  const handleAcceptHighestBid = async () => {
    try {
      const token = getUserCookie();
      if (token) {
        // Create Wen3 Connection
        const web3 = await web3Connection();
        const accounts = await web3.eth.getAccounts();
        const accountAddress = accounts[0];
        // Get Contrat Address
        const contractAddress =
          data?.contract_type === ERC_721
            ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_ETH_721
            : process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_ETH_1155;
        // Set Contract ABI File
        const nftContract =
          data?.contract_type === ERC_721
            ? new web3.eth.Contract(
                JSON.parse(JSON.stringify(contract721)),
                contractAddress
              )
            : new web3.eth.Contract(
                JSON.parse(JSON.stringify(contract1155)),
                contractAddress
              );
        if (parseInt(ownerData?.bids_count) < 1) {
          setLoadingModal(false);
          return toast.error("No bids available", {
            autoClose: 1500,
          });
        }
        if (data?.contract_type === ERC_721) {
          setLoadingModal(true);
          setLoadingText("Accepting highest bid...");
          const bidData = await getHeighestIndexValue(
            nftContract,
            data?.token_id
          );
          const payload = {
            owner_address: bidData[2].toLowerCase(),
            nft_buyer: bidData[2].toLowerCase(),
            nft_seller: accountAddress.toLowerCase(),
            copies: ownerData?.copies,
            put_on_sale: false,
            sale_type: ownerData?.sale_type,
            nft_price: bidData[1],
            start_date: "",
            end_date: "",
            transaction_hash: "",
            nft: data?._id,
            status: "buySell",
            free_mint: false,
            bids_count: 0,
            service_percentage: STAGE_PERCENTAGE,
          };

          setLoadingText("Please wait while nft is transferring...");
          const transactionData = await acceptYourHighestBid(
            nftContract,
            data?.token_id,
            accountAddress
          );
          if (transactionData) {
            payload.transaction_hash = transactionData.transactionHash;
            const nftDataResult = await createActivity(payload, token);
            let data = nftDataResult?.data?.data[0];
            console.log(nftDataResult);
            dispatch({ type: "NFT_DATA", value: data });
            setLoadingModal(false);
            toast.success("NFT Transfer Successfully.", { autoClose: 1000 });
          } else {
            setLoadingModal(false);
          }
        }
      } else {
        toast.info("Please sign in again", { autoClose: 1000 });
        setLoadingModal(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingModal(false);
    }
  };
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
      setEthers(etherPrice);
    }
  }, [state?.nftData, ownerData]);
  return (
    <>
      <NftDetailHeading />
      <Grid container pt={3} display="flex" justifyContent="space-between">
        <Grid item xs={6}>
          {ownerData && ownerData?.nft_price && (
            <Typography variant="subtitle1">
              {ownerData?.sale_type === "time"
                ? "Minimum Bid Price"
                : "Current Price"}
            </Typography>
          )}
        </Grid>

        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <Box>
            <Typography variant="body2" width="100%" noWrap>
              {data?.contract_type === "721" ? "Single" : "Multiple"}{" "}
              <span style={{ fontWeight: "bold" }}>
                {ownerData && ownerData?.copies + " of " + data?.total_copies}
              </span>
            </Typography>
          </Box>
          {state?.nftData?.contract_type === "721" && (
            <Box className={"onsale-box-detail"} sx={{ ml: 1 }}>
              <Typography
                variant="subtitle3"
                sx={{
                  color: theme.palette.brandpurple.primary,
                }}
              >
                {ownerData && ownerData?.transaction_hash
                  ? "Decentralized"
                  : "Centralized"}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      <Grid container alignItems="center" mt={1.5}>
        <Grid item xs={12} sm={6} display="flex" alignItems="center">
          {ownerData && ownerData?.nft_price && (
            <EthPriceSection price={ethers} />
          )}
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          display="flex"
          justifyContent={{ xs: "flex-start", sm: "flex-end" }}
        >
          <NextLink href={`/collection-detail/${data?.collection?._id}`}>
            <a style={{ color: "inherit" }}>
              <Typography variant="subtitle2" underline="always">
                View more from this collection
              </Typography>
            </a>
          </NextLink>
        </Grid>
      </Grid>
      <Grid container mt={1.5}>
        <Grid item xs={12}>
          <ReadMore text={description} length={100} />
        </Grid>
      </Grid>
      {ownerData &&
        ownerData?.sale_type === "time" &&
        ownerData?.put_on_sale !== false && (
          <Grid container mt={1.5}>
            <Grid item xs={12}>
              <Box
                className="box"
                sx={{
                  p: 1,
                  fontWeight: "600",
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <CountDown time={countDownTime} />
              </Box>
            </Grid>
          </Grid>
        )}
      {ownerData &&
        ownerData?.sale_type === "time" &&
        ownerData?.bids_count > 0 &&
        (nftDetail?.userType === "admin" ||
          nftDetail?.userType === "owner") && (
          <Grid container mt={1.5}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="containedInherit"
                  onClick={() => handleAcceptHighestBid()}
                  sx={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "10px",
                    fontWeight: "bolder",
                    fontSize: "20px",
                  }}
                >
                  Accept Highest Bid
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      <Grid container>
        <Grid item xs={12}>
          <NftDetailTabs lists={lists} />
        </Grid>
      </Grid>
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        {lightButton !== "" && (
          <Button
            variant="outlinedInherit"
            sx={{ minWidth: "104px" }}
            onClick={() => handleLightButton(lightButton.key)}
          >
            {lightButton.value}
          </Button>
        )}
        {darkButton !== "" && (
          <Button
            variant="containedInherit"
            href={Routes.buyNow}
            target="_blank"
            rel="noopener"
            sx={{ minWidth: "104px" }}
            onClick={() => handleDarkButton(darkButton.key)}
          >
            {darkButton.value}
          </Button>
        )}
      </Stack>
      <LoadingModal openSuccessModal={loadingModal} text={loadingText} />
      <NftOnSaleModal
        openSuccessModal={openSaleModel}
        title="Put on Sale"
        handleModalClickClose={handleCloseSaleModel}
        data={data}
        setData={setData}
      />
      <BuyNftModal
        openSuccessModal={openBuyModal}
        handleSuccessModalClose={handleBuyModalClose}
      />
      <PlaceBidModal
        openSuccessModal={openBidModal}
        handleSuccessModalClose={handleBidModalClose}
      />
      <DisclaimerModal
        openSuccessModal={openDisclaimerModal}
        handleSuccessModalClose={handleDisclaimerModalClose}
        buyModal={handleBuyModalClickOpen}
      />
    </>
  );
}
