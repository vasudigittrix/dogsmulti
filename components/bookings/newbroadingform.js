import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch, Avatar, Typography } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState, useRef } from 'react';
import { getCustomerDetails } from '@/reducer/SingleCustomerSlice';
import { useDispatch, useSelector } from 'react-redux';
import NewPetDrawer from '../drawers/newpet';
import { fetchpetsbyuser, clearpetAction } from '@/reducer/PetSlice';
import { getEmployeeByType, getActiveNbEmployeeByType, clearAction } from "@/reducer/EmployeeByTypeSlice";
import { getActiveFacilities } from '@/reducer/FacilitiesSlice';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { createBookingByType } from '@/reducer/BookingByTypeSlice';
import { IconTrash } from '@tabler/icons-react';
export default function NewBookingForm({id , onBookingClose, setSelectedCustomer}){
    const dispatch = useDispatch();
    const [petopen, setPetOpen] = useState("");
    const [employeebytype, setEmployeeByType] = useState("");
    const [facilities, setFacilities] = useState([]);
    const customerdetailscontent = useSelector((state)=> state.singlecustomer.content);
    const customerdetailssuccess = useSelector((state)=> state.singlecustomer.success);
    const employeesuccessData = useSelector((state)=> state.employeebytype.actsuccess);
    const employeecontentData = useSelector((state)=> state.employeebytype.activenb);
    const faciltiessuccessData = useSelector((state)=> state.facilities.actsuccess);
    const facilitiescontentData = useSelector((state)=> state.facilities.activefacilities);
    const petslistcontent = useSelector((state)=> state.pet.content);
    const petslistsuccess = useSelector((state)=> state.pet.success);
    const [customerDet, setCustomerDet] = useState({});
    const [petslist, setPetslist] = useState([]);
    const togglePetDrawer = (openpar) => { 
        setPetOpen(openpar);
        console.log(openpar);
      };
    const openNewPetHandler = ()=>{
        togglePetDrawer(true);
    }
    useEffect(()=>{
        dispatch(getActiveFacilities());
        dispatch(getCustomerDetails({id}))
        dispatch(fetchpetsbyuser({userid: id}))
        dispatch(getActiveNbEmployeeByType({
          type: "boarder"
        }))
    },[id]);
    useEffect(()=>{
        if(customerdetailssuccess && customerdetailscontent){
            setCustomerDet(customerdetailscontent[0]);
        }
    },[customerdetailssuccess,customerdetailscontent ]);
    useEffect(()=>{
        if(petslistsuccess && petslistcontent ){
            setPetslist(petslistcontent)
        }
    },[petslistsuccess , petslistcontent]);
    useEffect(()=>{
        if(employeesuccessData && employeecontentData){
            setEmployeeByType(employeecontentData);
            dispatch(clearAction()); 
        }
    },[ employeesuccessData, employeecontentData ]);
    useEffect(()=>{
        if(faciltiessuccessData && facilitiescontentData){
            setFacilities(facilitiescontentData);
        }
    },[faciltiessuccessData]);
    const initialvalues = {
        petid: "",
        employeeid: "",
        description: "",
        facilityid: "",
        dropoffdate: "",
        dropofftime: "",
        pickupdate: "",
        pickuptime: "",
        address: "",
        additionalInfo: ""

      };
    const validationSchema = Yup.object().shape({
        petid: Yup.string().required('Pet Name is required'),
        employeeid: Yup.string().required('Boarder is required'),
        facilityid: Yup.string(),
        dropoffdate: Yup.string().required('Last Name is required'),
        dropofftime: Yup.string().required('Drop off time is required'),
        pickupdate: Yup.string().required('Phone Number is required'),
        pickuptime: Yup.string().required('Pick up time is required'),
        address: Yup
        .string().required('Drop off and pickup Address is required'),
      });
      const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
          dispatch(createBookingByType({type: 'boarding' ,customerid: id, ...values}));
          resetForm(); 
          onBookingClose();
          
        },
      });
    return(
        <>
                <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={3}>
    <Grid container direction="column" className="user-block bg-white p-3 rounded">
      {/* Avatar and Name */}
      <Grid container item alignItems="center" spacing={3}>
        <Grid item>
          <Avatar src={customerDet.image} alt="user" className="avatar avatar-60 rounded-pill" />
        </Grid>
        <Grid item xs>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="h5">{customerDet.firstName} {customerDet.lastName}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" className="m-0">Client since April 2024</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button variant="text" color="error">
            <IconTrash onClick={()=> setSelectedCustomer("")}/>
          </Button>
        </Grid>
      </Grid>

      <Grid container item alignItems="center" className="m-0">
        <Grid item xs={3}>
          <Typography variant="body2">
            <i><span className="fst-normal">Phone:</span></i>
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="body2">{customerDet.phonenumber}</Typography>
        </Grid>
      </Grid>

      <Grid container item alignItems="center" className="mx-0 mb-3">
        <Grid item xs={3}>
          <Typography variant="body2">
            <i><span className="fst-normal">E-mail:</span></i>
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="body2"> {customerDet.email}</Typography>
        </Grid>
      </Grid>
    </Grid>
        <div onClick={openNewPetHandler}> Add Pet</div>
    
      <Grid item xs={12}>
      <FormControl fullWidth>
          <InputLabel>Select Pet</InputLabel>
          <div> Add Pet</div>
         <Select 
         name = "petid"
          onChange={formik.handleChange}
        value={formik.values.petid}
        error={formik.touched.petid && Boolean(formik.errors.petid)}
        helperText={formik.touched.petid && formik.errors.petid}
        onBlur={formik.handleBlur}
        >
            {petslist.length>0 && petslist.map((ele)=> (
                <MenuItem value={ele._id}>{ele.name}</MenuItem>
            ))}
            {/* <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem> */}
          </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
      <FormControl fullWidth>
          <InputLabel>Boarder</InputLabel>
         <Select 
          name="employeeid"
          onChange={formik.handleChange}
        value={formik.values.employeeid}
        error={formik.touched.employeeid && Boolean(formik.errors.employeeid)}
        helperText={formik.touched.employeeid && formik.errors.employeeid}
        onBlur={formik.handleBlur}
        >
            {employeebytype.length>0 && employeebytype.map((ele)=> (
                <MenuItem value={ele._id}> {ele.firstName} {ele.lastName}</MenuItem>
            ))}
          </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
      <FormControl fullWidth>
          <InputLabel>Select Facility</InputLabel>
         <Select 
         name="facilityid"
          onChange={formik.handleChange}
        value={formik.values.facilityid}
        error={formik.touched.facilityid && Boolean(formik.errors.facilityid)}
        helperText={formik.touched.facilityid && formik.errors.facilityid}
        onBlur={formik.handleBlur}
        >
            {facilities.length>0 && facilities.map((ele)=> (
                <MenuItem value={ele._id}>{ele.name}</MenuItem>
            ))}
            {/* <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem> */}
          </Select>
          </FormControl>
          </Grid>
          {/* <Grid item xs={4}>
          <FormGroup>
       <FormLabel >Drop off Date</FormLabel>
          <Flatpickr
            defaultValue={new Date()}
            name="dropoffdate"
            onChange={(date) => formik.setFieldValue('dropoffdate', date[0])}
             />
         </FormGroup>
          </Grid> */}
<Grid item xs={3}>
<InputLabel htmlFor="dropoffdate">Drop off Date</InputLabel>
        <TextField
          id="dropoffdate"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.dropoffdate}
          error={formik.touched.dropoffdate && Boolean(formik.errors.dropoffdate)}
          helperText={formik.touched.dropoffdate && formik.errors.dropoffdate}
          onBlur={formik.handleBlur}
          fullWidth
        />
      </Grid>
