import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Paper, Typography} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch, FormHelperText} from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createEmployeeByType } from "@/reducer/EmployeeByTypeSlice";
import { addCustomer } from '@/reducer/CustomerSlice';
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCustAction } from "@/reducer/CustomerSlice";
import { getCategoriesByType, clearCatAction } from '@/reducer/CategoriesSlice';
import { addServiceByType } from '@/reducer/ServicesSlice';
import { createTax } from '@/reducer/TaxesSlice';
export default function NewTaxDrawer({open ,  handleClose}){
    const dispatch = useDispatch();
    const handleSubmit = (e)=>{
      e.preventDefault(); 
      formik.submitForm(); 
    }

    const initialvalues = {
        title: "",
        value: "",
        type: "",
        moduletype: "",
        status: true
      };
    
      const handleSwitchChange = () => {
        formik.setFieldValue('status', !formik.values.status);
    };
    const toggleDrawer = (openpar) => { 
      setOpen(openpar);
    };
 
      const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        value: Yup.number().required('Value is required').positive('Value must be a positive number').integer('Value must be an integer'),
        type: Yup.string().required('Type is required'),
        moduletype: Yup.string().required('Module Type is required')
      });
      const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
        //   let data = new FormData();
          dispatch(createTax ({formData: values}));
          resetForm(); 
          handleClose();
        },
      });
    return(
        <>
        <Drawer
        open={open}
         onClose={ handleClose}
        anchor = "right"
      >
         <h2>Create Tax</h2>
                <IconButton style={{ position: "absolute", top: "10px", right: "10px" }} onClick={ handleClose}>
            <IconX />
        </IconButton>
        <Paper
          style={{
            padding: "20px",
            maxWidth: "800px",
            margin: "50px auto",
            overflowY: "auto",
            maxHeight: "80vh",
            width: '400px'
          }}
        >
               
                <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <InputLabel>Title</InputLabel>
        <TextField 
        // label="Service Name" 
        variant="outlined" 
        fullWidth
        name="title"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        onBlur={formik.handleBlur}
         />
          </Grid>
      <Grid item xs={12}>
      <InputLabel>Value</InputLabel>
        <TextField 
        variant="outlined" 
        fullWidth 
        name="value"
        onChange={formik.handleChange}
        value={formik.values.value}
        error={formik.touched.value && Boolean(formik.errors.value)}
        helperText={formik.touched.value && formik.errors.value}
        onBlur={formik.handleBlur} />
      </Grid>
      <Grid item xs={12}>
          <InputLabel>Select Type</InputLabel>
         <Select 
          onChange={formik.handleChange}
          name="type"
        value={formik.values.type}
        error={formik.touched.type && Boolean(formik.errors.type)}
        helperText={formik.touched.type && formik.errors.type}
        onBlur={formik.handleBlur}
        fullWidth
        >
  
            <MenuItem value="fixed">Fixed</MenuItem>
            <MenuItem value="percentage">Percentage</MenuItem>
          </Select>
          </Grid>
      <Grid item xs={12}>
      <InputLabel>Module Type</InputLabel>
         <Select 
          onChange={formik.handleChange}
          name="moduletype"
        value={formik.values.moduletype}
        error={formik.touched.moduletype && Boolean(formik.errors.moduletype)}
        helperText={formik.touched.moduletype && formik.errors.moduletype}
        onBlur={formik.handleBlur}
        fullWidth
        >
  
            <MenuItem value="product">Products</MenuItem>
            <MenuItem value="service">Services</MenuItem>
          </Select>
      </Grid>
      <Grid style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
      {/* <FormControlLabel
                control={<Switch checked={formik.values.status} onChange={formik.handleChange} />}
                label="Status"
            /> */}
          <span>Status</span>
    <FormControlLabel
        control={<Switch checked={formik.values.status} onChange={handleSwitchChange} />}
        label=""
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