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
export default function BoarderList() {
    const dispatch = useDispatch();
    const [employeebytype, setEmployeeByType] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCommission, setSelectedCommission] = useState('All Commission');
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
    useEffect(()=>{
        dispatch(getEmployeeByType({
            type: 'veterinary'
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
        }
    },[employeeupdatesuccessData, employeedelsuccessData, errordata, editemployeesuccess]);
    useEffect(()=>{
        if(employeesuccessData && employeecontentData){
            setEmployeeByType(employeecontentData);
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
            setEmployeeByType(employeesearchData);
            setLoading(false);
            dispatch(clearEmpCompAction);
        }
    },[employeesearchsuccess])
    const searchEmployeeHandler = (search)=>{
        setLoading(true);
        dispatch(getEmployeeByTypeSearch ({
            search: search,
            type: 'veterinary'
        }))
    }
    const commissionEmployeeHandler = (selectedCommission)=>{
        if(selectedCommission == 'Booking Commission'){
             setLoading(true);
            dispatch(getEmployeeByTypeComm({
              commission: 'booking commission',
              type: 'veterinary'
            }))
        }
        else if(selectedCommission == 'Product Commission'){
        setLoading(true);
          dispatch(getEmployeeByTypeComm({
            commission: 'product commission',
            type: 'veterinary'
          }
        ))
         
    }
    else{
        dispatch(getEmployeeByType({
            type: "veterinary"
        }))
    }
    }
    return(
        <>
        <ToastContainer />
        <EmployeeFilter 
        selectedItems={selectedItems}
        searchHandler = {searchEmployeeHandler}
        commissionHandler = {commissionEmployeeHandler }
        type = "veterinary"
        title = "Veterinarian"
        />
        {!loading && 
         <EmployeeListTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {employeebytype} title="Veterinarian"/>
        }
       
        
        </>
    )
}