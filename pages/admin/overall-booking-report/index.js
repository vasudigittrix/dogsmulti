import { useState, useEffect } from "react";
import { getEmployeeByType, clearAction } from "@/reducer/EmployeeByTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import AllEmployeeFilter from "@/components/shared/AllEmployeeFilter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBookingsReportsWithTime, clearBookRepAction, getBookingsReportsByTime } from "@/reducer/BookingReportsSlice";
import DailyBookTable from "@/components/reporttable/dailybooktable";
import DailyBookFilter from "@/components/shared/DailyBookFilter";
import OverallBookTable from "@/components/reporttable/overallbooktable";
export default function OverallBookingReport() {
    const dispatch = useDispatch();
    const [borbookingsrep, setBookingrep] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading , setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totallength, setTotalLength] = useState(0);
    const [dateRange, setDateRange] = useState("");
    const PAGE_SIZE = 10;
    // bookingreport
    const boardingreportContent = useSelector((state)=> state.bookingreport.content);
    const boardingsuccessData = useSelector((state)=> state.bookingreport.success);
    const bookingreportbydateContent = useSelector((state)=> state.bookingreport.statuscontent);
    const bookingreportbydatesuccess = useSelector((state)=> state.bookingreport.statussuccess);

    useEffect(()=>{
        if(dateRange){
            setLoading(true);
            dispatch(getBookingsReportsByTime({date: dateRange}))
        }
        else{
            setLoading(true);
            dispatch(getBookingsReportsWithTime())
        }
    },[dateRange]);

    const convertdateToISO = (date)=>{
        let year = date.getUTCFullYear();
let month = ('0' + (date.getUTCMonth() + 1)).slice(-2); 
let day = ('0' + date.getUTCDate()).slice(-2);
let hours = ('0' + date.getUTCHours()).slice(-2);
let minutes = ('0' + date.getUTCMinutes()).slice(-2);
let seconds = ('0' + date.getUTCSeconds()).slice(-2);
let milliseconds = ('00' + date.getUTCMilliseconds()).slice(-3);

let isoDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
return isoDateString;
    }
    const handleDateChange = (range) => {
        let date = range[0];
        const utcDateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
        console.log(utcDateString);
        setDateRange(utcDateString);
      };
    useEffect(()=>{
        if(boardingsuccessData && boardingreportContent){
            setBookingrep(boardingreportContent.data);
            setLoading(false);
            dispatch(clearAction()); 
        }
        if(bookingreportbydateContent && bookingreportbydatesuccess){
            setBookingrep(bookingreportbydateContent.data);
            setLoading(false);
        }
    },[ boardingsuccessData, bookingreportbydatesuccess]);
    
    return(
        <>
        <ToastContainer />

        <DailyBookFilter dateRange={dateRange} handleDateChange={handleDateChange}/>
        {!loading && 
         <OverallBookTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {borbookingsrep}/>
        }
       
        
        </>
    )
}