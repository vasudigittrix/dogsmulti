import BoardingFacultyTable from "@/components/bookings/facultytable"
import { useEffect, useState } from "react";
import BookingStatusFilter from "@/components/shared/BookingStatusFil";
import { getDurationsByType, clearDurAction } from "@/reducer/DurationSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DurationTable from "@/components/bookings/durationtable";
import NewDurationDrawer from "@/components/drawers/newduration";
import StatusFilter1 from "@/components/shared/StatusFilter1";
import { deleteDurations, updateStatusDurations } from "@/reducer/DurationSlice";
export default function TrainingDurationList(){
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [durations, setDurations] = useState([]);
    const [durationopen, setDurationOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const durationsuccessData = useSelector((state)=> state.durations.success);
    const durationupdatesuccessData = useSelector((state)=> state.durations.updatesuccess);
    const durationcreatesuccessData = useSelector((state)=> state.durations.createsuccess);
    const durationdelsuccessData = useSelector((state)=> state.durations.delsuccess);
    const durationscontentData = useSelector((state)=> state.durations.content);
    const errordata = useSelector((state)=> state.durations.error);
    const toggleDrawer = (openpar) => { 
        setDurationOpen(openpar);
      };
      const adddurationhandler = () => {
        toggleDrawer(true);
      }
    useEffect(()=>{
        dispatch(getDurationsByType({
            type: 'training'
        }))
    },[durationupdatesuccessData, durationcreatesuccessData,durationdelsuccessData ]);
    useEffect(()=>{
        if(durationupdatesuccessData){
            toast.success('status updated successfully');
            // alert('Updated');
            setSelectedItems([]);
            dispatch(clearDurAction());
        }
        if(durationcreatesuccessData){
            toast.success('Item added successfully');
            dispatch(clearDurAction());
        }
        if(durationdelsuccessData ){
            toast.success('Item deleted successfully');
            setSelectedItems([]);
            dispatch(clearDurAction());
        }
        if(errordata){
            toast.error(errordata.data.responseData.message);
            dispatch(clearDurAction());
        }
    },[durationupdatesuccessData, durationcreatesuccessData,durationdelsuccessData, errordata])
    useEffect(()=>{
        if(durationsuccessData && durationscontentData){
            setDurations(durationscontentData);
            setLoading(false);
            dispatch(clearDurAction()); 
        }
    },[durationsuccessData]);
    const handleApply = (selectedValue, selectedstatValue) => {
        if(selectedValue== 'Delete'){
          dispatch(deleteDurations(selectedItems));
          setSelectedItems([]);
        }
        else if(selectedValue == 'Status' && selectedstatValue != ''){
          dispatch(updateStatusDurations({
            ids: selectedItems,
            status: selectedstatValue
          }))
          setSelectedItems([]);
        }
      }
    return(
        <>
        {/* <BookingStatusFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> */}
        <StatusFilter1 selectedItems={selectedItems} newhandler = {adddurationhandler} handleApply={handleApply}/>
        <ToastContainer />
        {!loading && (
        // <BoardingFacultyTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {facilities} />
        <DurationTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {durations} />
        )}
        <NewDurationDrawer
      open={durationopen}
      handleClose={() => toggleDrawer(false)}
      type="training"
    />
        </>
    )
}