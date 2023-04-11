
import React,{useEffect} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Typography, Stack, TextField, Box, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { useRouter } from "next/router";
import { Login } from "../../apis";
import { getUserCookie } from "../../utils/getCookies";
import { toast } from "react-toastify";
import {storeCookies} from "../../utils/storeCookies";


const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
});
export default function LoginForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit:  async(values) => {
      const result = await Login(values.email, values.password);
      console.log(result)
      if(result?.data?.is_success===true){
        storeCookies(result?.data?.data?.jwtToken);
        router.push("/admin");
        }
  
      else{
        return toast.error("Email or Password is not valid");
  
      }
      
     
      // router.push("/admin");


    },
  });

  return (
    <Container component="main" maxWidth="xs" mt={10} sx={{  pt: "120px",}}>

      <Box width="100%">

        <Box display="flex" justifyContent="center">
          <Avatar sx={{ m: 1 }} >
            <LockOutlinedIcon />
          </Avatar>

        </Box>

        <Box display="flex" justifyContent="center">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>



      </Box>

      <Box sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }} >
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <Box width="100%">
            <TextField
            width="100%"
              hiddenLabel
              placeholder="Enter an email"
              variant="outlined"
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

          </Box>

          <Box marginY="10px">
            <TextField
              hiddenLabel
              placeholder="Password"
              variant="outlined"
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

          </Box>



          <Button color="primary" variant="contained" type="submit"
          sx={{display: 'flex', alignItems: 'center'}}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

