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
import { updateStatusFacilities } from '@/reducer/FacilitiesSlice';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import EditCategoryDrawer from '../drawers/editcategory';
import DeleteModal from '../modals/deleteCategory';
import { updateServiceByType, deleteServiceByType } from '@/reducer/ServicesSlice';
import { IconPlus } from "@tabler/icons-react";
import ServiceEmployeeDrawer from '../drawers/serviceemployee';
import EditServiceDrawer from '../drawers/editservice';
export default function ServicesTable({data, selectedItems, setSelectedItems , type, etype}){
    console.log(data, 'servicedata');
    const [checked, setChecked] = useState(true);
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);
    const [idtoDel, setidToDel] = useState("");
    const [editcategoryopen, setEditCategoryOpen] = useState(false);
    const [employeeopen, setEmployeeOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedserempId, setselectedSerEmpId] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
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
      const toggleEmpDrawer = (openpar) => { 
        setEmployeeOpen(openpar);
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
        dispatch(updateServiceByType({
            status: status,
            ids: id
        }))
    }
    const openEmployeeHandler = (id) => {
        setselectedSerEmpId(id);
        toggleEmpDrawer(true);
    }
    const editCategoryHandler = (id) => {
        setSelectedCategoryId(id);
        toggleDrawer(true);
    };
    const handleDeleteService = (id)=>{
        console.log(id);
        dispatch(deleteServiceByType([id]))
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
            <DashboardCard title="Services">
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
                                    Image
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                   Service name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Default Price
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Duration
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Category
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Staffs
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
                        {data.length> 0 ? (data.map((ele) => (
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
                                        {ele.image}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                   {ele.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                   ${ele.defaultPrice}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                   {ele.duration} Min
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                   {ele.CategoriesDetails[0]?.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} style={{ display: 'flex', alignItems: 'cemter' }}>
                                   {ele.employeeCount}
                                   <button style={{ backgroundColor:  'rgba(93, 135, 255, 0.1)', borderColor: 'transparent', color: '#5D87FF', cursor:'pointer' }}>
                                   <IconPlus onClick={() => openEmployeeHandler(ele._id)}/>
                                   </button>
                                   <ServiceEmployeeDrawer 
                                   open = {employeeopen}
                                   id = {selectedserempId}
                                   handleClose={()=> toggleEmpDrawer(false)}
                                   type={etype}
                                   />
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
                                    <IconPencil style={{color: 'rgba(93, 135, 255, 1)'}} onClick={() => editCategoryHandler(ele._id)}/>
                                    <EditServiceDrawer 
                                    open={editcategoryopen}
                                    handleClose={() => toggleDrawer(false)}
                                    id =  {selectedCategoryId}
                                    type={type}
                                    />
                                    </div>
                                    <div>
                                    <IconTrash  style={{color: 'rgba(192, 50, 33, 1)'}} onClick={() => handleOpenModal(ele._id)}/>
                                        <DeleteModal 
                                        isOpen={isModalOpen}
                                        onClose={handleCloseModal}
                                        handleDelete = {handleDeleteService}
                                        id = {idtoDel}
                                        />
                                        </div>
                                </TableCell>
                            </TableRow>
                        )) ) :
                        (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="body1">No Service Found</Typography>
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