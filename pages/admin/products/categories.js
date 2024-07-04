import BoardingFacultyTable from "@/components/bookings/facultytable"
import { useEffect, useState } from "react";
import BookingStatusFilter from "@/components/shared/BookingStatusFil";
import { getFacilities,clearAction} from "@/reducer/FacilitiesSlice";
import { getTags, cleartagAction, deleteTags, updateStatusTags } from "@/reducer/TagsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StatusFilter from "@/components/shared/StatusFilter";
// import UnitsTable from "@/components/products/Unitstable";
import NewBrandDrawer from "@/components/drawers/newbrand";
import { clearsinunitAction } from "@/reducer/SingleUnitSlice";
import { getBrands, getBrandsByStatus, clearbrandAction, deleteBrands, updateStatusBrands } from "@/reducer/BrandsSlice";
import CategoriesTable from "@/components/bookings/categoriestable";
import CategoriesTable2 from "@/components/products/CategoriesTable2";
import { getPCategory, getPCategoryByStatus, clearpcategoryAction, deletePCategory, updateStatusPCategory } from "@/reducer/ProductCategorySlice";
import NewPCategoryDrawer from "@/components/drawers/newpcategory";
export default function CategoriesList(){
    const [selectedItems, setSelectedItems] = useState([]);
    // const [tags, setTags] = useState([]);
    const [pcategory, setPcategory] = useState([]);
    const [unitopen, setUnitopen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const pcategorysuccessData = useSelector((state)=> state.pcategory.success);
    const pcategorystatussuccess =useSelector((state)=> state.pcategory.actsuccess);
    const pcategorystatusData = useSelector((state)=> state.pcategory.activepcategory);
    const pcategoryupdatesuccessData = useSelector((state)=> state.pcategory.updatesuccess);
    const pcategorycreatesuccessData = useSelector((state)=> state.pcategory.createsuccess);
    const pcategorydelsuccessData = useSelector((state)=> state.pcategory.delsuccess);
    const pcategorycontentData = useSelector((state)=> state.pcategory.content);
    const uniteditsuccessData = useSelector((state)=> state.singleunit.editsuccess);
    const errordata = useSelector((state)=> state.pcategory.error);
    const toggleDrawer = (openpar) => { 
        setUnitopen(openpar);
      };
      const addbrandHandler = () => {
        toggleDrawer(true);
      }
      
    useEffect(()=>{
        dispatch(getPCategory())
    },[pcategoryupdatesuccessData, pcategorycreatesuccessData,pcategorydelsuccessData, uniteditsuccessData]);
    useEffect(()=>{
        if(pcategoryupdatesuccessData){
            toast.success('status updated successfully');
            // alert('Updated');
            setSelectedItems([]);
            dispatch(clearpcategoryAction());
        }
        if(pcategorycreatesuccessData){
            toast.success('Item added successfully');
            dispatch(clearpcategoryAction());
        }
        if(pcategorydelsuccessData){
            toast.success('Item deleted successfully');
            setSelectedItems([]);
            dispatch(clearpcategoryAction());
        }
        if(errordata){
            toast.error(errordata.data.responseData.message);
            dispatch(clearpcategoryAction());
        }
        if(uniteditsuccessData ){
            toast.success('Item updated successfully');
            dispatch(clearsinunitAction());
        }
    },[pcategoryupdatesuccessData, pcategorycreatesuccessData, pcategorydelsuccessData, errordata, uniteditsuccessData ])
    useEffect(()=>{
        if(pcategorysuccessData && pcategorycontentData){
            setPcategory(pcategorycontentData);
            setLoading(false);
            dispatch(clearpcategoryAction()); 
        }
    },[pcategorysuccessData]);
    useEffect(()=>{
        if(pcategorystatusData &&  pcategorystatussuccess){
            setPcategory(pcategorystatusData);
            setLoading(false);
            dispatch(clearpcategoryAction()); 
        }
    },[ pcategorystatussuccess]);
    const handleApply = (selectedValue, selectedstatValue) => {
        if(selectedValue== 'Delete'){
          dispatch(deletePCategory(selectedItems));
          setSelectedItems([]);
        }
        else if(selectedValue == 'Status' && selectedstatValue != ''){
          dispatch(updateStatusPCategory({
            ids: selectedItems,
            status: selectedstatValue
          }))
          setSelectedItems([]);
        }
      }
    const unitsstatusHandler = (status)=>{
        alert(status);

        if(status == 'active'){
             setLoading(true);
            dispatch(getPCategoryByStatus({
              status: 'true',
            }))
        }
        else if(status == 'inactive'){
        setLoading(true);
        dispatch(getPCategoryByStatus({
            status: 'false'
          }))
         
    }
    else{
        setLoading(true);
        dispatch(getPCategory())
    }
    }
    return(
        <>
        {/* <BookingStatusFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> */}
        <StatusFilter selectedItems={selectedItems} addcategoryHandler= {addbrandHandler} handleApply={handleApply} filterhandler = {unitsstatusHandler}/>
        <ToastContainer />
        {!loading && (
        <CategoriesTable2 selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {pcategory} />
        )}
         <NewPCategoryDrawer
      open={unitopen}
      handleClose={() => toggleDrawer(false)}
    />
        </>
    )
}