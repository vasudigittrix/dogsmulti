import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Paper, Typography} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCustAction } from "@/reducer/CustomerSlice";
import { addCategoryByType, clearCatAction } from '@/reducer/CategoriesSlice';
import "flatpickr/dist/themes/material_green.css";
import TimePicker from 'react-time-picker';
import Flatpickr from "react-flatpickr";
import { createDuration, clearAction } from '@/reducer/DurationSlice';
export default function NewDurationDrawer({open , type, handleClose}){
    const dispatch = useDispatch();
    const initialvalues = {
        price: '',
        status: true,
        duration: '00:00'
      };
    
      const handleSwitchChange = () => {
        formik.setFieldValue('status', !formik.values.status);
    };
    const toggleDrawer = (openpar) => { 
      setOpen(openpar);
    };
  
      const validationSchema = Yup.object().shape({
        price: Yup.string().required('Price is required'),
        duration: Yup.string().required('duration is required')
      });
      const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
          console.log(values);
          dispatch(createDuration({
            type: type,
            formData: values}));
            handleClose();
          resetForm(); 

        },
      });
    return(
        <>
        <Drawer
        open={open}
         onClose={handleClose}
        anchor = "right"
      >
        <Paper
          style={{
            padding: "20px",
            maxWidth: "800px",
            margin: "50px auto",
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
                <h2>Create Duration</h2>
                <IconButton style={{ position: "absolute", top: "10px", right: "10px" }} onClick={ handleClose}>
            <IconX />
        </IconButton>
                <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={3}>

       
          <Grid item xs={12}>
            <InputLabel>Duration</InputLabel>
        <TextField
          id="duration"
          type="time"
          onChange={formik.handleChange}
          value={formik.values.duration}
          error={formik.touched.duration && Boolean(formik.errors.duration)}
          helperText={formik.touched.duration && formik.errors.duration}
          onBlur={formik.handleBlur}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
      <InputLabel>Price($)</InputLabel>
        <TextField 
        variant="outlined" 
        fullWidth
        name="price"
        onChange={formik.handleChange}
        value={formik.values.price}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
        onBlur={formik.handleBlur}
         />
          </Grid>
      {/* <Grid item xs = {6}>
      <TimePicker
            onChange={formik.handleChange}
            value='00:00'
            format='hh:mm'
          />
      </Grid> */}
      <Grid>
      <FormControlLabel
                control={<Switch checked={formik.values.status} onChange={handleSwitchChange} />}
                label="Status"
            />
            </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" type="submit">Submit</Button>
        <Button size="large" color="secondary" variant="outlined">
                Cancel
              </Button>
      </Grid>
    </Grid>
    </form>
        </Paper>
      </Drawer>
        </>
    )
}