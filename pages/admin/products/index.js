

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUnits, getUnitsByStatus, clearunitAction, deleteUnits, updateStatusUnits} from "@/reducer/UnitSlice";
import { clearsinunitAction } from "@/reducer/SingleUnitSlice";
import ProductsTable from "@/components/products/Productstable";
import NewProductDrawer from "@/components/drawers/newproduct";
import { getAllProducts, clearproductsAction, deleteProduct, updateStatusProduct, updatefeaturedProduct, getProductsByStatus} from "@/reducer/ProductsSlice";
import { clearsingproAction } from "@/reducer/SingleProductSlice";
import ProductStatusFilter from "@/components/shared/ProductStFilter";
import { Pagination } from "@mui/material";
export default function UnitsList(){
    const [selectedItems, setSelectedItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [unitopen, setUnitopen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totallength, setTotalLength] = useState(0);
    const [status, setStatus] = useState("");
    const PAGE_SIZE = 10;
    const dispatch = useDispatch();
    const productssuccessData = useSelector((state)=> state.products.success);
    const productsstatussuccess =useSelector((state)=> state.products.actsuccess);
    const productsstatusData = useSelector((state)=> state.products.activeproducts);
    const productsupdatesuccessData = useSelector((state)=> state.products.updatesuccess);
    const productsfeatupdatesuccess = useSelector((state)=> state.products.updatefsuccess);
    const productscreatesuccessData = useSelector((state)=> state.products.createsuccess);
    const productsdelsuccessData = useSelector((state)=> state.products.delsuccess);
    const productscontentData = useSelector((state)=> state.products.content);
    const uniteditsuccessData = useSelector((state)=> state.singleunit.editsuccess);
    const errordata = useSelector((state)=> state.products.error);
    const updatestocksuccessData = useSelector((state)=> state.singleproduct.updatesuccess);
    const editproductsuccessData = useSelector((state)=> state.singleproduct.editsuccess);
    const toggleDrawer = (openpar) => { 
        setUnitopen(openpar);
      };
      const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
      const addunitHandler = () => {
        toggleDrawer(true);
      }
      
    useEffect(()=>{
      if(status == 'active'){
       dispatch(getProductsByStatus({
         status: 'true',
         page: currentPage
       }))
   }
      else if(status == 'inactive'){
      dispatch(getProductsByStatus({
          status: 'false',
          page: currentPage
        }))
      }
      else{
        dispatch(getAllProducts({page: currentPage}))
      }
    },[status, currentPage, productsupdatesuccessData,productsfeatupdatesuccess,productscreatesuccessData,productsdelsuccessData, uniteditsuccessData, updatestocksuccessData, editproductsuccessData]);
    useEffect(()=>{
        if(productsupdatesuccessData){
            toast.success('status updated successfully');
            setSelectedItems([]);
            dispatch(clearproductsAction());
        }
        if(productsfeatupdatesuccess){
          toast.success('Featured product updated');
          setSelectedItems([]);
            dispatch(clearproductsAction());
        }
        if(productscreatesuccessData){
            toast.success('Product added successfully');
            dispatch(clearproductsAction());
        }
        if(productsdelsuccessData){
            toast.success('Item deleted successfully');
            setSelectedItems([]);
            dispatch(clearproductsAction());
        }
        if(errordata){
            // toast.error(errordata.data.responseData.message);
            console.log(errordata);
            dispatch(clearproductsAction());
        }
        if(uniteditsuccessData ){
            toast.success('Item updated successfully');
            dispatch(clearsinunitAction());
        }
        if(updatestocksuccessData){
          toast.success('Stock has been updated');
          dispatch(clearsingproAction());
        }
        if(editproductsuccessData){
          toast.success('Product Updated Successfully');
          dispatch(clearsingproAction());
        }
    },[productsupdatesuccessData, productsfeatupdatesuccess, productscreatesuccessData, productsdelsuccessData, errordata, uniteditsuccessData, updatestocksuccessData, editproductsuccessData ])
    useEffect(()=>{
        if(productssuccessData && productscontentData){
            setProducts(productscontentData.data);
            setTotalLength(productscontentData.length);
            setLoading(false);
            dispatch(clearproductsAction()); 
        }
    },[productssuccessData]);
    useEffect(()=>{
        if(productsstatusData && productsstatussuccess){
          console.log(productsstatusData, 'status');
          setProducts(productsstatusData.data);
          setTotalLength(productscontentData.length);
            setLoading(false);
            dispatch(clearproductsAction());
        }
    },[productsstatussuccess]);
    const handleApply = (selectedValue, selectedstatValue) => {
        if(selectedValue== 'Delete'){
          dispatch(deleteProduct(selectedItems));
          setSelectedItems([]);
        }
        else if(selectedValue == 'Status' && selectedstatValue != ''){
          dispatch(updateStatusProduct({
            ids: selectedItems,
            status: selectedstatValue
          }))
          setSelectedItems([]);
        }
        else if(selectedValue == 'Featured' && selectedstatValue != ''){
          dispatch(updatefeaturedProduct({
            ids: selectedItems,
            featured: selectedstatValue
          }))
          setSelectedItems([]);
        }
      }
      const productstatushandler = (status)=>{
        setStatus(status);
        setCurrentPage(1);
        setCurrentPage(1);
       }
    return(
        <>
        <ProductStatusFilter selectedItems={selectedItems} addcategoryHandler= {addunitHandler} handleApply={handleApply} filterhandler = {productstatushandler}/>
        <ToastContainer />
        {!loading && (
        <ProductsTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {products} />
        )}
        <Pagination
                  count={Math.ceil(totallength/ PAGE_SIZE)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
         <NewProductDrawer
      open={unitopen}
      handleClose={() => toggleDrawer(false)}
    />
        </>
    )
}