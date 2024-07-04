import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch, Avatar, Typography } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState, useRef } from 'react';
import { getCustomerDetails } from '@/reducer/SingleCustomerSlice';
import { useDispatch, useSelector } from 'react-redux';
import NewPetDrawer from '../drawers/newpet';
import { fetchpetsbyuser, clearpetAction } from '@/reducer/PetSlice';
import { getEmployeeByType, clearAction, getActiveNbEmployeeByType } from "@/reducer/EmployeeByTypeSlice";
import { getFacilities } from '@/reducer/FacilitiesSlice';
import { getServicesByType } from '@/reducer/ServicesSlice';
import { RadioGroup,Radio, FormLabel } from '@mui/material'
import { IconTrash } from '@tabler/icons-react';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { createBookingByType } from '@/reducer/BookingByTypeSlice';
import { getSingleservice, editSingleservice } from '@/reducer/SingleServiceSlice';
import { clearserviceAction } from "@/reducer/SingleServiceSlice";
import { getActiveDurationsByType, clearDurAction } from '@/reducer/DurationSlice';
import { getActiveTrainingType, clearttAction } from '@/reducer/TrainingTypeSlice';
export default function NewTrainBookingForm({id , onBookingClose,setSelectedCustomer }){
    const dispatch = useDispatch();
    const [petopen, setPetOpen] = useState("");
    const [employeebytype, setEmployeeByType] = useState("");
    const [facilities, setFacilities] = useState([]);
    const customerdetailscontent = useSelector((state)=> state.singlecustomer.content);
    const customerdetailssuccess = useSelector((state)=> state.singlecustomer.success);
    const durationactivesuccess = useSelector((state)=> state.durations.actsuccess);
    const durationactivecontent = useSelector((state)=> state.durations.activeDurations);
    const employeesuccessData = useSelector((state)=> state.employeebytype.actsuccess);
    const employeecontentData = useSelector((state)=> state.employeebytype.activenb);
    const servicessuccessData = useSelector((state)=> state.services.success);
    const servicescontentData = useSelector((state)=> state.services.content);
    const acttrainingcontentData = useSelector((state)=> state.trainingtype.activeTrainingType);
    const acttrainingsuccessData = useSelector((state)=> state.trainingtype.actsuccess);
    const petslistcontent = useSelector((state)=> state.pet.content);
    const petslistsuccess = useSelector((state)=> state.pet.success);
    const [customerDet, setCustomerDet] = useState({});
    const [petslist, setPetslist] = useState([]);
    const [services, setServices] = useState([]);
    const [trainingtype, setTrainingType] = useState([]);
    const [durations, setDurations] = useState([]);
    const togglePetDrawer = (openpar) => { 
        setPetOpen(openpar);
      };
    const openNewPetHandler = ()=>{
        togglePetDrawer(true);
    }
    useEffect(()=>{
        // dispatch(getServicesByType({
        //     type: 'grooming'
        // }))
        dispatch(getCustomerDetails({id}))
        dispatch(fetchpetsbyuser({userid: id}))
        // dispatch(getEmployeeByType({
        //     type: "walking"
        // }))
        // clearttAction
        dispatch(getActiveTrainingType());
        dispatch(getActiveNbEmployeeByType({
            type: "trainer"
          }))
          dispatch(getActiveDurationsByType({
            type: "training"
          }))
    },[id]);
    useEffect(()=>{
        if(customerdetailssuccess && customerdetailscontent){
            console.log(customerdetailscontent, 'deadcdsds');
            console.log(customerdetailscontent, 'dea');
            setCustomerDet(customerdetailscontent[0]);
        }

    },[customerdetailssuccess,customerdetailscontent ]);
    useEffect(()=>{
        if(petslistsuccess && petslistcontent ){
            console.log(petslistcontent, 'petsliste');
            setPetslist(petslistcontent)
        }
    },[petslistsuccess , petslistcontent]);
    useEffect(()=>{
        if(employeesuccessData && employeecontentData){
            setEmployeeByType(employeecontentData);
            console.log(employeecontentData);
            dispatch(clearAction()); 
        }
    },[ employeesuccessData, employeecontentData ]);
    useEffect(()=>{
      if(durationactivecontent && durationactivesuccess){
        // console.log(singleservicecontent.employeeid, 'sing');
        setDurations(durationactivecontent);
        dispatch(clearDurAction());
    }
    }, [durationactivesuccess, durationactivecontent]);
    // useEffect(()=>{
    //     if(faciltiessuccessData && facilitiescontentData){
    //         setFacilities(facilitiescontentData);
    //     }
    // },[faciltiessuccessData]);
    useEffect(()=>{
        if(servicessuccessData && servicescontentData){
            setServices(servicescontentData);
        }
    },[servicessuccessData]);
    useEffect(()=>{
        if(acttrainingcontentData && acttrainingsuccessData){
            setTrainingType(acttrainingcontentData);
        }
    },[acttrainingcontentData, acttrainingsuccessData])
  
    const initialvalues = {
       petid: "",
       date: "",
       time: "",
       trainingtypeid: "",
       durationid: "",
       employeeid: "",
       address: "",
       additionalInfo: ""       
      };
    const validationSchema = Yup.object().shape({
        petid: Yup.string().required('Pet Name is required'),
            date: Yup.string().required('Date is Required'),
            time:Yup.string().required('Time is Required') ,
            trainingtypeid: Yup.string().required('Service is Required'),
            durationid: Yup.string().required('Duration is Required'),
            employeeid: Yup.string().required('Employee is Required'),
            address: Yup.string().required('Dropoff and pickup address is Required'),
            additionalInfo: Yup.string()

      });
      const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
          dispatch(createBookingByType({type: 'training' , customerid: id, ...values}));
          resetForm(); 
          onBookingClose();

        },
      });
      useEffect(()=>{
        if(formik.values.serviceid !== ''){
          let id = formik.values.serviceid;
          dispatch(getSingleservice({
            id
        }))
        }
      },[formik.values.serviceid]);
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
        {/* <div onClick={openNewPetHandler}> Add Pet</div> */}
    
      <Grid item xs={12}>
          <InputLabel>Select Pet</InputLabel>
          <div onClick={openNewPetHandler}> Add Pet</div>
         <Select 
         name="petid"
          onChange={formik.handleChange}
        value={formik.values.petid}
        error={formik.touched.petid && Boolean(formik.errors.petid)}
        helperText={formik.touched.petid && formik.errors.petid}
        onBlur={formik.handleBlur}
        fullWidth
        >
               {petslist.length > 0 ? (
                petslist.map(ele => (
                    <MenuItem key={ele._id} value={ele._id}>{ele.name}</MenuItem>
                ))
                ) : (
                <MenuItem disabled>List is empty</MenuItem>
                )}

            {/* <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem> */}
          </Select>
          </Grid>
          <Grid container spacing={2}>
      <Grid item xs={6}>
        {/* Input for Date */}
        <InputLabel>Date</InputLabel>
        <TextField
          id="date"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.date}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
          onBlur={formik.handleBlur}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        {/* Input for Time */}
        <InputLabel>Time</InputLabel>
        <TextField
          id="time"
          type="time"
          onChange={formik.handleChange}
          value={formik.values.time}
          error={formik.touched.time && Boolean(formik.errors.time)}
          helperText={formik.touched.time && formik.errors.time}
          onBlur={formik.handleBlur}
          fullWidth
        />
      </Grid>
    </Grid>
    <Grid item xs={12}>
          <InputLabel>Service</InputLabel>
         <Select 
         name="trainingtypeid"
          onChange={formik.handleChange}
        value={formik.values.trainingtypeid}
        error={formik.touched.trainingtypeid && Boolean(formik.errors.trainingtypeid)}
        helperText={formik.touched.trainingtypeid && formik.errors.trainingtypeid}
        onBlur={formik.handleBlur}
        fullWidth
        >
            {/* {services.length>0 && services.map((ele)=> (
                <MenuItem value={ele._id}>{ele.name}</MenuItem>
            ))} */}
            {trainingtype.length > 0 ? (
                trainingtype.map(ele => (
                    <MenuItem key={ele._id} value={ele._id}>{ele.name}</MenuItem>
                ))
                ) : (
                <MenuItem disabled>List is empty</MenuItem>
                )}
            {/* <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem> */}
          </Select>
          </Grid>
    <Grid item xs={12}>
          <InputLabel>Duration</InputLabel>
         <Select 
         name="durationid"
          onChange={formik.handleChange}
        value={formik.values.durationid}
        error={formik.touched.durationid && Boolean(formik.errors.durationid)}
        helperText={formik.touched.durationid && formik.errors.durationid}
        onBlur={formik.handleBlur}
        fullWidth
        >
            {/* {services.length>0 && services.map((ele)=> (
                <MenuItem value={ele._id}>{ele.name}</MenuItem>
            ))} */}
            {durations.length > 0 ? (
                durations.map(ele => (
                    <MenuItem key={ele._id} value={ele._id}>{ele.duration}</MenuItem>
                ))
                ) : (
                <MenuItem disabled>List is empty</MenuItem>
                )}
            {/* <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem> */}
          </Select>
          </Grid>
          <Grid item xs={12}>
          <InputLabel>Trainer</InputLabel>
         <Select 
          name="employeeid"
          onChange={formik.handleChange}
        value={formik.values.employeeid}
        error={formik.touched.employeeid && Boolean(formik.errors.employeeid)}
        helperText={formik.touched.employeeid && formik.errors.employeeid}
        onBlur={formik.handleBlur}
        fullWidth
        >
            {/* {employeebytype.length>0 && employeebytype.map((ele)=> (
                <MenuItem value={ele._id}> {ele.firstName} {ele.lastName}</MenuItem>
            ))} */}
            {employeebytype.length > 0 ? (
                employeebytype.map(ele => (
                    <MenuItem key={ele._id} value={ele._id}>{ele.firstName} {ele.lastName}</MenuItem>
                ))
                ) : (
                <MenuItem disabled>List is empty</MenuItem>
                )}
          </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Drop off & pickup address</InputLabel>
        <TextField type="address" 
         variant="outlined" 
         fullWidth
         name= "address"
         onChange={formik.handleChange}
         value={formik.values.address}
         error={formik.touched.address && Boolean(formik.errors.address)}
         helperText={formik.touched.address && formik.errors.address}
         onBlur={formik.handleBlur}  />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Additional Info</InputLabel>
        <TextField type="address" 
         variant="outlined" 
         fullWidth
         name= "additionalInfo"
         onChange={formik.handleChange}
         value={formik.values.additionalInfo}
         error={formik.touched.additionalInfo && Boolean(formik.errors.additionalInfo)}
         helperText={formik.touched.additionalInfo && formik.errors.additionalInfo}
         onBlur={formik.handleBlur}  />
      </Grid>
      
    </Grid>
    <Grid item xs={12}>
        <Button variant="contained" color="primary" type="submit" >Submit</Button>
        <Button size="large" color="secondary" variant="outlined" onClick={onBookingClose}>
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