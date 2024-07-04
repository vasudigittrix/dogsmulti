import BoarderListTable from "@/components/bookings/boardertable"
import ServicesTable from "@/components/bookings/servicestable";
import BookingStatusFilter from "@/components/shared/BookingStatusFil";
import { useState, useEffect } from "react";
import { getEmployeeByType, clearAction } from "@/reducer/EmployeeByTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import EmployeeFilter from "@/components/shared/EmployeeStatusFil";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewServiceDrawer from "@/components/drawers/newservice";
import StatusFilter from "@/components/shared/StatusFilter";
import { getServicesByType, clearSerAction, deleteServiceByType, updateServiceByType } from "@/reducer/ServicesSlice";
import { clearserviceAction } from "@/reducer/SingleServiceSlice";
// import { getServiceByTypeStatus, clearSerfilAction } from "@/reducer/ServicesSlice";
import { getServiceByTypeStatus, clearSerfilAction } from "@/reducer/ServicesFilterSlice";

export default function VetServicesList() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceopen, setServiceOpen] = useState(false);
  const [services, setServices] = useState([]);
  const dispatch = useDispatch();
  const servicesupdatesuccessData = useSelector((state)=> state.services.updatesuccess);
  const servicescreatesuccessData = useSelector((state)=> state.services.addsuccess);
  const servicesdelsuccessData = useSelector((state)=> state.services.delsuccess);
  const errordata = useSelector((state)=> state.services.error);
  const servicessuccessData = useSelector((state)=> state.services.success);
  const servicescontentData = useSelector((state)=> state.services.content);
  const singlserviceeditsuccess = useSelector((state)=> state.singleservice.editsuccess);
  const servicestatussuccess = useSelector((state)=> state.servicesfilter.statussuccess) ;
  const servicestatusData = useSelector((state)=> state.servicesfilter.statuscontent);
  // const singlecatsuccessData = useSelector((state)=> state.singlecategory.editsuccess);
  useEffect(()=>{
      dispatch( getServicesByType({
          type: 'veterinary'
      }))
  },[servicesupdatesuccessData, servicescreatesuccessData, servicesdelsuccessData, singlserviceeditsuccess]);
  useEffect(()=>{
      if(servicesupdatesuccessData){
          toast.success('status updated successfully');
          setSelectedItems([]);
          dispatch(clearSerAction());
      }
      if(servicescreatesuccessData){
          toast.success('Item added successfully');
          dispatch(clearSerAction());
      }
      if(servicesdelsuccessData){
          toast.success('Item deleted successfully');
          setSelectedItems([]);
          dispatch(clearSerAction());
      }
      // if( singlecatsuccessData){
      //     toast.success('Category updated successfully');
      //     setSelectedItems([]);
      //     dispatch(clearscatAction());
      // }
      if(singlserviceeditsuccess){
        toast.success('Service updated successfully');
        dispatch(clearserviceAction());
    }
      if(errordata){
          toast.error(errordata.data.responseData.message);
          dispatch(clearSerAction());
      }
  },[servicesupdatesuccessData,servicescreatesuccessData,servicesdelsuccessData,errordata, singlserviceeditsuccess])
  useEffect(()=>{
      if(servicessuccessData && servicescontentData){
          setServices(servicescontentData);
          setLoading(false);
          dispatch(clearSerAction()); 
      }
  },[servicessuccessData]);
 useEffect(()=>{
    if( servicestatussuccess && servicestatusData){
      console.log(servicestatusData);
      setServices(servicestatusData);
        setLoading(false);
        dispatch(clearSerfilAction()); 
    }
},[ servicestatussuccess]); 
  const handleApply = (selectedValue, selectedstatValue) => {
    if(selectedValue== 'Delete'){
      dispatch(deleteServiceByType(selectedItems));
      setSelectedItems([]);
    }
    else if(selectedValue == 'Status' && selectedstatValue != ''){
      dispatch(updateServiceByType({
        ids: selectedItems,
        status: selectedstatValue
      }))
      setSelectedItems([]);
    }
  }
    const toggleDrawer = (openpar) => { 
        setServiceOpen(openpar);
      };
      const addcategoryHandler = () => {
        toggleDrawer(true);
      }
      const servicestatusHandler = (status)=>{
        if(status == 'active'){
             setLoading(true);
            dispatch(getServiceByTypeStatus({
              status: 'true',
              type: 'veterinary'
            }))
        }
        else if(status == 'inactive'){
        setLoading(true);
        dispatch(getServiceByTypeStatus({
            status: 'false',
            type: 'veterinary'
          }))
         
    }
    else{
        setLoading(true);
        dispatch( getServicesByType({
          type: 'veterinary'
      }))
    }
    }
    return(
        <>
        <ToastContainer />
        <StatusFilter addcategoryHandler = {addcategoryHandler} selectedItems={selectedItems} handleApply = {handleApply} filterhandler = {servicestatusHandler}/>
        {!loading && 
         <ServicesTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {services} type="veterinary" etype="veterinarian"/>
        }
        <NewServiceDrawer 
        open={serviceopen}
        type = "veterinary"
        handleClose={() => toggleDrawer(false)}/>
        
        </>
    )
}