import React from "react";
import Grid from "@mui/material/Grid";
import { Container, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ContainedImageCard } from "../shared";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import CardHeading from "../shared/CardHeading";
import { GetAllNfts } from "../../apis";
import { Image } from "../../components";

import { queryParamFormatter } from "../../utils/queryStringFormetter";
// routes
import Routes from "src/routes";
import NextLink from "next/link";
import ReactHtmlParser from "react-html-parser";

const RootStyle = styled("div")(({ theme }) => ({
	overflow: "hidden",
	position: "relative",
}));

export default function NoteAbleNft() {
	const [noteAbleData, setNoteAbleData] = React.useState([]);

	const getAllNftsData = async () => {
		const payload = {
			limit: "3",
			views: "desc",
			likes: "desc",
			skip: "0",
			video: "false",
		};
		const result = await GetAllNfts(queryParamFormatter(payload));

		if (result?.data?.data?.length > 0) {
			setNoteAbleData(result?.data?.data);
		}

		if (!result) {
			return;
		}
	};

	React.useEffect(() => {
		getAllNftsData();
	}, []);

	const theme = useTheme();
	return (
		<RootStyle>
			<Container
				maxWidth={false}
				sx={{
					boxShadow: (theme) => ({
						xs: 0,
					}),
					maxWidth: "1300px",
					pt: "100px",
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
						marginBottom: "59px !important",
					}}
				>
					<CardHeading text="Notable NFTs" />

					<Typography
						variant="h4"
						sx={{ color: theme.palette.brandblack.primary }}
					>
						<NextLink href={Routes.nfts}>
						<a style={{ color:"inherit"}}>
								Browse All
							</a>
						</NextLink>
					</Typography>
				</Box>

				<Grid container spacing={2} display="flex" justifyContent="center">
					{noteAbleData.length > 0 ? (
						noteAbleData.map((value, index) => {
							return (
								<Grid item xs={12} sm={4} key={index}>
									<ContainedImageCard
										nftId={value?._id}
										linkKey={value?._id}
										name={value?.nft_name}
										description={ReactHtmlParser(value?.description)}
										src={
											process.env.NEXT_PUBLIC_PINATA_BASE_URL +
											value?.profile_image
										}
										alt="card"
										sx={{
											cursor: "pointer",
											"&:hover": { opacity: 0.8 },
										}}
									/>
								</Grid>
							);
						})
					) : (
						<Image
							alt="cover"
							src="/assets/images/svgs/noData.svg"
							sx={{
								mt: 4,
								width: "270px",
								height: "auto",
							}}
						/>
					)}
				</Grid>
			</Container>
		</RootStyle>
	);
}
