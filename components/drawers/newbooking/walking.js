import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Paper, Typography} from "@mui/material";
import { IconPlus } from '@tabler/icons-react';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCustAction } from "@/reducer/CustomerSlice";
import { getCustomerList, getactiveCustomers } from '@/reducer/CustomerSlice';
import NewCustomerDrawer from '../newcustomer';
import NewVetBookingForm from '@/components/bookings/newveterinaryform';
import NewWalkBookingForm from '@/components/bookings/newwallkform';
// import NewBookingForm from '../bookings/newbroadingform';
export default function NewWalkingDrawer({open , onClose}){
    const dispatch = useDispatch();
    const [custopen, setCustOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const customercontent = useSelector((state)=> state.customer.activecustomer);
    const customercontentsuccess = useSelector((state)=> state.customer.actsuccess);
    const petcreatesuccess = useSelector((state)=> state.pet.addsuccess);
    const peterrorData = useSelector((state)=> state.pet.error);
    const [selectedCustomer, setSelectedCustomer] = useState('');

    const toggleDrawer = (openpar) => { 
        setCustOpen(openpar);
      };
      useEffect(()=>{
        dispatch(getactiveCustomers());
      },[selectedCustomer]);
      useEffect(()=>{
        if(petcreatesuccess){
            toast.success('Pet Created successfully')
        }
        if(peterrorData){
            console.log(peterrorData)
        }
      },[petcreatesuccess, peterrorData]);
      useEffect(()=>{
        if(customercontentsuccess && customercontent ){
            setCustomers(customercontent);
            dispatch(clearCustAction());
        }
      },[customercontentsuccess]);
    const addCustomerHandler = () => {
        toggleDrawer(true);
        onClose();
      }
    const closeBookingHandler = ()=> {
      setSelectedCustomer("");
      onClose();
    }
  
     
    
    const handleCustomerChange = (event) => {
        setSelectedCustomer(event.target.value);
    };
      
    return(
        <>
        <Drawer
        open={open}
        onClose={closeBookingHandler}
        anchor = "right"
      >
         <h2>Create Walking Booking</h2>
                <IconButton style={{ position: "absolute", top: "10px", right: "10px" }} onClick={closeBookingHandler}>
            <IconX />
        </IconButton>
        <Paper
          style={{
            padding: "20px",
            maxWidth: "800px",
            margin: "50px auto",
            overflowY: "auto",
            maxHeight: "80vh",
            minWidth: "750px"
          }}
        >
               
        { !selectedCustomer ? (
          <>
            <div 
            className="addnew" 
            style={{ backgroundColor: 'blue', color: 'white', cursor: 'pointer' }} 
            onClick={() => addCustomerHandler()}
        >
            Add new <IconPlus/>
        </div>
          <Grid container spacing={3}>
          <Grid item xs={12}>
            <InputLabel>Choose Customer</InputLabel>
                  <Select 
              onChange={handleCustomerChange}
              value={selectedCustomer || ''}
              fullWidth
              displayEmpty
              renderValue={
                selectedCustomer !== "" ? undefined : () => "Select Customer"
              }
          >
              {customers.length > 0 ? (
                customers.map(ele => (
                    <MenuItem key={ele._id} value={ele._id}>{ele.firstName} {ele.lastName}</MenuItem>
                ))
                ) : (
                <MenuItem disabled>List is empty</MenuItem>
                )}

          </Select>
            </Grid>
            </Grid>
            </>
        ) :(

              <NewWalkBookingForm id={selectedCustomer} onBookingClose = {onClose} setSelectedCustomer = {setSelectedCustomer} />
        )
      }
           </Paper>
      </Drawer>
      <NewCustomerDrawer
      open={custopen}
      onCustClose={() => toggleDrawer(false)}
    />
        </>
    )
}