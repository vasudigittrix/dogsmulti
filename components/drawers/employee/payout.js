import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Paper, Typography} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { Box, Avatar } from '@mui/material';
import { getCustomerDetails, clearSingleCustAction } from '@/reducer/SingleCustomerSlice';
import { IconTrash } from '@tabler/icons-react';
import { useFormik } from "formik";

export default function EmployeePayoutDrawer({open, handleClose}){
    const dispatch = useDispatch();
    const [customerdata, setCustomerdata] = useState([]);
    const singlecustomersuccess= useSelector((state)=> state.singlecustomer.success);
    const singlecustomerData = useSelector((state)=> state.singlecustomer.content);
 
    const handleSubmit = ()=>{

    }
 
    return(
        <>
        <Drawer
        open={open}
         onClose={ handleClose}
        anchor = "right"
      >
        { open && (
          <>
             <div  style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '1rem' 
            }}>
         <h2>Payout To</h2>
         </div>
                <IconButton style={{ position: "absolute", top: "10px", right: "10px" }} onClick={ handleClose}>
            <IconX />
        </IconButton>
        <Paper
          style={{
            minWidth: '400px',
            padding: "20px",
            maxWidth: "800px",
            margin: "50px auto",
            overflowY: "auto",
            maxHeight: "100vh",
          }}
        >
               
    <Grid container spacing={3}>
    <Grid container direction="column" className="user-block bg-white p-3 rounded">
      <Grid container item alignItems="center" spacing={3}>
        <Grid item>
          <Avatar src={customerdata.image} alt="user" className="avatar avatar-60 rounded-pill" />
        </Grid>
        <Grid item xs>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="h5">{customerdata.firstName} {customerdata.lastName}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" className="m-0">Client since April 2024</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item alignItems="center" className="m-0">
        <Grid item xs={3}>
          <Typography variant="body2">
            <i><span className="fst-normal">Phone:</span></i>
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="body2">{customerdata.phonenumber}</Typography>
        </Grid>
      </Grid>

      <Grid container item alignItems="center" className="mx-0 mb-3">
        <Grid item xs={3}>
          <Typography variant="body2">
            <i><span className="fst-normal">E-mail:</span></i>
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="body2"> {customerdata.email}</Typography>
        </Grid>
      </Grid>
    </Grid>
  
 
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Select Method</InputLabel>
         <Select 
         name="method"
        //   onChange={formik.handleChange}
        // value={formik.values.method}
        // error={formik.touched.method && Boolean(formik.errors.method)}
        // helperText={formik.touched.method && formik.errors.method}
        // onBlur={formik.handleBlur}
        fullWidth
        >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          </Grid>
          <Grid item xs={12}>
          <InputLabel>Description</InputLabel>
         <TextField
         name="description"
        //   onChange={formik.handleChange}
        // value={formik.values.method}
        // error={formik.touched.method && Boolean(formik.errors.method)}
        // helperText={formik.touched.method && formik.errors.method}
        // onBlur={formik.handleBlur}
        fullWidth
        />
          </Grid>
          <Grid container direction="column">
      <Grid item xs={12} style={{ padding: '10px 0', display: 'flex' }} justifyContent="space-between">
        <Typography variant="h6">Commission Earn</Typography>
        <Typography variant="h5">$120.71</Typography>
      </Grid>
      
      <Box style={{ width: '100%', borderBottom: '1px solid grey', margin: '20px 0' }} />
      
      <Grid item xs={12} style={{ padding: '10px 0', display: 'flex'}} justifyContent="space-between">
        <Typography variant="h6">Total Pay</Typography>
        <Typography variant="h5">$120.71</Typography>
      </Grid>
    </Grid>
    <Grid item xs={12}>
        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} style={{marginRight: '10px'}}>Submit</Button>
        <Button  color="secondary" variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
      </Grid>
        </Paper>
          </>
        )
      }
      </Drawer>
        </>
    )
}