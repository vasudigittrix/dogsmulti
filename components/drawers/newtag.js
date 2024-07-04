import { useEffect, useState } from "react";
import { Modal, Paper, Typography, Button } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { createTag } from "@/reducer/TagsSlice";
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
export default function NewTagDrawer({open, handleClose}){
    const dispatch = useDispatch();
    const tagscreatesuccessData = useSelector((state)=> state.tags.createsuccess);
    const [formData, setFormData] = useState({
        name: '',
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
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        dispatch(createTag(formData));
      }
      useEffect(()=>{
        if(tagscreatesuccessData){
            handleClose();
            setFormData({
                name: '',
                status: true
            })
        }
      },[tagscreatesuccessData]);
    return(
        <>
        <Drawer
        open={open}
        onClose={handleClose}
        anchor = "right"
      >
         <h2>Create a Tags</h2>
         <IconButton style={{ position: "absolute", top: "10px", right: "10px" }} onClick={handleClose}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
          <span>Status</span>
    <FormControlLabel
        control={<Switch checked={formData.status} onChange={handleSwitchChange} />}
        label=""
    />
          </div>
            {/* <FormControlLabel
                control={<Switch checked={formData.status} onChange={handleSwitchChange} />}
                label="Status"
            /> */}
            
        </form>
        </Paper>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
            <Button type="submit" variant="outlined" color="primary" onClick={handleClose}>
                Cancel
            </Button>
      </Drawer>
        </>
    )
}