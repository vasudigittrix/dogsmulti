import OwnerPetsTable from "@/components/ownerspets/OwnerTable"
import { useEffect, useState } from "react";
import { getCustomers, clearCustAction, deleteCustomer, updatestatusCustomer } from "@/reducer/CustomerSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearpetAction } from "@/reducer/PetSlice";
import StatusFilter1 from "@/components/shared/StatusFilter1";
import NewCustomerDrawer from "@/components/drawers/newcustomer";
export default function OwnersPets(){
    const dispatch = useDispatch();
    const [custopen, setCustOpen] = useState(false);
    const ownercontentData = useSelector((state)=> state.customer.content);
    const ownerupdatesuccess = useSelector((state)=> state.customer.updatesuccess);
    const ownerdelsuccess = useSelector((state)=> state.customer.delsuccess);
    const ownersuccessData = useSelector((state)=> state.customer.success);
    const petcreatesuccess = useSelector((state)=> state.pet.addsuccess);
    const petdeletesuccess = useSelector((state)=> state.pet.delsuccess);
    const peterrorData= useSelector((state)=> state.pet.error);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const toggleDrawer = (openpar) => { 
        setCustOpen(openpar);
      };
      const addCustomerHandler = () => {
        toggleDrawer(true);
      }
    useEffect(()=>{
        dispatch(getCustomers());
    },[ownerupdatesuccess, petcreatesuccess, petdeletesuccess, ownerdelsuccess ]);
  
    useEffect(()=>{
        if(ownercontentData && ownersuccessData){
            setOwners(ownercontentData.data);
            setLoading(false);
            dispatch(clearCustAction());
        }
    },[ownersuccessData, ownercontentData])
    useEffect(()=>{
        if(ownerupdatesuccess){
            toast.success('Status Updated successfully');
            dispatch(clearCustAction());

        }
        if(ownerdelsuccess){
            toast.success('Customer deleted successfully');
            dispatch(clearCustAction());
        }
        if(petcreatesuccess ){
            toast.success('Pet Created successfully');
            dispatch(clearpetAction());
        }
        if(peterrorData){
            toast.error(peterrorData.data.responseData.message);
            console.log(peterrorData);
            dispatch(clearpetAction());

        }
    },[ownerupdatesuccess, petcreatesuccess, peterrorData])

    const handleApply = (selectedValue, selectedstatValue) => {
        if(selectedValue == 'Delete'){
          dispatch(deleteCustomer(selectedItems));
          setSelectedItems([]);
        }
        else if(selectedValue == 'Status' && selectedstatValue != ''){
          dispatch(updatestatusCustomer({
            ids: selectedItems,
            status: selectedstatValue
          }))
          setSelectedItems([]);
        }
      }
    return(
        <>
        <ToastContainer/>
        <StatusFilter1
        selectedItems={selectedItems}
        handleApply={handleApply}
        newhandler = {addCustomerHandler}
        />
        {!loading && (
            <OwnerPetsTable data = {owners} selectedItems={selectedItems} setSelectedItems = {setSelectedItems}/>
        )}
        <NewCustomerDrawer 
        open={custopen}
        onCustClose = {() => toggleDrawer(false)}
        />
      
        </>
    )
}