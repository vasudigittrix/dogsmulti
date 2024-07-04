import BoardingFacultyTable from "@/components/bookings/facultytable"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoriesTable from "@/components/bookings/categoriestable";
import StatusFilter from "@/components/shared/StatusFilter";
import NewCategoryDrawer from "@/components/drawers/newcategory";
import { getCategoriesByType, clearCatAction, updateCategoryByType, deleteCategoryByType, getCategoriesByTypeStatus } from "@/reducer/CategoriesSlice";
import { clearscatAction } from "@/reducer/SingleCategorySlice";
export default function VetCategoriesList(){
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryopen, setCategoryOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const categoriesupdatesuccessData = useSelector((state)=> state.categories.updatesuccess);
    const categoriescreatesuccessData = useSelector((state)=> state.categories.addsuccess);
    const categoriesdelsuccessData = useSelector((state)=> state.categories.delsuccess);
    const categoriesstatussuccess = useSelector((state)=> state.categories.statussuccess);
    const errordata = useSelector((state)=> state.categories.error);
    const categoriessuccessData = useSelector((state)=> state.categories.success);
    const categoriescontentData = useSelector((state)=> state.categories.content);
    const categoriesstatusData = useSelector((state)=> state.categories.statuscontent);
    const singlecatsuccessData = useSelector((state)=> state.singlecategory.editsuccess);
    const toggleDrawer = (openpar) => { 
        setCategoryOpen(openpar);
      };
      const addcategoryHandler = () => {
        toggleDrawer(true);
      }
      const categorystatusHandler = (status)=>{
        alert(status);

        if(status == 'active'){
             setLoading(true);
            dispatch(getCategoriesByTypeStatus({
              status: 'true',
              type: 'veterinary'
            }))
        }
        else if(status == 'inactive'){
        setLoading(true);
        dispatch(getCategoriesByTypeStatus({
            status: 'false',
            type: 'veterinary'
          }))
         
    }
    else{
        setLoading(true);
        dispatch(getCategoriesByType({
            type: 'veterinary'
        }))
    }
    }
      const handleApply = (selectedValue, selectedstatValue) => {
        if(selectedValue== 'Delete'){
          dispatch(deleteCategoryByType(selectedItems));
          setSelectedItems([]);
        }
        else if(selectedValue == 'Status' && selectedstatValue != ''){
          dispatch(updateCategoryByType({
            ids: selectedItems,
            status: selectedstatValue
          }))
          setSelectedItems([]);
        }
      }
    useEffect(()=>{
        dispatch(getCategoriesByType({
            type: 'veterinary'
        }))
    },[categoriesupdatesuccessData, categoriescreatesuccessData, categoriesdelsuccessData, singlecatsuccessData]);
    useEffect(()=>{
        if(categoriesupdatesuccessData){
            toast.success('status updated successfully');
            setSelectedItems([]);
            dispatch(clearCatAction());
        }
        if(categoriescreatesuccessData){
            toast.success('Item added successfully');
            dispatch(clearCatAction());
        }
        if(categoriesdelsuccessData){
            toast.success('Item deleted successfully');
            setSelectedItems([]);
            dispatch(clearCatAction());
        }
        if( singlecatsuccessData){
            toast.success('Category updated successfully');
            setSelectedItems([]);
            dispatch(clearscatAction());
        }
        if(errordata){
            toast.error(errordata.data.responseData.message);
            dispatch(clearCatAction());
        }
    },[categoriesupdatesuccessData,categoriescreatesuccessData,categoriesdelsuccessData, singlecatsuccessData,errordata])
    useEffect(()=>{
        if(categoriessuccessData && categoriescontentData){
            setCategories(categoriescontentData);
            setLoading(false);
            dispatch(clearCatAction()); 
        }
    },[categoriessuccessData]);
    useEffect(()=>{
        if(categoriesstatussuccess && categoriesstatusData){
            setCategories(categoriesstatusData);
            setLoading(false);
            dispatch(clearCatAction()); 
        }
    },[categoriesstatussuccess]);

    return(
        <>
        <StatusFilter addcategoryHandler = {addcategoryHandler} selectedItems={selectedItems} handleApply = {handleApply} filterhandler = {categorystatusHandler}/>
        <ToastContainer />
        {!loading && (
        <CategoriesTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {categories} type = "veterinary" />
        )}
        <NewCategoryDrawer  
        open={categoryopen}
        type = "veterinary"
        handleClose={() => toggleDrawer(false)}/>
        </>
    )
}