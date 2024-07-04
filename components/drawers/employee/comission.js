import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Paper, Typography} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { Box, Avatar } from '@mui/material';
import { getCustomerDetails, clearSingleCustAction } from '@/reducer/SingleCustomerSlice';
export default function EmployeeComissionDrawer({open, handleClose}){
    const dispatch = useDispatch();
    const [customerdata, setCustomerdata] = useState([]);
    const singlecustomersuccess= useSelector((state)=> state.singlecustomer.success);
    const singlecustomerData = useSelector((state)=> state.singlecustomer.content);
 
 
 
    return(
        <>
        <Drawer
        open={open}
         onClose={ handleClose}
        anchor = "right"
      >
        { open && (
          <>
             <div  style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '1rem' 
            }}>
         <h2>{customerdata.firstName} {customerdata.lastName} Employee Commission List</h2>
         </div>
                <IconButton style={{ position: "absolute", top: "10px", right: "10px" }} onClick={ handleClose}>
            <IconX />
        </IconButton>
        <Paper
          style={{
            minWidth: '400px',
            padding: "20px",
            maxWidth: "800px",
            margin: "50px auto",
            overflowY: "auto",
            maxHeight: "100vh",
          }}
        >
               
    <Grid container spacing={3}>
   <Box
   display="flex"
   justifyContent="space-between"
   alignItems="center"
   className="list-group-item"
   sx={{ padding: '8px 16px', borderBottom: '1px solid #e0e0e0' , width:'100%'}}
>
   <Box display="flex" alignItems="center" flexGrow={1} gap={2} my={2}>
   <Typography variant="body1" component="div" flexGrow={1}>
        Booking Commission
       </Typography>
       <Typography variant="body1" component="div" flexGrow={1}>
        5%
       </Typography>
   </Box>
  
</Box>
 
        </Grid>
        </Paper>
          </>
        )
      }
      </Drawer>
        </>
    )
}