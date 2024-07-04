import { useEffect, useState } from "react";
import { Modal, Paper, Typography } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
// import { createTag } from "@/reducer/TagsSlice";
// import { createUnit } from "@/reducer/UnitSlice";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { createBrand } from "@/reducer/BrandsSlice";
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { styled } from '@mui/material/styles';
import { createVariationType, clearvarAction } from "@/reducer/VariationsTypeSlice";

export default function NewVariationDrawer({open, handleClose}){
    const dispatch = useDispatch();
    const brandscreatesuccessData = useSelector((state)=> state.brands.createsuccess);
    const [inputs, setInputs] = useState([{name: "", value: ""}]);
    const [colorinputs,setColorInputs] = useState([{name: "", value: ""}])
    const handleAddInput = () => {
      setInputs([...inputs, {name: "", value: ""}]);
    };
    const handleAddColorInput = ()=>{
      setColorInputs([...colorinputs, {name: "", value: ""}]);
    }
    const handleChange = (event, index) => {
      let { name, value } = event.target;
      let onChangeValue = [...inputs];
      onChangeValue[index][name] = value;
      setInputs(onChangeValue);
    };
    const handleColorChange = (event, index)=>{
      let { name, value } = event.target;
      let onChangeValue = [...inputs];
      onChangeValue[index][name] = value;
      setColorInputs(onChangeValue);
    }
  
    const handleDeleteInput = (index) => {
      const newArray = [...inputs];
      newArray.splice(index, 1);
      setInputs(newArray);
    };
    const handleDeleteColorInput = (index)=> {
      const newArray = [...inputs];
      newArray.splice(index, 1);
      console.log(newArray);
      setColorInputs(newArray);
    }
    const initialvalues = {
        name: '',
        status: true,
        type: '',
      };
      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required')
      });
      const handleSwitchChange = () => {
        formik.setFieldValue('status', !formik.values.status);
    };
    const handleImageChange = (e) => {
        const file = e.target.files && e.target.files[0];
        console.log(file);
        if (file) {
          formik.setFieldValue('image', file);
        }
      };
      
    const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
          console.log(values);
          if(formik.values.type == 'text'){
            console.log(inputs, 'inputs');
            dispatch(createVariationType({...values, values: inputs , status:true}));
          }
          else if(formik.values.type == 'color'){
            console.log(colorinputs, 'colors');
            dispatch(createVariationType({...values, values: colorinputs, status: true}));
  
          }
          resetForm(); 
          handleClose();
        },
      });
      const removeImage=()=>{
        formik.setFieldValue('image', '');
      }
      const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log('click');
        formik.submitForm(); 
      };
   
    return(
        <>
        <Drawer
        open={open}
        onClose={handleClose}
        anchor = "right"
      >
         <h2>Create Variations</h2>
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
            <form onSubmit={formik.handleSubmit}>
 
            <InputLabel>Name *</InputLabel>
             <TextField 
        variant="outlined" 
        fullWidth
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        onBlur={formik.handleBlur}
         />
              <InputLabel>Type *</InputLabel>
             {/* <TextField 
        variant="outlined" 
        fullWidth
        name="type"
        onChange={formik.handleChange}
        value={formik.values.type}
        error={formik.touched.type && Boolean(formik.errors.type)}
        helperText={formik.touched.type && formik.errors.type}
        onBlur={formik.handleBlur}
         /> */}
          <Select
        variant="outlined" 
        fullWidth 
        name = "type"
        onChange={formik.handleChange}
        value={formik.values.type}
        error={formik.touched.type && Boolean(formik.errors.type)}
        helperText={formik.touched.type && formik.errors.type}
        onBlur={formik.handleBlur}
         >
          
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="color">Color</MenuItem>
        </Select>
         {formik.values.type === 'text' && (
           <>
             {inputs.map((item, index) => (
                <Grid container key={index}>
                <Grid item xs={3}>
                <InputLabel htmlFor="value">Value</InputLabel>
                  {/* <input type="color" id="color" name="color" value={formik.values.color} onChange={formik.handleChange} /> */}
                  <input
                  id="value"
            name="value"
            type="text"
            value={item.value}
            onChange={(event) => handleChange(event, index)}
          />
                </Grid>
                <Grid item xs={9}>
                  <Grid container>
                    <Grid item xs={12}>
                      <InputLabel>Name *</InputLabel>
                      <TextField 
                        variant="outlined" 
                        fullWidth
                        name="name"
                        value={item.name}
                        onChange={(event) => handleChange(event, index)}
                      />
                    </Grid>
              {inputs.length > 1 && (
            <Button type="submit" variant="outlined" color="primary" onClick={() => handleDeleteInput(index)}>
            Delete
          </Button>
          )}
                  </Grid>
                </Grid>
                {/* <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary" fullWidth>
                        Add values
                      </Button>
                    </Grid> */}
              </Grid>
        // <div className="input_container" key={index}>
        //   <input
        //     name="firstName"
        //     type="text"
        //     value={item.firstName}
        //     onChange={(event) => handleChange(event, index)}
        //   />
        //   <input
        //     name="lastName"
        //     type="text"
        //     value={item.lastName}
        //     onChange={(event) => handleChange(event, index)}
        //   />
        //   {inputs.length > 1 && (
        //     <button onClick={() => handleDeleteInput(index)}>Delete</button>
        //   )}
        //   {index === inputs.length - 1 && (
        //     <Button type="submit" variant="contained" color="primary" onClick={handleAddInput}>
        //     Add values
        //   </Button>
        //   )}
        // </div>
      ))}
           <Button type="submit" variant="contained" color="primary" onClick={handleAddInput}>
             Add values
           </Button>
         </>
         )}
       {formik.values.type === 'color' && (
 <>
   {colorinputs.map((item, index) => (
                <Grid container key={index}>
                <Grid item xs={3}>
                <InputLabel htmlFor="color">Value</InputLabel>
                  {/* <input type="color" id="color" name="color" value={formik.values.color} onChange={formik.handleChange} /> */}
                  <input
                  id="color"
            name="value"
            type="color"
            value={item.value}
            onChange={(event) => handleColorChange(event, index)}
          />
                </Grid>
                <Grid item xs={9}>
                  <Grid container>
                    <Grid item xs={12}>
                      <InputLabel>Name *</InputLabel>
                      <TextField 
                        variant="outlined" 
                        fullWidth
                        name="name"
                        value={item.name}
                        onChange={(event) => handleColorChange(event, index)}
                      />
                    </Grid>
              {inputs.length > 1 && (
            <Button type="submit" variant="outlined" color="primary" onClick={() => handleDeleteColorInput(index)}>
            Delete
          </Button>
          )}
                  </Grid>
                </Grid>
                {/* <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary" fullWidth>
                        Add values
                      </Button>
                    </Grid> */}
              </Grid>
        // <div className="input_container" key={index}>
        //   <input
        //     name="firstName"
        //     type="text"
        //     value={item.firstName}
        //     onChange={(event) => handleChange(event, index)}
        //   />
        //   <input
        //     name="lastName"
        //     type="text"
        //     value={item.lastName}
        //     onChange={(event) => handleChange(event, index)}
        //   />
        //   {inputs.length > 1 && (
        //     <button onClick={() => handleDeleteInput(index)}>Delete</button>
        //   )}
        //   {index === inputs.length - 1 && (
        //     <Button type="submit" variant="contained" color="primary" onClick={handleAddInput}>
        //     Add values
        //   </Button>
        //   )}
        // </div>
      ))}
           <Button type="submit" variant="contained" color="primary" onClick={handleAddInput}>
             Add values
           </Button>

 </>
)}

      
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
          <span>Status</span>
    <FormControlLabel
        control={<Switch checked={formik.values.status} onChange={handleSwitchChange} />}
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