<Grid item xs={3}>
<InputLabel htmlFor="dropoffdate">Drop off Time</InputLabel>
        <TextField
          id="dropofftime"
          type="time"
          onChange={formik.handleChange}
          value={formik.values.dropofftime}
          error={formik.touched.dropofftime && Boolean(formik.errors.dropofftime)}
          helperText={formik.touched.dropofftime && formik.errors.dropofftime}
          onBlur={formik.handleBlur}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
      <InputLabel htmlFor="pickupdate">Pick-up Date</InputLabel>
        <TextField
          id="pickupdate"
          // label="pickupdate"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.pickupdate}
          error={formik.touched.pickupdate && Boolean(formik.errors.pickupdate)}
          helperText={formik.touched.pickupdate && formik.errors.pickupdate}
          onBlur={formik.handleBlur}
          fullWidth
        />
      </Grid>
<Grid item xs={3}>
<InputLabel htmlFor="pickuptime">Pick-up Time</InputLabel>
        <TextField
          id="pickuptime"
          type="time"
          onChange={formik.handleChange}
          value={formik.values.pickuptime}
          error={formik.touched.pickuptime && Boolean(formik.errors.pickuptime)}
          helperText={formik.touched.pickuptime && formik.errors.pickuptime}
          onBlur={formik.handleBlur}
          fullWidth
        />
      </Grid>
          <Grid item xs={6}>
        <TextField type="address" 
        label="Drop off and pickup Address"
         variant="outlined" 
         fullWidth
         name= "address"
         onChange={formik.handleChange}
         value={formik.values.address}
         error={formik.touched.address && Boolean(formik.errors.address)}
         helperText={formik.touched.address && formik.errors.address}
         onBlur={formik.handleBlur}  />
      </Grid>
      <Grid item xs={6}>
        <TextField type="address" 
        label="Additional Info"
         variant="outlined" 
         fullWidth
         name= "additionalInfo"
         onChange={formik.handleChange}
         value={formik.values.additionalInfo}
         error={formik.touched.additionalInfo && Boolean(formik.errors.additionalInfo)}
         helperText={formik.touched.additionalInfo && formik.errors.additionalInfo}
         onBlur={formik.handleBlur}  
         />
      </Grid>
      
    </Grid>
    <Grid item xs={12}>
        <Button variant="contained" color="primary" type="submit">Submit</Button>
        <Button size="large" color="secondary" variant="outlined">
                Cancel
              </Button>
      </Grid>
    </form>
    <NewPetDrawer
      open={petopen}
      onClose={() => togglePetDrawer(false)}
    />
        
        </>
    )
}