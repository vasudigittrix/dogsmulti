import BoardingFacultyTable from "@/components/bookings/facultytable"
import { useEffect, useState } from "react";
import BookingStatusFilter from "@/components/shared/BookingStatusFil";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DurationTable from "@/components/bookings/durationtable";
import TrainingTypeTable from "@/components/bookings/trainingtypetable";
import NewDurationDrawer from "@/components/drawers/newduration";
import NewTrainingType from "@/components/drawers/newtrainingtype";
import StatusFilter1 from "@/components/shared/StatusFilter1";
// import { deleteDurations, updateStatusDurations } from "@/reducer/DurationSlice";
import { deleteTrainingType, updateStatusTrainingType } from "@/reducer/TrainingTypeSlice";
import { getTrainingType, clearttAction } from "@/reducer/TrainingTypeSlice";
import { cleartrainAction } from "@/reducer/SingleTrainingSlice";
export default function TrainingTypeList(){
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [trainingtype, setTrainingType] = useState([]);
    const [durationopen, setDurationOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const trainingsuccessData = useSelector((state)=> state.trainingtype.success);
    const trainingupdatesuccessData = useSelector((state)=> state.trainingtype.updatesuccess);
    const trainingcreatesuccessData = useSelector((state)=> state.trainingtype.createsuccess);
    const trainingdelsuccessData = useSelector((state)=> state.trainingtype.delsuccess);
    const trainingscontentData = useSelector((state)=> state.trainingtype.content);
    const errordata = useSelector((state)=> state.trainingtype.error);
    const trainingeditsuccess = useSelector((state)=> state.singletraining.editsuccess);
    const toggleDrawer = (openpar) => { 
        setDurationOpen(openpar);
      };
      const adddurationhandler = () => {
        toggleDrawer(true);
      }
    useEffect(()=>{
        dispatch(getTrainingType())
    },[trainingcreatesuccessData, trainingupdatesuccessData, trainingdelsuccessData, trainingeditsuccess]);
    useEffect(()=>{
        if(trainingupdatesuccessData){
            toast.success('status updated successfully');
            // alert('Updated');
            setSelectedItems([]);
            dispatch(clearttAction());
        }
        if(trainingcreatesuccessData){
            toast.success('Item added successfully');
            dispatch(clearttAction());
        }
        if(trainingdelsuccessData ){
            toast.success('Item deleted successfully');
            setSelectedItems([]);
            dispatch(clearttAction());
        }
        if(trainingeditsuccess){
            toast.success('Item edited successfully');
            dispatch(cleartrainAction());
        }
        if(errordata){
            toast.error(errordata.data.responseData.message);
            dispatch(clearttAction());
        }
    },[trainingupdatesuccessData, trainingcreatesuccessData,trainingdelsuccessData,trainingeditsuccess, errordata])
    useEffect(()=>{
        if(trainingsuccessData && trainingscontentData){
            setTrainingType(trainingscontentData);
            setLoading(false);
            dispatch(clearttAction()); 
        }
    },[trainingsuccessData]);
    const handleApply = (selectedValue, selectedstatValue) => {
        if(selectedValue== 'Delete'){
          dispatch(deleteTrainingType(selectedItems));
          setSelectedItems([]);
        }
        else if(selectedValue == 'Status' && selectedstatValue != ''){
          dispatch(updateStatusTrainingType({
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
        <TrainingTypeTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {trainingtype} />
        )}
        <NewTrainingType
      open={durationopen}
      handleClose={() => toggleDrawer(false)}
      type="training"
    />
        </>
    )
}