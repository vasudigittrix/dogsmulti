import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Select,
    MenuItem
} from '@mui/material';
import { useState } from 'react';
import { deleteBooking } from '@/reducer/BookingByTypeSlice';
import DashboardCard from '../shared/DashboardCard';
import { IconTrash } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { updatestatusBooking, updatepaystatusBooking } from '@/reducer/BookingByTypeSlice';
import DeleteBookingModal from '../modals/deleteBooking';
export default function VetBookingTable({data , selectedItems, setSelectedItems}){
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        return formattedDate;
    }
    const dispatch = useDispatch();
     const handleOpenModal = (id) => {
        setSelectedId(id);
       setModalOpen(true);
     };
  
     const handleCloseModal = () => {
       setModalOpen(false);
     };
    const delBookingHandler = (id) => {
        dispatch(deleteBooking([id]))
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
    const handleCheckboxChange = (itemId)=>{
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
          } else {
            setSelectedItems([...selectedItems, itemId]);
          }
    }
    const handlepaymentstChange = (event, id)=>{
        const selectedpayStatus = event.target.value;
        dispatch(updatepaystatusBooking({
            paymentStatus: selectedpayStatus,
            id: id
        }))
    }
    const handleStatusChange = (event, id) => {
        const selectedStatus = event.target.value;
        dispatch(updatestatusBooking({
            status: selectedStatus,
            ids: id
        }))
    };
    return(
        <>
        <DashboardCard title="Veterinary Bookings">
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
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Customer Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Date & Time
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Veterinary Type
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Price
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Pet Name
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Pet Details
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Vet Name
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Updated At
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                   Payment Status
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                   Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.length > 0 ? (
    data.map((ele) => (
        <TableRow key={ele.name} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
            <TableCell>
            <input
                  type="checkbox"
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
                    {ele.bookingid}
                </Typography>
            </TableCell>
            <TableCell>
            <Box
                                        sx={{ display: "flex", alignItems: "center" }}>
                                           
                                           {ele.CustomerDetails?.image !== ''  ?(
                                            <img src={ele.CustomerDetails?.image} alt="User" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                           )
                                            :
                                            (
                                                <img src="/images/profile/avatar.png" alt="User" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                            )
                                           }


                                        <Box sx={{ marginLeft: "10px" }}>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                            {ele.CustomerDetails?.firstName} {ele.CustomerDetails?.lastName}
                                            </Typography>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                            {ele.CustomerDetails?.email}
                                            </Typography>
                                        </Box>
                                    </Box>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                {ele.date}{ele.time}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                  {ele.CategoryDetails?.name}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                {ele.petid?.name}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                {ele.PetDetails?.name}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                {ele.PetDetails?.type}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>             
               Dr.{ele.EmployeeDetails?.firstName} {ele.EmployeeDetails?.lastName}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                {formatTimestamp(ele.updatedAt)}
                </Typography>
            </TableCell>
            <TableCell>
                {ele.status == 'completed'? 
            (
                <Chip label="Completed" color="success" />
            )    :
            (
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ele.status}
                    onChange={(event) => handleStatusChange(event, ele._id)}
                >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
            )
            }
                    
            </TableCell>
            <TableCell>
                         {ele.paymentStatus == 'paid'? 
            (
                <Chip label="paid" color="success" />
            )    :
            (
                <Select
                labelId="demo-simple-select-label-2"
                id="demo-simple-select-2"
                value={ele.paymentStatus}
                onChange={(event) => handlepaymentstChange(event, ele._id)}
            >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
            </Select>
            )
            }
            </TableCell>
            <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                <IconTrash  onClick={() => handleOpenModal(ele._id)}/>
                <DeleteBookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        deleteBooking = {delBookingHandler}
        id = {selectedId}
        />
                </Typography>
            </TableCell>
            <TableCell>
                {/* <IconTrash  onClick={() => handleOpenModal()}/>
                <DeleteBookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        deleteBooking = {delBookingHandler}
        id = {ele._id}
        /> */}
            </TableCell>
            {/* <TableCell>
                <Chip
                    sx={{
                        px: "4px",
                        backgroundColor: ele.pbg,
                        color: "#fff",
                    }}
                    size="small"
                    label={ele.priority}
                ></Chip>
            </TableCell>
            <TableCell align="right">
                <Typography variant="h6">${ele.budget}k</Typography>
            </TableCell> */}
        </TableRow>
    ))
) : (
    <TableRow>
        <TableCell colSpan={5} align="center">
            <Typography variant="body1">No Data Found</Typography>
        </TableCell>
    </TableRow>
)}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
        
        </>
    )
}