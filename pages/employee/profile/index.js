import * as React from 'react';
import { useState, useEffect, useRef} from 'react';
import { Modal, Paper, Typography, Box} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import { getEmployee, clearEmplAction, editEmployee } from "@/reducer/SingleEmployeeSlice";
import { useSession, signIn, signOut } from "next-auth/react";
import DashboardCard from '@/components/shared/DashboardCard';
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

export default function EmployeeProfile({open , onCustClose}){
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const { data: session, status } = useSession();
    const employeesuccessData = useSelector((state)=> state.singleemployee.success);
      const employeeData = useSelector((state)=> state.singleemployee.content);
    const employeeeditsuccessData = useSelector((state)=> state.singleemployee.editsuccess);
      const [employeedetails, setEmployeeDetails] = useState([]);
  const [userid, setUserid] = useState(null);
  useEffect(()=>{
    if(session){
      setUserid(session.user?.id);
    }
  },[])
      useEffect(()=>{
        if(userid){
          dispatch(getEmployee(
            userid
          ))
        }
      },[userid, employeeeditsuccessData]);
      useEffect(()=>{
        if(employeesuccessData && employeeData){
          setEmployeeDetails(employeeData);
        const {image, firstName, lastName , email, phonenumber, gender, role, commission, type, aboutself, expert, blocked, status} = employeeData;
        const updatefields = {image, firstName, lastName , email, phonenumber, gender, role, commission, type, aboutself, expert, blocked, status};
        formik.setValues(updatefields || {});
          dispatch(clearEmplAction());
        }
        if(employeeeditsuccessData){
            alert('Employee edited successfully');
          dispatch(clearEmplAction());

        }
      },[employeesuccessData, employeeeditsuccessData]);
    useEffect(()=>{
      if(session){
        setUserid(session.user?.id);
      }
    },[])
    const initialvalues = {
        image: '',
        firstName: "",
        lastName: "",
        email: "",
        phonenumber: "",
        commission: "",
        gender: "",
        status: 'true'
      };
    
    const removeImage=()=>{
      formik.setFieldValue('image', '');
    }
    const handleSubmit = (e) => {
      e.preventDefault(); 
      formik.submitForm(); 
    };
    const handleImageChange = (e) => {
      const file = e.target.files && e.target.files[0];
      console.log(file);
      if (file) {
        formik.setFieldValue('image', file);
      }
    };
      const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phonenumber: Yup.string().required('Phone Number is required'),
        gender: Yup.string().required('Gender is required'),
        // expert: Yup.boolean(),
        // verificationStatus: Yup.string(),
        // blocked: Yup.boolean(),
        // status: Yup.boolean()
      });
      const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
          let data = new FormData();
          console.log(values);
          for (let key in values) {
            data.append(key, values[key]);
      }
      dispatch(editEmployee({
        id: userid,
        formData: data }));
        handleClose();
      }});
   
    return(
        <>
        <DashboardCard title="My Profile">
        <Box
          style={{
            padding: "20px",
          }}
        >
         
              
                <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={3}>
    <Grid item xs={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    {formik.values.image && (
            <img
                src={formik.values.image}
                alt="Preview"
                style={{ width: '100%', marginTop: '10px', width:'100px', height:'100px' }}
            />
        )}
      
      <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
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
      <Grid item xs={6}>
        <TextField 
        label="First Name *" 
        variant="outlined" 
        fullWidth
        name="firstName"
        onChange={formik.handleChange}
        value={formik.values.firstName}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        onBlur={formik.handleBlur}
         />
          </Grid>
      <Grid item xs={6}>
        <TextField 
        label="Last Name *" 
        variant="outlined" 
        fullWidth 
        name="lastName"
        onChange={formik.handleChange}
        value={formik.values.lastName}
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
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        onBlur={formik.handleBlur}
        disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField label="Phone Number *" 
        variant="outlined" 
        fullWidth 
        name="phonenumber"
        onChange={formik.handleChange}
        value={formik.values.phonenumber}
        error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
        helperText={formik.touched.phonenumber && formik.errors.phonenumber}
        onBlur={formik.handleBlur}
         />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select 
          name="gender"
          onChange={formik.handleChange}
        value={formik.values.gender}
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
      <Grid item xs={12} style={{display: 'flex', alignItems: 'center'}}>
        <Button variant="contained" color="primary" type="submit" >Submit</Button>
      </Grid>
      </Grid>
     
      </form>
        </Box>
        </DashboardCard>
    
        </>
    )
}