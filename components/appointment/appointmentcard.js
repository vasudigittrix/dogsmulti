import React from "react";
import { CardHeader } from "react-bootstrap";
import { Grid, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
// type Props = {
//   title?: string;
//   subtitle?: string;
//   action?: JSX.Element | any;
//   footer?: JSX.Element;
//   cardheading?: string | JSX.Element;
//   headtitle?: string | JSX.Element;
//   headsubtitle?: string | JSX.Element;
//   children?: JSX.Element;
//   middlecontent?: string | JSX.Element;
// };

const AppointmentCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
}) => {
  return (
    <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
        <CardHeader>Your Appointment </CardHeader>
    <CardContent>
<Grid container spacing={2}>
  <Grid item xs={12} md={4}>
    <div className="detail-box bg-white rounded">
      <img src="https://apps.iqonic.design/pawlly/storage/85/mjvzGd8qHo1RrDi12vdrQViAibLuniFUHwa4psFK.png" alt="avatar"  height={80} width={80}/>
    </div>
  </Grid>
  <Grid item xs={12} md={8}>
    <div className="flex-wrap"   style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="d-flex align-items-center">
        <Typography variant="body1"><b>Walking</b> (Enriching walks for happy paws, love, and exercise)</Typography>
      </div>
      <Typography variant="h5">$10.00</Typography>
    </div>
    <ul className="list-unstyled pt-4 mb-0">
      <li  style={{ 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'space-between', 
  paddingBottom: '2px', 
  borderBottom: '1px solid #f0f0f0' 
}}>
        <Typography variant="body1">Sales Tax (1%)</Typography>
        <Typography variant="body1" className="text-primary">$0.10</Typography>
      </li>
      <li  style={{ 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'space-between', 
  paddingBottom: '2px', 
  borderBottom: '1px solid #f0f0f0' 
}}>
        <Typography variant="body1">Other Taxes (2%)</Typography>
        <Typography variant="body1" className="text-primary">$0.20</Typography>
      </li>
      <li style={{ 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'space-between', 
  paddingTop: '5px' 
}}>
        <Typography variant="h5">Total</Typography>
        <Typography variant="h5">$10.30</Typography>
      </li>
    </ul>
  </Grid>
</Grid>

        </CardContent>
    </Card>
  );
};

export default AppointmentCard;
