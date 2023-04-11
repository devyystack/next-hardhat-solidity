// Block Chain functions

// Check Balance
export const checkBalance = (nftContract, accountAddress) => {
  return nftContract.methods.checkBalance(accountAddress).call();
};

// Simple Mint 721
export const mintNft = async (
  nftContract,
  tokenid,
  ipfshash,
  royalities,
  accountAddress
) => {
  return nftContract.methods
    ._simpleMint(tokenid, ipfshash, royalities)
    .send({ from: accountAddress }, function (error, transactionHash) {
      if (!error) {
        return transactionHash;
      } else {
        return error;
      }
    });
};

// Simple Mint 721
export const mintNft1155 = async (
  nftContract,
  tokenid,
  copies,
  data,
  ipfshash,
  royalities,
  accountAddress
) => {
  console.log(nftContract, tokenid, copies, data, ipfshash, royalities);
  return nftContract.methods
    .simpleMint(tokenid, copies, data, ipfshash, royalities)
    .send({ from: accountAddress }, function (error, transactionHash) {
      if (!error) {
        return transactionHash;
      } else {
        return error;
      }
    });
};

// Mint with Fixed Price 721
export const mintNftwithFixedPrice = async (
  nftContract,
  tokenid,
  ipfshash,
  royalities,
  fixPrice,
  accountAddress
) => {
  return nftContract.methods
    .MintForFixedPrice(tokenid, ipfshash, royalities, fixPrice)
    .send({ from: accountAddress }, function (error, transactionHash) {
      if (!error) {
        return transactionHash;
      } else {
        return error;
      }
    });
};

// Mint with Fixed Price 1155
export const mintNftwithFixedPrice1155 = async (
  nftContract,
  tokenid,
  copies,
  data,
  ipfshash,
  royalities,
  fixPrice,
  accountAddress
) => {
  return nftContract.methods
    .mintForFixedPrice(tokenid, copies, data, ipfshash, royalities, fixPrice)
    .send({ from: accountAddress }, function (error, transactionHash) {
      if (!error) {
        return transactionHash;
      } else {
        return error;
      }
    });
};

// Mint for Time Auction
export const mintNftwithTimeAuction = async (
  nftContract,
  tokenid,
  ipfshash,
  royalities,
  startDate,
  endDate,
  fixPrice,
  accountAddress
) => {
  return nftContract.methods
    .MintForTimedAuction(
      tokenid,
      ipfshash,
      royalities,
      startDate,
      endDate,
      fixPrice
    )
    .send({ from: accountAddress }, function (error, transactionHash) {
      if (!error) {
        return transactionHash;
      } else {
        return error;
      }
    });
};

// Remove from Sale 721
export const removeFromSale721 = async (
  nftContract,
  tokenid,
  accountAddress
) => {
  return nftContract.methods
    .RemoveNftFromSale(tokenid)
    .send({ from: accountAddress }, function (error, transactionHash) {
      if (!error) {
        return transactionHash;
      } else {
        return error;
      }
    });
};

// Remove fromSale 1155
export const removeFromSale1155 = async (
  nftContract,
  tokenid,
  accountAddress
) => {
  return nftContract.methods
    .removeFromFixedPrice(tokenid)
    .send({ from: accountAddress }, function (error, transactionHash) {
      if (!error) {
        return transactionHash;
      } else {
        return error;
      }
    });
};

// Put on Sale fixed Price 721
export const putOnSaleFixPrice721 = async (
  nftContract,
  tokenid,
  price,
  accountAddress
) => {
  return nftContract.methods
    .PlaceNftForFixedPrice(tokenid, price)
    .send({ from: accountAddress }, function (error, transactionHash) {
      if (!error) {
        return transactionHash;
      } else {
        return error;
      }
    });
};

// Put on Sale Time Auction 721
export const putOnSaleTimeAuction721 = async (
  nftContract,
  tokenid,
  startDate,
  endDate,
  fixPrice,
  accountAddress
) => {
  return nftContract.methods
    .PlaceNftForTimedAuction(tokenid, startDate, endDate, fixPrice)
    .send({ from: accountAddress }, function (error, transactionHash) {
      if (!error) {
        return transactionHash;
      } else {
        return error;
      }
    });
};

