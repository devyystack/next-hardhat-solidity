import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles';
import {GetAllCategories} from "../../apis";
import { getUserCookie } from "../../utils/getCookies";


import {
  Box,
  Typography,
  Avatar,
  Link,
  Divider,
  Grid,
  IconButton,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { UserAvatarTypo   , CategoryModal} from '../../components/admin'
import { Image } from '../../components'
import Routes from 'src/routes'
import NextLink from 'next/link'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'white',
    color: theme.palette.brandblack.primary,
  },
}))

const StyledCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.brandpurple.primary,
  },
}))

export default function CategoryTable() {
  const [openSaleModel, setOpenSaleModal] = React.useState(false);
  const [id, setId] =React.useState("");

  const handleCloseSaleModel = () => {
    setName("");
    setId("");
    setOpenSaleModal(false);
  };

  const [categories, setCategories] = React.useState([]);
  const theme = useTheme();
  const token = getUserCookie();

  const [name, setName] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  
  const nftdata = async () => {
    const result = await GetAllCategories();
    if(result?.data?.data){
      setCategories(result?.data?.data);
    }
    return result;
  
  }
  React.useEffect(async() =>{
    const data = await nftdata();

  },[token])

  //////////////////////////////////


  // const itemsCount = ()=>{
  //   let totalCount = categories;

  //   if(nft?.length > 0){
  //     let total = 0;

  //     if(nft?.length > 1){
       
  //       for(let i=0; i<nft?.length; i++){
  //         total =total+ details_nft[0]?.count;
  //       }

  //     }

  //     else{
  //       total=   nft?.details_nft[0]?.count;
        
  //     }

  //    return total;
  //   }

  //   console.log("totalCount", totalCount)
  // }

  // itemsCount();

  console.log("categories..", categories);



  return (
    <Paper elevation={3}>
      <Box height={'474px'} minWidth={'815px'} overflow={'auto'} display="flex">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead
              sx={{
                border: 0,
                borderBottom: 0.1,
                borderColor: '#A9A9A9',
              }}
            >
              <TableRow>
                <StyledTableCell>Category Name</StyledTableCell>
                <StyledTableCell align="right">Items Quantity</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>

            {categories?.length > 0 ? (
            
              categories?.map((value, index)=>{

                let nft_count = value?.details.length=== 0 ?
                0: value?.details[0]?.details_nft?.length===0 ? 0   : value?.details[0]?.details_nft[0]?.count;


                return(

                  <TableBody>
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                        borderBottom: 0.1,
                        borderColor: '#A9A9A9',
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Box display={'flex'} alignItems="center">
                        <Avatar
                          variant="rounded"
                          src={ process.env.NEXT_PUBLIC_PINATA_BASE_URL + value?.category_image}
                          alt="avatar"
                          sx={{ width: '62px', height: '51px', borderRadius: 0 }}
                        />
    
                        <Box>
                          <Box display="flex">
                            <Typography
                              noWrap
                              variant="h3Lightest"
                              width="170px"
                              ml="10px"
                              sx={{ opacity: '1' }}
                            >
                              {value?.category_name}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
    
                    <TableCell align="right">
                      <Typography variant="h3Lightest">{ nft_count}</Typography>
                    </TableCell>
    
                    <TableCell component="th" scope="row">
                      <Box
                        display={'flex'}
                        alignItems="center"
                        width="100%"
                        justifyContent="flex-end"
                      >
                        <IconButton 
                         onClick={() => {
                          setName(value?.category_name)
                          setCategoryId(value?._id)
                          setOpenSaleModal(true);
                         
                        }}
                        
                        >
                          <Image
                            alt="edit"
                            src="/assets/images/svgs/editCategory.svg"
                            sx={{
                              width: '22px',
                              height: '22px',
                            }}
                          />
                        </IconButton>
                      </Box>
                      <CategoryModal
                     
                      name={name}
                      id={categoryId}
                      setName={setName}
                      openSuccessModal={openSaleModel}
                      title="Category"
                      handleModalClickClose={handleCloseSaleModel}
        />
                    </TableCell>
                  </TableRow>
                </TableBody>
                )
              })
            ) : (
               <Box display="flex" justifyContent="center" width="100%">
               <Image
                 alt="cover"
                 src="/assets/images/svgs/noData.svg"
                 sx={{
                   mt: 4,
                   width: '270px',
                   height: 'auto',
                 }}
               />
             </Box>
            )}

        
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  )
}
