import * as React from 'react';
import { useState, useEffect } from 'react';

import { Modal, Paper, Typography} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createEmployeeByType } from "@/reducer/EmployeeByTypeSlice";
import { addCustomer } from '@/reducer/CustomerSlice';
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCustAction } from "@/reducer/CustomerSlice";
import { getSingleCategory, editSingleCategory, clearscatAction } from '@/reducer/SingleCategorySlice';

export default function EditCategoryDrawer({id, open , handleClose}){
    const dispatch = useDispatch();
    const categorycontentData = useSelector((state)=> state.singlecategory.content);
    const categorysuccessData = useSelector((state)=> state.singlecategory.success);
    // const customersuccessData = useSelector((state)=> state.customer.addsuccess);
    // const customererrorData = useSelector((state)=> state.customer.error);
    const [sincategory, setSinCategory] = useState("");

    useEffect(()=>{
      if(open){
        console.log(id, 'catid');
        dispatch(getSingleCategory({
          id
      }))
      }
    },[open, id]);
    useEffect(()=>{
      if(categorysuccessData &&categorycontentData){
        setSinCategory(categorycontentData);
        formik.setValues(categorycontentData || {});
      }
    },[categorysuccessData]);
      const handleSwitchChange = () => {
        formik.setFieldValue('status', !formik.values.status);
    };
    const toggleDrawer = (openpar) => { 
      setOpen(openpar);
    };
  
    //   const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(formData);
    //     dispatch(createFacility(formData));
    //   }
    const handleSubmit = (e)=>{
      e.preventDefault(); 
      formik.submitForm(); 
    }
      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
             });
      const formik = useFormik({
        initialValues: sincategory || {} ,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
        //   let data = new FormData();
          console.log(values);
          dispatch(editSingleCategory({id:id, formData: values}));
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
        <h2>Edit Category</h2>
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
          }}
        >
                
        <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField 
        label="Category Name" 
        variant="outlined" 
        fullWidth
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name || ''}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        onBlur={formik.handleBlur}
         />
          </Grid>
      <Grid>
      <FormControlLabel
                control={<Switch checked={formik.values.status} onChange={handleSwitchChange} />}
                label="Status"
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