"use client";
import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { useFormik } from "formik";
import { useRouter } from 'next/router';
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import * as yup from 'yup';
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
// import { useRouter } from 'next/router';
import { CircularProgress,
} from "@mui/material";
import { useSession} from "next-auth/react";
const Card = styled(MuiCard)(() => ({
  width: '28rem'
}
));

const LinkStyled = styled('a')(() => ({
  fontSize: '0.875rem',
  textDecoration: 'none'
}))

const FormControlLabel = styled(MuiFormControlLabel)(() => ({
  fontSize: '0.875rem',
}))

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log(session);
    if (session ) {
      router.push('/');
    }
  }, [session]);

//   const loginrespodata = useAppSelector(state => state.loginauth?.respodata);
//   const successdeta = useAppSelector(state => state.loginauth?.success);
//   const errordata = useAppSelector(state => state.loginauth?.error);
  const [showpass, setShowpass] = useState(false);
  const [loading, setLoading] = useState(false);

  // ** Hook

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    // Pass the Yup schema to validate the form
    validationSchema: validationSchema,

    onSubmit: async ({ email, password }) => {
      try {
        let formData = {
          email,
          password
        };
        setLoading(true);
        const res = await signInHandler(formData);
        if (res?.error) {
          alert(res?.error );
           setLoading(false);
        } else {
           setLoading(false);
        }
      
      } catch (error) {
       
        console.error('Login failed:', error);

      } finally {
       
        setLoading(false);
      }

    },
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser({ ...user, [name]: value });
  // };
  const handleClickShowPassword = () => {
    setShowpass(!showpass);
  }
  const signInHandler = async (values) => {

    const { email, password} = values;
      let options = {
        redirect: false,
        email: email,
        password: password,
      };
      const res = await signIn("credentials", options);
       if (res?.error) {
         alert(res?.error );
          setLoading(false);
       } else {
          setLoading(false);
       }
     
    
    }


  return (
  <>
 
    <Box
      className="content-center"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "70px 0",
      }}
    >
      
        <Card sx={{ zIndex: 1 }}>
          <CardContent
            sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}
          >
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, marginBottom: 1.5 }}
              >
                Welcome to Admin Panel!
              </Typography>
              <Typography variant="body2">
                Please sign-in to your account
              </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit} method="POST">
              <TextField
                autoFocus
                fullWidth
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                id="email"
                label="Email"
                sx={{ marginBottom: 4 }}
                // error={formik.touched.email && Boolean(formik.errors.email)}
                // helperText={formik.touched.email ? formik.errors.email : ''}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="error">{formik.errors.email}</span>
              ) : null}
              <FormControl fullWidth>
                <InputLabel htmlFor="auth-login-password">Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  name="password"
                  id="auth-login-password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type={showpass ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        aria-label="toggle password visibility"
                      >
                        {showpass ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {formik.touched.password && formik.errors.password ? (
                <span className="error">{formik.errors.password}</span>
              ) : null}
              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
              </Box>
              <Button
                fullWidth
                size="large"
                variant="contained"
                sx={{ marginBottom: 7 }}
                type="submit"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
      </>
  );
}


export default LoginPage