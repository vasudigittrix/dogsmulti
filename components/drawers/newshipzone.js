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
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import { getLogistics, clearlogAction } from '@/reducer/LogisticSlice';
import { createShipzone } from '@/reducer/ShipzoneSlice';
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

export default function NewShipZoneDrawer({open , handleClose}){
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [logistic, setLogistic] = useState([]);
    const logisticsuccessData = useSelector((state)=> state.logistic.success);
    const logisticcontentData = useSelector((state)=> state.logistic.content);
    const initialvalues = {
        name: '',
        logisticid: "",
        city: "",
        deliverycharge: "0",
        deliverytime: "1 Day",
      };
    
    

    const handleSubmit = (e) => {
      e.preventDefault(); 
      formik.submitForm(); 
    };
      const validationSchema = Yup.object().shape({
        name: Yup.string().required('First Name is required'),
        logisticid: Yup.string().required('Logistic is required'),
        deliverycharge: Yup.string().required('Delivery Charge is required'),
        deliverytime: Yup.string().required('Delivery time is required')
      });
      const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
        dispatch(createShipzone(values));
        handleClose();
          resetForm(); 

        },
      });
      useEffect(()=>{
        dispatch(getLogistics())
    },[]);
      useEffect(()=>{
        if(logisticsuccessData && logisticcontentData){
            setLogistic(logisticcontentData);
            dispatch(clearlogAction()); 
        }
    },[logisticsuccessData]);
    return(
        <>
        <Drawer
        open={open}
         onClose={ handleClose}
        anchor = "right"
      >
              <h2>Create Shipping Zone</h2>
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
            width: '400px'
          }}
        >
         
              
                <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <InputLabel>Name</InputLabel>
        <TextField 
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
          <Grid item xs={12}>
          <InputLabel>Logistic</InputLabel>
            <Select 
            name="logisticid"
            onChange={formik.handleChange}
            value={formik.values.logisticid}
            error={formik.touched.logisticid && Boolean(formik.errors.logisticid)}
        helperText={formik.touched.logisticid && formik.errors.logisticid}
        onBlur={formik.handleBlur}
        fullWidth
    >
        {logistic.length > 0 && logistic.map((ele) => (
            <MenuItem key={ele._id} value={ele._id}>{ele.name}</MenuItem>
        ))}
    </Select>
      </Grid>
      <Grid item xs={12}>
          <InputLabel>City</InputLabel>
            <Select 
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
        onBlur={formik.handleBlur}
        fullWidth
    >
        {/* {logistics.length > 0 && logistics.map((ele) => (
            <MenuItem key={ele._id} value={ele._id}>{ele.name}</MenuItem>
        ))} */}
    </Select>
      </Grid>
          <Grid item xs={12}>
            <InputLabel>Standard Delivery Charge</InputLabel>
        <TextField 
        variant="outlined" 
        fullWidth
        name="deliverycharge"
        onChange={formik.handleChange}
        value={formik.values.deliverycharge}
        error={formik.touched.deliverycharge && Boolean(formik.errors.deliverycharge)}
        helperText={formik.touched.deliverycharge && formik.errors.deliverycharge}
        onBlur={formik.handleBlur}
         />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Standard Delivery Time</InputLabel>
        <TextField 
        variant="outlined" 
        fullWidth
        name="deliverytime"
        onChange={formik.handleChange}
        value={formik.values.deliverytime}
        error={formik.touched.deliverytime && Boolean(formik.errors.deliverytime)}
        helperText={formik.touched.deliverytime && formik.errors.deliverytime}
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