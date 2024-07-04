import * as React from 'react';
import { useState, useEffect, useRef} from 'react';
import { Modal, Paper, Typography} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createLogistic } from '@/reducer/LogisticSlice';
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

export default function NewLogisticDrawer({open , handleClose}){
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
        name: Yup.string().required('First Name is required')
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
        dispatch(createLogistic(data));
        handleClose();
          resetForm(); 

        },
      });
      useEffect(()=>{
        if(customersuccessData){
          toast.success('Customer created successfully');
          dispatch(clearCustAction());
          // handleClose();
        }
        if(customererrorData){
          toast.error(customererrorData.data.responseData.message);
          dispatch(clearCustAction());
          // handleClose();
        }
      },[customersuccessData, customererrorData, handleClose]);
    return(
        <>
        <Drawer
        open={open}
         onClose={ handleClose}
        anchor = "right"
      >
              <h2>Create Logistic</h2>
              <IconButton style={{ position: "absolute", top: "10px", right: "10px" }} onClick={ handleClose}>
            <IconX />
        </IconButton>
        <Paper
          style={{
            padding: "20px",
            maxWidth: "800px",
            margin: "30px auto",
            overflowY: "auto",
            maxHeight: "90vh",
          }}
        >
         
              
                <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={3}>
    {formik.values.image && (
            <img
                src={URL.createObjectURL(formik.values.image)}
                alt="Preview"
                style={{ width: '100%', marginTop: '10px', width:'100px', height:'100px' }}
            />
        )}

{/* {formik.values.image && typeof formik.values.image === 'string' && (
    <img
        src={formik.values.image}
        alt="Preview"
        style={{ width: '100%', marginTop: '10px', width:'100px', height:'100px' }}
    />
)} */}
      <Grid>
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
        label="Name *" 
        variant="outlined" 
        fullWidth
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        onBlur={formik.handleBlur}
         />
          </Grid>
      </Grid>
      </form>
        </Paper>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        <Button size="large" color="secondary" variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
      </Grid>
    
      </Drawer>
        </>
    )
}