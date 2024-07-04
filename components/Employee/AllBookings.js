
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab, Box, Card, CardHeader, CardContent} from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from "../shared/DashboardCard";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getBookings, clearBookAction } from "@/reducer/BookingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getBookingByEmployee, clearbookempAction } from "@/reducer/Employees/BookingByEmployeeSlice";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
const AllBookings = () => {
  // chart color
  const { data: session } = useSession();
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState("");
  const boardingsuccessData = useSelector((state)=> state.bookingbyemployee.success);

  const boardingContent = useSelector((state)=> state.bookingbyemployee.content);
  const [loading , setLoading]= useState(true);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const day = date.getDate();
    
    const month = date.getMonth() + 1;
    
    const year = date.getFullYear();
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes; 

    const formattedDate = `${day}-${month < 10 ? '0' + month : month}-${year} | ${hours}:${minutes} ${ampm}`;
    
    return formattedDate;
  };
  useEffect(()=>{
    setLoading(true);
    dispatch(getBookingByEmployee({
        employeeid: session?.user.id,
    }))
},[]);
useEffect(()=>{
    if(boardingsuccessData && boardingContent){
        // console.log(boardingContent);
        setBookings(boardingContent.data);
        setLoading(false);
        dispatch(clearBookAction());
    }
},[boardingsuccessData])
  return (
    <Card>
    <CardHeader
        title="All Bookings"
      />
      {!loading && bookings.length> 0 ? bookings.map((ele)=>(
           <CardContent>       
           <li  style={{ display: 'flex', alignItems: 'center', padding: '3px', borderBottom: '1px solid #ccc'}}>
     <Avatar alt="01" src={ele.CustomerDetails?.image} />
     <div  style={{ marginLeft: '0.75rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
       <div>
         <Typography variant="h6" component="a" href="#">
           #{ele.bookingid}
         </Typography>
         <Typography variant="body2">
           {formatDate(ele.createdAt)}
         </Typography>
       </div>
       <div>
         <Typography variant="body2" color="primary">
         {ele.status}
         </Typography>
       </div>
     </div>
   </li>
           </CardContent>
      )) :(
        <>
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
         <Typography variant="body2">
           No Bookings Yet
         </Typography>
         </Box>
        </>
      )
    }
 
    </Card>
  );
};

export default AllBookings;
