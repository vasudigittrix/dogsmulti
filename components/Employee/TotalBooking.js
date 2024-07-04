
import dynamic from "next/dynamic";
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';

import DashboardCard from "../shared/DashboardCard";
const TotalBookings = () => {

  return (
    <DashboardCard title="Total Bookings">
      <Grid container spacing={3}>
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            8
          </Typography>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default TotalBookings;
