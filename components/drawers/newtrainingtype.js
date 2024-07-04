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
import { createTrainingType } from '@/reducer/TrainingTypeSlice';
export default function NewTrainingType({open ,  handleClose}){
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const initialvalues = {
        name: "",
        description: "",
        status: true
      };
    
      const handleSwitchChange = () => {
        formik.setFieldValue('status', !formik.values.status);
    };
    const toggleDrawer = (openpar) => { 
      setOpen(openpar);
    };
  
      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
      });
      const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
        //   let data = new FormData();
          dispatch( createTrainingType(values));
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
        <Paper
          style={{
            padding: "20px",
            maxWidth: "800px",
            margin: "50px auto",
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
                <h2>Create Training Service</h2>
                <IconButton style={{ position: "absolute", top: "10px", right: "10px" }} onClick={ handleClose}>
            <IconX />
        </IconButton>
                <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField 
        label="Service Name" 
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
        <TextField label="Description" 
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