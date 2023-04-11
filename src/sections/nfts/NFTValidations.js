import { toast } from "react-toastify";
import moment from "moment";

export const validateNftData = (payload) => {
  let error = false;
  if (
    payload.jwt_address.toLowerCase() !== payload.creator_address.toLowerCase()
  ) {
    toast.error("Please sign in with you wallet.", { autoClose: 1000 });
    error = true;
    return error;
  }
  if (payload.profile_image === "") {
    toast.error("Please upload nft file.", { autoClose: 1000 });
    error = true;
    return error;
  } else if (payload.nft_name === "") {
    toast.error("Please define NFT name.", { autoClose: 1000 });
    error = true;
    return error;
  } else if (payload.collection_Id === "" || payload.collection_Id === "none") {
    toast.error("Please select NFT Collection", { autoClose: 1000 });
    error = true;
    return error;
  } else if (payload.royalties < 0 || payload.royalties > 99) {
    toast.error("You can set royalties between 0 and 99.", {
      autoClose: 1500,
    });
    error = true;
    return error;
  } else if (payload.nft_type === "single") {
    if (payload?.nft_owners[0]?.copies !== 1) {
      toast.error("No of copies should be 1.", { autoClose: 1000 });
      error = true;
      return error;
    }
  } else if (
    payload.nft_type === "multiple" &&
    payload?.nft_owners[0]?.copies < 1
  ) {
    toast.error("No of copies should be atleast 1.", {
      autoClose: 1000,
    });
    error = true;
    return error;
  }
  if (payload?.nft_owners[0]?.put_on_sale) {
    if (payload?.nft_owners[0]?.sale_type === "price") {
      if (payload?.nft_owners[0]?.nft_price === "") {
        toast.error("Please enter NFT price.", { autoClose: 1000 });
        error = true;
        return error;
      } else if (parseFloat(payload?.nft_owners[0]?.nft_price) < 1) {
        toast.error("NFT price should be greater than 0.", { autoClose: 1000 });
        error = true;
        return error;
      }
    } else if (payload?.nft_owners[0]?.sale_type === "time") {
      if (payload?.nft_owners[0]?.nft_price === "") {
        toast.error("Please enter NFT price.", { autoClose: 1000 });
        error = true;
        return error;
      } else if (parseFloat(payload?.nft_owners[0]?.nft_price) < 1) {
        toast.error("NFT price should be greater than 0.", { autoClose: 1000 });
        error = true;
        return error;
      } else if (payload?.nft_owners[0]?.start_date === "") {
        toast.error("Please select start date.", { autoClose: 1000 });
        error = true;
        return error;
      } else if (payload?.nft_owners[0]?.end_date === "") {
        toast.error("Please select end date.", { autoClose: 1000 });
        error = true;
        return error;
      } else if (
        !moment(new Date(payload?.nft_owners[0]?.start_date)).isSameOrAfter(
          new Date(),
          "day"
        )
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
        !moment(new Date(payload?.nft_owners[0]?.end_date)).isAfter(
          new Date(payload?.nft_owners[0]?.start_date),
          "day"
        )
      ) {
        toast.error("End date should be greater than current date.", {
          autoClose: 1500,
        });
        error = true;
        return error;
      } else if (
        !moment(new Date(payload?.nft_owners[0]?.start_date)).isSameOrAfter(
          new Date(),
          "day"
        ) ||
        !moment(new Date(payload?.nft_owners[0]?.end_date)).isAfter(
          new Date(),
          "day"
        )
      ) {
        toast.error("End date should not be less than current date", {
          autoClose: 1500,
        });
        error = true;
        return error;
      }
    }
  }
  if (payload.unblock_content) {
    if (payload.unblock_content_text === "") {
      toast.error("Please add unblock content.", { autoClose: 1000 });
      error = true;
      return error;
    }
  }
  return error;
};
