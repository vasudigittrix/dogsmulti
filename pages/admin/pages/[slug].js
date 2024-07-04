import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardCard from "@/components/shared/DashboardCard";
import { useParams } from 'next/navigation'
import { getStaticContentByType, clearsingstatconStatus, editStaticContent } from '@/reducer/SingleStaticContentSlice';
export default function StaticPagesList(){
    const params = useParams();
    const {slug}= params;
    const [searchQuery, setSearchQuery] = useState("");
    const [staticcontent, setStaticContent] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [taxopen, setTaxopen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const singlestconsuccessData = useSelector((state)=> state.singlestaticcontent.success);
    const singlestconcontentData = useSelector((state)=> state.singlestaticcontent.content);
    const errordata = useSelector((state)=> state.taxes.error);
    const toggleDrawer = (openpar) => { 
        setTaxopen(openpar);
      };
      const addtagHandler = () => {
        toggleDrawer(true);
      }
      
    useEffect(()=>{
        dispatch(getStaticContentByType({type: slug}))
    },[slug]);
 
    useEffect(()=>{
        if(singlestconsuccessData && singlestconcontentData){
            console.log(singlestconcontentData , 'sinsinglestconcontentData')
            setStaticContent(singlestconcontentData.content);
            dispatch(clearsingstatconStatus());
        }
    },[singlestconsuccessData]);
    // useEffect(()=>{
    //     if(taxesstatussuccess && taxesstatusData){
    //         setTaxes(taxesstatusData);
    //         setLoading(false);
    //         dispatch(cleartaxAction()); 
    //     }
    // },[taxesstatussuccess]);

    return(
        <>
            <DashboardCard title="Pages">
            <p dangerouslySetInnerHTML={{ __html: staticcontent }}></p>

     </DashboardCard>
        </>
    )
}