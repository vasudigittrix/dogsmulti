import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Paper, Typography} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch, Box } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createEmployeeByType } from "@/reducer/EmployeeByTypeSlice";
import { addCustomer } from '@/reducer/CustomerSlice';
import {IconButton} from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCustAction } from "@/reducer/CustomerSlice";
import { getCategoriesByType, clearCatAction } from '@/reducer/CategoriesSlice';
// import { addServiceByType } from '@/reducer/ServicesSlice';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { getPCategory, clearpcategoryAction, getPCategoryByStatus } from '@/reducer/ProductCategorySlice';
import { getBrands, getBrandsByStatus, clearbrandAction } from '@/reducer/BrandsSlice';
import { getTagsByStatus, cleartagAction } from '@/reducer/TagsSlice';
import { getUnitsByStatus, clearunitAction } from '@/reducer/UnitSlice';
import { createProduct } from '@/reducer/ProductsSlice';
import { styled } from '@mui/material/styles';
import { getAllVarTypes, clearvarAction, getVarTypesByStatus } from '@/reducer/VariationsTypeSlice';
import DatePicker from "react-datepicker";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css'; 
import "react-datepicker/dist/react-datepicker.css";
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
  
export default function NewProductDrawer({open ,  handleClose, type}){
    const dispatch = useDispatch();
    const [pcategory, setPcategory] = useState([]);
    const [date, setDate] = useState(new Date());
    const [brands, setBrands] = useState([]);
    const [tags, setTags] = useState([]);
    const [units,setUnits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [vartype, setVarType] = useState([]);
    const [varvalues, setVarValues] = useState([]);
    const [variations, setVariations] = useState([]);
    const [dateRange, setDateRange] = useState([null, null]);
  
    const pcategorystatussuccess =useSelector((state)=> state.pcategory.actsuccess);
    const pcategorystatusData = useSelector((state)=> state.pcategory.activepcategory);
    const brandssuccessData = useSelector((state)=> state.brands.success);
    const brandsstatussuccess =useSelector((state)=> state.brands.actsuccess);
    const brandsstatusData = useSelector((state)=> state.brands.activebrands);
    const tagsstatussuccess =useSelector((state)=> state.tags.actsuccess);
    const tagsstatusData = useSelector((state)=> state.tags.activetagss);
    const unitsstatussuccess =useSelector((state)=> state.units.actsuccess);
    const unitsstatusData = useSelector((state)=> state.units.activeunits);
    const vartypestatusData = useSelector((state)=> state.variationtype.activevartype);
    const vartypestatussuccess = useSelector((state)=> state.variationtype.actsuccess);
    const handleSubmit = (e)=>{
      e.preventDefault(); 
      formik.submitForm(); 
    }
    const handleVariationUpdate = (index, fieldName, value) => {
      const updatedVariations = [...variations];
      updatedVariations[index][fieldName] = value;
      setVariations(updatedVariations);
    };
    useEffect(()=>{
        dispatch(getPCategoryByStatus({
            status: 'true',
          }))
          dispatch(getBrandsByStatus({
            status: 'true',
          }))
          dispatch(getTagsByStatus({
            status: 'true',
          }))
          dispatch(getUnitsByStatus({
            status: 'true'
          }))

          dispatch(getVarTypesByStatus({
            status:'true'
          }))
  },[]);
  useEffect(()=>{
    if(pcategorystatussuccess && pcategorystatusData){
        console.log(pcategorystatusData, 'caccy');
        setPcategory(pcategorystatusData);
        setLoading(false);
        dispatch(clearpcategoryAction()); 
    }
},[pcategorystatussuccess]);
  useEffect(()=>{
    if(brandsstatussuccess && brandsstatusData){
        console.log(brandsstatusData, 'bran dsdcs');
        setBrands(brandsstatusData);
        setLoading(false);
        dispatch(clearbrandAction()); 
    }
},[brandsstatussuccess]);

useEffect(()=>{
    if(tagsstatussuccess && tagsstatusData){
        console.log(tagsstatusData);
        setTags(tagsstatusData);
        setLoading(false);
        dispatch(cleartagAction()); 
    }
},[tagsstatussuccess]);
useEffect(()=>{
    if(unitsstatusData && unitsstatussuccess){
        setUnits(unitsstatusData);
        setLoading(false);
        dispatch(clearunitAction()); 
    }
},[unitsstatussuccess]);
useEffect(()=>{
  if(vartypestatusData && vartypestatussuccess){
      // setUnits(vartypestatusData);
      console.log(vartypestatusData, 'vartype is here ');
      setVarType(vartypestatusData);
      setLoading(false);
      dispatch(clearvarAction()); 
  }
},[vartypestatussuccess]);


const handleDateChange = (range) => {
  const [startDate, endDate] = range;
  console.log(range);
  formik.setFieldValue('startdate',startDate);
  formik.setFieldValue('enddate',endDate);
};
    const initialvalues = {
        name: "",
        description: "",
        shortDescription: "",
        categoriesid: "",
        status: true,
        markedprice: "",
        featured: false,
        inStockQuantity: "",
        hasVariation: false,
        vartypeid: "",
        varvalueid: "",
        discount: 0,
        type: 'percent',
        startdate: '',
        enddate: '',
        brandid: '',
        unitid: '',
        tagid: ''
      };
    const handleAddVariation = ()=> {
      const varValue = varvalues.find(ele => ele._id === formik.values.varvalueid);
      setVariations(prevVariations => {
        // Create a copy of the previous variations array
        const updatedVariations = [...prevVariations];
        
        updatedVariations.push({
          name: varValue.name,
          price: 0, 
          inStockQuantity: 0,
          sku: '',
          code: '',
          varvalueid: formik.values.varvalueid,
          vartypeid:formik.values.vartypeid
        });
    
        return updatedVariations;
      });
      formik.setFieldValue('vartypeid', '');
      formik.setFieldValue('varvalueid', '');
    console.log(varValue.name , 'name selecr');
      console.log(variations, 'variation');
    
   
    }

    const handleDeleteVariation = (ind) => {
      let newvariations = variations.filter((_, index) => index !== ind);
      console.log(newvariations);
      setVariations(newvariations);
    }
      const handleSwitchChange = () => {
        formik.setFieldValue('status', !formik.values.status);
    };
    const handlevariationChange = () => {
      formik.setFieldValue('hasVariation', !formik.values.hasVariation);
    }
    const handlefeaturedChange = () => {
        formik.setFieldValue('featured', !formik.values.featured);
    }
    const toggleDrawer = (openpar) => { 
      setOpen(openpar);
    };
    const removeImage=()=>{
        formik.setFieldValue('image', '');
      }
    const handleImageChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          formik.setFieldValue('image', file);
        }
      };
      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        categoriesid: Yup.string().required('Category is required'),
        // markedprice: Yup.string().required('Price is required'),
        // inStockQuantity: Yup.string().required('InStock Quantity is required')
        hasVariation: Yup.boolean().required(),
        // markedprice: Yup.string().required('Marked Price is Required').when("hasVariation", {
        //   is: false,
        //   otherwise: Yup.string().nullable().notRequired()
        // })
      });
      const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
        //   let data = new FormData();
          let data = new FormData();
          for (let key in values) {
            if(key !== 'varvalueid' || key !== 'vartypeid'){
            data.append(key, values[key]);
      }
    }
      data.append('variations', JSON.stringify(variations));
        dispatch(createProduct(data))
          resetForm(); 
          handleClose();
      }})
    return(
        <>
        <Drawer
        open={open}
         onClose={ handleClose}
        anchor = "right"
      >
         <h2>Create a Product</h2>
                <IconButton style={{ position: "absolute", top: "10px", right: "10px" }} onClick={ handleClose}>
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
    <Grid container spacing={3}>
    <Grid item xs={4}>
        
        {formik.values.image ? (
            <img
                src={URL.createObjectURL(formik.values.image)}
                alt="Preview"
                style={{ width: '100%', marginTop: '10px', width:'100px', height:'100px' }}
            />
        ) : (
            <img src="#" alt="loading"/>
        )}
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
          <Grid item xs={8}>
    <Grid container spacing={3} direction="column">
      <Grid item>
        <InputLabel>Product Name *</InputLabel>
        <TextField 
        // label="Service Name" 
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
      <Grid item >
      <InputLabel>Short Description</InputLabel>
        <TextField 
        variant="outlined" 
        fullWidth 
        name="shortDescription"
        onChange={formik.handleChange}
        value={formik.values.shortDescription}
        error={formik.touched.shortDescription && Boolean(formik.errors.shortDescription)}
        helperText={formik.touched.shortDescription && formik.errors.shortDescription}
        onBlur={formik.handleBlur} />
      </Grid>
      </Grid>
      </Grid>
      <Grid item xs={12}>
      <InputLabel>Description *</InputLabel>
        <TextField 
        variant="outlined" 
        fullWidth
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid item xs={6}>
          <InputLabel>Select Category*</InputLabel>
         <Select 
          onChange={formik.handleChange}
          name="categoriesid"
        value={formik.values.categoriesid}
        error={formik.touched.categoriesid && Boolean(formik.errors.categoriesid)}
        helperText={formik.touched.categoriesid && formik.errors.categoriesid}
        onBlur={formik.handleBlur}
        fullWidth
        >
            {pcategory.length>0 && pcategory.map((ele)=> (
                <MenuItem value={ele._id}>{ele.name}</MenuItem>
            ))}
            {/* <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem> */}
          </Select>
          </Grid>
          <Grid item xs={6}>
          <InputLabel>Brand</InputLabel>
         <Select 
          onChange={formik.handleChange}
          name="brandid"
        value={formik.values.brandid}
        error={formik.touched.brandid && Boolean(formik.errors.brandid)}
        helperText={formik.touched.brandid && formik.errors.brandid}
        onBlur={formik.handleBlur}
        fullWidth
        >
            {brands.length>0 && brands.map((ele)=> (
                <MenuItem value={ele._id}>{ele.name}</MenuItem>
            ))}
          </Select>
          </Grid>
          <Grid item xs={6}>
          <InputLabel>Tag</InputLabel>
         <Select 
          onChange={formik.handleChange}
          name="tagid"
        value={formik.values.tagid}
        error={formik.touched.tagid && Boolean(formik.errors.tagid)}
        helperText={formik.touched.tagid && formik.errors.tagid}
        onBlur={formik.handleBlur}
        fullWidth
        >
            {tags.length>0 && tags.map((ele)=> (
                <MenuItem value={ele._id}>{ele.name}</MenuItem>
            ))}
            {/* <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem> */}
          </Select>
          </Grid>
          <Grid item xs={6}>
          <InputLabel>Unit</InputLabel>
         <Select 
          onChange={formik.handleChange}
          name="unitid"
        value={formik.values.unitid}
        error={formik.touched.unitid && Boolean(formik.errors.unitid)}
        helperText={formik.touched.unitid && formik.errors.unitid}
        onBlur={formik.handleBlur}
        fullWidth
        >
            {pcategory.length>0 && pcategory.map((ele)=> (
                <MenuItem value={ele._id}>{ele.name}</MenuItem>
            ))}
            {/* <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem> */}
          </Select>
          </Grid>
          <Grid item xs={12}>
          <Box component="fieldset" style={{padding: '7px'}}>
      <legend>Price, SKU & Stock</legend>
           <FormControlLabel
                control={<Switch checked={formik.values.hasVariation} onChange={handlevariationChange} />}
                label="Has Variations?"
            />
            {formik.values.hasVariation ? (
              <>
              <Grid item xs={12}>
              <Grid container spacing={2}>
              <Grid item xs={6}>
          <InputLabel>Variation Type</InputLabel>
         <Select 
            onChange={(event) => {
              setVarValues([]);
    formik.handleChange(event); 
    const selectedVarType = event.target.value;
    const varType = vartype.find(ele => ele._id === selectedVarType);
    console.log(varType);
    if (varType.value) {
      console.log(varType.value, 'valuesss');
      setVarValues(varType.value); 
    }
  }}
          name="vartypeid"
        value={formik.values.vartypeid}
        error={formik.touched.vartypeid && Boolean(formik.errors.vartypeid)}
        helperText={formik.touched.vartypeid && formik.errors.vartypeid}
        onBlur={formik.handleBlur}
        fullWidth
        >
            {vartype.length>0 && vartype.map((ele)=> (
                <MenuItem value={ele._id}>{ele.name}</MenuItem>
            ))}
            {/* <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem> */}
          </Select>
          </Grid>
          <Grid item xs={6}>
          <InputLabel>Variation Value</InputLabel>
         <Select 
         onChange={formik.handleChange}
        
          name="varvalueid"
        value={formik.values.varvalueid}
        error={formik.touched.varvalueid && Boolean(formik.errors.varvalueid)}
        helperText={formik.touched.varvalueid && formik.errors.varvalueid}
        onBlur={formik.handleBlur}
        fullWidth
        >
            {varvalues.length>0 && varvalues.map((ele)=> (
                <MenuItem value={ele._id}>{ele.name}</MenuItem>
            ))}
          </Select>
          </Grid>
          </Grid>
          </Grid>
          <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleAddVariation} 
        disabled={formik.values.varvalueid === '' || formik.values.vartypeid === ''} 
        >Add More Variation</Button>
        </Grid>

          <Grid item xs={12}>
          <Table bordered>
        <TableHead>
          <TableRow>
            <TableCell>Variations</TableCell>
            <TableCell>Price (Included Tax)</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {variations.length>0 && variations.map((ele, index) => (
           <>
          <TableRow>
              {console.log(ele, 'eleee')}
               <TableCell>
              <TextField disabled fullWidth value={ele.name}/>
            </TableCell>
            <TableCell>
              <TextField 
              type="text" 
              pattern="^(?!0*$)\d+(\.\d+)?$" 
              name="price" 
              value={ele.price} 
              required 
              onChange={(event) => handleVariationUpdate(index, 'price', event.target.value)}
              
              fullWidth />
            </TableCell>
            <TableCell>
              <TextField type="number" inputProps={{ min: 1, step: 1 }} fullWidth value={ele.inStockQuantity} 
              name="inStockQuantity"
              onChange={(event) => handleVariationUpdate(index, 'inStockQuantity', event.target.value)}
              />
            </TableCell>
            <TableCell>
              <TextField fullWidth value={ele.sku} 
              name="sku"
              onChange={(event) => handleVariationUpdate(index, 'sku', event.target.value)}
              />
            </TableCell>
            <TableCell>
              <TextField fullWidth value={ele.code}
              name="code"
              onChange={(event) => handleVariationUpdate(index, 'code', event.target.value)}
              />
            </TableCell>
            <TableCell>
              <IconTrash onClick={()=> handleDeleteVariation(index)}/>
            </TableCell>
            </TableRow>
              </>
            )
          )}
           
        </TableBody>
      </Table>
          </Grid>
              
              </>
            ):(
              <>
              <Grid item xs={12}>
              <Grid container spacing={2}>
              <Grid item xs={3}>
              <InputLabel>Price (included tax)</InputLabel>
                <TextField 
                variant="outlined" 
                fullWidth 
                name="markedprice"
                onChange={formik.handleChange}
                value={formik.values.markedprice}
                error={formik.touched.markedprice && Boolean(formik.errors.markedprice)}
                helperText={formik.touched.markedprice && formik.errors.markedprice}
                onBlur={formik.handleBlur}
                 />
              </Grid>
              <Grid item xs={3}>
              <InputLabel>Stock</InputLabel>
                <TextField 
                variant="outlined" 
                fullWidth 
                name="inStockQuantity"
                onChange={formik.handleChange}
                value={formik.values.inStockQuantity}
                error={formik.touched.inStockQuantity && Boolean(formik.errors.inStockQuantity)}
                helperText={formik.touched.inStockQuantity && formik.errors.inStockQuantity}
                onBlur={formik.handleBlur}
                 />
              </Grid>
              <Grid item xs={3}>
              <InputLabel>SKU</InputLabel>
                <TextField 
                variant="outlined" 
                fullWidth 
                name="sku"
                onChange={formik.handleChange}
                value={formik.values.sku}
                error={formik.touched.sku && Boolean(formik.errors.sku)}
                helperText={formik.touched.sku && formik.errors.sku}
                onBlur={formik.handleBlur}
                 />
              </Grid>
              <Grid item xs={3}>
      <InputLabel>Code</InputLabel>
        <TextField 
        variant="outlined" 
        fullWidth 
        name="code"
        onChange={formik.handleChange}
        value={formik.values.code}
        error={formik.touched.code && Boolean(formik.errors.code)}
        helperText={formik.touched.code && formik.errors.code}
        onBlur={formik.handleBlur}
         />
      </Grid>
              </Grid>
              </Grid>
             
              </>
            )}
             </Box>
            </Grid>
            
     
    
      <Grid item xs={12}>
      <Box component="fieldset" style={{padding: '7px'}}>
      <legend>Product Discount</legend>
      <Grid container spacing={3}>
      <Grid item xs={4}>
      <InputLabel>Date Range</InputLabel>
        {/* <TextField 
        variant="outlined" 
        fullWidth 
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        onBlur={formik.handleBlur}
         /> */}
            <Flatpickr
        options={{
          mode: "range",
          minDate: "today",
          dateFormat: "Y-m-d",
        }}
        value={dateRange}
      //   value = {[
      //     "Thu May 30 2024 00:00:00 GMT+0530 (India Standard Time)",
      //     "Fri Jun 07 2024 00:00:00 GMT+0530 (India Standard Time)"
      // ]}
        onChange={handleDateChange}
      />
      </Grid>
      <Grid item xs={4}>
      <InputLabel>Discount Amount</InputLabel>
        <TextField 
        variant="outlined" 
        fullWidth 
        name="discount"
        onChange={formik.handleChange}
        value={formik.values.discount}
        error={formik.touched.discount && Boolean(formik.errors.discount)}
        helperText={formik.touched.discount && formik.errors.discount}
        onBlur={formik.handleBlur}
         />
      </Grid>
      <Grid item xs={4}>
      <InputLabel>Percent or Fixed</InputLabel>
         <Select 
         onChange={formik.handleChange}
        
          name="type"
        value={formik.values.type}
        error={formik.touched.type && Boolean(formik.errors.type)}
        helperText={formik.touched.type && formik.errors.type}
        onBlur={formik.handleBlur}
        fullWidth
        >
            <MenuItem value="percent">Percent %</MenuItem>
            <MenuItem value="fixed">Fixed</MenuItem>
          </Select>
      </Grid>

      </Grid>
      </Box>
      </Grid>
      <Grid style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
      {/* <FormControlLabel
                control={<Switch checked={formik.values.status} onChange={formik.handleChange} />}
                label="Status"
            /> */}
            <FormGroup>
            <FormControlLabel control={<Checkbox value={formik.values.featured} onChange={handlefeaturedChange} />} label="This is a featured product" />
            </FormGroup>
    <FormControlLabel
    labelPlacement="start"
        control={<Switch checked={formik.values.status} onChange={handleSwitchChange} />}
        label="Status"
    />
            </Grid>
   
     
    </Grid>
    </form>
        </Paper>
        <Grid item xs={12}>
        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        <Button size="large" color="secondary" variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
      </Grid>
      </Drawer>
        </>
    )
}