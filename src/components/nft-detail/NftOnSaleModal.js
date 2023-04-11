import React, { useState, useEffect } from "react";
import { CustomModal, LoadingModal } from "../shared";
import { Typography, Box, Grid, Button } from "@mui/material";

import { Image, PutOnSale } from "../../components";
import { useAppContext } from "src/context-api/appContext";
// NFT
import web3Connection from "../../utils/web3Connection";
import contract721 from "../../artifacts/contracts/etherum/etherum.json";
import contract1155 from "../../artifacts/contracts/etherum/etherum1155.json";
import {
  putOnSaleFixPrice721,
  putOnSaleTimeAuction721,
  putOnSaleFixPrice1155,
  checkMintedNFTs,
} from "../../apis/blockchain/BlockChain";
import { getUserCookie } from "../../utils/getCookies";
import { converter } from "../../utils/ethConverter";
import { toast } from "react-toastify";
import { createActivity } from "../../apis";

import moment from "moment";

/*******************End Bootstrap Dialg Box ************/
export default function NftOnSaleModal({
  openSuccessModal,
  title,
  handleModalClickClose,
}) {
  const { state, dispatch } = useAppContext();
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [tokenUri, setTokenUri] = useState("");
  const [mint, setMint] = useState("");
  const [checkedPutOnSale, setCheckedPutOnSale] = useState(false);
  const [collectionType, setCollectionType] = useState("single");
  const [checkPriceType, setCheckPriceType] = useState("price");
  const [nftFixedPrice, setNftFixedPrice] = useState("");

  const [bidPrice, setBidPrice] = useState("");
  const [bidStartDate, setBidStartDate] = useState(new Date());
  const [bidEndDate, setBidEndDate] = useState("");
  useEffect(() => {
    if (state?.nftData) {
      setTokenUri(state?.nftData?.token_id);
      setMint(state?.nftData?.free_mint);
      if (state?.nftData?.contract_type === "721") {
        setCollectionType("single");
      } else {
        setCollectionType("multiple");
      }
    }
  }, [state.nftData]);
  const handleChangePutOnSale = (event) => {
    setCheckedPutOnSale(event.target.checked);
  };
  const checkPrice = (type) => {
    if (checkedPutOnSale) {
      if (type === "price") {
        return nftFixedPrice === ""
          ? ""
          : converter(nftFixedPrice, "eth", "wei");
      } else if (type === "time") {
        return bidPrice === "" ? "" : converter(bidPrice, "eth", "wei");
      }
    }
  };
  const handlePutOnSale = async () => {
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
        // Get User Id from JWT
        const startDateVlaue =
          bidStartDate === "" ? "" : moment.utc(bidStartDate);
        const endDateVlaue = bidEndDate === "" ? "" : moment.utc(bidEndDate);
        let price = checkPrice(checkPriceType);
        // if (
        //   state?.nftData?.nft_owners[0].owner_address.toLowerCase() !==
        //   accountAddress.toLowerCase()
        // ) {
        //   toast.error("You are not authorized.");
        //   return;
        // }
        const payload = {
          owner_address: accountAddress.toLowerCase(),
          nft_buyer: "",
          nft_seller: "",
          copies: state?.nftData?.nft_owners[0]?.copies,
          put_on_sale: checkedPutOnSale,
          sale_type: checkPriceType,
          nft_price: price,
          start_date: startDateVlaue,
          end_date: endDateVlaue,
          transaction_hash: "",
          nft: state?.nftData?._id,
          status: "onSale",
          free_mint: mint,
          bids_count: 0,
        };
        const error = validateData(payload);
        if (error) return;
        setLoadingModal(true);
        setLoadingText("NFT on sale...");

        if (collectionType === "single") {
          if (mint) {
            const nftDataResult = await createActivity(payload, token);
            const data = nftDataResult?.data?.data;
            dispatch({ type: "NFT_DATA", value: data[0] });
            setLoadingModal(false);
            handleModalClickClose();
            toast.success("NFT put on sale successfully.", { autoClose: 1000 });
          } else {
            let transactionData = "";
            if (checkPriceType === "price") {
              transactionData = await putOnSaleFixPrice721(
                nftContract,
                tokenUri,
                payload?.nft_price,
                accountAddress
              );
              if (transactionData) {
                setLoadingText("Please wait your data is updating...");
                payload.transaction_hash = transactionData.transactionHash;
                const nftDataResult = await createActivity(payload, token);
                const data = nftDataResult?.data?.data;
                dispatch({ type: "NFT_DATA", value: data[0] });
                setLoadingModal(false);
                handleModalClickClose();
                toast.success("NFT put on sale successfully.", {
                  autoClose: 1000,
                });
              }
            } else if (checkPriceType === "time") {
              const _startDate = bidStartDate
                ? moment(bidStartDate).unix()
                : "";
              const _endDate = bidEndDate ? moment(bidEndDate).unix() : "";
              console.log(_startDate, _endDate, payload?.nft_price, tokenUri);
              transactionData = await putOnSaleTimeAuction721(
                nftContract,
                tokenUri,
                _startDate,
                _endDate,
                payload?.nft_price,
                accountAddress
              );
              if (transactionData) {
                setLoadingText("Please wait your data is updating...");
                payload.transaction_hash = transactionData.transactionHash;
                const nftDataResult = await createActivity(payload, token);
                const data = nftDataResult?.data?.data;
                dispatch({ type: "NFT_DATA", value: data[0] });
                setLoadingModal(false);
                handleModalClickClose();
                toast.success("NFT put on sale successfully.", {
                  autoClose: 1000,
                });
              }
            }
          }
        } else {
          let checkMintStatus = await checkMintedNFTs(
            nftContract,
            payload?.owner_address,
            state?.nftData?.token_id
          );
          if (parseInt(checkMintStatus) < 1) {
            const nftDataResult = await createActivity(payload, token);
            const data = nftDataResult?.data?.data;
            dispatch({ type: "NFT_DATA", value: data[0] });
            setLoadingModal(false);
            handleModalClickClose();
            toast.success("NFT put on sale successfully.", { autoClose: 1000 });
          } else {
            let transactionData = "";
            transactionData = await putOnSaleFixPrice1155(
              nftContract,
              tokenUri,
              payload?.nft_price,
              accountAddress
            );
            if (transactionData) {
              setLoadingText("Please wait your data is updating...");
              payload.transaction_hash = transactionData.transactionHash;
              const nftDataResult = await createActivity(payload, token);
              const data = nftDataResult?.data?.data;
              dispatch({ type: "NFT_DATA", value: data[0] });
              setLoadingModal(false);
              handleModalClickClose();
              toast.success("NFT put on sale successfully.", {
                autoClose: 1000,
              });
            }
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
  // Validations
  const validateData = (payload) => {
    let error = false;
    if (payload.put_on_sale) {
      if (payload.sale_type === "price") {
        if (payload.nft_price === "") {
          toast.error("Please enter NFT price.", { autoClose: 1000 });
          error = true;
          return error;
        } else if (parseFloat(payload.nft_price) < 1) {
          toast.error("NFT price should be greater than 0.", {
            autoClose: 1000,
          });
          error = true;
          return error;
        }
      } else if (payload.sale_type === "time") {
        if (payload.nft_price === "") {
          toast.error("Please enter NFT price.", { autoClose: 1000 });
          error = true;
          return error;
        } else if (parseFloat(payload.nft_price) < 1) {
          toast.error("NFT price should be greater than 0.", {
            autoClose: 1000,
          });
          error = true;
          return error;
        } else if (payload.start_date === "") {
          toast.error("Please select start date.", { autoClose: 1000 });
          error = true;
          return error;
        } else if (payload.end_date === "") {
          toast.error("Please select end date.", { autoClose: 1000 });
          error = true;
          return error;
        } else if (
          !moment(new Date(payload.start_date)).isSameOrAfter(new Date(), "day")
        ) {
          toast.error(
            "Start date should be greater than or equal to current date.",
            {
              autoClose: 1500,
            }
          );
          error = true;
          return error;
        } else if (
          !moment(new Date(payload.end_date)).isAfter(
            new Date(payload.start_date),
            "day"
          )
        ) {
          toast.error("End date should be greater than Start date.", {
            autoClose: 1500,
          });
          error = true;
          return error;
        } else if (
          !moment(new Date(payload.start_date)).isSameOrAfter(
            new Date(),
            "day"
          ) ||
          !moment(new Date(payload.end_date)).isAfter(new Date(), "day")
        ) {
          toast.error(
            "Start date or End date should not be less than current date",
            {
              autoClose: 1500,
            }
          );
          error = true;
          return error;
        }
      }
    }
    return error;
  };
  return (
    <>
      <CustomModal
        openModal={openSuccessModal}
        title={""}
        handleClose={handleModalClickClose}
      >
        <Grid container>
          <Grid item xs={12}>
            <PutOnSale
              collectionType={collectionType}
              checkPriceType={checkPriceType}
              setCheckPriceType={setCheckPriceType}
              checkedPutOnSale={checkedPutOnSale}
              handleChangePutOnSale={handleChangePutOnSale}
              nftFixedPrice={nftFixedPrice}
              setNftFixedPrice={setNftFixedPrice}
              bidPrice={bidPrice}
              setBidPrice={setBidPrice}
              bidStartDate={bidStartDate}
              setBidStartDate={setBidStartDate}
              bidEndDate={bidEndDate}
              setBidEndDate={setBidEndDate}
              modal={true}
            />
          </Grid>
          {checkedPutOnSale && (
            <Grid item xs={12} sx={{ pt: "30px" }}>
              <Button
                variant="containedInherit"
                onClick={() => handlePutOnSale()}
              >
                Put on Sale
              </Button>
            </Grid>
          )}
        </Grid>
      </CustomModal>
      <LoadingModal openSuccessModal={loadingModal} text={loadingText} />
    </>
  );
}
