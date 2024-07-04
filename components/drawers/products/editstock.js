import { useEffect, useState } from "react";
import { Modal, Paper, Typography, Button, Grid, Select, MenuItem } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct , updatestocksingleProduct, clearsingproAction } from "@/reducer/SingleProductSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getPCategory, clearpcategoryAction, getPCategoryByStatus } from '@/reducer/ProductCategorySlice';
import { getBrands, getBrandsByStatus, clearbrandAction } from '@/reducer/BrandsSlice';
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { updatestockProductvariant } from "@/reducer/SingleProductSlice";
export default function EditstockDrawer({id, open, handleClose}){
    const dispatch = useDispatch();
    const [pcategory, setPcategory] = useState([]);
    const [brands, setBrands] = useState([]);
    const [variationStocks, setVariationStocks] = useState({});
    const [stocktoupdate, setStockToUpdate] = useState([]);
    const productsuccessData = useSelector((state)=> state.singleproduct.success);
    const singleproductData = useSelector((state)=> state.singleproduct.content);
    const brandsstatussuccess =useSelector((state)=> state.brands.actsuccess);
    const brandsstatusData = useSelector((state)=> state.brands.activebrands);
    const pcategorystatussuccess =useSelector((state)=> state.pcategory.actsuccess);
    const pcategorystatusData = useSelector((state)=> state.pcategory.activepcategory);
    useEffect(()=>{
      dispatch(getPCategoryByStatus({
          status: 'true',
        }))
        dispatch(getBrandsByStatus({
          status: 'true',
        }))
},[]);
    useEffect(()=>{
        if(open){
          dispatch(getSingleProduct(
            {id}
          ))
        }
      },[open, id]);
      useEffect(()=>{
        if(pcategorystatussuccess && pcategorystatusData){
            console.log(pcategorystatusData, 'caccy');
            setPcategory(pcategorystatusData);
            dispatch(clearpcategoryAction()); 
        }
    },[pcategorystatussuccess]);
      useEffect(()=>{
        if(brandsstatussuccess && brandsstatusData){
            console.log(brandsstatusData, 'bran dsdcs');
            setBrands(brandsstatusData);
            dispatch(clearbrandAction()); 
        }
    },[brandsstatussuccess]);
    useEffect(()=>{
      if(productsuccessData &&singleproductData && open){
        if(singleproductData[0].hasVariation){
          setVariationStocks(singleproductData[0].variations);
        }
        formik.setValues(singleproductData[0]);
        console.log(singleproductData[0], 'sing;estock');
        console.log(singleproductData[0].variations, 'prdoo');
      }
    },[productsuccessData]);
 
    const initialvalues = {
      brandid: "",
      categoriesid: "",
      inStockQuantity: "",
      hasVariations: false,
    };
      const handleSwitchChange = () => {
        setFormData({
            ...formData,
            status: !formData.status
        });
    };
    const handleStockChange = (variantId, stock) => {
      setVariationStocks(prevVariationStocks => {
        return prevVariationStocks.map(variant => {
            if (variant.id === variantId) {
                return { ...variant, inStockQuantity: stock };
            }
            return variant;
        });
    });
      setStockToUpdate(prevState => ({
          ...prevState,
          [variantId]: stock
      }));
  };
    const validationSchema = Yup.object().shape({
      // inStockQuantity: Yup.number().required('In Stock Quantity Required')
    });
      const handleSubmit = (event) => {
        event.preventDefault();
        formik.submitForm(); 
      }
 
    const formik = useFormik({
      initialValues: singleproductData || initialvalues,
      validationSchema: validationSchema,
      onSubmit: async (values, { resetForm }) => {
      //   let data = new FormData();
        // dispatch(editSingleservice({id:id, formData: values}));
        if(formik.values.hasVariation){
            dispatch(updatestockProductvariant(stocktoupdate))
        }
        else{
        dispatch(updatestocksingleProduct({id: id , inStockQuantity: formik.values.inStockQuantity}));
        }
        resetForm(); 
        handleClose();
      },
    });
    return(
        <>
        <Drawer
        open={open}
        onClose={handleClose}
        anchor = "right"
      >
         <h2>Add Stock</h2>
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
            minWidth: '400px'
          }}
        >
            <form onSubmit={formik.handleSubmit}>
            <Grid item xs={12}>
          <InputLabel>Brand</InputLabel>
         <Select 
          onChange={formik.handleChange}
          name="brandid"
          value={formik.values.brandid || ''}
        fullWidth
        disabled
        >
           <MenuItem value="" disabled>
            <em>Select Brand</em>
          </MenuItem>
          {brands.length>0 && brands.map((ele)=> (
                <MenuItem value={ele._id}>{ele.name}</MenuItem>
            ))}
          </Select>
          </Grid>
          <Grid item xs={12}>
          <InputLabel>Select Category</InputLabel>
         <Select 
          onChange={formik.handleChange}
          name="categoriesid"
        value={formik.values.categoriesid || ''}
        fullWidth
        disabled
        >
           <MenuItem value="" disabled>
            <em>Select Category</em>
          </MenuItem>
          {pcategory.length>0 && pcategory.map((ele)=> (
                <MenuItem value={ele._id}>{ele.name}</MenuItem>
            ))}
          </Select>
          </Grid>
          {formik.values.hasVariation ? (
            <>
              <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <label htmlFor="" className="control-label">Variations</label>
                    </TableCell>
                    <TableCell data-breakpoints="xs sm">
                        <label htmlFor="" className="control-label">Stock</label>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {variationStocks.length>0 && variationStocks?.map(variant => (
                    <TableRow key={variant._id} className="variant">
                        <TableCell>
                            <TextField
                                disabled
                                fullWidth
                                variant="standard"
                                value={variant.name}
                            />
                            <input type="hidden" name="variationsIds[]" value={variant.id} />
                        </TableCell>
                        <TableCell>
                            <TextField
                                name="variationStocks[]"
                                fullWidth
                                type="number"
                                variant="standard"
                                required
                                inputProps={{ min: 1 }}
                                // value= {variant.inStockQuantity}
                                value={variant.inStockQuantity}
                            onChange={e => handleStockChange(variant.id, e.target.value)}

                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
            </>
          ) : (
            <Grid item xs={12}>
            <InputLabel>Stock</InputLabel>
             <TextField 
              variant="outlined" 
              fullWidth
              name="inStockQuantity"
              onChange={formik.handleChange}
              value={formik.values.inStockQuantity || ''}
              error={formik.touched.inStockQuantity && Boolean(formik.errors.inStockQuantity)}
              helperText={formik.touched.inStockQuantity && formik.errors.inStockQuantity}
              onBlur={formik.handleBlur}
              />
            </Grid>
          )}
         
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