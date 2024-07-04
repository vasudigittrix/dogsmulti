import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { RadioGroup,Radio, FormLabel } from '@mui/material'
import { Modal, Paper, Typography} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createEmployeeByType } from "@/reducer/EmployeeByTypeSlice";
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { clearCustAction } from "@/reducer/CustomerSlice";
import { getCustomerList } from '@/reducer/CustomerSlice';
import { createPet, clearpetAction } from '@/reducer/PetSlice';
export default function NewPetDrawer({open , onClose, userid}){
    const dispatch = useDispatch();
    const [customers, setCustomers] = useState([]);
    const employeecreatesuccess = useSelector((state)=> state.employeebytype.createsuccess);
    const customercontent = useSelector((state)=> state.customer.list);
    const customercontentsuccess = useSelector((state)=> state.customer.listsuccess);
    const petcreatesuccess = useSelector((state)=> state.pet.addsuccess);
    
    
    useEffect(()=>{
      if(petcreatesuccess){
        dispatch(clearpetAction());
        onClose();
      }
    },[petcreatesuccess]);
    useEffect(()=>{
      if(customercontentsuccess && customercontent ){
          setCustomers(customercontent);
          dispatch(clearCustAction());
      }
    },[customercontentsuccess]);
    const handleImageChange = (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        formik.setFieldValue('image', file);
      }
    };
    const handleSwitchChange = () => {
      formik.setFieldValue('status', !formik.values.status);
  };
  const handleSubmit = (e) => {
    e.preventDefault(); 
    formik.submitForm(); 
  };
    const initialvalues = {
        name: "",
        type: "",
        user: "",
        gender: "",
        status: true,
        image: ""
      };
      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        type: Yup.string().required('Type is required'),
        user: Yup.string().required('User is required'),
        gender: Yup.string().required('Gender is required'),
      });
      const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: validationSchema,
        onSubmit: async (values, {resetForm}) => {
          let data = new FormData();
          for (let key in values) {
                data.append(key, values[key]);
          }
          console.log(data);
          dispatch(createPet(data)
          );
          onClose();
          resetForm();
        },
      }
    );
    useEffect(()=>{
      if(open){
        dispatch(getCustomerList());
      }
      if(userid){
        formik.setFieldValue('user' , userid)
      }
    },[open, userid]);

    return(
        <>
        <Drawer
        open={open}
        onClose={onClose}
        anchor = "right"
      >
        <h2>Create Pet </h2>
        <Paper
          style={{
            padding: "20px",
            maxWidth: "800px",
            margin: "50px auto",
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
                
                <IconButton style={{ position: "absolute", top: "10px", right: "10px" }} onClick={onClose}>
            <IconX />
        </IconButton>
                <form onSubmit={formik.handleSubmit}>
              
    <Grid container spacing={3}>
    {formik.values.image && (
        <img
          src={URL.createObjectURL(formik.values.image)}
          alt="Preview"
          style={{ width: '100%', marginTop: '10px', width:'100px', height:'100px' }}
        />
      )}
    <Grid item xs={12}>
      
    <InputLabel>Pet Image</InputLabel>
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
          </Grid>
          <Grid item xs={12}>
          <InputLabel>Pet type</InputLabel>
            <Select 
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
            error={formik.touched.type && Boolean(formik.errors.type)}
        helperText={formik.touched.type && formik.errors.type}
        onBlur={formik.handleBlur}
        fullWidth
    >
      
            <MenuItem value="dog">Dog</MenuItem>
        {/* {customers.length > 0 && customers.map((ele) => (
            <MenuItem key={ele._id} value={ele._id}>{ele.firstName} {ele.lastName}</MenuItem>
        ))} */}
    </Select>
      </Grid>
      {!userid && (

          <Grid item xs={12}>
          <InputLabel>User</InputLabel>
            <Select 
            name="user"
            onChange={formik.handleChange}
            value={formik.values.user}
            error={formik.touched.user && Boolean(formik.errors.user)}
        helperText={formik.touched.user && formik.errors.user}
        onBlur={formik.handleBlur}
        fullWidth
    >
        {customers.length > 0 && customers.map((ele) => (
            <MenuItem key={ele._id} value={ele._id}>{ele.firstName} {ele.lastName}</MenuItem>
        ))}
    </Select>
      </Grid>
      )}
      <Grid item xs={12}>
      {/* <TextField
    fullWidth
    label="Date of Birth"
    error={formik.touched.dateofbirth && Boolean(formik.errors.dateofbirth)}
    helperText={formik.touched.dateofbirth && formik.errors.dateofbirth}
  >
      <Flatpickr
        data-enable-time
        value={formik.values.dateofbirth}
        onChange={(date) => formik.setFieldValue('dateofbirth', date[0])} 
      />
      </TextField> */}
      {/* <FormGroup>
       <FormLabel >Date of birth</FormLabel>
          <Flatpickr
            defaultValue={new Date()}
            name="dateofbirth"
            onChange={(date) => formik.setFieldValue('dateofbirth', date[0])}
             />
         </FormGroup> */}
         <InputLabel htmlFor="dateofbirth">Date of Birth</InputLabel>
         <TextField
          id="dateofbirth"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.dateofbirth}
          error={formik.touched.dateofbirth && Boolean(formik.errors.dateofbirth)}
          helperText={formik.touched.dateofbirth && formik.errors.dateofbirth}
          onBlur={formik.handleBlur}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
      <InputLabel>Age</InputLabel>
        <TextField 
        variant="outlined" 
        fullWidth 
        name="age"
        onChange={formik.handleChange}
        value={formik.values.age}
        error={formik.touched.age && Boolean(formik.errors.age)}
        helperText={formik.touched.age && formik.errors.age}
        onBlur={formik.handleBlur}
         />
      </Grid>
     
      <Grid item xs={12}>
        <InputLabel>Additional Information </InputLabel>
      <TextField 
        variant="outlined" 
        fullWidth 
        name="additionalInfo"
        onChange={formik.handleChange}
        value={formik.values.additionalInfo}
        error={formik.touched.additionalInfo && Boolean(formik.errors.additionalInfo)}
        helperText={formik.touched.additionalInfo && formik.errors.additionalInfo}
        onBlur={formik.handleBlur}
        multiline 
        minRows={4}
         />
      </Grid>
      <Grid item xs={12}>
    <FormLabel component="legend">Gender</FormLabel>
    <RadioGroup
      name="gender"
      value={formik.values.gender}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      row
    >
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="other" control={<Radio />} label="Other" />
    </RadioGroup>
      </Grid>
      <Grid item xs={12} style={{display: 'flex',justifyContent: 'space-between'}}>
      <FormControlLabel
                control={<Switch checked={formik.values.status} onChange={handleSwitchChange} />}
                label="Status"
          labelPlacement="start"
            />
            </Grid>
            </Grid>
            </form>
        </Paper>
            <Grid item xs={12}>
        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        <Button size="large" color="secondary" variant="outlined" onClick={onClose}>
                Cancel
              </Button>
      </Grid>
    {/* </Grid> */}

      </Drawer>
        </>
    )
}