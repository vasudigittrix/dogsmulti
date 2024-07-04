import BoardingFacultyTable from "@/components/bookings/facultytable"
import { useEffect, useState } from "react";
import BookingStatusFilter from "@/components/shared/BookingStatusFil";
import { getFacilities,clearAction} from "@/reducer/FacilitiesSlice";
import { getTags, cleartagAction, deleteTags, updateStatusTags } from "@/reducer/TagsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TagsTable from "@/components/products/Tagstable";
// import StatusFilter1 from "@/components/shared/StatusFilter1";
import StatusFilter from "@/components/shared/StatusFilter";
import NewTagDrawer from "@/components/drawers/newtag";
import { getTagsByStatus } from "@/reducer/TagsSlice";
import { clearsintagAction } from "@/reducer/SingleTagSlice";
export default function TagsList(){
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagopen, setTagopen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const tagssuccessData = useSelector((state)=> state.tags.success);
    const tagsstatussuccess =useSelector((state)=> state.tags.actsuccess);
    const tagsstatusData = useSelector((state)=> state.tags.activetagss);
    const tagsupdatesuccessData = useSelector((state)=> state.tags.updatesuccess);
    const tagscreatesuccessData = useSelector((state)=> state.tags.createsuccess);
    const tagsdelsuccessData = useSelector((state)=> state.tags.delsuccess);
    const tagscontentData = useSelector((state)=> state.tags.content);
    const tageditsuccessData = useSelector((state)=> state.singletag.editsuccess);
    const errordata = useSelector((state)=> state.tags.error);
    const toggleDrawer = (openpar) => { 
        setTagopen(openpar);
      };
      const addtagHandler = () => {
        toggleDrawer(true);
      }
      
    useEffect(()=>{
        dispatch(getTags())
    },[tagsupdatesuccessData, tagscreatesuccessData,tagsdelsuccessData, tageditsuccessData]);
    useEffect(()=>{
        if(tagsupdatesuccessData){
            toast.success('status updated successfully');
            // alert('Updated');
            setSelectedItems([]);
            dispatch(cleartagAction());
        }
        if(tagscreatesuccessData){
            toast.success('Item added successfully');
            dispatch(cleartagAction());
        }
        if(tagsdelsuccessData){
            toast.success('Item deleted successfully');
            setSelectedItems([]);
            dispatch(cleartagAction());
        }
        if(errordata){
            toast.error(errordata.data.responseData.message);
            dispatch(cleartagAction());
        }
        if(tageditsuccessData){
            toast.success('Item updated successfully');
            dispatch(clearsintagAction());
        }
    },[tagsupdatesuccessData, tagscreatesuccessData, tagsdelsuccessData, errordata, tageditsuccessData])
    useEffect(()=>{
        if(tagssuccessData && tagscontentData){
            setTags(tagscontentData);
            setLoading(false);
            dispatch(cleartagAction()); 
        }
    },[tagssuccessData]);
    useEffect(()=>{
        if(tagsstatussuccess && tagsstatusData){
            console.log(tagsstatusData);
            setTags(tagsstatusData);
            setLoading(false);
            dispatch(cleartagAction()); 
        }
    },[tagsstatussuccess]);
    const handleApply = (selectedValue, selectedstatValue) => {
        if(selectedValue== 'Delete'){
          dispatch(deleteTags(selectedItems));
          setSelectedItems([]);
        }
        else if(selectedValue == 'Status' && selectedstatValue != ''){
          dispatch(updateStatusTags({
            ids: selectedItems,
            status: selectedstatValue
          }))
          setSelectedItems([]);
        }
      }
    const tagstatusHandler = (status)=>{
        alert(status);

        if(status == 'active'){
             setLoading(true);
            dispatch(getTagsByStatus({
              status: 'true',
            }))
        }
        else if(status == 'inactive'){
        setLoading(true);
        dispatch(getTagsByStatus({
            status: 'false'
          }))
         
    }
    else{
        setLoading(true);
        dispatch(getTags())
    }
    }
    return(
        <>
        {/* <BookingStatusFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> */}
        <StatusFilter selectedItems={selectedItems} addcategoryHandler= {addtagHandler} handleApply={handleApply} filterhandler = {tagstatusHandler}/>
        <ToastContainer />
        {!loading && (
        <TagsTable selectedItems={selectedItems} setSelectedItems = {setSelectedItems} data = {tags} />
        )}
         <NewTagDrawer
      open={tagopen}
      handleClose={() => toggleDrawer(false)}
    />
        </>
    )
}