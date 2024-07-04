'use client'
import { Grid, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import PageContainer from '@/components/container/PageContainer';
// components
import { useDispatch, useSelector } from 'react-redux';
import AppointmentCard from '@/components/appointment/appointmentcard';
import DashboardCard from '@/components/shared/DashboardCard';
import { getSingleBooking, clearsingbookAction } from '@/reducer/SingleBookingSlice'; 
import { useEffect, useState } from 'react';
export default function BookingShowPage({id}){
    const dispatch = useDispatch();
    const [singlebooking ,setSingleBooking] = useState({});
    const [loading, setLoading] = useState(true);
    const singlebookingcontent = useSelector((state)=> state.singlebooking.content);
    const singlebookingsuccess = useSelector((state)=> state.singlebooking.success);
    useEffect(()=>{
        setLoading(true);
        dispatch((getSingleBooking({id:id})));
    },[id]);
    useEffect(()=>{
        if(singlebookingcontent && singlebookingsuccess){
            console.log(singlebookingcontent[0] , 'cvdsvsd');
            setLoading(false);
            setSingleBooking(singlebookingcontent[0]);
        }
    },[singlebookingsuccess]);
    return(
        <>
         <PageContainer title="Dashboard" description="this is Dashboard">
       {!loading && singlebooking!== '' && (
        <>
          <Box>
        <Grid container>
          <Grid item xs={12}>
          <DashboardCard title= {`Booking #${singlebooking.bookingid}`}>
            </DashboardCard>
          <Grid container spacing={3}>
          <Grid item xs={12}>
          <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                {/* <img src={singlebooking.CustomerDetails.image} alt="avatar" className="avatar avatar-70 rounded-pill" /> */}
              </Grid>
              <Grid item>
                <div className="text-start">
                  <Typography variant="h5" component="h5">
                    {singlebooking.CustomerDetails?.firstName} {singlebooking.CustomerDetails?.lastName}
                  </Typography>
                  <Typography variant="body1">
                    {singlebooking.CustomerDetails?.email}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className="flex-column">
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Pet Name
                  </Typography>
                  <Typography variant="h6" component="h6" gutterBottom>
                    {/* <img src="https://apps.iqonic.design/pawlly/storage/190/wFZjpYBDdpzzPrDiluqM0xkjlTEH8dSwTKpgLO6V.png" alt="avatar" className="avatar avatar-30 rounded-pill" /> Beau */}
                    <img src={singlebooking.PetDetails?.image} width={50} height={50}/>
                    {singlebooking.PetDetails?.name}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className="flex-column">
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Pet Breed
                  </Typography>
                  <Typography variant="h6" component="h6" gutterBottom>
                    Labrador Retriever
                    {singlebooking.PetDetails?.type}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className="flex-column">
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Status
                  </Typography>
                  <Typography variant="h6" component="h6" gutterBottom>
                   {singlebooking.status}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </Grid>
    <Grid item xs={12}>
    <Card>
        <CardContent>
      <Grid container spacing={5} className="mb-5">
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body1" gutterBottom>Date</Typography>
          <Typography variant="h6" gutterBottom>23-05-2024</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body1" gutterBottom>Time</Typography>
          <Typography variant="h6" gutterBottom>At 10:00 AM</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body1" gutterBottom>Boarder Name</Typography>
          <Typography variant="h6" gutterBottom>
            {/* <img src="https://apps.iqonic.design/pawlly/storage/13/jJdeoqWOzcyhgtKjivL704wePhOtUsiKPII8zsQ1.png" alt="avatar" className="avatar avatar-50 rounded-pill" /> */}
            <img src={singlebooking.EmployeeDetails?.image} width={50} height={50}/>
            {singlebooking.EmployeeDetails?.firstName} {singlebooking.EmployeeDetails?.lastName}
          </Typography>
        </Grid>
      </Grid>
      <div className="border-top"></div>
      <Grid container spacing={5} className="pt-5">
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body1" gutterBottom>Payment Status</Typography>
          <Typography variant="body2" color="textSecondary"> {singlebooking.paymentStatus}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body1" gutterBottom>Contact Number</Typography>
          <Typography variant="h6" gutterBottom>{singlebooking.EmployeeDetails?.phonenumber}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body1" gutterBottom>Reason</Typography>
          <Typography variant="h6" gutterBottom>--</Typography>
        </Grid>
      </Grid>

        </CardContent>
    </Card>
    </Grid>
    </Grid>
        {/* </DashboardCard> */}
        <AppointmentCard/>
          </Grid>
        </Grid>
      </Box>
        </>
       )}     
    
    </PageContainer>
        </>
    )
}
export async function getServerSideProps(context) {
    const { query } = context;
    const id = query.id;
    
    return {
      props: {
        id: id,
      },
    };
  }