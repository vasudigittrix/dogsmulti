import BoardingFacultyTable from "@/components/bookings/facultytable"
import { useEffect, useState } from "react";
import BookingStatusFilter from "@/components/shared/BookingStatusFil";
import { getFacilities,clearAction} from "@/reducer/FacilitiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FacilitiesFilter from "@/components/shared/FacilitiesStatusFil";
import StatusFilter1 from "@/components/shared/StatusFilter1";
import NewFacilityDrawer from "@/components/drawers/newfacility";
export default function BoardingFacultyList(){
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [facilityopen, setFacilityOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const faciltiessuccessData = useSelector((state)=> state.facilities.success);
    const faciltiesupdatesuccessData = useSelector((state)=> state.facilities.updatesuccess);
    const faciltiescreatesuccessData = useSelector((state)=> state.facilities.createsuccess);
    const faciltiesdelsuccessData = useSelector((state)=> state.facilities.delsuccess);
    const facilitiescontentData = useSelector((state)=> state.facilities.content);
    const errordata = useSelector((state)=> state.facilities.error);
    const toggleDrawer = (openpar) => { 
        setFacilityOpen(openpar);
      };
      const addfacilityrHandler = () => {
        toggleDrawer(true);
      }
      
    useEffect(()=>{
        dispatch(getFacilities())
    },[faciltiesupdatesuccessData, faciltiescreatesuccessData,faciltiesdelsuccessData]);
    useEffect(()=>{
        if(faciltiesupdatesuccessData){
            toast.success('status updated successfully');
            // alert('Updated');
            setSelectedItems([]);
            dispatch(clearAction());
        }
        if(faciltiescreatesuccessData){
            toast.success('Item added successfully');
            dispatch(clearAction());
        }
        if(faciltiesdelsuccessData){
            toast.success('Item deleted successfully');
            setSelectedItems([]);
            dispatch(clearAction());
        }
        if(errordata){
            toast.error(errordata.data.responseData.message);
            dispatch(clearAction());
        }
    },[faciltiesupdatesuccessData, faciltiescreatesuccessData, faciltiesdelsuccessData, errordata])
    useEffect(()=>{
        if(faciltiessuccessData && facilitiescontentData){
            setFacilities(facilitiescontentData);
            setLoading(false);
            dispatch(clearAction()); 
        }
    },[faciltiessuccessData]);
    const handleApply = ()=>{

    }
    return(
        <>
        {/* <BookingStatusFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> */}
        <StatusFilter1 selectedItems={selectedItems} newhandler = {addfacilityrHandler} handleApply={handleApply}/>
        <ToastContainer />
        {!loading && (
        <BoardingFacultyTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {facilities} />
        )}
         <NewFacilityDrawer
      fopen={facilityopen}
      handleClose={() => toggleDrawer(false)}
    />
        </>
    )
}