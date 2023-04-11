import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Typography, IconButton } from "@mui/material";
import Image from "../../components/Image";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import priceConverter from "../../utils/priceConverter";
import { likeNft } from "../../apis";
import { getUserCookie } from "../../utils/getCookies";
import jwt_decode from "jwt-decode";
import { connectWallet } from "../../apis/wallet/WalletApi";
import { toast } from "react-toastify";
import { useAppContext } from "src/context-api/appContext";

export default function LikesSection({ src, nftLikes, bg, nftId }) {
  const { state } = useAppContext();
  const { userData } = state;
  const [checkLike, setCheckLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  useEffect(() => {
    const token = getUserCookie();
    if (token) {
      if (nftLikes && nftLikes.length > 0) {
        setLikes(nftLikes);
        setLikesCount(nftLikes.length);
        let decoded = jwt_decode(token);
        const userId = decoded.publicAddress;
        if (nftLikes.length > 0) {
          const checkLiked = nftLikes.filter((data) => {
            return data.user.toLowerCase() === userId.toLowerCase();
          });
          if (checkLiked && checkLiked.length > 0) {
            setCheckLike(true);
          } else {
            setCheckLike(false);
          }
        }
      }
    }
  }, [nftLikes]);

  useEffect(() => {
    const token = getUserCookie();
    if (token) {
      var decoded = jwt_decode(token);
      const userId = decoded.publicAddress;
      setLikesCount(likes.length);
      if (likes.length > 0) {
        const checkLiked = likes.filter((data) => {
          return data.user.toLowerCase() === userId.toLowerCase();
        });
        if (checkLiked && checkLiked.length > 0) {
          setCheckLike(true);
        } else {
          setCheckLike(false);
        }
      }
    }
  }, [likes, userData]);

  const handleLike = async () => {
    const token = getUserCookie();
    if (!token) {
      return toast.error("Please sign in", {
        autoClose: 1500,
      });
    }

    let decoded = jwt_decode(token);
    const userId = decoded.publicAddress;

    const payload = {
      userId,
      nftId,
    };

    if (token) {
      const res = await likeNft(token, payload); // add likes appi
      if (res) {
        const nftLikesData = res?.data?.data;
        if (nftLikesData) {
          setLikesCount(nftLikesData?.count);
          if (nftLikesData?.result) {
            setCheckLike(true);
          } else {
            setCheckLike(false);
          }
        } else {
          setCheckLike(false);
        }
      }
    }
  };

  return (
    <Box backgroundColor={bg ? "#F7F3FF" : ""} borderRadius={1} p={1}>
      <Box display="flex" alignItems="center" zIndex={1}>
        <IconButton
          onClick={() => {
            handleLike();
          }}
        >
          {checkLike ? (
            <Image src={src} maxWidth="15px" />
          ) : (
            <FavoriteBorderOutlinedIcon sx={{ fontSize: "15px" }} />
          )}
        </IconButton>
        <Typography variant="subtitle4">
          {likesCount && priceConverter(likesCount)}
        </Typography>
      </Box>
    </Box>
  );
}
