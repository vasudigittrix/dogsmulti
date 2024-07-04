import EmployeeEarningTable from "@/components/employees/earningtable";
import { getEmployeeByType, clearAction } from "@/reducer/EmployeeByTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import AllEmployeeFilter from "@/components/shared/AllEmployeeFilter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearEmplAction } from "@/reducer/SingleEmployeeSlice";
import { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';

import { getallEmployees, getallEmployeeByComm, clearEmployeeAction, getallEmployeeBySearch } from "@/reducer/EmployeeSlice";
export default function EmployeeEarnings() {
    const dispatch = useDispatch();
    const [employee, setEmployee] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCommission, setSelectedCommission] = useState('All Commission');
    const [loading, setLoading] = useState(true);
    const employeesuccessData = useSelector((state)=> state.employees.success);
    const employeeupdatesuccessData = useSelector((state)=> state.employeebytype.updatesuccess);
    const employeecreatesuccessData = useSelector((state)=> state.employeebytype.createsuccess);
    const employeedelsuccessData = useSelector((state)=> state.employeebytype.delsuccess);
    const employeecontentData = useSelector((state)=> state.employees.content);
    const employeeresponseData = useSelector((state)=> state.employeebytype.respoData);
    const errordata = useSelector((state)=> state.singleemployee.error);
    const editemployeesuccess = useSelector((state)=> state.singleemployee.editsuccess);
    const employeecommfilData = useSelector((state) => state.employees.statuscontent);
    const employeecommfilsuccess = useSelector((state)=> state.employees.statussuccess);
    const employeesearchsuccess = useSelector((state)=> state.employees.searchsuccess);
    const employeesearchData = useSelector((state)=> state.employees.searchcontent);

    useEffect(()=>{
        dispatch(getallEmployees())
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
            console.log(errordata, 'error');
            toast.error(errordata.data.responseData.message);
            dispatch(clearEmplAction());
        }
    },[employeeupdatesuccessData, employeedelsuccessData, errordata, editemployeesuccess]);
    useEffect(()=>{
        if(employeesuccessData && employeecontentData){
            setEmployee(employeecontentData.data);
            setLoading(false);
            dispatch(clearAction()); 
        }
    },[ employeesuccessData ]);
    
    useEffect(()=>{
        if(employeecommfilsuccess && employeecommfilData){
            setEmployee(employeecommfilData);
            setLoading(false);
            dispatch(clearEmployeeAction());
        }
    },[employeecommfilsuccess]);
    useEffect(()=>{
        if(employeesearchData && employeesearchsuccess){
            setEmployee(employeesearchData);
            setLoading(false);
            dispatch(clearEmployeeAction());
        }
    },[employeesearchsuccess])
    const searchEmployeeHandler = (search)=>{
        setLoading(true);
        dispatch(getallEmployeeBySearch ({
            search: search
        }))
    }
    const commissionEmployeeHandler = (selectedCommission)=>{
        if(selectedCommission == 'Booking Commission'){
             setLoading(true);
            dispatch(getallEmployeeByComm({
              commission: 'booking commission',
            }))
        }
        else if(selectedCommission == 'Product Commission'){
        setLoading(true);
          dispatch(getallEmployeeByComm({
            commission: 'product commission',
          }
        ))
         
    }
    else{
        dispatch(getallEmployees())
    }
    }
    return(
        <>
        <ToastContainer />
        <AllEmployeeFilter 
        selectedItems={selectedItems}
        searchHandler = {searchEmployeeHandler}
        commissionHandler = {commissionEmployeeHandler }
        />
        {!loading && 
         <EmployeeEarningTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {employee}/>
        }
       {/* <Pagination
                  count={Math.ceil(totallength/ PAGE_SIZE)}
                  page={currentPage}
                  onChange={handlePageChange}
                /> */}
        
        </>
    )
}