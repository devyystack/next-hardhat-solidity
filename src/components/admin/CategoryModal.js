import React, { useState } from 'react'

// mui
import { Box, Grid, Typography, OutlinedInput, Button } from '@mui/material'

import { CustomModal, LoadingModal } from '../../components/shared';
import {EditCategory} from "../../apis";
import { getUserCookie } from "../../utils/getCookies";


export default function CategoryModal({
 
  openSuccessModal,
  handleModalClickClose,
  name,
  id,


}) {
  const [fieldName,setFieldName]= React.useState(name);
  const [categoryId, setCategoryId]= React.useState("");
 

  React.useEffect(()=>{
    setFieldName(name)
    setCategoryId(id)
  },[name])


  console.log("cat id.modal..",categoryId);
/////
  const nftdata = async () => {
    const result = await EditCategory(categoryId, fieldName);
    return result;
  
  }


  return (
    <CustomModal
      openModal={openSuccessModal}
      title={''}
      handleClose={handleModalClickClose}
    >
      <Box pt={'0px'}>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Box display={'flex'} JustifyContent="center">
              <Typography variant="h3">Edit Category</Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} pt={'20px'}>
          <Grid item xs={12}>
            <OutlinedInput
              id="outlined-adornment-weight"
              type="string"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              placeholder="Enter Category Name"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              sx={{ width: '100%' }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ pt: '30px' }}>

          <Button
            onClick={() => {nftdata();
             handleModalClickClose()}
            }
          
      
          variant="containedInherit">Save Category</Button>
        </Grid>
      </Box>
    </CustomModal>
  )
}
