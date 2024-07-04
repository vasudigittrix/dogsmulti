
import dynamic from "next/dynamic";
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';

import DashboardCard from "../shared/DashboardCard";
const TotalRevenueCard = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;


  return (
    <DashboardCard title="Total Revenue">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
          $0.00
          </Typography>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default TotalRevenueCard;
