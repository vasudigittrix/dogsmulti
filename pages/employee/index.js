'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/components/container/PageContainer';
// components

import SalesOverview from '@/components/dashboard/SalesOverview';
import YearlyBreakup from '@/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import ProductPerformance from '@/components/dashboard/ProductPerformance';
import MonthlyEarnings from '@/components/dashboard/MonthlyEarnings';
// import DashboardLayout from '@/layouts/dashboard';
import RecentBookings from '@/components/dashboard/RecentBookings';
import DashboardLayout from '@/layouts/dashboard';
import AllBookings from "@/components/Employee/AllBookings";
import TotalBookings from '@/components/Employee/TotalBooking';
import PendingPayoutsCard from '@/components/Employee/PendingPayout';
import TotalRevenueCard from '@/components/Employee/TotalRevenue';
export default function EmployeeDashboard() {
  return (
    <PageContainer title="Employee Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TotalBookings />
              </Grid>
              <Grid item xs={6}>
                {/* <MonthlyEarnings /> */}
                {/* <AllBookings/> */}
                <PendingPayoutsCard/>
              </Grid>
              <Grid item xs={6}>
              <TotalRevenueCard/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <AllBookings/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}
