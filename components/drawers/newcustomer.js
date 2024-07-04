import * as React from 'react';
import { useState, useEffect, useRef} from 'react';
import { Modal, Paper, Typography} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { addCustomer } from '@/reducer/CustomerSlice';
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCustAction } from "@/reducer/CustomerSlice";
import { styled } from '@mui/material/styles';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function NewCustomerDrawer({open , onCustClose}){
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const customersuccessData = useSelector((state)=> state.customer.addsuccess);
    const customererrorData = useSelector((state)=> state.customer.error);
    const initialvalues = {
        image: '',
        firstName: "",
        lastName: "",
        email: "",
        phonenumber: "",
        commission: "",
        password: "",
        gender: "",
        status: 'true'
      };
    
      const handleSwitchChange = () => {
        formik.setFieldValue('status', !formik.values.status);
    };
    
  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
    const toggleDrawer = (openpar) => { 
      setOpen(openpar);
    };
    const removeImage=()=>{
      formik.setFieldValue('image', '');
    }
    const handleSubmit = (e) => {
      e.preventDefault(); 
      formik.submitForm(); 
    };
    const handleImageChange = (e) => {
      const file = e.target.files && e.target.files[0];
      console.log(file);
      if (file) {
        formik.setFieldValue('image', file);
      }
    };
      const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phonenumber: Yup.string().required('Phone Number is required'),
        password: Yup.string().min(6, 'Password must be at least 8 characters').required('Password is required'),
        confirmpassword: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Passwords must match'),
        gender: Yup.string().required('Gender is required'),
        // expert: Yup.boolean(),
        // verificationStatus: Yup.string(),
        // blocked: Yup.boolean(),
        // status: Yup.boolean()
      });
      const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
          let data = new FormData();
          console.log(values);
          for (let key in values) {
            data.append(key, values[key]);
      }
        dispatch(addCustomer(data))
          resetForm(); 

        },
      });
      useEffect(()=>{
        if(customersuccessData){
          toast.success('Customer created successfully');
          dispatch(clearCustAction());
          // onCustClose();
        }
        if(customererrorData){
          toast.error(customererrorData.data.responseData.message);
          dispatch(clearCustAction());
          // onCustClose();
        }
      },[customersuccessData, customererrorData, onCustClose]);
    return(
        <>
        <Drawer
        open={open}
         onClose={ onCustClose}
        anchor = "right"
      >
              <h2>Create Customer</h2>
              <IconButton style={{ position: "absolute", top: "10px", right: "10px" }} onClick={ onCustClose}>
            <IconX />
        </IconButton>
        <Paper
          style={{
            padding: "20px",
            maxWidth: "800px",
            margin: "30px auto",
            overflowY: "auto",
            maxHeight: "90vh",
            width: '400px'
          }}
        >
         
              
                <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={3}>
    <Grid item xs={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    {formik.values.image && (
            <img
                src={URL.createObjectURL(formik.values.image)}
                alt="Preview"
                style={{ width: '100%', marginTop: '10px', width:'100px', height:'100px' }}
            />
        )}
      
      <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      // startIcon={<CloudUploadIcon />}
    >
      Upload
      <VisuallyHiddenInput type="file" 
      onChange={handleImageChange}
      />
    </Button>
    {formik.values.image && (
    <Button onClick={removeImage}>
      Remove
    </Button>
    )}

      </Grid>
      <Grid item xs={12}>
        <TextField 
        label="First Name *" 
        variant="outlined" 
        fullWidth
        name="firstName"
        onChange={formik.handleChange}
        value={formik.values.firstName}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        onBlur={formik.handleBlur}
         />
          </Grid>
      <Grid item xs={12}>
        <TextField 
        label="Last Name *" 
        variant="outlined" 
        fullWidth 
        name="lastName"
        onChange={formik.handleChange}
        value={formik.values.lastName}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        onBlur={formik.handleBlur} />
      </Grid>
      <Grid item xs={12}>
        <TextField 
        label="Email *" 
        variant="outlined" 
        fullWidth
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Phone Number *" 
        variant="outlined" 
        fullWidth 
        name="phonenumber"
        onChange={formik.handleChange}
        value={formik.values.phonenumber}
        error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
        helperText={formik.touched.phonenumber && formik.errors.phonenumber}
        onBlur={formik.handleBlur}
         />
      </Grid>
      <Grid item xs={12}>
        <TextField 
        type="password" 
        label="Password *" 
        variant="outlined" 
        fullWidth 
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        onBlur={formik.handleBlur}
         />
      </Grid>
      <Grid item xs={12}>
        <TextField type="password" 
        label="Confirm Password *"
         variant="outlined" 
         fullWidth
         name= "confirmpassword"
         onChange={formik.handleChange}
         value={formik.values.confirmpassword}
         error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
         helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
         onBlur={formik.handleBlur}  />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select 
          name="gender"
          onChange={formik.handleChange}
        value={formik.values.gender}
        error={formik.touched.gender && Boolean(formik.errors.gender)}
        helperText={formik.touched.gender && formik.errors.gender}
        onBlur={formik.handleBlur}
        >
           <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      </Grid>
      </form>
        </Paper>
      <Grid item xs={12} style={{display: 'flex', alignItems: 'center'}}>
        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        <Button size="large" color="secondary" variant="outlined" onClick={onCustClose}>
                Cancel
              </Button>
      </Grid>
    
      </Drawer>
        </>
    )
}