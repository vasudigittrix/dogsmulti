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
import { IconTrash, IconPencil } from '@tabler/icons-react';
import { updateStatusTrainingType, deleteTrainingType } from '@/reducer/TrainingTypeSlice';
import DeleteServiceModal from '../modals/deleteService';
import EditTrainingDrawer from '../drawers/edittrainingtype';
export default function TrainingTypeTable({data, selectedItems, setSelectedItems}){
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);
    const [idtoDel, setidToDel] = useState("");
    const [idtoEdit, setidToEdit] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const [edittrainingopen, setEditTrainingOpen] = useState(false);
     const handleOpenModal = (id) => {
       setModalOpen(true);
       setidToDel(id);
     };
     const toggleDrawer = (openpar) => { 
        setEditTrainingOpen(openpar);
      };
     const handleCloseModal = () => {
       setModalOpen(false);
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
  const handleChange = (status, id) => {
    dispatch(updateStatusTrainingType({
        status:status,
        ids: id
    }))
  };
  const delHandler = (id)=> {
    dispatch(deleteTrainingType([id]));
  }
  const handleCheckboxChange = (itemId)=>{
    if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter((id) => id !== itemId));
      } else {
        setSelectedItems([...selectedItems, itemId]);
      }
}
const editTrainingHandler = (id) => {
    setidToEdit(id);
    toggleDrawer(true);
};
    return(
        <>
            <DashboardCard title="Training type">
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
                                    Name
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
                            <TableRow key={ele.name} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} >
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
                                        {ele.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                <Switch
                                    checked = {ele.status}
                                    onChange={()=> handleChange(!ele.status, ele._id)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell>
                                <TableCell style={{ display: 'flex', justifyContent: 'space-between', width: 'fit-content' }}>
                                    <div style={{ marginRight: '10px', cursor: 'pointer' }} >
                                    <IconPencil onClick={() => editTrainingHandler(ele._id)}/>
                                <EditTrainingDrawer
                                    open={edittrainingopen}
                                    handleClose={() => toggleDrawer(false)}
                                    id = {idtoEdit}
                                    />
                                    </div>
                                    <div style={{ cursor: 'pointer' }}>
                                    <IconTrash onClick={() => handleOpenModal(ele._id)}/>
                                    <DeleteServiceModal
                                        isOpen={isModalOpen}
                                        onClose={handleCloseModal}
                                        deleteHandler = {delHandler}
                                        id = {idtoDel}
                                        />
                                        </div>
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