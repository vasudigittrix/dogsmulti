import BoardingFacultyTable from "@/components/bookings/facultytable"
import { useEffect, useState } from "react";
import BookingStatusFilter from "@/components/shared/BookingStatusFil";
import { getFacilities,clearAction} from "@/reducer/FacilitiesSlice";
import { getTags, cleartagAction, deleteTags, updateStatusTags } from "@/reducer/TagsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StatusFilter from "@/components/shared/StatusFilter";
import { getUnits, getUnitsByStatus, clearunitAction, deleteUnits, updateStatusUnits} from "@/reducer/UnitSlice";
import UnitsTable from "@/components/products/Unitstable";
import NewUnitDrawer from "@/components/drawers/newunit";
import { clearsinunitAction } from "@/reducer/SingleUnitSlice";
export default function UnitsList(){
    const [selectedItems, setSelectedItems] = useState([]);
    // const [tags, setTags] = useState([]);
    const [units, setUnits] = useState([]);
    const [unitopen, setUnitopen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const unitssuccessData = useSelector((state)=> state.units.success);
    const unitsstatussuccess =useSelector((state)=> state.units.actsuccess);
    const unitsstatusData = useSelector((state)=> state.units.activeunits);
    const unitsupdatesuccessData = useSelector((state)=> state.units.updatesuccess);
    const unitscreatesuccessData = useSelector((state)=> state.units.createsuccess);
    const unitsdelsuccessData = useSelector((state)=> state.units.delsuccess);
    const unitscontentData = useSelector((state)=> state.units.content);
    const uniteditsuccessData = useSelector((state)=> state.singleunit.editsuccess);
    const errordata = useSelector((state)=> state.units.error);
    const toggleDrawer = (openpar) => { 
        setUnitopen(openpar);
      };
      const addunitHandler = () => {
        toggleDrawer(true);
      }
      
    useEffect(()=>{
        dispatch(getUnits())
    },[unitsupdatesuccessData, unitscreatesuccessData,unitsdelsuccessData, uniteditsuccessData]);
    useEffect(()=>{
        if(unitsupdatesuccessData){
            toast.success('status updated successfully');
            // alert('Updated');
            setSelectedItems([]);
            dispatch(clearunitAction());
        }
        if(unitscreatesuccessData){
            toast.success('Item added successfully');
            dispatch(clearunitAction());
        }
        if(unitsdelsuccessData){
            toast.success('Item deleted successfully');
            setSelectedItems([]);
            dispatch(clearunitAction());
        }
        if(errordata){
            toast.error(errordata.data.responseData.message);
            dispatch(clearunitAction());
        }
        if(uniteditsuccessData ){
            toast.success('Item updated successfully');
            dispatch(clearsinunitAction());
        }
    },[unitsupdatesuccessData, unitscreatesuccessData, unitsdelsuccessData, errordata, uniteditsuccessData ])
    useEffect(()=>{
        if(unitssuccessData && unitscontentData){
            setUnits(unitscontentData);
            setLoading(false);
            dispatch(clearunitAction()); 
        }
    },[unitssuccessData]);
    useEffect(()=>{
        if(unitsstatusData && unitsstatussuccess){
            setUnits(unitsstatusData);
            setLoading(false);
            dispatch(clearunitAction()); 
        }
    },[unitsstatussuccess]);
    const handleApply = (selectedValue, selectedstatValue) => {
        if(selectedValue== 'Delete'){
          dispatch(deleteUnits(selectedItems));
          setSelectedItems([]);
        }
        else if(selectedValue == 'Status' && selectedstatValue != ''){
          dispatch(updateStatusUnits({
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
            dispatch(getUnitsByStatus({
              status: 'true',
            }))
        }
        else if(status == 'inactive'){
        setLoading(true);
        dispatch(getUnitsByStatus({
            status: 'false'
          }))
         
    }
    else{
        setLoading(true);
        dispatch(getUnits())
    }
    }
    return(
        <>
        {/* <BookingStatusFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> */}
        <StatusFilter selectedItems={selectedItems} addcategoryHandler= {addunitHandler} handleApply={handleApply} filterhandler = {unitsstatusHandler}/>
        <ToastContainer />
        {!loading && (
        <UnitsTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {units} />
        )}
         <NewUnitDrawer
      open={unitopen}
      handleClose={() => toggleDrawer(false)}
    />
        </>
    )
}