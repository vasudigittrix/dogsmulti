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
import { FormControl, Select } from '@mui/material';
import NewBookingDrawer from '../drawers/newbooking';
import { updatestatusBooking, deleteBooking } from '@/reducer/BookingByTypeSlice';

export default function BookingStatusFilter( { selectedItems,  statusHandler, searchHandler , newhandler, disabled}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const [status, setStatus] = useState('All Status');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [selectedValue, setSelectedValue] = useState('No Action');
    const [selectedstatValue, setSelectedStatValue] = useState('');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    
     const handleCloseModal = () => {
       setModalOpen(false);
     };
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleSearchChange = () => {
        
    }
    const handleSearchSubmit = ( ) => {
        // Call searchHandler with searchQuery as parameter
        searchHandler(searchQuery);
    }
    const handleStatChange = (event) => {
      setSelectedStatValue(event.target.value)
    }
    const handleStatusClick = (event) =>{
      // setFilter(status);
      setSelectedStatus(event.target.value);
      statusHandler(event.target.value);
    }
    // const handleChange = (event)=>{
    //   setFilter(event.target.value);
    // }
    const handleApplySubmit = ( ) => {
      if(selectedValue== 'Delete'){
        // dispatch(deleteEmployeeByType(selectedItems));
        dispatch(deleteBooking(selectedItems));
        setSelectedValue('No Action');
      }
      else if(selectedValue == 'Status' && selectedstatValue != ''){
        dispatch(updatestatusBooking({
          ids: selectedItems,
          status: selectedstatValue
        }))
        setSelectedStatValue('');
        setSelectedValue('No Action');
      }
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
  <FormControl>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedstatValue}
            onChange={handleStatChange}
            disabled = {selectedItems.length == 0}
        >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
</FormControl>
)}
        <Button 
        variant="contained" 
        disabled = {selectedValue === 'No Action'}
        onClick={handleApplySubmit}
        >Apply</Button>
      </div>
      <div>
 <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedStatus}
                    onChange={(event) => handleStatusClick(event)}
                >
                  <MenuItem value="All Status">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
    
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
    <Button variant="contained"  onClick={newhandler} > New</Button>
    }
    </div>
    </div>
      </>
    );
  }

