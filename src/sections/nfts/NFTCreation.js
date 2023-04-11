import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ERC_721, ERC_1155 } from "src/config";
import { useAppContext } from "src/context-api/appContext";

//mui
import { Box, Grid, Container, Typography, Stack, Button } from "@mui/material";

// common
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { CardHeadingGradient, LoadingModal } from "../../components/shared";
import {
  ChooseType,
  DetailNft,
  FilesDragAndDrop,
  Preview,
  DescriptionNFT,
  PutOnSale,
  Properties,
  SuccessNFT,
  ValidatorModal,
} from "../../components";

import { getUserCookie } from "../../utils/getCookies";

// Import API's
import {
  uploadAttachment,
  unpinHash,
  createNFT,
  updateNFTHash,
  removeNFT,
} from "../../apis";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { validateNftData } from "./NFTValidations";
import { converter } from "../../utils/ethConverter";

// NFT
import web3Connection from "../../utils/web3Connection";
import contract721 from "../../artifacts/contracts/etherum/etherum.json";
import contract1155 from "../../artifacts/contracts/etherum/etherum1155.json";
import {
  mintNft,
  mintNft1155,
  mintNftwithFixedPrice,
  mintNftwithTimeAuction,
  mintNftwithFixedPrice1155,
} from "../../apis/blockchain/BlockChain";

