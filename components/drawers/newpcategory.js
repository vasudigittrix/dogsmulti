

      import { useEffect, useState } from "react";
import { Modal, Paper, Typography } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
// import { createTag } from "@/reducer/TagsSlice";
// import { createUnit } from "@/reducer/UnitSlice";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { brandsReducer, createBrand } from "@/reducer/BrandsSlice";
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { styled } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { getBrands, getBrandsByStatus, clearbrandAction, deleteBrands, updateStatusBrands } from "@/reducer/BrandsSlice";
import { createPCategory } from "@/reducer/ProductCategorySlice";
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  
export default function NewPCategoryDrawer({open, handleClose}){
    const theme = useTheme();
    const dispatch = useDispatch();
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const brandscreatesuccessData = useSelector((state)=> state.brands.createsuccess);
    const brandssuccessData = useSelector((state)=> state.brands.success);
    const brandscontentData = useSelector((state)=> state.brands.content);
    const initialvalues = {
        name: '',
        status: true,
        image: '',
        brandid: []
      };

      const handleChange = (event) => {
        const value = event.target.value;
        formik.setFieldValue('brandid', typeof value === 'string' ? value.split(',') : value);
        // setPersonName(
        //   typeof value === 'string' ? value.split(',') : value,

        // );
      };
      const validationSchema = Yup.object().shape({
        // name: Yup.string().required('Name is required'),
        // brandid: Yup.string().required('Brand is required'),
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
          let data = new FormData();
          console.log(values);
            
            dispatch(createPCategory(values));
          for (let key in values) {
            data.append(key, values[key]);
      }
        dispatch(createBrand(data))
          resetForm(); 
          handleClose();
        },
      });
      const removeImage=()=>{
        formik.setFieldValue('image', '');
      }
      const handleSubmit = (e) => {
        e.preventDefault(); 
        formik.submitForm(); 
      };
      useEffect(()=>{
        dispatch(getBrands())
    },[]);
    useEffect(()=>{
      if(brandssuccessData && brandscontentData){
          setBrands(brandscontentData);
          dispatch(clearbrandAction()); 
      }
  },[brandssuccessData]);
    return(
        <>
        <Drawer
        open={open}
        onClose={handleClose}
        anchor = "right"
      >
         <h2>Create a Brand</h2>
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {formik.values.image && (
            <img
                src={URL.createObjectURL(formik.values.image)}
                alt="Preview"
                style={{ width: '100%', marginTop: '10px', width:'100px', height:'100px' }}
            />
        )}

{/* {formik.values.image && typeof formik.values.image === 'string' && (
    <img
        src={formik.values.image}
        alt="Preview"
        style={{ width: '100%', marginTop: '10px', width:'100px', height:'100px' }}
    />
)} */}
      <Grid>
      <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      // startIcon={<CloudUploadIcon />}
    >
      Upload
      <VisuallyHiddenInput type="file" 
      onChange={handleImageChange}
      />
    </Button>
    {formik.values.image && (
    <Button onClick={removeImage}>
      Remove
    </Button>
    )}

      </Grid>
      </div>
      <Grid item xs={12}>
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
         </Grid>
         <Grid item xs={12}>
        <InputLabel id="demo-multiple-chip-label">Select Brand</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={formik.values.brandid}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} sx={{ backgroundColor: '#5D87FF', color: 'white', borderRadius: '5px' }}  />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          fullWidth
        >
          {brands.map((ele) => (
            <MenuItem
              key={ele._id}
              value={ele._id}
            >
              {ele.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
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