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
import { IconTrash } from '@tabler/icons-react';
import { deletePet, clearpetAction } from '@/reducer/PetSlice';
import DeleteCommonModal from '../modals/deleteCommon';
export default function ViewPetDrawer({open ,  handleClose, id}){
 
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);
    const [idtodel, setidToDel] = useState("");
    const [customerdata, setCustomerdata] = useState([]);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const singlecustomersuccess= useSelector((state)=> state.singlecustomer.success);
    const singlecustomerData = useSelector((state)=> state.singlecustomer.content);
    const petdeletesuccess = useSelector((state)=> state.pet.delsuccess);
    const handleOpenModal = (id) => {
      setidToDel(id);
      setModalOpen(true);
    };
    const handledeletepet =  (id) => {
      dispatch(deletePet(id))
      }
    const handleCloseModal = () => {
      setModalOpen(false);
    };
    useEffect(()=>{
      if(open){
      alert('open');
      dispatch(getCustomerDetails({
          id
      }))
    }
  },[id, petdeletesuccess]);
  useEffect(()=>{
    if(singlecustomersuccess && singlecustomerData){
        setCustomerdata(singlecustomerData[0]);
        setPets(singlecustomerData[0].pets);
        setLoading(false);
        dispatch(clearSingleCustAction()); 
    }
},[singlecustomersuccess]);
 
    return(
        <>
        <Drawer
        open={open}
         onClose={ handleClose}
        anchor = "right"
      >
        {!loading  && open && (
          <>
             <div  style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '1rem' 
            }}>
         <h2>{customerdata.firstName} {customerdata.lastName} Pet list</h2>
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
        {!loading && pets.length>0 ? pets.map((ele)=> (
   <Box
   display="flex"
   justifyContent="space-between"
   alignItems="center"
   className="list-group-item"
   sx={{ padding: '8px 16px', borderBottom: '1px solid #e0e0e0' , width:'100%'}}
>
   <Box display="flex" alignItems="center" flexGrow={1} gap={2} my={2}>
       <Avatar
           src={ele.image}
           alt="user"
           sx={{ width: 40, height: 40 }}
       />
       <Typography variant="body1" component="div" flexGrow={1}>
        {ele.name}
       </Typography>
   </Box>
  
    <IconButton
       aria-label="delete"
       color="error"
       data-bs-toggle="tooltip"
       onClick={() => handleOpenModal(ele._id)}
   >
      <IconTrash/>
   </IconButton>
</Box>
        )) : (
          <>
           <>
           <div style={{ textAlign: 'center', width: '100%' }}>
            <p >Pets are Not Available</p>
        </div>
          </>
          </>
        )}
 
        </Grid>
        </Paper>
          </>
        )
      }
        <DeleteCommonModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            deleteHandler = {handledeletepet}
            id = {idtodel}
            />
      </Drawer>
        </>
    )
}