// Buy Lazy minted NFT 721
export const buyLazyMintedNft721 = async (
  nftContract,
  buyerAddress,
  tokenid,
  tokenUri,
  creatorAddress,
  royalties,
  ethPrice,
  nftPrice,
  accountAddress
) => {
  return nftContract.methods
    .MintTo(
      buyerAddress,
      tokenid,
      tokenUri,
      creatorAddress,
      royalties,
      nftPrice
    )
    .send(
      { from: accountAddress, value: ethPrice },
      function (error, transactionHash) {
        if (!error) {
          return transactionHash;
        } else {
          return error;
        }
      }
    );
};

// Purchase for fixed price 721
export const purchaseNftForFixPrice721 = async (
  nftContract,
  payableAmount,
  tokenid,
  toAddress,
  data,
  accountAddress
) => {
  return nftContract.methods
    .PurchaseNftFromFixedPrice(tokenid, toAddress, data)
    .send(
      { from: accountAddress, value: payableAmount },
      function (error, transactionHash) {
        if (!error) {
          return transactionHash;
        } else {
          return error;
        }
      }
    );
};

// Place Bid Time Auction Lazy Mint 721
export const placeBidOnLazyMintedNFT721 = async (
  nftContract,
  creatorAddress,
  minBidPrice,
  bidAmount,
  royalties,
  tokenid,
  fileHash,
  startTime,
  endTime,
  accountAddress
) => {
  return nftContract.methods
    .placeBidOnLazyMintedNFT(
      creatorAddress,
      minBidPrice,
      bidAmount,
      royalties,
      tokenid,
      fileHash,
      startTime,
      endTime
    )
    .send(
      { from: accountAddress, value: bidAmount },
      function (error, transactionHash) {
        if (!error) {
          return transactionHash;
        } else {
          return error;
        }
      }
    );
};
// Place Bid Time Auction Minted 721
export const placeBidNFT721 = async (
  nftContract,
  tokenid,
  bidAmount,
  accountAddress
) => {
  return nftContract.methods
    .AddAuctionBid(tokenid, bidAmount)
    .send(
      { from: accountAddress, value: bidAmount.toString() },
      function (error, transactionHash) {
        if (!error) {
          return transactionHash;
        } else {
          return error;
        }
      }
    );
};

// Check Heighest Bid
export const getHeighestIndexValue = (nftContract, tokenId) => {
  return nftContract.methods.GetHighestIndexvalue(tokenId).call();
};

// Accept Heigest Bid
export const acceptYourHighestBid = async (
  nftContract,
  tokenid,
  accountAddress
) => {
  return nftContract.methods
    .AcceptYourHighestBid(tokenid)
    .send({ from: accountAddress }, function (error, transactionHash) {
      if (!error) {
        return transactionHash;
      } else {
        return error;
      }
    });
};

// Put on Sale fixed Price 1155
export const putOnSaleFixPrice1155 = async (
  nftContract,
  tokenid,
  price,
  accountAddress
) => {
  return nftContract.methods
    .placeNftForFixedAmount(tokenid, price)
    .send({ from: accountAddress }, function (error, transactionHash) {
      if (!error) {
        return transactionHash;
      } else {
        return error;
      }
    });
};
// Purchase for fixed price 1155
export const purchaseNftForFixPrice1155 = async (
  nftContract,
  payableAmount,
  fromAddress,
  toAddress,
  tokenid,
  copies,
  accountAddress
) => {
  return nftContract.methods
    .purchaseAgainstFixedPrice(fromAddress, toAddress, tokenid, copies)
    .send(
      { from: accountAddress, value: payableAmount },
      function (error, transactionHash) {
        if (!error) {
          return transactionHash;
        } else {
          return error;
        }
      }
    );
};

// Check Minted NFTs in 1155
export const checkMintedNFTs = (nftContract, accountAddress, tokenId) => {
  return nftContract.methods.balanceOf(accountAddress, tokenId).call();
};

// Buy Lazy minted NFT 1155
export const buyLazyMintedNft1155 = async (
  nftContract,
  ethPrice,
  toAddress,
  tokenId,
  copies,
  data,
  fileHash,
  nftPrice,
  minterAddress,
  royalties
) => {
  return nftContract.methods
    .mintLazyMintedNfts(
      toAddress,
      tokenId,
      copies,
      data,
      fileHash,
      nftPrice,
      minterAddress,
      royalties
    )
    .send(
      { from: toAddress, value: ethPrice },
      function (error, transactionHash) {
        if (!error) {
          return transactionHash;
        } else {
          return error;
        }
      }
    );
};
