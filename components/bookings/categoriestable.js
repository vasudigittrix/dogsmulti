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
import { IconPencil, IconTrash } from '@tabler/icons-react';
import EditCategoryDrawer from '../drawers/editcategory';
import DeleteModal from '../modals/deleteCategory';
import { updateCategoryByType, deleteCategoryByType } from '@/reducer/CategoriesSlice';
export default function CategoriesTable({data, selectedItems, setSelectedItems, type}){
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
    
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    
        return formattedDate;
    }
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [idtoDel, setidToDel] = useState("");
    const [editcategoryopen, setEditCategoryOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
     const handleOpenModal = (id) => {
        setidToDel(id);
       setModalOpen(true);
     };
  
     const handleCloseModal = () => {
       setModalOpen(false);
     };
     const toggleDrawer = (openpar) => { 
        setEditCategoryOpen(openpar);
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
    const handleChange = (status, id) => {
        dispatch(updateCategoryByType({
            status: status,
            ids: id
        }))
    }
    const editCategoryHandler = (id) => {
        setSelectedCategoryId(id);
        toggleDrawer(true);
    };
    const handleDeleteCategory = (id)=>{
        console.log(id);
        dispatch(deleteCategoryByType([id]))
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
            <DashboardCard title="Categories">
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
                                />
                                
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                   Updated At
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Created At
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
                        {data.length>0 ? (
                            data.map((ele) => (
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
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                       {formatTimestamp(ele.updatedAt)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        
                                        {formatTimestamp(ele.createdAt)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                <Switch
                                    checked = {ele.status}
                                    onChange={()=> handleChange(!ele.status, ele._id)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell>
                                <TableCell style={{ display: 'flex'}}>
                                <div>
                                    <IconPencil  onClick={() => editCategoryHandler(ele._id)}/>
                                {/* <EditEmployeeDrawer
                                    fopen={editemployeeopen}
                                    handleClose={() => toggleDrawer(false)}
                                    id = {selectedEmployeeId}
                                    /> */}
                                    <EditCategoryDrawer 
                                    open={editcategoryopen}
                                    handleClose={() => toggleDrawer(false)}
                                    id =  {selectedCategoryId}
                                    />
                                    </div>
                                    <div>
                                    <IconTrash  onClick={() => handleOpenModal(ele._id)}/>
                                    {/* <DeleteEmployeeModal
                                        isOpen={isModalOpen}
                                        onClose={handleCloseModal}
                                        deleteEmployee = {delEmployeeHandler}
                                        id = {ele._id}
                                        /> */}
                                        <DeleteModal 
                                        isOpen={isModalOpen}
                                        onClose={handleCloseModal}
                                        handleDelete = {handleDeleteCategory}
                                        id = {idtoDel}
                                        />
                                        </div>
                                </TableCell>
                                {/* <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {ele.pname}
                                    </Typography>
                                </TableCell> */}
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
                                </TableCell> */}
                            </TableRow>
                            )   )) :
                                (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <Typography variant="body1">No Category Found</Typography>
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