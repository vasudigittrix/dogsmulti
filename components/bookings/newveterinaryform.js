import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch, Input, Avatar } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState, useRef } from 'react';
import { getCustomerDetails } from '@/reducer/SingleCustomerSlice';
import { useDispatch, useSelector } from 'react-redux';
import NewPetDrawer from '../drawers/newpet';
import { fetchpetsbyuser, clearpetAction } from '@/reducer/PetSlice';
import { getEmployeeByType, clearAction, getActiveNbEmployeeByType} from "@/reducer/EmployeeByTypeSlice";
import { getFacilities } from '@/reducer/FacilitiesSlice';
import { getServicesByType } from '@/reducer/ServicesSlice';
import { RadioGroup,Radio, FormLabel, Typography } from '@mui/material'
import { IconTrash } from '@tabler/icons-react';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { createBookingByType } from '@/reducer/BookingByTypeSlice';
import { getCategoriesByType, clearCatAction,  getCategoriesByTypeStatus} from "@/reducer/CategoriesSlice";
import { getServicesByCategory } from '@/reducer/ServicesSlice';
import { getSingleservice, editSingleservice } from '@/reducer/SingleServiceSlice';
import { clearserviceAction } from "@/reducer/SingleServiceSlice";
export default function NewVetBookingForm({id , onBookingClose,setSelectedCustomer }){
    const dispatch = useDispatch();
    const [petopen, setPetOpen] = useState("");
    const [employeebytype, setEmployeeByType] = useState("");
    const [categories, setCategories] = useState([]);
    const customerdetailscontent = useSelector((state)=> state.singlecustomer.content);
    const customerdetailssuccess = useSelector((state)=> state.singlecustomer.success);
    const employeesuccessData = useSelector((state)=> state.employeebytype.actsuccess);
    const employeecontentData = useSelector((state)=> state.employeebytype.activenb);
    const servicescatsuccessData = useSelector((state)=> state.services.catsuccess);
    const servicescatcontentData = useSelector((state)=> state.services.servicebycat);
    const petslistcontent = useSelector((state)=> state.pet.content);
    const petslistsuccess = useSelector((state)=> state.pet.success);
    const categoriesstatussuccess = useSelector((state)=> state.categories.statussuccess);
    const categoriesstatusData = useSelector((state)=> state.categories.statuscontent);
    const singleservicesuccess = useSelector((state)=> state.singleservice.success);
    const singleservicecontent = useSelector((state)=> state.singleservice.content);
    const [customerDet, setCustomerDet] = useState({});
    const [petslist, setPetslist] = useState([]);
    const [services, setServices] = useState([]);
    const togglePetDrawer = (openpar) => { 
        setPetOpen(openpar);
        console.log(openpar);
      };
    const openNewPetHandler = ()=>{
        togglePetDrawer(true);
    }
    useEffect(()=>{
        dispatch(getServicesByType({
            type: 'veterinary'
        }))
        dispatch(getCustomerDetails({id}))
        dispatch(fetchpetsbyuser({userid: id}))
        dispatch(getCategoriesByTypeStatus({
          status: 'true',
          type: 'veterinary'
        }))
        dispatch(getActiveNbEmployeeByType({
          type: "veterinary"
        }))
    },[id]);

   
      useEffect(()=>{
        if(singleservicesuccess && singleservicecontent){
          console.log(singleservicecontent, 'singleservice');
          setEmployeeByType(singleservicecontent[0].employees);
          dispatch(clearserviceAction());
      }
      }, [singleservicesuccess, singleservicecontent]);
  
    useEffect(()=>{
        if(customerdetailssuccess && customerdetailscontent){
          console.log(customerdetailscontent, 'customer detals');
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
      if(categoriesstatussuccess && categoriesstatusData){
          setCategories(categoriesstatusData);
          dispatch(clearCatAction()); 
      }
  },[categoriesstatussuccess]);
    useEffect(()=>{
        if(servicescatsuccessData && servicescatcontentData){
          console.log(servicescatcontentData, 'service content');
            setServices(servicescatcontentData);
        }
    },[servicescatsuccessData]);
    const initialvalues = {
       petid: "",
       date: "",
       time: "",
       categoryid: "",
       serviceid: "",
       employeeid: "",
       additionalInfo: "",
       reason: ""      
      };
    const validationSchema = Yup.object().shape({
        petid: Yup.string().required('Pet Name is required'),
            date: Yup.string().required('Date is Required'),
            time:Yup.string().required('Time is Required') ,
            categoryid: Yup.string().required('Category is Required'),
            serviceid: Yup.string().required('Service is Required'),
            employeeid: Yup.string().required('Employee is Required'),
            reason: Yup.string(),
            additionalInfo: Yup.string()
      });
      const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
          dispatch(createBookingByType({type: 'veterinary', customerid: id, ...values}));
          resetForm(); 
          onBookingClose();

        },
      });
      useEffect(()=>{
        if(formik.values.categoryid !== ''){
            let id = formik.values.categoryid ;
        dispatch(getServicesByCategory({categoryid: id}))
        }
    },[formik.values.categoryid]);
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
    
      <Grid item xs={6}>
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
      <Grid item xs={3}>
        {/* Input for Date */}
        <InputLabel htmlFor="date">Date</InputLabel>
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
      <Grid item xs={3}>
      <InputLabel htmlFor="time">Time</InputLabel>
        {/* Input for Time */}
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
    <Grid item xs={6}>
          <InputLabel>Veterinary Category</InputLabel>
         <Select 
         name="categoryid"
          onChange={formik.handleChange}
        value={formik.values.categoryid}
        error={formik.touched.categoryid && Boolean(formik.errors.categoryid)}
        helperText={formik.touched.categoryid && formik.errors.categoryid}
        onBlur={formik.handleBlur}
        fullWidth
        >
            {categories.length > 0 ? (
                categories.map(ele => (
                    <MenuItem key={ele._id} value={ele._id}>{ele.name}</MenuItem>
                ))
                ) : (
                <MenuItem disabled>List is empty</MenuItem>
                )}
          </Select>
          </Grid>
    <Grid item xs={6}>
          <InputLabel>Service</InputLabel>
         <Select 
         name="serviceid"
          onChange={formik.handleChange}
        value={formik.values.serviceid}
        error={formik.touched.serviceid && Boolean(formik.errors.serviceid)}
        helperText={formik.touched.serviceid && formik.errors.serviceid}
        onBlur={formik.handleBlur}
        fullWidth
        >

            {services.length > 0 ? (
                services.map(ele => (
                    <MenuItem key={ele._id} value={ele._id}>{ele.name}</MenuItem>
                ))
                ) : (
                <MenuItem disabled>List is empty</MenuItem>
                )}
          </Select>
          </Grid>
          <Grid item xs={6}>
          <InputLabel>Vet</InputLabel>
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
          <Grid item xs={6}>
        {/* Input for Time */}
        <InputLabel>Reason</InputLabel>
        <TextField
          name="reason"
          onChange={formik.handleChange}
          value={formik.values.reason}
          error={formik.touched.reason && Boolean(formik.errors.reason)}
          helperText={formik.touched.reason && formik.errors.reason}
          onBlur={formik.handleBlur}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
    <InputLabel>Report</InputLabel>
    <Input
        type="file"
        name="report"
        onChange={(event) => {
            formik.setFieldValue("report", event.currentTarget.files[0]);
        }}
        fullWidth
    />
    {formik.values.report && ( // Render remove button only if a file is selected
            <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                    formik.setFieldValue("report", null); // Clear the file selection
                }}
            >
                Remove
            </Button>
    )}
</Grid>
      <Grid item xs={12}>
        <InputLabel>Additional Info</InputLabel>
        <TextField type="address" 
        multiline
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