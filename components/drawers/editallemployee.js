import { useEffect, useState } from "react";
import { Modal, Paper, Typography} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch, FormLabel, RadioGroup, Radio } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createEmployeeByType } from "@/reducer/EmployeeByTypeSlice";
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { getEmployee, editEmployee } from "@/reducer/SingleEmployeeSlice";
export default function EditEmployeeDrawer2({id, fopen, handleClose}){
    const dispatch = useDispatch();
    const employeesuccessData = useSelector((state)=> state.singleemployee.success);
    const employeeData = useSelector((state)=> state.singleemployee.content);

    const initialvalues = {
      firstName: "",
      lastName: "",
      email: "",
      phonenumber: "",
      type: "",
      commission: "",
      password: "",
      gender: "",
      comission: "",
      aboutself: "",
      expert: "",
      verificationStatus: "false",
      blocked: "false",
      status: "true"
    };
    const [employeeDetails, setEmployeeDetails] = useState(initialvalues);
    const employeecreatesuccess = useSelector((state)=> state.employeebytype.createsuccess);
   
      useEffect(()=>{
        if(fopen){
          console.log(id, 'employid');
          dispatch(getEmployee(
            id
          ))
        }
      },[fopen, id]);
    useEffect(()=>{
      if(employeesuccessData &&employeeData && fopen){
        setEmployeeDetails(employeeData);
        const {image, firstName, lastName , email, phonenumber, gender, role, commission, type, aboutself, expert, blocked, status} = employeeData;
        const updatefields = {image, firstName, lastName , email, phonenumber, gender, role, commission, type, aboutself, expert, blocked, status};
        formik.setValues(updatefields || {});
      }
    },[employeesuccessData]);
   
    
      const handleSwitchChange = () => {
        formik.setFieldValue('status', !formik.values.status);
    };
    const handleSubmit = (e) => {
      e.preventDefault(); 
      formik.submitForm(); 
    };
     
    const handleSwitchChange1 = () => {
  };
  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      formik.setFieldValue('image', file);
    }
  };
    //   const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(formData);
    //     dispatch(createFacility(formData));
    //   }
      const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phonenumber: Yup.string().required('Phone Number is required'),
        gender: Yup.string().required('Gender is required'),
        commission: Yup.string().required('Commission is required'),
        type: Yup.string().required('User type is required'),
        aboutSelf: Yup.string(),
        // expert: Yup.boolean(),
        // verificationStatus: Yup.string(),
        // blocked: Yup.boolean(),
        // status: Yup.boolean()
      });
    //   const formik = useFormik({
    //     initialValues: initialvalues,
    //     validationSchema: validationSchema,
    //     onSubmit: async (values, { resetForm }) => {
    //       let data = new FormData();
    //       for (let key in values) {
    //         data.append(key, values[key]);
    //   }
    //       dispatch(createEmployeeByType(data));
    //     resetForm();
    //         handleClose();
    //     },
        const formik = useFormik({
            initialValues: initialvalues,
            validationSchema: validationSchema,
            onSubmit: async (values) => {
              let data = new FormData();
              for (let key in values) {
                data.append(key, values[key]);
        }
              dispatch(editEmployee({
                id: id,
                formData: data }));
                handleClose();
            },
           
          });
    return(
        <>
        <Drawer
        open={fopen}
        onClose={handleClose}
        anchor = "right"
      >
         <h2>Edit Employee</h2>
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
    <Grid item xs={8}>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <InputLabel>First Name *</InputLabel>
                <TextField 
                    variant="outlined" 
                    fullWidth
                    name="firstName"
                    onChange={formik.handleChange}
                    value={formik.values.firstName || ''}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    onBlur={formik.handleBlur}
                />
            </Grid>
            <Grid item xs={6}>
                <InputLabel>Last Name *</InputLabel>
                <TextField 
                    variant="outlined" 
                    fullWidth 
                    name="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName || ''}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    onBlur={formik.handleBlur} 
                />
            </Grid>
            <Grid item xs={6}>
                <InputLabel>Email *</InputLabel>
                <TextField 
                    variant="outlined" 
                    fullWidth
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email || ''}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    onBlur={formik.handleBlur}
                />
            </Grid>
            <Grid item xs={6}>
                <InputLabel>Phone Number *</InputLabel>
                <TextField 
                    variant="outlined" 
                    fullWidth 
                    name="phonenumber"
                    onChange={formik.handleChange}
                    value={formik.values.phonenumber || ''}
                    error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
                    helperText={formik.touched.phonenumber && formik.errors.phonenumber}
                    onBlur={formik.handleBlur}
                />
            </Grid>
        </Grid>
    </Grid>
    <Grid item xs={4}>
        {/* {formik.values.image && (
            <img
                src={URL.createObjectURL(formik.values.image)}
                alt="Preview"
                style={{ width: '100%', marginTop: '10px', width:'100px', height:'100px' }}
            />
        )} */}
        <InputLabel>Image</InputLabel>
        <input
            variant="outlined" 
            fullWidth
            type="file"
            onChange={handleImageChange}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
            onBlur={formik.handleBlur}
        />
    </Grid>
      <Grid item xs={12}>
    <FormLabel component="legend">Gender</FormLabel>
    <RadioGroup
      name="gender"
      value={formik.values.gender || ''}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      row
    >
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="other" control={<Radio />} label="Other" />
    </RadioGroup>
      </Grid>
      <Grid item xs={12}>
      <InputLabel>Select Commission</InputLabel>
        <Select
        label="Select Commission *" 
        variant="outlined" 
        fullWidth 
        name = "commission"
        onChange={formik.handleChange}
        value={formik.values.commission || ''}
        error={formik.touched.commission && Boolean(formik.errors.commission)}
        helperText={formik.touched.commission && formik.errors.commission}
        onBlur={formik.handleBlur}
         >
          
            <MenuItem value="booking commission">booking commission</MenuItem>
            <MenuItem value="product commission">product commission</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12}>
      <InputLabel>Select Type</InputLabel>
        <Select
        variant="outlined" 
        fullWidth 
        name = "type"
        onChange={formik.handleChange}
        value={formik.values.type || ''}
        error={formik.touched.type && Boolean(formik.errors.type)}
        helperText={formik.touched.type && formik.errors.type}
        onBlur={formik.handleBlur}
         >
          
          <MenuItem value="veterinarian">veterinarian</MenuItem>
            <MenuItem value="trainer">Training</MenuItem>
            <MenuItem value="groomer">Groomer</MenuItem>
            <MenuItem value="walker">Walker</MenuItem>
            <MenuItem value="boarder">Boarder</MenuItem>
            <MenuItem value="daycaretaker">Daycare Taker</MenuItem>
            <MenuItem value="petsitter">Pet Sitter</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
      <InputLabel>Select Pet Care Center</InputLabel>
        <TextField 
        label="Select Pet Care Center" 
        variant="outlined" 
        // name = "commission"
        // onChange={formik.handleChange}
        // value={formik.values.commission}
        // error={formik.touched.commission && Boolean(formik.errors.commission)}
        // helperText={formik.touched.commission && formik.errors.commission}
        // onBlur={formik.handleBlur}
        fullWidth />
      </Grid>
      <Grid item xs={6}>
      <InputLabel>About Self</InputLabel>
        <TextField 
        variant="outlined" 
        fullWidth 
        name = "aboutself"
        onChange={formik.handleChange}
        value={formik.values.aboutself || ''}
        error={formik.touched.aboutself && Boolean(formik.errors.aboutself)}
        helperText={formik.touched.aboutself && formik.errors.aboutself}
        onBlur={formik.handleBlur} 
        rows={4} />
      </Grid>
      <Grid item xs={6}>
      <InputLabel>Expert</InputLabel>
      <TextField 
        variant="outlined" 
        fullWidth 
        name = "expert"
        onChange={formik.handleChange}
        value={formik.values.expert || ''}
        error={formik.touched.expert && Boolean(formik.errors.expert)}
        helperText={formik.touched.expert && formik.errors.expert}
        onBlur={formik.handleBlur} 
        rows={4} />
      </Grid>
      <Grid item xs={6}>
      <InputLabel>Facebook Link</InputLabel>
        <TextField variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={6}>
      <InputLabel>Instagram Link</InputLabel>
        <TextField variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={6}>
      <InputLabel>Twitter Link</InputLabel>
        <TextField variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={6}>
      <InputLabel>Dribbble Link</InputLabel>
        <TextField  variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={12}>
      <InputLabel>Address</InputLabel>
        <TextField  variant="outlined" fullWidth multiline rows={4} />
      </Grid>
      <Grid item xs={6}>
      <InputLabel>Latitude</InputLabel>
        <TextField  variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={6}>
      <InputLabel>Longitude</InputLabel>
        <TextField  variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={6} >
        <FormControlLabel
                control={<Switch checked={formik.values.status || 'true'} onChange={handleSwitchChange} />}
                label="Status"
                labelPlacement="start"
            />
      </Grid>
      <Grid item xs={6}>
      <FormControlLabel
                control={<Switch checked={true} onChange={handleSwitchChange1} />}
                label="Enable Shop"
                labelPlacement="start"
            />
      </Grid>
    
    </Grid>
    </form>
        </Paper>
        <Grid item xs={12}>
        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        <Button size="large" color="secondary" variant="outlined">
                Cancel
              </Button>
      </Grid>
      </Drawer>
        </>
    )
}