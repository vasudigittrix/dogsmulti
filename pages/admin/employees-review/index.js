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
import { getAllEmployeeReview, clearEReviewsAction, deleteEmployeeReview } from "@/reducer/EmployeeReviewSlice";
import EmployeeReviewTable from "@/components/reviews/ereviewtable";
import StatusFilter2 from "@/components/shared/StatusFilter2";
import { getEmployeeRequests, } from "@/reducer/EmployeeRequestSlice";
import { Pagination } from "@mui/material";
export default function EmployeeReviewsList() {
    const dispatch = useDispatch();
    const [employee, setEmployee] = useState("");
    const [empreview, setEmpReviews] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const emplreviewsuccessData = useSelector((state)=> state.employeereviews.success);
    const emplreviewupdatesuccessData = useSelector((state)=> state.employeereviews.updatesuccess);
    const emplreviewcreatesuccessData = useSelector((state)=> state.employeereviews.createsuccess);
    const emplreviewdelsuccessData = useSelector((state)=> state.employeereviews.delsuccess);
    const emplreviewcontentData = useSelector((state)=> state.employeereviews.content);
    const emplreviewresponseData = useSelector((state)=> state.employeereviews.respoData);
    const emplreviewerrordata = useSelector((state)=> state.employeereviews.error);

    const [totallength, setTotalLength] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 10;
    const handlePageChange = (event, newPage) => {
      setCurrentPage(newPage);
  };
    useEffect(()=>{
        dispatch(getAllEmployeeReview({page: currentPage}))
    },[emplreviewdelsuccessData, currentPage]);
    useEffect(()=>{
        if(emplreviewdelsuccessData){
            setSelectedItems([]);
            toast.success('Deleted successfully');
            dispatch(clearEReviewsAction()); 
        }
        if(emplreviewerrordata){
            toast.error(emplreviewerrordata.data.responseData.message);
            dispatch(clearEReviewsAction()); 
        }
    },[emplreviewdelsuccessData, emplreviewerrordata]);
    useEffect(()=>{
        if(emplreviewsuccessData && emplreviewcontentData){
            setEmpReviews(emplreviewcontentData.data);
            setTotalLength(emplreviewcontentData.length);
            setLoading(false);
            dispatch(clearEReviewsAction()); 
        }
    },[ emplreviewsuccessData ]);
    
    const handleApply = (selectedValue) => {
        if(selectedValue== 'Delete'){
          dispatch(deleteEmployeeReview(selectedItems));
          setSelectedItems([]);
        }
      }
    // useEffect(()=>{
    //     if(employeesearchData && employeesearchsuccess){
    //         setEmployee(employeesearchData);
    //         setLoading(false);
    //         dispatch(clearEmployeeAction());
    //     }
    // },[employeesearchsuccess])
    // const searchEmployeeHandler = (search)=>{
    //     setLoading(true);
    //     dispatch(getallEmployeeBySearch ({
    //         search: search
    //     }))
    // }
 
    return(
        <>
        <ToastContainer />
        <StatusFilter2 
        selectedItems={selectedItems}
        handleApply = {handleApply}
        />
        {!loading && 
         <EmployeeReviewTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {empreview}/>
        }
        <Pagination
                  count={Math.ceil(totallength/ PAGE_SIZE)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
        
        </>
    )
}