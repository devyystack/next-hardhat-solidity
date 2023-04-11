import React, { useState, useEffect } from "react";
// mui
import { Grid, Container, Typography, Box, Stack, Button } from "@mui/material";

import NextLink from "next/link";
import Routes from "../../routes";
// common and shared
import {
  CardHeadingGradient,
  SocialLinks,
  LoadingModal,
} from "../../components/shared";
import {
  FilesDragAndDrop,
  Preview,
  EditProfileDetail,
  DescriptionNFT,
} from "../../components";
import FormData from "form-data";
import { useRouter } from "next/router";

// Import API's
import {
  uploadAttachment,
  unpinHash,
  updateUserData,
  getUserByPublicAddressWithToken,
} from "../../apis";
import { getUserCookie } from "../../utils/getCookies";
// Toaster
import { toast } from "react-toastify";

import jwt_decode from "jwt-decode";
import { getUserData } from "../../users/getUserData";

import { useAppContext } from "src/context-api/appContext";

export default function EditProfile() {
  const router = useRouter();

  const { state, dispatch } = useAppContext();
  const { userData } = state;
  const [publicAddress, setPublicAddress] = useState("");
  const [token, setToken] = useState("");

  const tokenData = getUserCookie();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (tokenData) {
      var decoded = jwt_decode(tokenData);
      const address = decoded.publicAddress.toLowerCase();
      setPublicAddress(address);
      setToken(tokenData);
    }
  }, [tokenData]);

  useEffect(async () => {
    const result = await getUserByPublicAddressWithToken(
      publicAddress,
      tokenData
    );
    setData(result?.data?.data);
  }, [publicAddress, tokenData]);

  const user = {
    publicAddress: publicAddress,
    userName: data?.userName,
    userEmail: data?.userEmail,
    profileImage: data?.profileImage,
    profileCover: data?.profileCover,
    description: data?.description,
    website: data?.links?.web,
    instagram: data?.links?.instagram,
    twitter: data?.links?.twitter,
    discord: data?.links?.discord,
    reddit: data?.links?.reddit,
  };

  // Sceleton loader
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingText, setLoadingText] = useState("Data Uploading...");

  // banner states
  const [selectedFiles, setSelectedFiles] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [bannerHash, setBannerHash] = useState("");
  // profile states
  const [selectedImageFiles, setSelectedImageFiles] = useState(null);

  const [errorImageMessage, setErrorImageMessage] = useState("");
  const [profileImageHash, setProfileImageHash] = useState("");
  const [imageType, setImageType] = useState("");

  // User Profile states

  const [name, setName] = useState(user?.userName);
  const [address, setAddress] = useState(user?.userEmail);
  const [wallet, setWallet] = useState(publicAddress);

  const [editorState, setEditorState] = useState(user?.description);

  // Social states
  const [webLink, setWebLink] = useState(user?.website);
  const [instagramLink, setInstagramLink] = useState(user?.instagram);
  const [twitterLink, setTwitterLink] = useState(user?.twitter);
  const [discordLink, setDiscordLink] = useState(user?.discord);
  const [redditLink, setRedditLink] = useState(user?.reddit);

  useEffect(() => {
    if (data) {
      setWallet(publicAddress);
      setName(data?.userName);
      setAddress(data?.userEmail);
      setProfileImageHash(data?.profileImage);
      setBannerHash(data?.profileCover);
      setLoading(false);
      setEditorState(data?.description);
      setWebLink(data?.links?.web);
      setInstagramLink(data?.links?.instagram);
      setTwitterLink(data?.links?.twitter);
      setDiscordLink(data?.links?.discord);
      setRedditLink(data?.links?.reddit);
    }
  }, [data]);

  useEffect(() => {
    if (wallet !== "") {
      if (userData) {
        if (
          userData?.data?.data !== wallet?.toLowerCase() ||
          userData?.data !== wallet?.toLowerCase()
        ) {
          setLoading(false);
          if (userData?.data?.data) {
            router.push(`/profile/${userData?.data?.data?.publicAddress}`);
          } else {
            router.push(`/profile/${userData?.data?.publicAddress}`);
          }
        }
      }
    }
  }, [userData]);
  //*************************/
  // Upload Banner to IPFS
  //*************************/

  useEffect(async () => {
    if (selectedFiles === null) return;
    try {
      const token = getUserCookie();
      if (bannerHash !== "") {
        setLoadingModal(true);

        const result = await unpinHash(bannerHash, token);
        if (result?.data?.data === "OK") {
          //We are uploading your file...
          setLoadingText("We are uploading your file...");
        }
      }
      const formData = new FormData();
      formData.append("file", selectedFiles, selectedFiles?.name);

      setLoadingText("Please wait...");
      const data = await uploadAttachment(formData, token);
      if (data?.data?.is_success) {
        setBannerHash(data?.data?.data?.IpfsHash);
        setLoadingModal(false);
        toast.success("File Upload Successfully", { autoClose: 1000 });
        setSelectedFiles(null);
      } else {
        setLoadingModal(false);
        toast.error("File not uploaded", { autoClose: 1000 });
        setSelectedFiles(null);
      }
    } catch (error) {
      setLoadingModal(false);
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
        setLoadingModal(true);
        setLoadingText("Loading...");
        const result = await unpinHash(profileImageHash, token);
        if (result?.data?.data === "OK") {
          setLoadingText("We are uploading your file...");
        }
      }
      const formData = new FormData();
      formData.append("file", selectedImageFiles, selectedImageFiles?.name);

      //Please wait...
      const data = await uploadAttachment(formData, token);
      if (data?.data?.is_success) {
        setProfileImageHash(data?.data?.data?.IpfsHash);
        setLoadingModal(false);
        toast.success("File Upload Successfully", { autoClose: 1000 });
        setSelectedImageFiles(null);
      }
    } catch (error) {
      setLoadingModal(false);
      setSelectedImageFiles(null);
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

  /**** Email validation ****/

  const emailValidation = (emailData) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !(!emailData || regex.test(emailData) === false);
  };

  /**** Socail links validation ****/

  function isValidURL(string) {
    let res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    let empt = string.match(/^(?!\s*$).+/); // return true if empty
    return !(!res && empt);
  }

  /***************************/
  /**** Save Profile Data ****/
  /***************************/

  const handlerUploadData = async () => {
    const token = getUserCookie();
    if (token) {
      validateData();

      //// Email Check ///////
      if (address === "") {
        return toast.error("Please Enter an email");
      }

      const emailResult = emailValidation(address);
      if (emailResult === false) {
        return toast.error("Email is not valid");
      }

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
        userName: name,
        email: address,
        walletAddress: wallet,
        description: editorState,
        webLinkUrl: webLink,
        instagramLinkUrl: instagramLink,
        twitterLinkUrl: twitterLink,
        discordLinkUrl: discordLink,
        redditLinkUrl: redditLink,
      };

      const results = await updateUserData(payload, publicAddress, token);
      console.log(results?.data);
      if (results?.data?.is_success) {
        dispatch({ type: "USER_DATA", value: results });
        toast.success("Profile updated.", { autoClose: 1000 });
        // router.push(`/profile/${results?.data?.publicAddress}`);
      } else {
        toast.error("Profile not updated.");
      }
    }
  };

  const validateData = () => {
    if (name === "") return toast.error("Name is not define.");
    else if (wallet === "") return toast.error("Wallet is not available");
    else return;
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        boxShadow: (_theme) => ({
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
        <CardHeadingGradient text="Edit Profile" />
      </Box>
      <Box maxWidth="800px" pt="24px">
        <Typography variant="h3Light">
          You can set preferred display name, create your branded profile URL
          and manage other personal settings
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
            loading={loading}
            setLoading={setLoading}
            isCollection
            selectedFiles={selectedFiles}
            selectedImageFiles={selectedImageFiles}
            bannerHash={bannerHash}
            profileImageHash={profileImageHash}
            imageType={imageType}
            setImageType={setImageType}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={2} pt="54px">
            <Grid item xs={12} md={6}>
              <EditProfileDetail
                name={name}
                setName={setName}
                address={address}
                setAddress={setAddress}
                wallet={wallet}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DescriptionNFT
                isProfile={true}
                editorState={editorState}
                setEditorState={setEditorState}
              />
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
            <NextLink href={Routes.myProfile}>
              <Button variant="outlinedInherit" sx={{ minWidth: "104px" }}>
                Back
              </Button>
            </NextLink>

            <Button
              variant="containedInherit"
              target="_blank"
              rel="noopener"
              sx={{ minWidth: "104px" }}
              onClick={handlerUploadData}
            >
              Save Changes
            </Button>
          </Stack>
        </Grid>
        <LoadingModal openSuccessModal={loadingModal} text={loadingText} />
      </Grid>
    </Container>
  );
}
