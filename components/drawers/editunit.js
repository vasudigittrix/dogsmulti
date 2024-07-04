import { useEffect, useState } from "react";
import { Modal, Paper, Typography, Button } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { createTag } from "@/reducer/TagsSlice";
// import { getSingletag, editSingletag } from "@/reducer/SingleTagSlice";
import { getSingleunit, editSingleunit } from "@/reducer/SingleUnitSlice";
export default function EditunitDrawer({id, open, handleClose}){
    const dispatch = useDispatch();
    const tageditsuccessData = useSelector((state)=> state.singletag.editsuccess);
    const unitsuccessData = useSelector((state)=> state.singleunit.success);
    const unitcontentData = useSelector((state)=> state.singleunit.content);
    const [formData, setFormData] = useState({
        name: '',
        status: true
    });
    useEffect(()=>{
        if(open){
          dispatch(getSingleunit(
            {id}
          ))
        }
      },[open, id]);
    useEffect(()=>{
      if(unitsuccessData && unitcontentData && open){
        setFormData(unitcontentData);
        console.log(unitcontentData);
      }
    },[unitsuccessData]);
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
        dispatch(editSingleunit({id:id, formData: formData}));
        handleClose();
      }
    //   useEffect(()=>{
    //     if(tageditsuccessData){
    //         handleClose();
    //         setFormData({
    //             name: '',
    //             status: true
    //         })
    //     }
    //   },[tageditsuccessData]);
    return(
        <>
        <Drawer
        open={open}
        onClose={handleClose}
        anchor = "right"
      >
         <h2>Edit Units</h2>
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