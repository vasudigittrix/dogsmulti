import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Switch
} from '@mui/material';
import { useState } from 'react';
import DashboardCard from '../shared/DashboardCard';
import { useDispatch } from 'react-redux';
// import { updateStatusFacilities } from '@/reducer/FacilitiesSlice';
import { updateStatusDurations } from '@/reducer/DurationSlice';
export default function DurationTable({data, selectedItems, setSelectedItems}){
    const [selectAll, setSelectAll] = useState(false);

    const [checked, setChecked] = useState(true);
    const dispatch = useDispatch();
  const handleChange = (status, id) => {
    dispatch(updateStatusDurations({
        status:status,
        ids: id
    }))
  };
  const handleCheckboxChange = (itemId)=>{
    if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter((id) => id !== itemId));
      } else {
        setSelectedItems([...selectedItems, itemId]);
      }
}
        const handleSelectAllChange = () => {
            if (selectAll) {
                setSelectedItems([]);
            } else {
                const allIds = data.map(item => item._id);
                setSelectedItems(allIds);
            }
            setSelectAll(!selectAll);
        };
    return(
        <>
            <DashboardCard title="Duration">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                        <TableCell>
                        <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAllChange}
                                    disabled={data.length == 0}
                                />
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Duration
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                   Price
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                   Status
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { data.length> 0 ? data.map((ele) => (
                            <TableRow key={ele.name} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
                                <TableCell>
                                <input
                                type="checkbox"
                                // checked = {ele.status}
                                checked={selectedItems.includes(ele._id)}
                                onChange={() => handleCheckboxChange(ele._id)}
                                />
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {ele.duration}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        ${ele.price}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                <Switch
                                    checked = {ele.status}
                                    onChange={()=> handleChange(!ele.status, ele._id)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    
                                </TableCell>
                            </TableRow>
                        )) : (
                            <>
                            <TableRow>
                    <TableCell colSpan={5} align="center">
                        <Typography variant="body1">No Data Found</Typography>
                    </TableCell>
                </TableRow>
                            </>
                        )}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
        
        </>
    )
}