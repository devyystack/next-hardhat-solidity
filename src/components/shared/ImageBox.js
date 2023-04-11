// import React from "react";

// // mui
// import { Box, Avatar, Typography } from "@mui/material";

// // shared
// import Image from "next/image";
// import Skeleton from '@mui/material/Skeleton';
// import CircularProgress from '@mui/material/CircularProgress';

// export default function ImageBox({ isCover, avatarImage, coverImage , loading}) {
//   console.log(coverImage);
//   return (
//     <Box
//       sx={{
//         maxHeight: "214px",
//         height: "100%",
//         maxWidth: "300px",
//         width: "100%",
//         borderColor: "#EAF5FF",
//         borderStyle: "solid",
//         borderWidth: "5px",
//         borderRadius: "8px",
//         mb: 4,
//       }}
//     >
//       <Box
//         sx={{
//           width: "100%",
//           height: "105px",
//           backgroundColor: "#fff",
//         }}
//       >
//         {isCover && coverImage && (
//           <Image
//             src={coverImage}
//             alt="Picture of the author"
//             width="300px"
//             height="110px"
//           />
//         )}
//       </Box>

//       <Box
//         sx={{
//           height: "50%",
//           backgroundColor: "#EAF5FF",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Typography variant="body1">Your Text goes here</Typography>
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           position: "relative",
//           bottom: "130px",
//         }}
//       >
//         {loading ? <Skeleton variant="circular" width={61} height={61} /> :
//         <Avatar
//         alt="Avatar"
//         src={avatarImage ? avatarImage : null}
//         sx={{
//           width: "61px",
//           height: "61px",
//           borderWidth: "2px",
//           borderColor: "white",
//           borderStyle: "solid",
//           background:
//             "linear-gradient(91.43deg, #692ADC 3.16%, #24C9D9 104.27%)",
//           color: "white",
//         }}
//       >
//         OE
//       </Avatar>}

//       </Box>
//     </Box>
//   );
// }

import React from "react";

// mui
import { Box, Avatar, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

// shared
import Image from "next/image";

export default function ImageBox({ isCover, isAvatar, coverImage, loading }) {
  return (
    <Box
      sx={{
        maxHeight: "180px",
        height: "100%",
        maxWidth: "300px",
        width: "100%",
        borderColor: "#EAF5FF",
        borderStyle: "solid",
        borderWidth: "5px",
        borderRadius: "8px",
        mb: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "90px",
          backgroundColor: "#fff",
        }}
      >
        {isCover && coverImage && (
          <Image
            src={coverImage}
            alt="Picture of the author"
            width="300px"
            height="90px"
          />
        )}
      </Box>

      <Box
        sx={{
          height: "50%",
          backgroundColor: "#EAF5FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body1">Your Text goes here</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          bottom: "120px",
        }}
      >
        {loading ? (
          <Skeleton variant="circular" width={61} height={61} />
        ) : (
          <Avatar
            alt="Avatar"
            src={isAvatar ? isAvatar : null}
            sx={{
              width: "61px",
              height: "61px",
              borderWidth: "2px",
              borderColor: "white",
              borderStyle: "solid",
              background:
                "linear-gradient(91.43deg, #692ADC 3.16%, #24C9D9 104.27%)",
              color: "white",
            }}
          >
            OE
          </Avatar>
        )}
      </Box>
    </Box>
  );
}
