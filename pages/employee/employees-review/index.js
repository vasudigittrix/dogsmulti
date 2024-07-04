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
import { getReviewByEmployee } from "@/reducer/Employees/ReviewByEmployee";
import { getEmployeeRequests, } from "@/reducer/EmployeeRequestSlice";
import { useSession, signIn, signOut } from "next-auth/react";

export default function EmployeeReviewsList() {
    const { data: session } = useSession();

    const dispatch = useDispatch();
    const [employee, setEmployee] = useState("");
    const [empreview, setEmpReviews] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const emplreviewsuccessData = useSelector((state)=> state.reviewbyemployee.success);
    const emplreviewupdatesuccessData = useSelector((state)=> state.employeereviews.updatesuccess);
    const emplreviewcreatesuccessData = useSelector((state)=> state.employeereviews.createsuccess);
    const emplreviewdelsuccessData = useSelector((state)=> state.employeereviews.delsuccess);
    const emplreviewcontentData = useSelector((state)=> state.reviewbyemployee.content);
    const emplreviewresponseData = useSelector((state)=> state.employeereviews.respoData);
    const emplreviewerrordata = useSelector((state)=> state.employeereviews.error);
    // const editemployeesuccess = useSelector((state)=> state.singleemployee.editsuccess);
    // const employeecommfilData = useSelector((state) => state.employees.statuscontent);
    // const employeecommfilsuccess = useSelector((state)=> state.employees.statussuccess);
    // const employeesearchsuccess = useSelector((state)=> state.employees.searchsuccess);
    // const employeesearchData = useSelector((state)=> state.employees.searchcontent);

    useEffect(()=>{
        dispatch(getReviewByEmployee({employeeid: session?.user.id}))
    },[emplreviewdelsuccessData]);
    useEffect(()=>{
        // if(employeeupdatesuccessData){
        //     setSelectedItems([]);
        //     toast.success(employeeresponseData.message);
        //     dispatch(clearAction()); 
        // }
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
       
        
        </>
    )
}