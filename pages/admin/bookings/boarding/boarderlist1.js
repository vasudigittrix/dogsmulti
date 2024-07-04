import BoarderListTable from "@/components/bookings/boardertable"
import BookingStatusFilter from "@/components/shared/BookingStatusFil";
import { useState, useEffect } from "react";
import { getEmployeeByType, clearAction } from "@/reducer/EmployeeByTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import EmployeeFilter from "@/components/shared/EmployeeStatusFil";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearEmplAction } from "@/reducer/SingleEmployeeSlice";
import { getEmployeeByTypeComm,clearEmpCompAction } from "@/reducer/EmployeeByTypeCoSlice";
import { getEmployeeByTypeSearch } from "@/reducer/EmployeeByTypeCoSlice";
import EmployeeListTable from "@/components/bookings/employeetable";
export default function BoarderLis1t() {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [employeebytype, setEmployeeByType] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const employeesuccessData = useSelector((state)=> state.employeebytype.success);
    const employeeupdatesuccessData = useSelector((state)=> state.employeebytype.updatesuccess);
    const employeecreatesuccessData = useSelector((state)=> state.employeebytype.createsuccess);
    const employeedelsuccessData = useSelector((state)=> state.employeebytype.delsuccess);
    const employeecontentData = useSelector((state)=> state.employeebytype.content);
    const employeeresponseData = useSelector((state)=> state.employeebytype.respoData);
    const errordata = useSelector((state)=> state.employeebytype.error);
    const editemployeesuccess = useSelector((state)=> state.singleemployee.editsuccess);
    const employeecommfilData = useSelector((state) => state.employeebytypecomm.content);
    const employeecommfilsuccess = useSelector((state)=> state.employeebytypecomm.success);
    const employeesearchsuccess = useSelector((state)=> state.employeebytypecomm.searchsuccess);
    const employeesearchData = useSelector((state)=> state.employeebytypecomm.searchemployee)
    // useEffect(()=>{
    //     if(selectedCommission == 'Booking Commission'){
    //         dispatch(getEmployeeByTypeComm({
    //           commission: 'booking commission',
    //           type: 'boarder'
    //         }))
    //     }
    //     else if(selectedCommission == 'Product Commission'){
    //       dispatch(getEmployeeByTypeComm({
    //         commission: 'product commission',
    //         type: 'boarder'
    //       }
    //     ))
         
    // }
    // else{
    //     dispatch(getEmployeeByType({
    //         type: "boarder"
    //     }))
    // }
    // },[selectedCommission])
    useEffect(()=>{
        dispatch(getEmployeeByType({
            type: "boarding"
        }))
    },[employeecreatesuccessData, employeeupdatesuccessData, employeedelsuccessData, editemployeesuccess]);
    useEffect(()=>{
        if(employeeupdatesuccessData){
            setSelectedItems([]);
            toast.success(employeeresponseData.message);
            dispatch(clearAction()); 
        }
        if(employeedelsuccessData){
            setSelectedItems([]);
            toast.success('Deleted successfully');
            dispatch(clearAction()); 
        }
        if(editemployeesuccess){
            toast.success('Edited successfully');
            dispatch(clearEmplAction());
        }
        if(errordata){
            toast.error(errordata.data.responseData.message)
            // console.log(errordata.data.responseData.message);
        }
    },[employeeupdatesuccessData, employeedelsuccessData, errordata]);
    useEffect(()=>{
        if(employeesuccessData && employeecontentData){
            setEmployeeByType(employeecontentData);
            console.log(employeecontentData);
            setLoading(false);
            dispatch(clearAction()); 
        }
    },[ employeesuccessData ]);
    useEffect(()=>{
        if(employeecommfilsuccess && employeecommfilData){
            setEmployeeByType(employeecommfilData);
            setLoading(false);
            dispatch(clearEmpCompAction());
        }
    },[employeecommfilsuccess]);
    useEffect(()=>{
        if(employeesearchData && employeesearchsuccess){
            console.log(employeesearchData);
            setEmployeeByType(employeesearchData);
            setLoading(false);
            dispatch(clearEmpCompAction);
        }
    },[employeesearchsuccess])
    const searchEmployeeHandler = (search)=>{
        setLoading(true);
        dispatch(getEmployeeByTypeSearch ({
            search: search,
            type: 'boarding'
        }))
    }
    const commissionEmployeeHandler = (selectedCommission)=>{
        if(selectedCommission == 'Booking Commission'){
             setLoading(true);
            dispatch(getEmployeeByTypeComm({
              commission: 'booking commission',
              type: 'boarding'
            }))
        }
        else if(selectedCommission == 'Product Commission'){
        setLoading(true);
          dispatch(getEmployeeByTypeComm({
            commission: 'product commission',
            type: 'boarding'
          }
        ))
         
    }
    else{
        dispatch(getEmployeeByType({
            type: "boarding"
        }))
    }
    }
    return(
        <>
        {/* <BookingStatusFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> */}
        <ToastContainer />
        <EmployeeFilter 
        selectedItems={selectedItems}
        searchHandler = {searchEmployeeHandler}
        commissionHandler = {commissionEmployeeHandler }
        type = "boarding"
        title = "Boarder"
        />
         {!loading && 
         <EmployeeListTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {employeebytype} title="Boarder"/>
        }
       
        
        </>
    )
}