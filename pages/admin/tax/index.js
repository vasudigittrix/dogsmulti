import BoardingFacultyTable from "@/components/bookings/facultytable"
import { useEffect, useState } from "react";
import BookingStatusFilter from "@/components/shared/BookingStatusFil";
import { getFacilities,clearAction} from "@/reducer/FacilitiesSlice";
// import { getTags, cleartagAction, deleteTags, updateStatusTags } from "@/reducer/TagsSlice";
import { getTaxes, cleartaxAction, deleteTaxes, updateStatusTaxes, getTaxesByStatus } from "@/reducer/TaxesSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StatusFilter from "@/components/shared/StatusFilter";
import TaxTable from "@/components/tax/taxtable";
import NewTaxDrawer from "@/components/drawers/newtax";
export default function TaxList(){
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [taxes, setTaxes] = useState([]);
    const [taxopen, setTaxopen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const taxessuccessData = useSelector((state)=> state.taxes.success);
    const taxesstatussuccess =useSelector((state)=> state.taxes.actsuccess);
    const taxesstatusData = useSelector((state)=> state.taxes.activetaxess);
    const taxesupdatesuccessData = useSelector((state)=> state.taxes.updatesuccess);
    const taxescreatesuccessData = useSelector((state)=> state.taxes.createsuccess);
    const taxesdelsuccessData = useSelector((state)=> state.taxes.delsuccess);
    const taxescontentData = useSelector((state)=> state.taxes.content);
    // const tageditsuccessData = useSelector((state)=> state.singletag.editsuccess);
    const errordata = useSelector((state)=> state.taxes.error);
    const toggleDrawer = (openpar) => { 
        setTaxopen(openpar);
      };
      const addtagHandler = () => {
        toggleDrawer(true);
      }
      
    useEffect(()=>{
        dispatch(getTaxes())
    },[taxesupdatesuccessData, taxescreatesuccessData,taxesdelsuccessData]);
    useEffect(()=>{
        if(taxesupdatesuccessData){
            toast.success('status updated successfully');
            // alert('Updated');
            setSelectedItems([]);
            dispatch(cleartaxAction());
        }
        if(taxescreatesuccessData){
            toast.success('Item added successfully');
            dispatch(cleartaxAction());
        }
        if(taxesdelsuccessData){
            toast.success('Item deleted successfully');
            setSelectedItems([]);
            dispatch(cleartaxAction());
        }
        if(errordata){
            toast.error(errordata.data.responseData.message);
            dispatch(cleartaxAction());
        }
        // if(tageditsuccessData){
        //     toast.success('Item updated successfully');
        //     dispatch(clearsintagAction());
        // }
    },[taxesupdatesuccessData, taxescreatesuccessData, taxesdelsuccessData, errordata])
    useEffect(()=>{
        if(taxessuccessData && taxescontentData){
            setTaxes(taxescontentData);
            setLoading(false);
            dispatch(cleartaxAction()); 
        }
    },[taxessuccessData]);
    useEffect(()=>{
        if(taxesstatussuccess && taxesstatusData){
            setTaxes(taxesstatusData);
            setLoading(false);
            dispatch(cleartaxAction()); 
        }
    },[taxesstatussuccess]);
    const handleApply = (selectedValue, selectedstatValue) => {
        if(selectedValue== 'Delete'){
          dispatch(deleteTaxes(selectedItems));
          setSelectedItems([]);
        }
        else if(selectedValue == 'Status' && selectedstatValue != ''){
          dispatch(updateStatusTaxes({
            ids: selectedItems,
            status: selectedstatValue
          }))
          setSelectedItems([]);
        }
      }
    const taxstatusHandler = (status)=>{
        if(status == 'active'){
             setLoading(true);
            dispatch(updateStatusTaxes({
              status: 'true',
            }))
        }
        else if(status == 'inactive'){
        setLoading(true);
        dispatch(updateStatusTaxes({
            status: 'false'
          }))
         
    }
    else{
        setLoading(true);
        dispatch(getTaxes())
    }
    }
    return(
        <>
        {/* <BookingStatusFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> */}
        <StatusFilter selectedItems={selectedItems} addcategoryHandler= {addtagHandler} handleApply={handleApply} filterhandler = {taxstatusHandler}/>
        <ToastContainer />
        {!loading && (
        <TaxTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {taxes} />
        )}
         <NewTaxDrawer
      open={taxopen}
      handleClose={() => toggleDrawer(false)}
    />
        </>
    )
}