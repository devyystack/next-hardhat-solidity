import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Typography, Avatar, Link } from "@mui/material";
import { ConsumerProfileAvatar } from "../../components/admin";
import { Image } from "../../components";
import subSrting from "../../utils/subString";
import { converter } from "../../utils/ethConverter";
import { useAppContext } from "src/context-api/appContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F1EAFF",
    color: theme.palette.brandpurple.primary,
  },
}));

const StyledCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.brandpurple.primary,
  },
}));

export default function RecurringRevenue() {
  const { state } = useAppContext();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (state.revenueDetail && state.revenueDetail.length > 0) {
      setData(state.revenueDetail);
    }
  }, [state]);
  return (
    <Box height={"400px"} overflow={"auto"}>
      <TableContainer component={Paper} elevation={3} mb={4} mt={2}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>NFTs</StyledTableCell>
              <StyledTableCell>Creator</StyledTableCell>
              <StyledTableCell>Buyer</StyledTableCell>
              <StyledTableCell>Price (Sell)</StyledTableCell>
              <StyledTableCell>Auction</StyledTableCell>
              <StyledTableCell>Royalties%</StyledTableCell>
              <StyledTableCell>Earning</StyledTableCell>
            </TableRow>
          </TableHead>
          {data && data?.length > 0 ? (
            <TableBody>
              {data.map((value, index) => {
                console.log(value?.sale_type);
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <ConsumerProfileAvatar
                      linkKey={value?.nft[0] ? value?.nft[0]?._id : "#"}

                        src={
                          process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                          value?.nft[0]?.profile_image
                        }
                        title={value?.nft[0]?.nft_name}
                        opacity
                        slice
                        isOwned
                        ownedBy={value?.buyer_user[0]?.userName}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle4">
                        {value?.nft[0].creator_address
                          ? subSrting(value?.nft[0].creator_address)
                          : ""}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle4">
                        {value?.nft_buyer ? subSrting(value?.nft_buyer) : ""}
                      </Typography>
                    </TableCell>

                    <StyledCell>
                      <Typography variant="subtitle3">
                        {value?.nft_price
                          ? converter(value?.nft_price, "wei", "eth")
                          : ""}{" "}
                        {value?.nft[0]?.currency_type}
                      </Typography>
                    </StyledCell>
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor: "#eaf5ff",
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {value?.sale_type === "price" ? "NO" : "YES"}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                      >
                        {value?.nft[0]?.royalties
                          ? value?.nft[0]?.royalties
                          : "0"}
                        {"%"}
                      </Box>
                    </TableCell>
                    <StyledCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Image
                          alt="cover"
                          src="/assets/images/svgs/etherum-light.svg"
                          sx={{
                            width: "20px",
                            height: "20px",
                          }}
                        />
                        <Typography variant="subtitle3">
                          {value?.service_price
                            ? converter(value?.service_price, "wei", "eth")
                            : ""}{" "}
                          {value?.nft[0]?.currency_type}
                        </Typography>
                      </Box>
                    </StyledCell>
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              alignItems={"center"}
              mb={4}
            >
              <Image
                alt="cover"
                src="/assets/images/svgs/noData.svg"
                sx={{
                  width: "270px",
                  height: "auto",
                  mt: 6,
                }}
              />
            </Box>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
