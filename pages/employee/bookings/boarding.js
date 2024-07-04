import BoardingBookingTable from "@/components/bookings/boardingtable"
import BookingStatusFilter from "@/components/shared/BookingStatusFil"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingByType, clearAction } from "@/reducer/BookingByTypeSlice";
import { getBookingByTypeStatus, getBookingByTypeSearch, clearfilterAction } from "@/reducer/BookingByTypeStSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewBookingDrawer from "@/components/drawers/newbooking/boarding";
import { getBookingByEmployee, clearbookempAction, getBookingByEmployeeSearch, getBookingByEmployeeStatus } from "@/reducer/Employees/BookingByEmployeeSlice";
import Pagination from '@mui/material/Pagination';
import { useSession, signIn, signOut } from "next-auth/react";

export default function EmployeeBoardingBooking(){
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const [borbookings, setBorBookings] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading , setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totallength, setTotalLength] = useState(0);
    const PAGE_SIZE = 10;
    const [status, setStatus] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    const boardingContent = useSelector((state)=> state.bookingbyemployee.content);
    const boardingsuccessData = useSelector((state)=> state.bookingbyemployee.success);
    const boardingdelsucData = useSelector((state)=> state.bookingbytype.delsuccess);
    const boardingerrorData = useSelector((state)=> state.bookingbytype.error);
    const boardingupdatesucData = useSelector((state)=> state.bookingbytype.updatesuccess);
    const boardingupdatepaysucData = useSelector((state)=> state.bookingbytype.updatepaysuccess);
    const filterboardingsuccessData = useSelector((state)=> state.bookingbyemployee.statsuccess);
    const filterboardingContent = useSelector((state)=> state.bookingbyemployee.statcontent);
    const searchboardingContent = useSelector((state)=> state.bookingbyemployee.searchcontent);
    const searchboardingsuccessData = useSelector((state)=> state.bookingbyemployee.searchsuccess);
      const newbookhandler = () => toggleBookDrawer(true)
      const toggleBookDrawer = (openpar) => { 
       setModalOpen(openpar);
     };

    useEffect(()=>{
        if (searchQuery) {
            dispatch(getBookingByEmployeeSearch({
                search: searchQuery,
                employeeid: session?.user.id,
            }))
          } else if (status && status !== 'All Status') {
            dispatch(getBookingByEmployeeStatus({
                status: status,
                employeeid: session?.user.id,
            }))
          } else{
            setLoading(true);
            dispatch(getBookingByEmployee({
                employeeid: session?.user.id,
                page: currentPage
            }))
    }
    },[status, session, searchQuery, currentPage, boardingdelsucData, boardingupdatesucData, boardingupdatepaysucData]);
    useEffect(()=>{
        if(boardingsuccessData && boardingContent){
            setBorBookings(boardingContent.data);
            setLoading(false);
            dispatch(clearbookempAction());
        }
        if(boardingdelsucData){
            setSelectedItems([]);
            toast.success('deleted successfully');
            dispatch(clearAction());
        }
        if(boardingupdatesucData || boardingupdatepaysucData){
            setSelectedItems([]);
            toast.success('status updated successfully');
            dispatch(clearAction());
        }
        if(boardingerrorData){
            setSelectedItems([]);
            toast.error(boardingerrorData.data.responseData.message)
            dispatch(clearAction());
        }
    }, [boardingsuccessData, boardingdelsucData,boardingupdatesucData, boardingerrorData]);


   useEffect(()=>{
    if(filterboardingsuccessData && filterboardingContent){
        setBorBookings(filterboardingContent.data);
        // setTotalLength(filterboardingContent.length);
            setLoading(false);
            dispatch(clearfilterAction());
    }
    if(searchboardingContent && searchboardingsuccessData ){
        setBorBookings(searchboardingContent.data);
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
        <BookingStatusFilter  selectedItems={selectedItems} statusHandler = {BookingtypestatusHandler} searchHandler = {BookingtypesearchHandler} newhandler={newbookhandler}
        disabled={true}
        />
        {!loading &&  (
             <BoardingBookingTable data = {borbookings} selectedItems={selectedItems} setSelectedItems = {setSelectedItems}/>
        )
    }
       <NewBookingDrawer
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