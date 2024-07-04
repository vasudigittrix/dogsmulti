import { useEffect, useState } from "react";
import { Modal, Paper, Typography } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
// import { createTag } from "@/reducer/TagsSlice";
// import { createUnit } from "@/reducer/UnitSlice";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { createBrand } from "@/reducer/BrandsSlice";
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
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
export default function NewBrandDrawer({open, handleClose}){
    const dispatch = useDispatch();
    const brandscreatesuccessData = useSelector((state)=> state.brands.createsuccess);
    const initialvalues = {
        name: '',
        status: true,
        image: ''
      };
      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required')
      });
      const handleSwitchChange = () => {
        formik.setFieldValue('status', !formik.values.status);
    };
    const handleImageChange = (e) => {
        const file = e.target.files && e.target.files[0];
        console.log(file);
        if (file) {
          formik.setFieldValue('image', file);
        }
      };
    const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
          let data = new FormData();
          console.log(values);
          for (let key in values) {
            data.append(key, values[key]);
      }
        dispatch(createBrand(data))
          resetForm(); 
          handleClose();
        },
      });
      const removeImage=()=>{
        formik.setFieldValue('image', '');
      }
      const handleSubmit = (e) => {
        e.preventDefault(); 
        formik.submitForm(); 
      };
   
    return(
        <>
        <Drawer
        open={open}
        onClose={handleClose}
        anchor = "right"
      >
         <h2>Create a Brand</h2>
         <IconButton style={{ position: "absolute", top: "10px", right: "10px" }} onClick={handleClose}>
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
      </div>
            <InputLabel>Name *</InputLabel>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
          <span>Status</span>
    <FormControlLabel
        control={<Switch checked={formik.values.status} onChange={handleSwitchChange} />}
        label=""
    />
          </div>
            {/* <FormControlLabel
                control={<Switch checked={formData.status} onChange={handleSwitchChange} />}
                label="Status"
            /> */}
            
        </form>
        </Paper>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
            <Button type="submit" variant="outlined" color="primary" onClick={handleClose}>
                Cancel
            </Button>
      </Drawer>
        </>
    )
}