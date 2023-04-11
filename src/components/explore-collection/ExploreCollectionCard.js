import { Box } from "@mui/system";
import { Card, Typography, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Image } from "../../components";
import sliceText from "src/utils/sliceText";
// next
import NextLink from "next/link";
// routes
import Routes from "src/routes";

function ExploreCollectionCard({
	coverImage,
	ownerName,
	avtarImage,
	collectionName,
	bodyText,
	linkKey,
}) {
	const theme = useTheme();
	return (
		<NextLink  href={`${Routes.collectionProfile}/${linkKey}`} key={linkKey}>
			<Card className="explore-collection-card">
				<Box
					sx={{
						justifyContent: "center",
						overflow: "hidden",
						width: "100%",
					}}
				>
					<Box sx={{ height: "186px", width: "339px" }}>
						<Image
							alt="cover"
							src={coverImage}
							sx={{
								borderRadius: 1.5,
								cursor: "pointer",
								width: "339px",
								height: "186px",
								marginTop: "16px",
								position: "absolute",
								objectFit: "cover",
							}}
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							position: "relative",
							bottom: 14,
							overflow: "hidden",
						}}
					>
						<Avatar
							alt="Avatar"
							src={avtarImage}
							sx={{ width: 63, height: 63 }}
						/>
					</Box>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							marginTop: 1,
							marginBottom: 2,
						}}
					>
						<Typography
							variant="h5"
							sx={{
								color: theme.palette.brandblack.primary,

								display: "flex",
								justifyContent: "center",
								overflow: "hidden",
								textOverflow: "ellipsis",
								display: "-webkit-box",
								WebkitLineClamp: "1",
								WebkitBoxOrient: "vertical",
							}}
						>
							{collectionName}
						</Typography>

						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
							}}
						>
							<Typography
								component="span"
								variant="subtitle4"
								sx={{
									fontWeight: "medium",
									color: theme.palette.brandblack.primary,
									display: "flex",
									justifyContent: "center",
								}}
							>
								by
								<Box
									component="span"
									className="verified-clr"
									sx={{
										color: theme.palette.brandblue.secondary,
										marginRight: 1,
									}}
								>
									&nbsp;{ownerName}{" "}
								</Box>
							</Typography>
						</Box>
					</Box>

					<Box>
						<Typography
						component={'div'}
							sx={{
								textOverflow: "ellipsis",
								display: "-webkit-box",
								WebkitLineClamp: "3",
								WebkitBoxOrient: "vertical",
							}}
						>
							{bodyText}
						</Typography>
					</Box>
				</Box>
			</Card>
		</NextLink>
	);
}

export default ExploreCollectionCard;
