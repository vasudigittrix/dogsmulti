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
import { Pagination } from "@mui/material";
export default function CaretakerList() {
    const dispatch = useDispatch();
    const [employeebytype, setEmployeeByType] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCommission, setSelectedCommission] = useState('All Commission');
    const [loading, setLoading] = useState(true);
    const [currentCommission, setCurrentCommission] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
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
    const employeesearchData = useSelector((state)=> state.employeebytypecomm.searchemployee);
    const [currentPage, setCurrentPage] = useState(1);
    const [totallength, setTotalLength] = useState(0);
    const PAGE_SIZE = 1;
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    useEffect(()=>{
        if (searchQuery) {
            setLoading(true);
            dispatch(getEmployeeByTypeSearch({
              search: searchQuery,
              type: 'daycaretaker',
              page: currentPage
            }));
          } else if (currentCommission && currentCommission !== 'All Commission') {
            setLoading(true);
            dispatch(getEmployeeByTypeComm({
              commission: currentCommission,
              type: 'daycaretaker',
              page: currentPage
            }));
          } else{
            setLoading(true);
        dispatch(getEmployeeByType({
            type: 'daycaretaker',
            page: currentPage
        }))
    }
    },[currentPage, currentCommission, searchQuery, employeecreatesuccessData, employeeupdatesuccessData, employeedelsuccessData, editemployeesuccess]);
    // useEffect(()=>{
    //     if(selectedCommission == 'Booking Commission'){
    //         dispatch(getEmployeeByTypeComm({
    //           commission: 'booking commission',
    //           type: 'daycaretaker'
    //         }))
    //     }
    //     else if(selectedCommission == 'Product Commission'){
    //       dispatch(getEmployeeByTypeComm({
    //         commission: 'product commission',
    //         type: 'daycaretaker'
    //       }
    //     ))
         
    // }
    // else{
    //     dispatch(getEmployeeByType({
    //         type: 'daycaretaker'
    //     }))
    // }
    // },[selectedCommission])
    // useEffect(()=>{
    //     dispatch(getEmployeeByType({
    //         type: 'daycaretaker'
    //     }))
    // },[employeecreatesuccessData, employeeupdatesuccessData, employeedelsuccessData, editemployeesuccess]);
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
    },[employeeupdatesuccessData, employeedelsuccessData, errordata]);
    useEffect(()=>{
        if(employeesuccessData && employeecontentData){
            setEmployeeByType(employeecontentData.data);
            setTotalLength(employeecontentData.length);
            setLoading(false);
            dispatch(clearAction()); 
        }
    },[ employeesuccessData ]);
    
    useEffect(()=>{
        if(employeecommfilsuccess && employeecommfilData){
            setEmployeeByType(employeecommfilData.data);
            setTotalLength(employeecommfilData.length);
            setLoading(false);
            dispatch(clearEmpCompAction());
        }
    },[employeecommfilsuccess]);
    useEffect(()=>{
        if(employeesearchData && employeesearchsuccess){
            setEmployeeByType(employeesearchData.data);
            setTotalLength(employeesearchData.length);
            setLoading(false);
            dispatch(clearEmpCompAction);
        }
    },[employeesearchsuccess])
    const searchEmployeeHandler = (search) => {
        setSearchQuery(search);
        setCurrentPage(1); 
      };
    const commissionEmployeeHandler = (selectedCommission) => {
        setCurrentCommission(selectedCommission);
        setCurrentPage(1); 
      };
    return(
        <>
        <ToastContainer />
        <EmployeeFilter 
        selectedItems={selectedItems}
        searchHandler = {searchEmployeeHandler}
        commissionHandler = {commissionEmployeeHandler }
        type = "daycaretaker"
        title = "Caretaker"
        />
        {!loading && 
         <EmployeeListTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {employeebytype} title="Caretaker"/>
        }
       <Pagination
                  count={Math.ceil(totallength/ PAGE_SIZE)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
        
        </>
    )
}