import * as React from 'react';
import { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import { Modal, Paper, Typography} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import * as Yup from "yup";
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import {Avatar} from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import { getSingleservice, clearserviceAction, editSingleservice } from '@/reducer/SingleServiceSlice';
import { getEmployeeByType, clearAction } from "@/reducer/EmployeeByTypeSlice";
export default function ServiceEmployeeDrawer({open , handleClose, id , type}){
    const dispatch = useDispatch();
    const singleservicesuccess = useSelector((state)=> state.singleservice.success);
    const singleservicecontent = useSelector((state)=> state.singleservice.content);
    const [employeebytype, setEmployeeByType] = useState([]);
    const employeesuccessData = useSelector((state)=> state.employeebytype.success);
    const employeecontentData = useSelector((state)=> state.employeebytype.content);
    const [selectedEmployeebytype, setselectedEmployeeByType] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredEmployeebytype, setfilteredEmployeeByType] = useState([]);
    useEffect(()=>{
      if(open){
        dispatch(getSingleservice({
          id
      }))
      dispatch(getEmployeeByType({
          type: type
        }))
      }
    },[open, id]);
    useEffect(()=>{
      if(employeesuccessData && employeecontentData){
          setEmployeeByType(employeecontentData);
          dispatch(clearAction()); 
      }
  },[ employeesuccessData, employeecontentData ]);


  useEffect(()=>{
      if(singleservicesuccess && singleservicecontent){
        console.log(singleservicecontent , 'singleservie');
          setselectedEmployeeByType(singleservicecontent[0].employees);
          setLoading(false);
          dispatch(clearserviceAction());
      }
  },[singleservicesuccess, singleservicecontent]);

  useEffect(()=>{
    if(selectedEmployeebytype.length > 0){
      // setEmployeeByType(employeecontentData);
      console.log(employeebytype, 'empliy');
      console.log(selectedEmployeebytype, 'selectempl');
      const filteredEmployees = employeebytype.filter((employee)=> {
        const isIncluded = selectedEmployeebytype.some(selectedEmployee => selectedEmployee._id === employee._id);
        return !isIncluded;
        //  return !selectedEmployeebytype.includes(ele);
      })
      console.log(filteredEmployees, 'filters');
      setEmployeeByType(filteredEmployees);
    }
  },[selectedEmployeebytype]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setselectedEmployeeByType(prevState => [...prevState, selectedValue]);
  }

  const handleDeleteChange = (ele) => {
    console.log(ele);
    const updatedSelectedEmployeebytype = selectedEmployeebytype.filter(item => item !== ele);
    setselectedEmployeeByType(updatedSelectedEmployeebytype);
  
    setEmployeeByType(prevState => [...prevState, ele]);
  }
      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
      });
      // const formik = useFormik({
      //   initialValues: initialvalues,
      //   validationSchema: validationSchema,
      //   onSubmit: async (values, { resetForm }) => {
      //     console.log(values);
      //     dispatch(addCategoryByType({
      //       type: 'grooming',

      //       formData: values}));
      //       handleClose();
      //     resetForm(); 

      //   },
      // });
      const handleUpdate = ()=> {
        const employeeIds = selectedEmployeebytype.map(employee => employee._id);
        let values = {
          employeeid: employeeIds
        }
        dispatch(editSingleservice({id:id, formData: values}))
        handleClose();
      }
    return(
        <>
        <Drawer
        open={open}
         onClose={handleClose}
        anchor = "right"
      >
         <h2>Service: {singleservicecontent.name}</h2>
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
            maxHeight: "80vh",
          }}
        >
               
                <form >
                <Grid container spacing={2}>
                <Grid item xs={12}>
      <FormControl fullWidth>
          <InputLabel>Select Staff</InputLabel>
         <Select 
          onChange={handleChange}
        value=""
        >
            {employeebytype.length>0 ?(
              employeebytype.map((ele)=> (
                <MenuItem value={ele}>{ele.firstName} {ele.lastName} </MenuItem>
              ))
            ) :
            (<MenuItem disabled>List is empty</MenuItem>
          )}

           
          </Select>
          </FormControl>
          </Grid>
            {!loading && selectedEmployeebytype.length > 0 ? (selectedEmployeebytype.map(user => (
                <Grid item xs={12} key={user._id}>
                    <Grid container alignItems="center">
                        <Grid item xs={6}>
                            <Avatar src={user.imageUrl} alt={user.firstName}  />
                            <Typography variant="body1" style={{ marginLeft: '8px' }}>{user.firstName} {user.lastName} </Typography>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'right' }}>
                            <IconButton aria-label="delete">
                                <IconTrash  onClick={()=> handleDeleteChange(user)}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider style={{ marginTop: '8px' }} />
                </Grid>
            )
          )
        )
            :
            (
              <h2> No Users Found</h2>
            )}
        
                    </Grid>
    </form>
        </Paper>
        <Grid item xs={12}>
                        <Button variant="contained"style={{ marginRight: '8px' }} fullWidth onClick={handleUpdate}>
                            Update
                        </Button>
        </Grid>
        <Grid item xs={12}>
                        <Button variant="outlined" fullWidth onClick={handleClose}>
                            Close
                        </Button>
                        </Grid>
      </Drawer>
        </>
    )
}