import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Switch,
    Button
} from '@mui/material';
import { useState, useEffect } from 'react';
import DashboardCard from '../shared/DashboardCard';
import { updatestatEmployeeByType,updateblockEmployeeByType } from '@/reducer/EmployeeByTypeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IconTrash, IconPencil } from '@tabler/icons-react';
import DeleteEmployeeModal from '../modals/deleteEmployee';
import { deleteEmployeeByType } from "@/reducer/EmployeeByTypeSlice";
// import EditEmployeeDrawer from '../drawers/editemployee';
import { IconEye, IconCash } from '@tabler/icons-react';
import EmployeeComissionDrawer from '../drawers/employee/comission';
import EmployeePayoutDrawer from '../drawers/employee/payout';
export default function OrderEarningTable({data, selectedItems, setSelectedItems}){
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [idtodel, setIdtodel] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [editemployeeopen, setEditEmployeeOpen] = useState(false);
    const [payout, setPayout] = useState('');
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
   
     const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            const allIds = data.map(item => item._id);
            setSelectedItems(allIds);
        }
        setSelectAll(!selectAll);
    };
     const toggleDrawer = (openpar) => { 
        setEditEmployeeOpen(openpar);
      };
      const togglePayDrawer = (openpay)=>{
        setPayout(openpay);
      }

    const handleCheckboxChange = (itemId)=>{
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
          } else {
            setSelectedItems([...selectedItems, itemId]);
          }
    }
    const handleVerifyChange = (id) => {
        dispatch(updateverifyEmployeeRequest({
            id
        }))
    }
    const handleBlockChange = (blocked, id) => {
        dispatch(updateblockEmployeeByType({
            blocked: blocked,
            id: id
        }))
    }
    
    const editEmployeeHandler = (id) => {
        setSelectedEmployeeId(id);
        toggleDrawer(true);
    };
    return(
        <>
          <DashboardCard title="Employee Order Earnings" >
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
                                    disabled = {data.length == 0}
                                />
                        </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Total Orders
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Total Earnings
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Commission
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Admin Earnings
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Employee Earnings
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Action
                                </Typography>
                            </TableCell>
                            {/* <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Blocked
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell> */}
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length> 0 ? data.map((ele) => (
                            <TableRow key={ele._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} >
                                <TableCell>
                                <input
                                type="checkbox"
                                checked={selectedItems.includes(ele._id)}
                                onChange={() => handleCheckboxChange(ele._id)}
                                />
                                </TableCell>
                                <TableCell>
                                         <Box
                                        sx={{ display: "flex", alignItems: "center" }}>
                                           
                                           {ele.image !== ''  ?(
                                            <img src={ele.image} alt="User" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                           )
                                            :
                                            (
                                                <img src="/images/profile/avatar.png" alt="User" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                            )
                                           }

                                        <Box sx={{ marginLeft: "10px" }}>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {ele.firstName} {ele.lastName}
                                            </Typography>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {ele.email}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {/* {product.post} */}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                   {ele.phonenumber}
                                </TableCell>
                                <TableCell>
                                   {ele.type}
                                </TableCell>
                                <TableCell>
                                    <IconEye onClick={() => toggleDrawer(true)}/>
                                    <EmployeeComissionDrawer
                                    open={editemployeeopen}
                                    handleClose={() => toggleDrawer(false)}
                                    // title = {title}
                                    />
                                </TableCell>
                                <TableCell>
                                    $60.96
                                </TableCell>
                                <TableCell>
                                    $60.96
                                </TableCell>
                                <TableCell>
                                    <IconCash onClick={() => togglePayDrawer(true)}/>
                                        <EmployeePayoutDrawer
                                        open={payout}
                                        handleClose={() => togglePayDrawer(false)} />
                                </TableCell>
                                
                            </TableRow>
                        ))
                    : (
                        <TableRow>
                    <TableCell colSpan={5} align="center">
                        <Typography variant="body1">No Data Found</Typography>
                    </TableCell>
                </TableRow>
                    )
                    }
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
        
        </>
    )
}