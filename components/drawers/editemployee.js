import { useEffect, useState } from "react";
import { Modal, Paper, Typography} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createEmployeeByType } from "@/reducer/EmployeeByTypeSlice";
import { getEmployee, editEmployee } from "@/reducer/SingleEmployeeSlice";
import { styled } from '@mui/material/styles';
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
export default function EditEmployeeDrawer({id, fopen, handleClose , title}){
    const dispatch = useDispatch();
    const employeesuccessData = useSelector((state)=> state.singleemployee.success);
    const employeeData = useSelector((state)=> state.singleemployee.content);
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
    const initialvalues = {
      firstName: "",
      image: "",
      lastName: "",
      email: "",
      phonenumber: "",
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
        console.log(employeeData , 'empssacsa loi');
        const {image, firstName, lastName , email, phonenumber, gender, role, commission, type, aboutself, expert, blocked, status} = employeeData;
        const updatefields = {image, firstName, lastName , email, phonenumber, gender, role, commission, type, aboutself, expert, blocked, status};
        formik.setValues(updatefields || {});
      }
    },[employeesuccessData]);
   
    const handleImageChange = (e) => {
      const file = e.target.files && e.target.files[0];
      console.log(typeof file); 
      console.log(file);
      if (file) {
        formik.setFieldValue('image', file);
      }
    };
      const handleSwitchChange = () => {
        formik.setFieldValue('status', !formik.values.status);
    };
    const handleSwitchChange1 = () => {
  };
    //   const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(formData);
    //     dispatch(createFacility(formData));
    //   }
    const handleSubmit = (e) => {
      e.preventDefault(); 
      formik.submitForm(); 
    };
      const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phonenumber: Yup.string().required('Phone Number is required'),
        gender: Yup.string().required('Gender is required'),
        commission: Yup.string().required('Commission is required'),
        aboutSelf: Yup.string(),
        // expert: Yup.boolean(),
        // verificationStatus: Yup.string(),
        // blocked: Yup.boolean(),
        // status: Yup.boolean()
      });
      const removeImage=()=>{
        formik.setFieldValue('image', '');
      }
      const formik = useFormik({
        initialValues: initialvalues ,
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
      useEffect(()=>{
        if(employeecreatesuccess){
            handleClose();
        }
      },[employeecreatesuccess]);
    return(
        <>
        <Drawer
        open={fopen}
        onClose={handleClose}
        anchor = "right"
      >
         <h2>Edit {title}</h2>
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
      <Grid item xs={6}>
        <TextField 
        label="First Name *" 
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
          {(formik.values.image && typeof formik.values.image == 'object' ) && (
            <img
                src={URL.createObjectURL(formik.values.image)}
                alt="Preview"
                style={{ width: '100%', marginTop: '10px', width:'100px', height:'100px' }}
            />
        )}
        {formik.values.image && typeof formik.values.image === 'string' && (
    <img
        src={formik.values.image}
        alt="Preview"
        style={{ width: '100%', marginTop: '10px', width:'100px', height:'100px' }}
    />
)}
           <Grid>
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
    {formik.values.image && (
    <Button onClick={removeImage}>
      Remove
    </Button>
    )}
    </Grid>
      <Grid item xs={6}>
        <TextField 
        label="Last Name *" 
        variant="outlined" 
        fullWidth 
        name="lastName"
        onChange={formik.handleChange}
        value={formik.values.lastName || ''}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        onBlur={formik.handleBlur} />
      </Grid>
      <Grid item xs={6}>
        <TextField 
        label="Email *" 
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
        <TextField label="Phone Number *" 
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
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select 
          name="gender"
          onChange={formik.handleChange}
        value={formik.values.gender || ''}
        error={formik.touched.gender && Boolean(formik.errors.gender)}
        helperText={formik.touched.gender && formik.errors.gender}
        onBlur={formik.handleBlur}
        >
           <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
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
            <MenuItem value="" disabled>
   Select Commission
  </MenuItem>
            <MenuItem value="booking commission">booking commission</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
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
      <Grid item xs={12}>
        <TextField 
        label="About Self" 
        variant="outlined" 
        fullWidth 
        multiline
        name = "aboutself"
        onChange={formik.handleChange}
        value={formik.values.aboutself}
        error={formik.touched.aboutself && Boolean(formik.errors.aboutself)}
        helperText={formik.touched.aboutself && formik.errors.aboutself}
        onBlur={formik.handleBlur} 
        rows={4} />
      </Grid>
      <Grid item xs={6}>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Expert" />
        </FormGroup>
      </Grid>
      <Grid item xs={6}>
        <TextField label="Facebook Link" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <TextField label="Instagram Link" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <TextField label="Twitter Link" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <TextField label="Dribbble Link" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Address" variant="outlined" fullWidth multiline rows={4} />
      </Grid>
      <Grid item xs={6}>
        <TextField label="Latitude" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <TextField label="Longitude" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
                control={<Switch checked={formik.values.status} onChange={handleSwitchChange} />}
                label="Status"
            />
      </Grid>
      <Grid item xs={6}>
      <FormControlLabel
                control={<Switch checked={true} onChange={handleSwitchChange1} />}
                label="Enable Shop"
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