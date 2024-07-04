import { useState, useEffect } from "react";
import { getEmployeeByType, clearAction } from "@/reducer/EmployeeByTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import AllEmployeeFilter from "@/components/shared/AllEmployeeFilter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearEmplAction } from "@/reducer/SingleEmployeeSlice";
import { getEmployeeByTypeComm,clearEmpCompAction } from "@/reducer/EmployeeByTypeCoSlice";
import { getEmployeeByTypeSearch } from "@/reducer/EmployeeByTypeCoSlice";
import AllEmployeeTable from "@/components/employees/allemployeetable";
import { getallEmployees, getallEmployeeByComm, clearEmployeeAction, getallEmployeeBySearch } from "@/reducer/EmployeeSlice";
import { getEmployeeRequests, updateverifyEmployeeRequest, clearempreqAction, getEmployeeRequestsByComm } from "@/reducer/EmployeeRequestSlice";
import EmployeeRequestTable from "@/components/employees/requesttable";
export default function EmployeeRequestList() {
    const dispatch = useDispatch();
    const [employee, setEmployee] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCommission, setSelectedCommission] = useState('All Commission');
    const [loading, setLoading] = useState(true);
    const employeesuccessData = useSelector((state)=> state.employeerequest.success);
    const employeecontentData = useSelector((state)=> state.employeerequest.content);
    const errordata = useSelector((state)=> state.employees.error);
    const employeeupdatesuccessData = useSelector((state)=> state.employeerequest.updatesuccess);
    // const editemployeesuccess = useSelector((state)=> state.singleemployee.editsuccess);
    const employeecommfilData = useSelector((state) => state.employeerequest.commlist);
    const employeecommfilsuccess = useSelector((state)=> state.employeerequest.commsuccess);
    // const employeesearchsuccess = useSelector((state)=> state.employees.searchsuccess);
    // const employeesearchData = useSelector((state)=> state.employees.searchcontent);

    useEffect(()=>{
        dispatch(getEmployeeRequests())
    },[employeeupdatesuccessData]);
    useEffect(()=>{
        if(employeeupdatesuccessData){
            setSelectedItems([]);
            toast.success('Verification State Updated Successfully');
            dispatch(clearempreqAction()); 
        }
   
        if(errordata){
            toast.error(errordata.data.responseData.message);
            dispatch(clearempreqAction());
        }
    },[employeeupdatesuccessData, errordata]);
    useEffect(()=>{
        if(employeesuccessData && employeecontentData){
            console.log(employeecontentData);
            setEmployee(employeecontentData);
            setLoading(false);
            dispatch(clearempreqAction()); 
        }
    },[ employeesuccessData ]);
    useEffect(()=>{
        if(employeecommfilsuccess && employeecommfilData){
            console.log(employeecommfilData, 'employ fil');
            setEmployee(employeecommfilData);
            setLoading(false);
            dispatch(clearempreqAction()); 
        }
    },[ employeecommfilsuccess ]);
    
    const searchEmployeeHandler = (search)=>{
        setLoading(true);
        dispatch(getallEmployeeBySearch ({
            search: search
        }))
    }
    const commissionEmployeeHandler = (selectedCommission)=>{
        if(selectedCommission == 'Booking Commission'){
             setLoading(true);
            dispatch(getEmployeeRequestsByComm({
              commission: 'booking commission',
            }))
        }
        else if(selectedCommission == 'Product Commission'){
        setLoading(true);
          dispatch(getEmployeeRequestsByComm({
            commission: 'product commission',
          }
        ))
         
    }
    else{
        dispatch(getEmployeeRequests())
    }
    }
    return(
        <>
        <ToastContainer />
        <AllEmployeeFilter 
        selectedItems={selectedItems}
        searchHandler = {searchEmployeeHandler}
        commissionHandler = {commissionEmployeeHandler }
        disabled={true}
        />
        {!loading && 
         <EmployeeRequestTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {employee}/>
        }
       
        
        </>
    )
}