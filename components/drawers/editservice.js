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
import 'react-toastify/dist/ReactToastify.css';
import { getCategoriesByType, clearCatAction } from '@/reducer/CategoriesSlice';
import { addServiceByType } from '@/reducer/ServicesSlice';
import { getSingleservice, editSingleservice } from '@/reducer/SingleServiceSlice';
import { clearserviceAction } from "@/reducer/SingleServiceSlice";
export default function EditServiceDrawer({open ,  handleClose, id, type}){
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const categoriessuccessData = useSelector((state)=> state.categories.success);
    const categoriescontentData = useSelector((state)=> state.categories.content);
    const singleservicesuccess = useSelector((state)=> state.singleservice.success);
    const singleservicecontent = useSelector((state)=> state.singleservice.content);
    useEffect(()=>{
      dispatch(getCategoriesByType({
          type: type
      }))
  },[]);
  useEffect(()=>{
    if(open){
      dispatch(getSingleservice({
        id
    }))
    }
  },[open, id]);
  useEffect(()=>{
    if(categoriessuccessData && categoriescontentData){
        setCategories(categoriescontentData);
        setLoading(false);
        dispatch(clearCatAction()); 
    }
},[categoriessuccessData]);

useEffect(()=>{
    if(singleservicesuccess && singleservicecontent){
        console.log(singleservicecontent ,'singlesrvoce');
        formik.setValues(singleservicecontent[0] || {});
        dispatch(clearserviceAction());
    }
},[singleservicesuccess]);
    const initialvalues = {
        name: "",
        duration: "",
        defaultPrice: "",
        categoryid: "",
        status: true
      };
    
      const handleSwitchChange = () => {
        formik.setFieldValue('status', !formik.values.status);
    };
    const toggleDrawer = (openpar) => { 
      setOpen(openpar);
    };
    const handleSubmit = (e)=>{
      e.preventDefault(); 
      formik.submitForm(); 
    }

      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        duration: Yup.number().required('Service duration is required').positive('Service duration must be a positive number').integer('Service duration must be an integer'),
        defaultPrice: Yup.number().required('Default Price is required').positive('Default Price must be a positive number').integer('Default Price must be an integer'),
        categoryid: Yup.string().required('Category is required'),
      });
      const formik = useFormik({
        initialValues: singleservicecontent || {},
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
        //   let data = new FormData();
          dispatch(editSingleservice({id:id, formData: values}));
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
         <h2>Edit Service</h2>
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
        <InputLabel>Service Name</InputLabel>
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
      <InputLabel>Service Duration (mins)</InputLabel>
        <TextField 
        variant="outlined" 
        fullWidth 
        name="duration"
        onChange={formik.handleChange}
        value={formik.values.duration}
        error={formik.touched.duration && Boolean(formik.errors.duration)}
        helperText={formik.touched.duration && formik.errors.duration}
        onBlur={formik.handleBlur} />
      </Grid>
      <Grid item xs={12}>
      <InputLabel>Default Price ($)</InputLabel>
        <TextField 
        variant="outlined" 
        fullWidth
        name="defaultPrice"
        onChange={formik.handleChange}
        value={formik.values.defaultPrice}
        error={formik.touched.defaultPrice && Boolean(formik.errors.defaultPrice)}
        helperText={formik.touched.defaultPrice && formik.errors.defaultPrice}
        onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
          <InputLabel>Select Category</InputLabel>
         <Select 
          onChange={formik.handleChange}
          name="categoryid"
        value={formik.values.categoryid}
        error={formik.touched.categoryid && Boolean(formik.errors.categoryid)}
        helperText={formik.touched.categoryid && formik.errors.categoryid}
        onBlur={formik.handleBlur}
        fullWidth
        >
            {categories.length>0 && categories.map((ele)=> (
                <MenuItem value={ele._id}>{ele.name}</MenuItem>
            ))}
          </Select>
          </Grid>
      <Grid item xs={12}>
      <InputLabel>Description</InputLabel>
        <TextField 
        variant="outlined" 
        fullWidth 
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        onBlur={formik.handleBlur}
         />
      </Grid>
      <Grid>
      <FormControlLabel
                control={<Switch checked={formik.values.status} onChange={formik.handleChange} />}
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