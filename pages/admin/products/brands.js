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
import BrandsTable from "@/components/products/Brandstable";
import { clearsinunitAction } from "@/reducer/SingleUnitSlice";
import { getBrands, getBrandsByStatus, clearbrandAction, deleteBrands, updateStatusBrands } from "@/reducer/BrandsSlice";
export default function BrandsList(){
    const [selectedItems, setSelectedItems] = useState([]);
    // const [tags, setTags] = useState([]);
    const [brands, setBrands] = useState([]);
    const [unitopen, setUnitopen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [totallength, setTotalLength] = useState(0);
    const [status, setStatus] = useState("");
    const PAGE_SIZE = 10;
    const brandssuccessData = useSelector((state)=> state.brands.success);
    const brandsstatussuccess =useSelector((state)=> state.brands.actsuccess);
    const brandsstatusData = useSelector((state)=> state.brands.activebrands);
    const brandsupdatesuccessData = useSelector((state)=> state.brands.updatesuccess);
    const brandscreatesuccessData = useSelector((state)=> state.brands.createsuccess);
    const brandsdelsuccessData = useSelector((state)=> state.brands.delsuccess);
    const brandscontentData = useSelector((state)=> state.brands.content);
    const uniteditsuccessData = useSelector((state)=> state.singleunit.editsuccess);
    const errordata = useSelector((state)=> state.brands.error);
    const toggleDrawer = (openpar) => { 
        setUnitopen(openpar);
      };
      const addbrandHandler = () => {
        toggleDrawer(true);
      }
      
    useEffect(()=>{
        dispatch(getBrands())
    },[brandsupdatesuccessData, brandscreatesuccessData,brandsdelsuccessData, uniteditsuccessData]);
    useEffect(()=>{
        if(brandsupdatesuccessData){
            toast.success('status updated successfully');
            // alert('Updated');
            setSelectedItems([]);
            dispatch(clearbrandAction());
        }
        if(brandscreatesuccessData){
            toast.success('Item added successfully');
            dispatch(clearbrandAction());
        }
        if(brandsdelsuccessData){
            toast.success('Item deleted successfully');
            setSelectedItems([]);
            dispatch(clearbrandAction());
        }
        if(errordata){
            toast.error(errordata.data.responseData.message);
            dispatch(clearbrandAction());
        }
        if(uniteditsuccessData ){
            toast.success('Item updated successfully');
            dispatch(clearsinunitAction());
        }
    },[brandsupdatesuccessData, brandscreatesuccessData, brandsdelsuccessData, errordata, uniteditsuccessData ])
    useEffect(()=>{
        if(brandssuccessData && brandscontentData){
            setBrands(brandscontentData);
            setLoading(false);
            dispatch(clearbrandAction()); 
        }
    },[brandssuccessData]);
    useEffect(()=>{
        if(brandsstatusData && brandsstatussuccess){
            setBrands(brandsstatusData);
            setLoading(false);
            dispatch(clearbrandAction()); 
        }
    },[brandsstatussuccess]);
    const handleApply = (selectedValue, selectedstatValue) => {
        if(selectedValue== 'Delete'){
          dispatch(deleteBrands(selectedItems));
          setSelectedItems([]);
        }
        else if(selectedValue == 'Status' && selectedstatValue != ''){
          dispatch(updateStatusBrands({
            ids: selectedItems,
            status: selectedstatValue
          }))
          setSelectedItems([]);
        }
      }
    const unitsstatusHandler = (status)=>{

        if(status == 'active'){
             setLoading(true);
            dispatch(getBrandsByStatus({
              status: 'true',
            }))
        }
        else if(status == 'inactive'){
        setLoading(true);
        dispatch(getBrandsByStatus({
            status: 'false'
          }))
         
    }
    else{
        setLoading(true);
        dispatch(getBrands())
    }
    }
    return(
        <>
        {/* <BookingStatusFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> */}
        <StatusFilter selectedItems={selectedItems} addcategoryHandler= {addbrandHandler} handleApply={handleApply} filterhandler = {unitsstatusHandler}/>
        <ToastContainer />
        {!loading && (
        <BrandsTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {brands} />
        )}
         <NewBrandDrawer
      open={unitopen}
      handleClose={() => toggleDrawer(false)}
    />
        </>
    )
}