import { useEffect, useState } from "react";
import { getallShipzone, clearshipzAction, deleteShipzone } from "@/reducer/ShipzoneSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingTable from "@/components/shipzone/shipzonetable";
import NewShipZoneDrawer from "@/components/drawers/newshipzone";
import StatusFilter3 from "@/components/shared/StatusFilter3";
export default function LogisticZonesList(){
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [shipzone, setShipzone] = useState([]);
    const [taxopen, setTaxopen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const shipzonesuccessData = useSelector((state)=> state.shipzone.success);
    const shipzonestatussuccess =useSelector((state)=> state.shipzone.actsuccess);
    const shipzonestatusData = useSelector((state)=> state.shipzone.activeshipzones);
    const shipzonecreatesuccessData = useSelector((state)=> state.shipzone.createsuccess);
    const shipzonedelsuccessData = useSelector((state)=> state.shipzone.delsuccess);
    const shipzonecontentData = useSelector((state)=> state.shipzone.content);
    const errordata = useSelector((state)=> state.shipzone.error);
    const toggleDrawer = (openpar) => { 
        setTaxopen(openpar);
      };
      const addszoneHandler = () => {
        toggleDrawer(true);
      }
      
    useEffect(()=>{
        dispatch( getallShipzone())
    },[shipzonecreatesuccessData,shipzonedelsuccessData]);
    useEffect(()=>{
        if(shipzonecreatesuccessData){
            toast.success('Item added successfully');
            dispatch( clearshipzAction());
        }
        if(shipzonedelsuccessData){
            toast.success('Item deleted successfully');
            setSelectedItems([]);
            dispatch( clearshipzAction());
        }
        if(errordata){
          console.log(errordata , 'errr');
            toast.error(errordata.data);
            dispatch(clearshipzAction());
        }
    },[shipzonecreatesuccessData, shipzonedelsuccessData, errordata])
    useEffect(()=>{
        if(shipzonesuccessData && shipzonecontentData){
            setShipzone(shipzonecontentData);
            setLoading(false);
            dispatch( clearshipzAction()); 
        }
    },[shipzonesuccessData]);
 
    const handleApply = (selectedValue) => {
        if(selectedValue== 'Delete'){
          dispatch(deleteShipzone(selectedItems));
          setSelectedItems([]);
        }
      }
    return(
        <>
        {/* <BookingStatusFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> */}
        <StatusFilter3 selectedItems={selectedItems} newhandler= {addszoneHandler} handleApply={handleApply}/>
        <ToastContainer />
        {!loading && (
        <ShippingTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {shipzone} />
        )}
         <NewShipZoneDrawer
      open={taxopen}
      handleClose={() => toggleDrawer(false)}
    />
        </>
    )
}