import {
    Typography, 
    Box,
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
import { updatestatusCustomer } from '@/reducer/CustomerSlice';
import NewPetDrawer from '../drawers/newpet';
import ViewPetDrawer from '../drawers/viewpetdrawer';
import {  Avatar, Button, IconButton } from '@mui/material';
export default function OwnerPetsTable({data, selectedItems, setSelectedItems}){
    const [petopen, setPetOpen] = useState("");
    const [newid, setNewid] = useState("");
    const [viewid, setViewid] = useState("");
    const [viewpetopen ,setviewpetOpen] = useState("");
    const [checked, setChecked] = useState(true);
    const [selectAll, setSelectAll] = useState(false);
    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            const allIds = data.map(item => item._id);
            setSelectedItems(allIds);
        }
        setSelectAll(!selectAll);
    };
    const dispatch = useDispatch();
  const handleChange = (status, id) => {
    dispatch(updatestatusCustomer({
        status:status,
        ids: id
    }))
  };
  const togglePetDrawer = (openpar) => { 
    setPetOpen(openpar);
   
  };
  const toggleUserPetDrawer = (open)=>{
    setviewpetOpen(open);
  }
  
const openNewPetHandler = (id)=>{
    togglePetDrawer(true);
    setNewid(id);
}
const viewuserpetHandler = (id)=>{
    toggleUserPetDrawer(true);
    setViewid(id)
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
            <DashboardCard title="Owners and Pets">
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
                                    No.
                                </Typography>
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
                                    Pet Count
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Updated At
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Gender
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((ele, index) => (
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
                                        {index + 1}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
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
                                            </Typography>
                                        </Box>
                                    </Box>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {ele.phonenumber}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        <Button variant="contained" onClick={() => viewuserpetHandler(ele._id)}>{ele.petCount}</Button>
                                        
                                       <Button variant="outlined" onClick={() => openNewPetHandler(ele._id)}>+</Button>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {ele.updatedAt}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {ele.gender}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                <Switch
                                    checked = {ele.status}
                                    onChange={()=> handleChange(!ele.status, ele._id)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
        <ViewPetDrawer
        open={viewpetopen} 
        handleClose={() => toggleUserPetDrawer(false)}
        id = {viewid}
        />
         <NewPetDrawer
         open={petopen}
         onClose={() => togglePetDrawer(false)}
         userid = {newid}
            />
        </>
    )
}