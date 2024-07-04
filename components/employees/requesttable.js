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
import EditEmployeeDrawer2 from '../drawers/editallemployee';
import { VerificationChip } from '../VerificationChip';
import { updateverifyEmployeeRequest } from '@/reducer/EmployeeRequestSlice';
export default function EmployeeRequestTable({data, selectedItems, setSelectedItems}){
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [idtodel, setIdtodel] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [editemployeeopen, setEditEmployeeOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
     const handleOpenModal = (id) => {
        setIdtodel(id)
       setModalOpen(true);
     };
  
     const handleCloseModal = () => {
       setModalOpen(false);
     };
     const toggleDrawer = (openpar) => { 
        setEditEmployeeOpen(openpar);
      };
    const delEmployeeHandler = (id) => {
        dispatch(deleteEmployeeByType([id]))
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
    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            const allIds = data.map(item => item._id);
            setSelectedItems(allIds);
        }
        setSelectAll(!selectAll);
    };
    const editEmployeeHandler = (id) => {
        setSelectedEmployeeId(id);
        toggleDrawer(true);
    };
    return(
        <>
          <DashboardCard title="Employee Request List" >
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
                                    Contact Number
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Role
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Verification Status
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
                              
                                    <VerificationChip verificationStatus={ele.verificationStatus}/>
                                </TableCell>
                                <TableCell>
                                <Button variant="contained" onClick={()=> handleVerifyChange(ele._id)}>Verify</Button>
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