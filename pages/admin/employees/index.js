import { useState, useEffect } from "react";
import { getEmployeeByType, clearAction } from "@/reducer/EmployeeByTypeSlice";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AllEmployeeFilter from "@/components/shared/AllEmployeeFilter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearEmplAction } from "@/reducer/SingleEmployeeSlice";
import AllEmployeeTable from "@/components/employees/allemployeetable";
import { getallEmployees, getallEmployeeByComm, clearEmployeeAction, getallEmployeeBySearch } from "@/reducer/EmployeeSlice";
export default function EmployeeList() {
    const dispatch = useDispatch();
    const [employee, setEmployee] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentCommission, setCurrentCommission] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totallength, setTotalLength] = useState(0);
    const [status, setStatus] = useState("");
    const PAGE_SIZE = 10;
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
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    useEffect(()=>{
        if (searchQuery) {
            dispatch(getallEmployeeBySearch({
              search: searchQuery,
              page: currentPage
            }));
          } else if (currentCommission && currentCommission !== 'All Commission') {
            dispatch(getallEmployeeByComm({
              commission: currentCommission,
              page: currentPage
            }));
          } else{
        dispatch(getallEmployees({
            page: currentPage
        }))
    }
    },[currentPage, currentCommission, searchQuery, employeecreatesuccessData, employeeupdatesuccessData, employeedelsuccessData, editemployeesuccess]);

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
            toast.error(errordata.data.responseData.message);
            dispatch(clearEmplAction());
        }
    },[employeeupdatesuccessData, employeedelsuccessData, errordata, editemployeesuccess]);
    useEffect(()=>{
        if(employeesuccessData && employeecontentData){
            setEmployee(employeecontentData.data);
            setTotalLength(employeecontentData.length);
            setLoading(false);
            dispatch(clearAction()); 
        }
    },[ employeesuccessData ]);
    
    useEffect(()=>{
        if(employeecommfilsuccess && employeecommfilData){
            console.log(employeecommfilData, 'filye');
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
    // const searchEmployeeHandler = (search)=>{
    //     setLoading(true);
    //     dispatch(getallEmployeeBySearch ({
    //         search: search
    //     }))
    // }
    // const commissionEmployeeHandler = (selectedCommission)=>{
    //     if(selectedCommission == 'Booking Commission'){
    //          setLoading(true);
    //         dispatch(getallEmployeeByComm({
    //           commission: 'booking commission',
    //         }))
    //     }
    //     else if(selectedCommission == 'Product Commission'){
    //     setLoading(true);
    //       dispatch(getallEmployeeByComm({
    //         commission: 'product commission',
    //       }
    //     ))
         
    // }
    // else{
    //     dispatch(getallEmployees())
    // }
    // }
    const commissionEmployeeHandler = (selectedCommission) => {
        setCurrentCommission(selectedCommission);
        setCurrentPage(1); 
      };
    
      const searchEmployeeHandler = (search) => {
        setSearchQuery(search);
        setCurrentPage(1); 
      };
    return(
        <>
        <ToastContainer />
        <AllEmployeeFilter 
        selectedItems={selectedItems}
        searchHandler = {searchEmployeeHandler}
        commissionHandler = {commissionEmployeeHandler }
        />
        {!loading && 
         <AllEmployeeTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {employee}/>
        }
       <Pagination
                  count={Math.ceil(totallength/ PAGE_SIZE)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
        
        </>
    )
}