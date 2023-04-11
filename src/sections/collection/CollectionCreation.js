import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import jwt_decode from "jwt-decode";

// mui
import {
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Button,
  NoSsr,
} from "@mui/material";

// common and shared
import { CardHeadingGradient, SocialLinks } from "../../components/shared";
import {
  FilesDragAndDrop,
  Preview,
  CollectionDetails,
  DescriptionNFT,
  ChooseType,
} from "../../components";

// Toaster
import { toast } from "react-toastify";

// Import API's
import { uploadAttachment, unpinHash, createCollection } from "../../apis";
import { getUserCookie } from "../../utils/getCookies";

export default function CollectionCreation() {
  const router = useRouter();
  // banner states
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [bannerHash, setBannerHash] = useState("");
  const [imageType, setImageType] = useState("");

  // profile states
  const [selectedImageFiles, setSelectedImageFiles] = useState(null);
  const [errorImageMessage, setErrorImageMessage] = useState("");
  const [profileImageHash, setProfileImageHash] = useState("");

  // Type
  const [collectionType, setCollectionType] = useState("single");

  // Details
  const [collectionName, setCollectionName] = useState("");
  // const [contractName, setContractName] = useState("");
  // const [symbol, setSymbol] = useState("");

  // Description
  const [editorState, setEditorState] = useState("");

  // Category
  const [category, setCategory] = useState("");

  // Social states
  const [webLink, setWebLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [discordLink, setDiscordLink] = useState("");
  const [redditLink, setRedditLink] = useState("");

  const [collectionId, setCollectionId] = useState("");

  //*************************/
  // Upload Banner to IPFS
  //*************************/

  useEffect(async () => {
    if (selectedFiles === null) return;
    try {
      const token = getUserCookie();
      if (bannerHash !== "") {
        await unpinHash(bannerHash, token);
      }
      const formData = new FormData();
      formData.append("file", selectedFiles, selectedFiles.name);

      toast.info("Please wait until file upload...", { autoClose: 1000 });
      const data = await uploadAttachment(formData, token);
      console.log("DATA", data);
      if (data?.data?.is_success) {
        setBannerHash(data?.data?.data?.IpfsHash);
        toast.success("File Upload Successfully", { autoClose: 1000 });
        setSelectedFiles(null);
      } else {
        setSelectedFiles(null);
      }
    } catch (error) {
      setSelectedFiles(null);
      console.log("Error", error);
    }
  }, [selectedFiles]);

  // Banner Image Error Set
  useEffect(() => {
    if (errorMessage !== "") {
      toast.error(errorMessage, { autoClose: 1000 });
      setErrorMessage("");
      setSelectedFiles(null);
      setBannerHash("");
    }
  }, [errorMessage]);

  //*************************/
  // Upload Image to IPFS
  //*************************/
  useEffect(async () => {
    if (selectedImageFiles === null) return;
    try {
      const token = getUserCookie();
      if (profileImageHash !== "") {
        await unpinHash(profileImageHash, token);
      }
      const formData = new FormData();
      formData.append("file", selectedImageFiles, selectedImageFiles.name);

      toast.info("Please wait until file upload...", { autoClose: 1000 });
      const data = await uploadAttachment(formData, token);
      console.log(data);
      if (data?.data?.is_success) {
        setProfileImageHash(data?.data?.data?.IpfsHash);
        toast.success("File Upload Successfully", { autoClose: 1000 });
        setSelectedImageFiles(null);
      }
    } catch (error) {
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

  
  
    /**** Socail links validation ****/
  

  // Validation
  const validateData = () => {
    let error = false;
    if (collectionName === "") {
      toast.error("Collection Name is not define.");
      error = true;
      return error;
    }
    // if (contractName === "") return toast.error("Contract Name is not define");
    // if (symbol === "") return toast.error("Symbol is not available");
    else if (category === "" || category === "none") {
      toast.error("Please select category");
      error = true;
      return error;
    }
    return error;
  };

  function isValidURL(string) {
    let res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    let empt = string.match(/^(?!\s*$).+/); // return true if empty
    return !(!res && empt);
  }

  // Upload Data
  const handlerUploadData = async () => {
    console.log("collection...");
    const token = getUserCookie();
    if (token) {
      console.log(token);
      let value = validateData();
      if (value) return;
      console.log("pass");
      var decoded = jwt_decode(token);
      const userId = decoded.id;
      if (userId === "") return toast.error("Please sign in.");


                //// Social Checks ///////

                const webResult = isValidURL(webLink);
                const instagram = isValidURL(instagramLink);
                const twitter = isValidURL(twitterLink);
                const discord = isValidURL(discordLink);
                const reddit = isValidURL(redditLink);
          
                if (webResult === false) {
                  return toast.error("Web url is not valid", { autoClose: 1000 });
                }
          
                if (instagram === false) {
                  return toast.error("instagram url is not valid", { autoClose: 1000 });
                }
          
                if (twitter === false) {
                  return toast.error("twitter url is not valid", { autoClose: 1000 });
                }
          
                if (discord === false) {
                  return toast.error("discord url is not valid", { autoClose: 1000 });
                }
          
                if (reddit === false) {
                  return toast.error("reddit url is not valid", { autoClose: 1000 });
                }



      const payload = {
        bannerImage: bannerHash,
        profileImage: profileImageHash,
        collectionType: collectionType,
        collectionName: collectionName,
        // contractName: contractName,
        // symbol: symbol,
        description: editorState,
        category: category,
        webLinkUrl: webLink,
        instagramLinkUrl: instagramLink,
        twitterLinkUrl: twitterLink,
        discordLinkUrl: discordLink,
        redditLinkUrl: redditLink,
        user: userId,
      };
      console.log(payload);



      // toast.info("Please wait...", { autoClose: 1000 });
      const results = await createCollection(payload, token);
      setCollectionId(results?.data?.data?._id);

      if (results?.data?.data?._id) {
        toast.success("Collection added successfully.", { autoClose: 1000 });
        router.push(`/collection-detail/${results?.data?.data?._id}`);
      } else {
        toast.error(results?.data?.message, { autoClose: 1000 });
      }

  
    }
  };
  return (
    <Container
      maxWidth={false}
      sx={{
        boxShadow: () => ({
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
        <CardHeadingGradient text="Create Collection" />
      </Box>
      <Box pt="24px">
        <Typography variant="h3Light">
          This image will appear at the top of your collection page. Avoid
          including too much text in this banner image, as the dimensions change
          on different devices. File types supported: JPG, PNG, SVG. Size
          recommended 1400 x 400px
        </Typography>
      </Box>
      <Grid container spacing={6} pt="60px">
        <Grid item xs={12}>
          <FilesDragAndDrop
            isBanner={true}
            setSelectedFiles={setSelectedFiles}
            setErrorMessage={setErrorMessage}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6} pt="60px">
        <Grid item xs={12} md={6}>
          <FilesDragAndDrop
            isTitle
            isProfile={true}
            setSelectedImageFiles={setSelectedImageFiles}
            setErrorImageMessage={setErrorImageMessage}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Preview
            isCollection
            selectedFiles={selectedFiles}
            selectedImageFiles={selectedImageFiles}
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
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={2} pt="54px">
            <Grid item xs={12} md={6}>
              <NoSsr>
                <CollectionDetails
                  collectionName={collectionName}
                  setCollectionName={setCollectionName}
                  // contractName={contractName}
                  // setContractName={setContractName}
                  // symbol={symbol}
                  // setSymbol={setSymbol}
                  category={category}
                  setCategory={setCategory}
                />
              </NoSsr>
            </Grid>
            <Grid item xs={12} md={6}>
              <DescriptionNFT
                isCollection={true}
                editorState={editorState}
                setEditorState={setEditorState}
              />
              {/* <NoSsr>
                <Box pt="30px">
                  <CollectionCategory setCategory={setCategory} />
                </Box>
              </NoSsr> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container pt="54px">
        <Grid item xs={12}>
          <SocialLinks
            webLink={webLink}
            setWebLink={setWebLink}
            instagramLink={instagramLink}
            setInstagramLink={setInstagramLink}
            twitterLink={twitterLink}
            setTwitterLink={setTwitterLink}
            discordLink={discordLink}
            setDiscordLink={setDiscordLink}
            redditLink={redditLink}
            setRedditLink={setRedditLink}
          />
        </Grid>
      </Grid>

      <Grid container pt="64px">
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
              onClick={handlerUploadData}
            >
              Create Collections
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
