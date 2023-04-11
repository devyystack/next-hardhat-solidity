import React from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { Container, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Image } from "../../components";
import { CardHeading } from "../../components/shared";
import { CategoriesCard } from "../../components/collection-categories";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getCategories } from "../../apis";

function CollectionCategories() {
	const { data, isLoading } = useQuery("result", getCategories);
	const [categoryData, setCategoryData] = React.useState([]);

	React.useEffect(() => {
		if (!data) {
			return;
		}
		setCategoryData(data?.data?.data?.data);
	}, [data]);

	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		if (data) {
			setLoading(false);
		}
	}, [data]);

	const theme = useTheme();
	return (
		<Container
			maxWidth={false}
			sx={{
				maxWidth: "1300px",
				pt: "100px",
			}}
		>
			<Grid container spacing={2}  >
				<Box
					sx={{
						width: "100%",
						height: "auto",
						justifyContent: "center",
						display: "flex",
						overflow: "hidden",
						alignItems: "center",
						marginBottom: "59px !important",
					}}
				>
					<CardHeading
						text="Browse by Category"
						sx={{
							display: "flex",
							justifyContent: "center",
							fontSize: { xs: 24 },
						}}
					/>
				</Box>
				{data?.data?.data && data?.data?.data?.length > 0 ? (
					data?.data?.data.map((value, index) => (
						<Grid
							key={index}
							item
							xs={12}
							sm={6}
							md={4}
							sx={{ display: "flex", justifyContent: "center" }}
						>
							<CategoriesCard
								loading={loading}
								value={value?._id}
								linkKey={value?._id}
								// src="/assets/images/svgs/art1.svg"
								text={value?.category_name}
								src={
									process.env.NEXT_PUBLIC_PINATA_BASE_URL +
									value?.category_image
								}
							/>
						</Grid>
					))
				) : (
					<Box display="flex" justifyContent="center" width="100%">
					<Image
						alt="cover"
						src="/assets/images/svgs/noData.svg"
						sx={{
							mt: 4,
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

export default CollectionCategories;