export default function NFTCreation() {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  // profile states
  const [selectedImageFiles, setSelectedImageFiles] = useState(null);
  const [errorImageMessage, setErrorImageMessage] = useState("");
  const [profileImageHash, setProfileImageHash] = useState("");
  const [imageType, setImageType] = useState("");

  // States
  const [collectionType, setCollectionType] = useState("single");
  const [nftName, setNftName] = useState("");
  const [nftCollection, setNftCollection] = useState("");

  const [royalties, setRoyalties] = useState(0);
  const [noOfCopies, setNoOfCopies] = useState(1);
  const [freeMintChecked, setFreeMintChecked] = useState(true);
  const [editorState, setEditorState] = useState("");

  const [checkedPutOnSale, setCheckedPutOnSale] = useState(true);
  const [checkPriceType, setCheckPriceType] = useState("price");
  const [nftFixedPrice, setNftFixedPrice] = useState("");

  const [bidPrice, setBidPrice] = useState("");
  const [bidStartDate, setBidStartDate] = useState(new Date());
  const [bidEndDate, setBidEndDate] = useState("");

  const [levels, setLevels] = useState([{ name: "", minVal: "", maxVal: "" }]);
  const [properties, setProperties] = useState([{ name: "", type: "" }]);
  const [checkedUnBlockContent, setCheckedUnBlockContent] = useState(false);
  const [unBlockContentText, setUnBlockContentText] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Data Uploading...");
  const [payloadData, setPayloadData] = useState(null);
  const [url, setUrl] = useState("");
  const [nftContract, setNftContract] = useState(null);
  const [userAccountAddress, setUserAccountAddress] = useState("");
  const handleLoadingModalClose = () => {
    setLoading(false);
  };
  const handleLoadingModalOpen = () => {
    setLoading(true);
  };
  const [openValidatorModal, setOpenValidatorModal] = useState(false);
  const handleValidatorModalClickOpen = () => {
    setOpenValidatorModal(true);
  };
  const handleValidatorModalClose = () => {
    setOpenValidatorModal(false);
  };

  useEffect(() => {
    if (collectionType === "single") {
      setNoOfCopies(1);
    }
  }, [collectionType]);
  useEffect(() => {
    if (!checkedPutOnSale) {
      setCheckPriceType("price");
    }
  }, [checkedPutOnSale]);
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
  const onSubmitData = async (e) => {
    e.preventDefault();

    try {
      const token = getUserCookie();

      if (token) {
        // Create Wen3 Connection
        const web3 = await web3Connection();
        const accounts = await web3.eth.getAccounts();
        const accountAddress = accounts[0];
        setUserAccountAddress(accountAddress);
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

        setNftContract(nftContract);

        // Get User Id from JWT
        const decode = jwt_decode(token);
        // Filter Properties and Levels data
        let propertiesData = properties.filter((data) => {
          return !(data.name === "" || data.type === "");
        });
        let levelsData = levels.filter((data) => {
          return !(
            data.name === "" ||
            data.minVal === "" ||
            data.maxVal === ""
          );
        });
        const startDateVlaue =
          bidStartDate === "" ? "" : moment.utc(bidStartDate);
        const endDateVlaue = bidEndDate === "" ? "" : moment.utc(bidEndDate);
        const date = new Date();
        const ts = moment(date).unix();
        const min = 1;
        const max = 100000;
        let random = parseInt(min + Math.random() * (max - min));
        let tokenId = random + ts;
        let price = checkPrice(checkPriceType);
        // const createdAt = moment.utc(new Date());
        const collectionId = nftCollection === "" ? "" : nftCollection[0];
        // Final Payload
        const payload = {
          jwt_address: decode.publicAddress,
          profile_image: profileImageHash,
          image_type: imageType,
          nft_type: collectionType,
          nft_name: nftName,
          collection_Id: collectionId,
          royalties: parseInt(royalties),
          description: editorState,
          creator_address: accountAddress.toLowerCase(),
          contract_type: collectionType === "single" ? ERC_721 : ERC_1155,
          block_chain: "Ethereum",
          currency_type: "ETH",
          total_copies: noOfCopies,
          nft_owners: [
            {
              owner_address: accountAddress.toLowerCase(),
              copies: noOfCopies,
              nft_price: price,
              put_on_sale: checkedPutOnSale,
              sale_type: checkPriceType,
              start_date: checkPriceType === "price" ? "" : startDateVlaue,
              end_date: endDateVlaue,
              transaction_hash: "",
            },
          ],
          free_mint: freeMintChecked,
          properties: propertiesData,
          levels: levelsData,
          unblock_content: checkedUnBlockContent,
          unblock_content_text: unBlockContentText,
          nft_creator: "user",
          token_id: tokenId,
          status: "created",
        };
        // Validations
        const status = validateNftData(payload);
        if (status === true) return;
        setPayloadData(payload);
        if (payload.royalties > 70 && payload.royalties < 100) {
          handleValidatorModalClickOpen();
        } else {
          await updatePayloadData(payload, token, nftContract, accountAddress);
        }
      } else {
        toast.info("Please sign in again", { autoClose: 1000 });
      }
    } catch (error) {
      console.log(error);
      if (nftId) {
        const token = getUserCookie();
        await removeNFT(nftId, token);
        handleLoadingModalClose();
      }
      handleLoadingModalClose();
    }
  };

  const updatePayloadData = async (
    payload,
    token,
    nftContract,
    accountAddress
  ) => {
    try {
      setLoading(true);
      setLoadingText("Uploading data...");
      let nftId = "";
      const results = await createNFT(payload, token);
      const getResult = results?.data?.data;
      nftId = getResult?._id;
      setUrl(nftId);

      if (getResult) {
        if (!getResult?.free_mint) {
          const _fileHash = getResult?.file_hash;
          const _tokenId = getResult?.token_id;
          const _royalties = getResult?.royalties;
          const _nftPrice =
            getResult?.nft_owners[0]?.nft_price === null
              ? ""
              : getResult?.nft_owners[0]?.nft_price.toString();
          const _startDate = getResult?.nft_owners[0]?.start_date
            ? moment(getResult?.nft_owners[0]?.start_date).unix()
            : "";
          const _endDate = getResult?.nft_owners[0]?.end_date
            ? moment(getResult?.nft_owners[0]?.end_date).unix()
            : "";
          const _copies = getResult?.nft_owners[0]?.copies;
          const _data = "0x00";

          if (!getResult?.nft_owners[0]?.put_on_sale) {
            //  Mint
            let nftData = null;
            if (getResult?.nft_type === "single") {
              nftData = await mintNft(
                nftContract,
                _tokenId,
                _fileHash,
                _royalties,
                accountAddress
              );
            } else {
              nftData = await mintNft1155(
                nftContract,
                _tokenId,
                _copies,
                _data,
                _fileHash,
                _royalties,
                accountAddress
              );
            }
            if (nftData.transactionHash !== "") {
              const payloadHash = {
                id: getResult?._id,
                transaction_hash: nftData.transactionHash,
              };
              const finalNftData = await updateNFTHash(payloadHash, token);
              handleLoadingModalClose();
              handleSuccessModalClickOpen();
            }
          } else {
            // Direct Mint with Put on Sale Fixed Price
            if (getResult?.nft_owners[0]?.sale_type === "price") {
              let nftData = null;
              if (getResult?.nft_type === "single") {
                nftData = await mintNftwithFixedPrice(
                  nftContract,
                  _tokenId,
                  _fileHash,
                  _royalties,
                  _nftPrice,
                  accountAddress
                );
              } else {
                nftData = await mintNftwithFixedPrice1155(
                  nftContract,
                  _tokenId,
                  _copies,
                  _data,
                  _fileHash,
                  _royalties,
                  _nftPrice,
                  accountAddress
                );
              }
              if (nftData.transactionHash !== "") {
                const payloadHash = {
                  id: getResult?._id,
                  transaction_hash: nftData.transactionHash,
                };
                const finalNftData = await updateNFTHash(payloadHash, token);
                handleLoadingModalClose();
                handleSuccessModalClickOpen();
              }
            } else if (getResult?.nft_owners[0]?.sale_type === "time") {
              const nftData = await mintNftwithTimeAuction(
                nftContract,
                _tokenId,
                _fileHash,
                _royalties,
                _startDate,
                _endDate,
                _nftPrice,
                accountAddress
              );
              if (nftData.transactionHash !== "") {
                const payloadHash = {
                  id: getResult?._id,
                  transaction_hash: nftData.transactionHash,
                };
                const finalNftData = await updateNFTHash(payloadHash, token);
                handleLoadingModalClose();
                handleSuccessModalClickOpen();
              }
            }
          }
        } else {
          handleLoadingModalClose();
          handleSuccessModalClickOpen();
        }
      } else {
        handleLoadingModalClose();
        toast.error(results?.data?.message, { autoClose: 1000 });
      }
    } catch (error) {
      console.log(error);
      handleLoadingModalClose();
    }
  };
  useEffect(async () => {
    if (state?.royaltiesPermission) {
      const token = getUserCookie();
      if (token) {
        await updatePayloadData(
          payloadData,
          token,
          nftContract,
          userAccountAddress
        );
        dispatch({ type: "ROYALTIES_PERMISSION", value: false });
      }
    }
  }, [state?.royaltiesPermission]);
  //*************************/
  // Upload Image to IPFS
  //*************************/
  useEffect(async () => {
    if (selectedImageFiles === null) return;
    try {
      const token = getUserCookie();
      setLoading(true);
      setLoadingText("File is uploading. Please wait...");
      if (profileImageHash !== "") {
        await unpinHash(profileImageHash, token);
      }
      const formData = new FormData();
      formData.append("file", selectedImageFiles, selectedImageFiles.name);

      const data = await uploadAttachment(formData, token);
      if (data?.data?.is_success) {
        setProfileImageHash(data?.data?.data?.IpfsHash);
        toast.success("File Upload Successfully", { autoClose: 1000 });
        setSelectedImageFiles(null);
        handleLoadingModalClose();
      } else {
        handleLoadingModalClose();
        toast.error("File is not uploaded. Please try again.", {
          autoClose: 1500,
        });
      }
    } catch (error) {
      handleLoadingModalClose();
      console.log("Error", error);
    }
  }, [selectedImageFiles]);

  // Profile Image Error Set
  useEffect(() => {
    if (errorImageMessage !== "") {
      toast.error(errorImageMessage, { autoClose: 1000 });
      setErrorImageMessage("");
      setSelectedImageFiles(null);
      setProfileImageHash("");
    }
  }, [errorImageMessage]);

  /****************************************/
  /*************Put on Sale *************/
  /****************************************/
  const handleChangePutOnSale = (event) => {
    setCheckedPutOnSale(event.target.checked);
  };
  /****************************************/
  /*************Levels Modal *************/
  /****************************************/
  const [openLevelsModal, setOpenLevelsModal] = useState(false);
  const handleModalClickOpen = () => {
    setOpenLevelsModal(true);
  };
  const handleLevelsModalClose = () => {
    let resutl = levels.filter((data) => {
      return !(
        data.name === "" ||
        data.minVal === "" ||
        data.maxVal === "" ||
        parseInt(data?.minVal) < 1 ||
        parseInt(data?.maxVal) < 1 ||
        parseInt(data?.minVal) >= parseInt(data?.maxVal)
      );
    });
    if (resutl?.length === 0) {
      setLevels([{ name: "", minVal: "", maxVal: "" }]);
    } else {
      setLevels(resutl);
    }
    setOpenLevelsModal(false);
  };

  //*************Levels Validation **********/
  const validateLevels = () => {
    let error = false;
    let errorMessage = "";
    levels?.length &&
      levels?.length > 0 &&
      levels?.map((data) => {
        if (data) {
          if (
            data?.name === "" ||
            data?.minVal === "" ||
            data?.minVal === "0" ||
            data?.maxVal === "" ||
            data?.maxVal === "0"
          ) {
            error = true;
            errorMessage = "Don not leave empty fields or with 0";
          } else if (parseInt(data?.minVal) < 1 || parseInt(data?.maxVal) < 1) {
            error = true;
            errorMessage = "Don not enter negative value.";
          } else if (parseInt(data?.minVal) >= parseInt(data?.maxVal)) {
            error = true;
            errorMessage = "Minimum value should be less than Maximum value";
          }
        }
      });
    if (error) {
      return toast.error(errorMessage);
    } else {
      handleLevelsModalClose();
    }
  };

  /****************************************/
  /*************Properties Modal *************/
  /****************************************/
  const [openPropertiesModal, setOpenPropertiesModal] = useState(false);
  const handlePropertiesModalClickOpen = () => {
    setOpenPropertiesModal(true);
  };

  const handlePropertiesModalClose = () => {
    let resutl = properties.filter((data) => {
      return !(data.name === "" || data.type === "");
    });
    if (resutl?.length === 0) {
      setProperties([{ name: "", type: "" }]);
    } else {
      setProperties(resutl);
    }
    setOpenPropertiesModal(false);
  };

  //*************Properties Validation **********/
  const validateProperties = () => {
    let error = false;
    let errorMessage = "";
    properties?.length &&
      properties?.length > 0 &&
      properties?.map((data) => {
        if (data) {
          if (data?.name === "" || data?.type === "") {
            error = true;
            errorMessage = "Don not leave empty fields";
          }
        }
      });
    if (error) {
      return toast.error(errorMessage);
    } else {
      handlePropertiesModalClose();
    }
  };

  //*************Unblock Content **********/

  const handleChangeUnblockContent = (event) => {
    setCheckedUnBlockContent(event.target.checked);
  };
  /******************************************/

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const handleSuccessModalClickOpen = () => {
    setOpenSuccessModal(true);
  };
  const handleSuccessModalClose = () => {
    setOpenSuccessModal(false);
  };
  /*********************************************/

  return (
    <Container
      maxWidth={false}
      sx={{
        boxShadow: (theme) => ({
          xs: 0,
        }),
        maxWidth: "1300px",
        pt: "160px",
      }}
    >
      <Box
        sx={{
          width: "auto",
          height: "auto",
          justifyContent: "space-between",
          display: "flex",
          overflow: "hidden",
          alignItems: "center",
        }}
      >
        <CardHeadingGradient text="Create New NFT" />
      </Box>
      <Box maxWidth="800px" pt="20px">
        <Typography variant="h4">Image, Video &amp; 3D Model</Typography>
        <Typography variant="h3Light">
          File types supported: JPG, PNG, GIF, SVG, MP4. Max size: 100 MB
        </Typography>
      </Box>
      <Grid container spacing={6} pt="20px">
        <Grid item xs={12} md={6}>
          <FilesDragAndDrop
            isTitle
            isNFT={true}
            setSelectedImageFiles={setSelectedImageFiles}
            setErrorImageMessage={setErrorImageMessage}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Preview
            selectedImageFiles={selectedImageFiles}
            setSelectedImageFiles={setSelectedImageFiles}
            imageType={imageType}
            setImageType={setImageType}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <ChooseType
            collectionType={collectionType}
            setCollectionType={setCollectionType}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} pt="40px">
            <Grid item xs={12} md={6}>
              <DetailNft
                collectionType={collectionType}
                nftName={nftName}
                setNftName={setNftName}
                nftCollection={nftCollection}
                setNftCollection={setNftCollection}
                royalties={royalties}
                setRoyalties={setRoyalties}
                noOfCopies={noOfCopies}
                setNoOfCopies={setNoOfCopies}
                freeMintChecked={freeMintChecked}
                setFreeMintChecked={setFreeMintChecked}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DescriptionNFT
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
          />
        </Grid>
      </Grid>
      <Grid container pt="20px">
        <Grid item xs={12}>
          <Properties
            checked={checkedUnBlockContent}
            handleChange={handleChangeUnblockContent}
            levels={levels}
            setLevels={setLevels}
            validateLevels={validateLevels}
            openLevelsModal={openLevelsModal}
            handleModalClickOpen={handleModalClickOpen}
            handleLevelsModalClose={handleLevelsModalClose}
            validateProperties={validateProperties}
            properties={properties}
            setProperties={setProperties}
            openPropertiesModal={openPropertiesModal}
            handlePropertiesModalClickOpen={handlePropertiesModalClickOpen}
            handlePropertiesModalClose={handlePropertiesModalClose}
            setUnBlockContentText={setUnBlockContentText}
          />
        </Grid>
      </Grid>
      <Grid container pt="20px">
        <Grid item xs={12} display={"flex"} justifyContent="flex-end">
          <Stack direction="row" spacing={1}>
            <Link href="/">
              <Button variant="outlinedInherit" sx={{ minWidth: "104px" }}>
                Back
              </Button>
            </Link>
            <Button
              variant="containedInherit"
              target="_blank"
              rel="noopener"
              sx={{ minWidth: "104px" }}
              onClick={(e) => onSubmitData(e)}
            >
              Create
            </Button>
            <SuccessNFT
              openSuccessModal={openSuccessModal}
              handleSuccessModalClose={""}
              image={profileImageHash}
              imageType={imageType}
              url={url}
            />
            <LoadingModal openSuccessModal={loading} text={loadingText} />
            <ValidatorModal
              openSuccessModal={openValidatorModal}
              handleSuccessModalClose={handleValidatorModalClose}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
