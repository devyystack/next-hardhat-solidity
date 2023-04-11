import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { Container, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ExploreCollectionCard } from "../../components/explore-collection";
import { CardHeading } from "../../components/shared";
import { Image } from "../../components";
import ReactHtmlParser from "react-html-parser";

function ExploreSpecificCollection({ collectionData }) {
	let category = collectionData?.data?.[0]?.category?.[0];
	const theme = useTheme();

	console.log("collectionData", collectionData);
	return (
		<Container
			maxWidth={false}
			sx={{
				maxWidth: "1300px",
				pt: "150px",
				height: "auto",
			}}
		>
			<Box
				sx={{
					maxWidth: "100%",
					heigth: "427px",
					marginBottom: "100px",
					overflow: "hidden",
					marginTop: "20px",
					position: "relative",
					textAlign: "left",
				}}
			>
				<Image
					alt="cover"
					src={ category ?
						process.env.NEXT_PUBLIC_PINATA_BASE_URL +
						category?.category_image : "/assets/images/svgs/category.jpg"
					}
					sx={{
						borderRadius: 1.5,
						width: "100%",
						maxHeight: "427px",
						objectFit: "cover",
					}}
				/>

				<Box
					sx={{
						color: "white",
						position: "absolute",
						top: "25%",
						left: "63px",
						right: "63px",
						width: "80%",
						height: "auto",
					}}
				>
					<Typography variant="h1">
						Explore {category?.category_name}
					</Typography>

					<Typography variant="h5">
						An online community of makers, developers, and traders is
						pushing the {category?.category_name} world into new
						territory.
					</Typography>
				</Box>
			</Box>

			<Box
				sx={{
					width: "auto",
					height: "auto",
					justifyContent: "center",
					display: "flex",
					overflow: "hidden",
					alignItems: "center",
					marginBottom: "69px !important",
				}}
			>
				<CardHeading text={`Top Collections ${category ? "in" : ""}`}>
					<Box
						component="span"
						sx={{ color: theme.palette.brandpurple.primary }}
					>
						&nbsp; {category?.category_name}
					</Box>
				</CardHeading>
			</Box>

			<Grid container spacing={3} pb="60px" sx={{ overflow: "hidden" }}>
				{collectionData?.data && collectionData?.data?.length > 0 ? (
					collectionData?.data?.map((value, index) => {
						let user = value?.userData[value?.userData.length - 1];
						return (
							<Grid
								item
								xs={12}
								sm={6}
								md={6}
								lg={4}
								
								key={index}
							>
								<ExploreCollectionCard
									value={value?._id}
									linkKey={value?._id}
									coverImage={
										process.env.NEXT_PUBLIC_PINATA_BASE_URL +
										value?.profile_cover
									}
									avtarImage={
										process.env.NEXT_PUBLIC_PINATA_BASE_URL +
										value?.profile_image
									}
									collectionName={value?.collection_name}
									ownerName={user?.userName}
									bodyText={ReactHtmlParser(value?.description)}
								/>
							</Grid>
						);
					})

				) : (
					<Box display="flex" justifyContent="center" width="100%">
					<Image
						alt="cover"
						src="/assets/images/svgs/noData.svg"
						sx={{
							width: "270px",
							height: "auto",
							
						}}
					/>
				</Box>
				)}
			
			</Grid>
		</Container>
	);
}

export default ExploreSpecificCollection;
