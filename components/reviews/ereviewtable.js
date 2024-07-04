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
import { updateStatusTags, deleteTags } from '@/reducer/TagsSlice';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import DeleteCommonModal from '../modals/deleteCommon';
import EdittagDrawer from '../drawers/edittag';
import { deleteEmployeeReview } from '@/reducer/EmployeeReviewSlice';
export default function EmployeeReviewTable({data, selectedItems, setSelectedItems}){
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [idtodel, setidToDel] = useState("");
    const [idtoedit, setidToEdit] = useState("");
    const [edittagopen, setedittagOpen] = useState("");
    const dispatch = useDispatch();
    const handleOpenModal = (id) => {
        setidToDel(id);
        setModalOpen(true);
      };
   
      const handleCloseModal = () => {
        setModalOpen(false);
      };
      const toggleDrawer = (openpar) => { 
        setedittagOpen(openpar);
      };
    
      const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            const allIds = data.map(item => item._id);
            setSelectedItems(allIds);
        }
        setSelectAll(!selectAll);
    };
  const handledeletetag =  (id) => {
  dispatch(deleteEmployeeReview([id]))
  }
  const handleCheckboxChange = (itemId)=>{
    if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter((id) => id !== itemId));
      } else {
        setSelectedItems([...selectedItems, itemId]);
      }
}
    return(
        <>
            <DashboardCard title="Reviews">
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
                                    Client Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                   Employee Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Message
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Rating
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Updated
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
                        {data.length> 0 ? (
                            data.map((ele) => (
                            <TableRow key={ele.name} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} > 
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
                                        {ele.ReviewerFirstName} {ele.ReviewerLastName}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {ele.EmployeerFirstName} {ele.EmployeerLastName}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {ele.message}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {ele.ratings}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {ele.updatedAt}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                <div  style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      
                                <IconTrash onClick={() => handleOpenModal(ele._id)}/>  
      
                                </div>
                                </TableCell>
                            
                            </TableRow>
                        ))
                    )
                    :
                    (
                        <>
                          <TableRow>
                        <TableCell colSpan={5} align="center">
                            <Typography variant="body1">No Reviews Yet</Typography>
                        </TableCell>
                    </TableRow>
                        </>
                    )
                    }
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
        <DeleteCommonModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            deleteHandler = {handledeletetag}
            id = {idtodel}
            />
         <EdittagDrawer 
         open={edittagopen}
          handleClose={() => toggleDrawer(false)}
          id =  {idtoedit}
          />
        </>
    )
}