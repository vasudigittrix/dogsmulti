import { useEffect, useState } from "react";
import { getTaxes, cleartaxAction, deleteTaxes, updateStatusTaxes, getTaxesByStatus } from "@/reducer/TaxesSlice";
import { getLogistics, clearlogAction, deleteLogistics, updateStatusLogistics, getLogisticsByStatus } from "@/reducer/LogisticSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StatusFilter from "@/components/shared/StatusFilter";
import TaxTable from "@/components/tax/taxtable";
import LogTable from "@/components/logistics/logtable";
import NewTaxDrawer from "@/components/drawers/newtax";
import NewLogisticDrawer from "@/components/drawers/newlogistic";
export default function LogisticList(){
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [logistic, setLogistic] = useState([]);
    const [taxopen, setTaxopen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const logisticsuccessData = useSelector((state)=> state.logistic.success);
    const logisticstatussuccess =useSelector((state)=> state.logistic.actsuccess);
    const logisticstatusData = useSelector((state)=> state.logistic.activelogistics);
    const logisticupdatesuccessData = useSelector((state)=> state.logistic.updatesuccess);
    const logisticcreatesuccessData = useSelector((state)=> state.logistic.createsuccess);
    const logisticdelsuccessData = useSelector((state)=> state.logistic.delsuccess);
    const logisticcontentData = useSelector((state)=> state.logistic.content);
    // const tageditsuccessData = useSelector((state)=> state.singletag.editsuccess);
    const errordata = useSelector((state)=> state.logistic.error);
    const toggleDrawer = (openpar) => { 
        setTaxopen(openpar);
      };
      const addtagHandler = () => {
        toggleDrawer(true);
      }
      
    useEffect(()=>{
        dispatch(getLogistics())
    },[logisticupdatesuccessData, logisticcreatesuccessData, logisticdelsuccessData]);
    useEffect(()=>{
        if(logisticupdatesuccessData){
            toast.success('status updated successfully');
            setSelectedItems([]);
            dispatch(clearlogAction());
        }
        if(logisticcreatesuccessData){
            toast.success('Item added successfully');
            dispatch(clearlogAction());
        }
        if(logisticdelsuccessData){
            toast.success('Item deleted successfully');
            setSelectedItems([]);
            dispatch(clearlogAction());
        }
        if(errordata){
            toast.error(errordata.data.responseData.message);
            dispatch(clearlogAction());
        }
    },[logisticupdatesuccessData, logisticcreatesuccessData, logisticdelsuccessData, errordata])
    useEffect(()=>{
        if(logisticsuccessData && logisticcontentData){
            setLogistic(logisticcontentData);
            setLoading(false);
            dispatch(clearlogAction()); 
        }
    },[logisticsuccessData]);
    useEffect(()=>{
        if(logisticstatussuccess && logisticstatusData ){
            setLogistic(logisticstatusData );
            setLoading(false);
            dispatch(clearlogAction()); 
        }
    },[logisticstatussuccess]);
    const handleApply = (selectedValue, selectedstatValue) => {
        if(selectedValue== 'Delete'){
          dispatch(deleteLogistics(selectedItems));
          setSelectedItems([]);
        }
        else if(selectedValue == 'Status' && selectedstatValue != ''){
          dispatch(updateStatusLogistics({
            ids: selectedItems,
            status: selectedstatValue
          }))
          setSelectedItems([]);
        }
      }
    const taxstatusHandler = (status)=>{
        if(status == 'active'){
             setLoading(true);
            dispatch(updateStatusLogistics({
              status: 'true',
            }))
        }
        else if(status == 'inactive'){
        setLoading(true);
        dispatch(updateStatusLogistics({
            status: 'false'
          }))
         
    }
    else{
        setLoading(true);
        dispatch(getLogistics())
    }
    }
    return(
        <>
        {/* <BookingStatusFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> */}
        <StatusFilter selectedItems={selectedItems} addcategoryHandler= {addtagHandler} handleApply={handleApply} filterhandler = {taxstatusHandler}/>
        <ToastContainer />
        {!loading && (
        <LogTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {logistic} />
        )}
         <NewLogisticDrawer
      open={taxopen}
      handleClose={() => toggleDrawer(false)}
    />
        </>
    )
}