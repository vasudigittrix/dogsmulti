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
import { updateStatusUnits, deleteUnits } from '@/reducer/UnitSlice';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import DeleteCommonModal from '../modals/deleteCommon';
// import EdittagDrawer from '../drawers/edittag';
import EditunitDrawer from '../drawers/editunit';
import { updateStatusPCategory,deletePCategory } from '@/reducer/ProductCategorySlice';
export default function CategoriesTable2({data, selectedItems, setSelectedItems}){
    const [selectAll, setSelectAll] = useState(false);
    const [checked, setChecked] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
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
    
    const editTagHandler = (id) => {
        setidToEdit(id);
        toggleDrawer(true);
    };
  const handleChange = (status, id) => {
    dispatch(updateStatusPCategory({
        status:status,
        ids: id
    }))
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
  const handledeletecategory =  (id) => {
    console.log(id);
  dispatch(deletePCategory([id]))
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
                                    disabled={data.length == 0}
                                />
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Image
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Brands
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
                        {data.length> 0 ? (
                            data.map((ele, index) => (
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
                                    {ele.image }
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
                    
                                        {ele.brands?.map((x)=> (
                                            x.name
                                        )).join(', ')}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {ele.updatedAt}
                                </TableCell>
                                <TableCell>
                                    {ele.createdAt}
                                </TableCell>
                                <TableCell>
                                <Switch
                                    checked = {ele.status}
                                    onChange={()=> handleChange(!ele.status, ele._id)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell>
                                <TableCell>
                                <div  style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                                 <IconEdit  onClick={() => editTagHandler(ele._id)}/>
      
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
                            <Typography variant="body1">No Data Found</Typography>
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
            deleteHandler = {handledeletecategory}
            id = {idtodel}
            />
         <EditunitDrawer
         open={edittagopen}
          handleClose={() => toggleDrawer(false)}
          id =  {idtoedit}
          />
        </>
    )
}