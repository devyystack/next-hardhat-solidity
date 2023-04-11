import * as React from 'react'
import NextLink from "next/link";

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import {
  Box,
  Typography,
  Divider,
  Avatar,
  Link,
  Grid,
  OutlinedInput,
  Button
} from '@mui/material';
import { toast } from "react-toastify";

import { useTheme } from '@mui/material/styles'
import { getUserCookie } from "../../utils/getCookies";
import {UpdatePassword} from "../../apis";


function ChangePassword() {
  const [currentPwd, setCurrentPwd] = React.useState("");
  const [newPwd, setNewPwd] = React.useState("");
  const [confirmPwd, setConfirmPwd] = React.useState("");
  const token = getUserCookie();



  const validateData = () => {
    if (currentPwd === "") return toast.error("Enter your current password.");
    else if (newPwd === "") return toast.error("Enter your new password");

    else return;
  };


  const changePwd = async () => {
    validateData();
 


    if(token && newPwd===confirmPwd){
  

      console.log(currentPwd, newPwd);
      const result = await UpdatePassword(token, currentPwd,  newPwd);
      console.log("result...", result)
      if(result?.data?.is_success===true){
        return toast.success("Password updated.", { autoClose: 1000 });
      }
      else{
        return toast.error("Password not updated.", { autoClose: 1000 });


      }

    }
    else{
      return toast.error("Please confirm your new password");
    }
   
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          minWidth: '815px',

          minHeight: '374px',
          height: 'auto',
          overflow: 'auto',
          justifyContent: 'center',
        },
      }}
    >
      <Paper elevation={3}>
        <Grid container pl={2} pr={3} spacing={1}>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Box
              px={4}
              py={2}
              width="100%"
              height="auto"
              display="flex"
              justifyContent="center"
            >
              <Grid item xs={12} md={4} display="flex" alignItems="center">
                <Box width="100%" display="flex">
                  Current Password
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <OutlinedInput
                  id="standard-adornment-password"
                  type="password"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  placeholder="Enter your current password "
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Box>

            <Box
              px={4}
              py={2}
              width="100%"
              height="auto"
              display="flex"
              justifyContent="center"
            >
              <Grid item xs={12} md={4} display="flex" alignItems="center">
                <Box width="100%" display="flex">
                  New Password
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <OutlinedInput
                    id="standard-adornment-password"
                    type="password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="Enter your new password "
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Box>

            <Box
              px={4}
              py={2}
              width="100%"
              height="auto"
              display="flex"
              justifyContent="center"
            >
              <Grid item xs={12} md={4} display="flex" alignItems="center">
                <Box width="100%" display="flex">
                  Confirm Password
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <OutlinedInput
                    id="standard-adornment-password"
                    type="password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  placeholder="Enter your new password"
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Box>
              
            <Box width="100%" px={4} >
            <Grid item xs={12} sx={{ pt: '30px' }} display="flex" justifyContent="flex-end">
            <NextLink href={'/admin'}>
                <Button
                  onClick={() => {
                    changePwd()
                  }}
                  variant="containedInherit"
                >
                  Set Password
                </Button>
                </NextLink>
              </Grid>

            </Box>
           
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default ChangePassword
