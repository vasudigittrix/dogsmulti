import { useEffect, useState } from "react";
import { Modal, Paper, Typography, Button } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IconPlus } from "@tabler/icons-react";
import NewCustomerDrawer from "./newcustomer";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { createFacility, clearAction } from "@/reducer/FacilitiesSlice";
import { useDispatch, useSelector } from "react-redux";
export default function NewFacilityDrawer({fopen, handleClose}){
    const dispatch = useDispatch();
    const facilitycreatesuccess = useSelector((state)=> state.facilities.createsuccess);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: true
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
   
      const handleSwitchChange = () => {
        setFormData({
            ...formData,
            status: !formData.status
        });
    };
      const handleSubmit = () => {
        event.preventDefault();
        console.log(formData);
        dispatch(createFacility(formData));
      }
      useEffect(()=>{
        if(facilitycreatesuccess){
            handleClose();
            setFormData({
                name: '',
                description: '',
                status: true
            })
        }
      },[facilitycreatesuccess]);
    return(
        <>
        <Drawer
        open={fopen}
        onClose={handleClose}
        anchor = "right"
      >
         <h2>Create a Service Facility</h2>
        <Paper
          style={{
            padding: "20px",
            maxWidth: "800px",
            margin: "50px auto",
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
            <form onSubmit={handleSubmit}>
            <InputLabel>Name *</InputLabel>
            <TextField
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <InputLabel>Description</InputLabel>
            <TextField
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <FormControlLabel
                control={<Switch checked={formData.status} onChange={handleSwitchChange} />}
                label="Status"
            />
            
        </form>
        </Paper>
        <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
            <Button type="submit" variant="outlined" color="primary" onClick={handleClose}>
                Cancel
            </Button>
      </Drawer>
        </>
    )
}