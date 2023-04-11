import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { Box, Typography, Avatar, Link, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { UserAvatarTypo } from '../../components/admin'
import { Image } from '../../components'
import Routes from 'src/routes'
import NextLink from 'next/link'
import { UserActionByAdmin } from '../../apis'
import { getUserCookie } from '../../utils/getCookies'
import { useAppContext } from "src/context-api/appContext";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F1EAFF',
    color: theme.palette.brandpurple.primary,
  },
}))

const StyledCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.brandpurple.primary,
  },
}))

export default function ConsumersTable({ linkKey }) {
  const { state, dispatch } = useAppContext();
  
  const token = getUserCookie()
  const [userData, setUserData] = React.useState([]) // api for enable/ disable user

  const actionUser = async (userId, status) => {
    if(token){
    const result = await UserActionByAdmin(token, userId, status);
    if (result?.data?.data) {
      console.log(result?.data?.data)
      setUserData(result?.data?.data)
      
    }}
  }

  React.useEffect(() =>{
    if(userData){
      let tempArray = [...state.consumerData];
      let isEnabled = userData.isEnabled;
      let updateUserData = tempArray.map(item => item.id === userData?._id ? {...item, isEnabled}: item);
      dispatch({type: "CONSUMER_DATA", value: updateUserData})

    }

  },[userData])

  const theme = useTheme();

  console.log("state?.consumerData", state?.consumerData)

  return (
    <Box height={'481px'} overflow={'auto'}>
      <TableContainer component={Paper} elevation={3} mb={4} mt={2}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Our Consumers</StyledTableCell>
              <StyledTableCell align="left">Owned NFTs</StyledTableCell>
              <StyledTableCell align="left">Created NFTs</StyledTableCell>
              <StyledTableCell align="left">Consumer Detail</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          {state?.consumerData  ? (
            <TableBody>
              {state?.consumerData && state?.consumerData?.map((value, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <UserAvatarTypo
                        address={value?.userAddress ? value?.userAddress : null}
                        src={
                          process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                          value?.userImage
                        }
                        title={value?.userName}
                        opacity
                        slice
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Typography variant="h3LightTable">
                        {value?.owned ? value?.owned : 0}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Typography variant="h3LightTable">
                        {value?.created ? value?.created : 0}
                      </Typography>
                    </TableCell>

                    <StyledCell>
                      <NextLink
                        href={`${Routes.consumerProfile}/${value?.userAddress}`}
                      >
                        <a style={{ color: theme.palette.brandpurple.primary }}>
                          <Typography
                            variant="h3LightTable"
                            sx={{ color: theme.palette.brandpurple.primary }}
                          >
                            {value?.userAddress ? 'Details' : ''}
                          </Typography>
                        </a>
                      </NextLink>
                    </StyledCell>

                    {value?.isEnabled === true ? (
                   
                      <StyledCell align="left">
                        <Box
                          width="100%"
                          sx={{
                            bgcolor: '#CDF8C8',
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: '4px',
                          }}
                        >
                          <Typography
                            variant="h3Lightest"
                            sx={{ color: theme.palette.brandblack.primary }}
                          >
                            {'Enable'}
                          </Typography>
                        </Box>
                      </StyledCell>
                    ) : (
                    
                      <StyledCell align="left">
                        <Box
                          width="100%"
                          sx={{
                            bgcolor: '#F1C6BB',
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: '4px',
                          }}
                        >
                          <Typography
                            variant="h3Lightest"
                            sx={{ color: theme.palette.brandblack.primary }}
                          >
                            {'Disable'}
                          </Typography>
                        </Box>
                      </StyledCell>
                    )}

                    <StyledCell align="left">
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <Button
                          onClick={() => {
                            actionUser(value?.id, value?.isEnabled===true ? false : true);
                          }}
                          variant="containedInherit"
                        >
                          {value?.isEnabled === true ? 'Disabled'  : 'Enabled' }
                        </Button>
                      </Box>
                    </StyledCell>
                  </TableRow>
                )
              })}
            </TableBody>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              alignItems={'center'}
              mb={4}
            >
              <Image
                alt="cover"
                src="/assets/images/svgs/noData.svg"
                sx={{
                  width: '270px',
                  height: 'auto',
                  mt: 6,
                }}
              />
            </Box>
          )}
        </Table>
      </TableContainer>
    </Box>
  )
}
