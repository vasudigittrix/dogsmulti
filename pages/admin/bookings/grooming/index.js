import GroomingBookingTable from "@/components/bookings/groomingtable";
import BookingStatusFilter from "@/components/shared/BookingStatusFil"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingByType, clearAction } from "@/reducer/BookingByTypeSlice";
import { getBookingByTypeStatus, getBookingByTypeSearch, clearfilterAction } from "@/reducer/BookingByTypeStSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewGroomingDrawer from "@/components/drawers/newbooking/grooming";
import { Pagination } from "@mui/material";
export default function GroomingBookingPage(){
    const dispatch = useDispatch();
    const [borbookings, setBorBookings] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading , setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totallength, setTotalLength] = useState(0);
    const [status, setStatus] = useState('');
    const boardingContent = useSelector((state)=> state.bookingbytype.content);
    const boardingsuccessData = useSelector((state)=> state.bookingbytype.success);
    const boardingdelsucData = useSelector((state)=> state.bookingbytype.delsuccess);
    const boardingcreatesucData = useSelector((state)=> state.bookingbytype.createsuccess);
    const boardingerrorData = useSelector((state)=> state.bookingbytype.error);
    const boardingupdatesucData = useSelector((state)=> state.bookingbytype.updatesuccess);
    const boardingupdatepaysucData = useSelector((state)=> state.bookingbytype.updatepaysuccess);
    const filterboardingsuccessData = useSelector((state)=> state.bookingbytypestatus.success);
    const filterboardingContent = useSelector((state)=> state.bookingbytypestatus.content);
    const searchboardingContent = useSelector((state)=> state.bookingbytypestatus.bookingbysearch);
    const searchboardingsuccessData = useSelector((state)=> state.bookingbytypestatus.searchsuccess);
    const PAGE_SIZE = 1;
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    const newbookhandler = () => toggleBookDrawer(true)
    const toggleBookDrawer = (openpar) => { 
     setModalOpen(openpar);
   };
   useEffect(()=>{
    if (searchQuery) {
        dispatch(getBookingByTypeSearch({
            search: searchQuery,
            type: 'grooming',
            page: currentPage
        }))
      } else if (status && status !== 'All Status') {
        dispatch(getBookingByTypeStatus({
            status: status,
            type: 'grooming',
            page: currentPage
        }))
      } else{
        setLoading(true);
        dispatch(getBookingByType({
            type: 'grooming',
            page: currentPage
        }))
}
},[status, searchQuery, currentPage, boardingdelsucData, boardingupdatesucData, boardingupdatepaysucData, boardingcreatesucData]);
    // useEffect(()=>{
    //         setLoading(true);
    //     dispatch(getBookingByType({
    //         type: 'grooming'
    //     }
    // ))
    // },[ boardingdelsucData, boardingupdatesucData, boardingupdatepaysucData, boardingcreatesucData]);
    useEffect(()=>{
        if(boardingsuccessData && boardingContent){
            console.log(boardingContent);
            setBorBookings(boardingContent.data);
            setTotalLength(boardingContent.length);
            setLoading(false);
            dispatch(clearAction());
        }
        if(boardingdelsucData){
            setSelectedItems([]);
            toast.success('deleted successfully');
            dispatch(clearAction());
        }
        if(boardingcreatesucData){
            setSelectedItems([]);
            toast.success('booking created successfully');
            dispatch(clearAction());
        }
        if(boardingupdatesucData || boardingupdatepaysucData){
            setSelectedItems([]);
            toast.success('status updated successfully');
            dispatch(clearAction());
        }
        if(boardingerrorData){
            setSelectedItems([]);
            console.log(boardingerrorData);
            toast.error(boardingerrorData.data.responseData.message)
            dispatch(clearAction());
        }
    }, [boardingsuccessData, boardingdelsucData,boardingupdatesucData, boardingerrorData, boardingcreatesucData]);

//    useEffect(()=>{
//     if(filter){
//         setLoading(true);
//         dispatch(getBookingByTypeStatus({
//             status: filter,
//             type: 'boarding'
//         }))
//     }
//    }, [filter]);
   useEffect(()=>{
    if(filterboardingsuccessData && filterboardingContent){
        setBorBookings(filterboardingContent.data);
        setTotalLength(filterboardingContent.length);
            setLoading(false);
            dispatch(clearfilterAction());
    }
    if(searchboardingContent && searchboardingsuccessData ){
        setBorBookings(searchboardingContent.data);
        setTotalLength(searchboardingContent.length);
        setLoading(false);
        dispatch(clearfilterAction());
    }
   },[filterboardingsuccessData, searchboardingsuccessData]);

   const BookingtypesearchHandler = (search)=>{
    setLoading(true);
    setSearchQuery(search);
    setCurrentPage(1);
   }
   const BookingtypestatusHandler = (status)=>{
        setStatus(status);
        setCurrentPage(1);
        setLoading(true);  
    }
    return(
        <>
        <ToastContainer/>
        <BookingStatusFilter  selectedItems={selectedItems} statusHandler = {BookingtypestatusHandler} searchHandler = {BookingtypesearchHandler} newhandler={newbookhandler}/>
        {!loading &&  (
             <GroomingBookingTable data = {borbookings} selectedItems={selectedItems} setSelectedItems = {setSelectedItems}/>
        )
    }
        <NewGroomingDrawer
        open = {isModalOpen}
        onClose={() => toggleBookDrawer(false)}
        />
          <Pagination
                  count={Math.ceil(totallength/ PAGE_SIZE)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
        
        </>
    )
}