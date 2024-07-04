import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button,
    Switch
} from '@mui/material';
import { useState } from 'react';
import DashboardCard from '../shared/DashboardCard';
import { useDispatch } from 'react-redux';
// import { updateStatusFacilities } from '@/reducer/FacilitiesSlice';
import { updateStatusTags, deleteTags } from '@/reducer/TagsSlice';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import DeleteCommonModal from '../modals/deleteCommon';
import EdittagDrawer from '../drawers/edittag';
import EditstockDrawer from '../drawers/products/editstock';
import { updateStatusProduct, updatefeaturedProduct, deleteProduct } from "@/reducer/ProductsSlice";
import EditProductDrawer from '../drawers/products/editproduct';
export default function ProductsTable({data, selectedItems, setSelectedItems}){
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [idtodel, setidToDel] = useState("");
    const [idtoedit, setidToEdit] = useState("");
    const [idstock, setidStock] = useState("");
    const [edittagopen, setedittagOpen] = useState("");
    const [editstockopen, seteditStockOpen] = useState("");
    const dispatch = useDispatch();
    const handleOpenModal = (id) => {
        setidToDel(id);
        setModalOpen(true);
      };
   
      const handleCloseModal = () => {
        setModalOpen(false);
      };
      const toggleStockDrawer = (openpar) => { 
        seteditStockOpen(openpar);
      };
      const toggleDrawer = (openpar) => { 
        setedittagOpen(openpar);
      };
    
    const editTagHandler = (id) => {
        setidToEdit(id);
        toggleDrawer(true);
    };
    const editStockHandler = (id)=>{
        setidStock(id);
        toggleStockDrawer(true);
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
  const handleChange = (status, id) => {
    dispatch(updateStatusProduct({
        status:status,
        ids: id
    }))
  };
  const handleFeaturedChange = (featured, id)=>{
    dispatch(updatefeaturedProduct({
        featured:featured,
        ids: id
    }))
  }
  const handledeleteproduct =  (id) => {
    console.log(id);
  dispatch(deleteProduct([id]))
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
            <DashboardCard title="Products">
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
                                <Typography variant="subtitle2" fontWeight={600}>
                                    <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAllChange}
                                />
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Image
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                   Product Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Brand
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Categories
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Price
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Quantity
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Featured
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
                                {ele.image? (
                                        <img src={ele.image} alt="User" style={{ height: "50px" }} />
                                    ) :(
                                        <img src="/images/products/noimage.png" alt= "no image" style={{ height: "50px" }}  />
                                    )}
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
                                        {ele.brandname}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {ele.categoriesname}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        $ {ele.markedprice}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                      {ele.hasVariation ? ele.totalvariationStock : ele.inStockQuantity}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                <Switch
                                    checked = {ele.featured}
                                    onChange={()=> handleFeaturedChange(!ele.featured, ele._id)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
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
                                <Button variant="outlined" onClick= {()=> editStockHandler(ele._id)}><IconPlus/>Stock</Button>
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
            deleteHandler = {handledeleteproduct}
            id = {idtodel}
            />
         <EditProductDrawer 
         open={edittagopen}
          handleClose={() => toggleDrawer(false)}
          id =  {idtoedit}
          />
          <EditstockDrawer
          open={editstockopen}
          handleClose={()=> toggleStockDrawer(false)}
          id = {idstock}
          />
        </>
    )
}