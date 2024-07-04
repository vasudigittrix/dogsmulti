import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ChangeEvent, MouseEvent, useState, SyntheticEvent, useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputAdornment from '@mui/material';
import Magnify from "mdi-material-ui/Magnify";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import NewFacilityDrawer from '../drawers/newfacility';
import { FormControl, Select } from '@mui/material';
import { deleteFacilities, clearAction, updateStatusFacilities } from '@/reducer/FacilitiesSlice';
// import NewEmployeeDrawer from '../drawers/newemployee';
import NewEmployeeDrawer2 from '../drawers/newemployee2';
import { deleteEmployeeByType, updatestatEmployeeByType } from '@/reducer/EmployeeByTypeSlice';

export default function AllEmployeeFilter( { selectedItems ,searchHandler, commissionHandler, disabled}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const [employeeopen, setEmployeeOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('No Action');
    const [selectedstatValue, setSelectedStatValue] = useState('');
    const [selectedCommission, setSelectedCommission]= useState('All Commission');
    const [searchQuery, setSearchQuery] = useState("");
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const handleCommChange = (event) => {
      setSelectedCommission(event.target.value);
      commissionHandler(event.target.value)
    }
  
    const handleStatChange = (event) => {
      setSelectedStatValue(event.target.value)
    }
      const toggleDrawer = (openpar) => { 
        setEmployeeOpen(openpar);
      };
      const addfacilityrHandler = () => {
        toggleDrawer(true);
      }
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    const handleSearchChange = () => {
    }
    const handleSearchSubmit = ()=>{
      searchHandler(searchQuery)

    }
    const handleApplySubmit = ( ) => {
      if(selectedValue== 'Delete'){
        dispatch(deleteEmployeeByType(selectedItems));
        setSelectedValue('No Action');
      }
      else if(selectedValue == 'Status' && selectedstatValue != ''){
        dispatch(updatestatEmployeeByType({
          ids: selectedItems,
          status: selectedstatValue
        }))
        setSelectedStatValue('');
        setSelectedValue('No Action');
      }
    }
    const handleStatusClick = (status) =>{
      setFilter(status);
    }

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
         <div>
         <FormControl>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedValue}
            onChange={handleChange}
            disabled = {selectedItems.length == 0}
        >
            <MenuItem value="No Action">No Action</MenuItem>
            <MenuItem value="Status">Status</MenuItem>
            <MenuItem value="Delete">Delete</MenuItem>
        </Select>
</FormControl>
{selectedValue === 'Status' && (
  <FormControl fullWidth>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedstatValue}
            onChange={handleStatChange}
            disabled = {selectedItems.length == 0}
        >
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
        </Select>
</FormControl>
)}

       
        <Menu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
           Status
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            Delete
          </MenuItem>
        </Menu>
        <Button 
        variant="contained" 
        disabled = {selectedValue === 'No Action'}
        onClick={handleApplySubmit}
        >Apply</Button>
      </div>
      <div>
      <FormControl>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCommission}
            onChange={handleCommChange}
        >
            <MenuItem value="All Commission">All Commission</MenuItem>
            <MenuItem value="booking commission">Booking Commission</MenuItem>
            <MenuItem value="product commission">Product Commission</MenuItem>
        </Select>
</FormControl>
      <IconButton type="submit" aria-label="search" onClick={handleSearchSubmit}>
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
      <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    {!disabled && 
    <Button variant="contained"  onClick={addfacilityrHandler}> New</Button>
}
    </div>
    </div>
    <NewEmployeeDrawer2
      fopen={employeeopen}
      handleClose={() => toggleDrawer(false)}
    />
      </>
    );
  }
