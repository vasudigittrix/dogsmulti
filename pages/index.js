'use client'
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from '@/components/container/PageContainer';
// components
import { useSession } from 'next-auth/react';
import SalesOverview from '@/components/dashboard/SalesOverview';
import YearlyBreakup from '@/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import ProductPerformance from '@/components/dashboard/ProductPerformance';
import MonthlyEarnings from '@/components/dashboard/MonthlyEarnings';
import RecentBookings from '@/components/dashboard/RecentBookings';
import { getSession } from 'next-auth/react';
import { getProviders } from 'next-auth/react';
import DashboardCard from '@/components/shared/DashboardCard';
const Dashboard = () => {
  const { data: session, status } = useSession();
 
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <DashboardCard title="Completed Services">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h3" fontWeight="700">
                      8
                    </Typography>
                  </Grid>
                </Grid>
              </DashboardCard>
            </Grid>
            <Grid item xs={6}>
              <DashboardCard title="Incomplete Services">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h3" fontWeight="700">
                      8
                    </Typography>
                  </Grid>
                </Grid>
              </DashboardCard>
            </Grid>
            <Grid item xs={6}>
              <DashboardCard title="Revenue Of Services">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h3" fontWeight="700">
                      8
                    </Typography>
                  </Grid>
                </Grid>
              </DashboardCard>
            </Grid>
            <Grid item xs={6}>
              <DashboardCard title="Profit of Services">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h3" fontWeight="700">
                      8
                    </Typography>
                  </Grid>
                </Grid>
              </DashboardCard>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <YearlyBreakup />
            </Grid>
            <Grid item xs={12}>
              <RecentBookings />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SalesOverview/>
        </Grid>
        <Grid item xs={12} lg={4}>
          <RecentTransactions />
        </Grid>
        
        <Grid item xs={12} lg={8}>
          <ProductPerformance />
        </Grid>
      </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
// export async function getServerSideProps(context) {
//   const { req, query } = context;
//   const session = await getSession({ req });
//   if (!session) {
//     return { redirect: { destination: "/login" } };
//   }
//   const providers = await getProviders();

//   return {
//     props: { providers: providers ?? [] },
//   };
// }