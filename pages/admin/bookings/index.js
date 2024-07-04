import AllBookingTable from "@/components/bookings/allbookingtable";
import BookingStatusFilter from "@/components/shared/BookingStatusFil"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings, clearBookAction, getBookingsBySearch, getBookingsByStatus } from "@/reducer/BookingsSlice";
import { getBookingByType, clearAction } from "@/reducer/BookingByTypeSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '@mui/material/Pagination';
export default function BookingPage(){
    const dispatch = useDispatch();
    const [borbookings, setBorBookings] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading , setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totallength, setTotalLength] = useState(0);
    const PAGE_SIZE = 10;
    const boardingContent = useSelector((state)=> state.booking.content);
    const boardingsuccessData = useSelector((state)=> state.booking.success);
    const boardingdelsucData = useSelector((state)=> state.bookingbytype.delsuccess);
    const boardingcreatesucData = useSelector((state)=> state.bookingbytype.createsuccess);
    const boardingerrorData = useSelector((state)=> state.bookingbytype.error);
    const boardingupdatesucData = useSelector((state)=> state.bookingbytype.updatesuccess);
    const boardingupdatepaysucData = useSelector((state)=> state.bookingbytype.updatepaysuccess);
    const filterbookingsuccess = useSelector((state)=> state.booking.statussuccess);
    const filterbookingContent = useSelector((state)=> state.booking.statuscontent);
    const searchbookingsuccess = useSelector((state)=> state.booking.searchsuccess);
    const searchbookingContent = useSelector((state)=> state.booking.searchcontent);
    const [status, setStatus] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    // useEffect(()=>{
    //         setLoading(true);
    //     dispatch(getBookings())
    // },[ boardingdelsucData, boardingupdatesucData, boardingupdatepaysucData, boardingcreatesucData]);
    useEffect(()=>{
        if (searchQuery) {
            console.log('dispatching');
            dispatch(getBookingsBySearch({
                search: searchQuery,
                page: currentPage
            }))
          } else if (status && status !== 'All Status') {
            dispatch(getBookingsByStatus({
                status: status,
                page: currentPage
            }))
          } else{
            setLoading(true);
            dispatch(getBookings({
                page: currentPage
            }))
    }
    },[status, searchQuery, currentPage, boardingdelsucData, boardingupdatesucData, boardingupdatepaysucData, boardingcreatesucData]);
    useEffect(()=>{
        if(boardingsuccessData && boardingContent){
            console.log(boardingContent, 'boardingding');

            setBorBookings(boardingContent.data);
            setTotalLength(boardingContent.length);
            setLoading(false);
            dispatch(clearBookAction());
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
            // console.log(boardingerrorData);
            toast.error(boardingerrorData.data.responseData.message)
            dispatch(clearAction());
        }
    }, [boardingsuccessData, boardingdelsucData,boardingupdatesucData, boardingerrorData, boardingcreatesucData]);
    // useEffect(()=>{
    //     if (searchQuery) {
    //         dispatch(getBookingByTypeSearch({
    //             search: searchQuery,
    //             type: 'boarding',
    //             page: currentPage
    //         }))
    //       } else if (status && status !== 'All Status') {
    //         dispatch(getBookingByTypeStatus({
    //             status: status,
    //             type: 'boarding',
    //             page: currentPage
    //         }))
    //       } else{
    //         setLoading(true);
    //         dispatch(getBookingByType({
    //             type: 'boarding',
    //             page: currentPage
    //         }))
    // }
    // },[status, searchQuery, currentPage, boardingdelsucData, boardingupdatesucData, boardingupdatepaysucData, boardingcreatesuccess]);
   useEffect(()=>{
    if(filterbookingsuccess && filterbookingContent){
        console.log(filterbookingContent, 'filter');
        setBorBookings(filterbookingContent.data);
        setTotalLength(filterbookingContent.length);
            setLoading(false);
            dispatch(clearBookAction());
    }
    if(searchbookingContent && searchbookingsuccess ){
        console.log(searchbookingContent, 'searched');
        setBorBookings(searchbookingContent.data || []);
        setTotalLength(searchbookingContent.length || 1);
        setLoading(false);
        dispatch(clearBookAction());
    }
   },[filterbookingsuccess, searchbookingsuccess]);

//    const BookingtypesearchHandler = (search)=>{
//     setLoading(true);
//     dispatch(getBookingsBySearch({
//         search: search,
//     }))
//    }
//    const BookingtypestatusHandler = (status)=>{
//     if(status !== 'All Status'){
//         setLoading(true);
//         dispatch(getBookingsByStatus({
//             status: status
//         }))
//     }
//     else{
//         setLoading(true);
//         dispatch(getBookings());
//     }
   
// }
const BookingtypesearchHandler = (search)=>{
    console.log(search , 'searcj');
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
        <BookingStatusFilter  selectedItems={selectedItems} statusHandler = {BookingtypestatusHandler} searchHandler = {BookingtypesearchHandler} disabled={true}/>
        {!loading &&  (
             <AllBookingTable data = {borbookings} selectedItems={selectedItems} setSelectedItems = {setSelectedItems}/>
        )
    }
       <Pagination
                  count={Math.ceil(totallength/ PAGE_SIZE)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
       
        
        </>
    )
}