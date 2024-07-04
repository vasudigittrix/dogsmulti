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
export default function FacilitiesFilter( {setSearchQuery, selectedItems, setFilter}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const [facilityopen, setFacilityOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('No Action');
    const [selectedstatValue, setSelectedStatValue] = useState('');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const handleStatChange = (event) => {
      setSelectedStatValue(event.target.value)
    }
      const toggleDrawer = (openpar) => { 
        setFacilityOpen(openpar);
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
    const handleApplySubmit = ( ) => {
      if(selectedValue== 'Delete'){
        dispatch(deleteFacilities(selectedItems));
        setSelectedValue('No Action');
      }
      else if(selectedValue == 'Status' && selectedstatValue != ''){
        dispatch(updateStatusFacilities({
          ids: selectedItems,
          status: selectedstatValue
        }))
        setSelectedValue('No Action');
      }
    }
    const handleStatusClick = (status) =>{
      setFilter(status);
    }

    return (
        <>
         <div>
         <FormControl fullWidth>
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
            value={setSelectedStatValue}
            onChange={handleStatChange}
            disabled = {selectedItems.length == 0}
        >
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
        </Select>
</FormControl>
)}

        {/* <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          disabled = {selectedItems.length == 0}
        >
          No Action
        </Button> */}
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
        disabled = {selectedItems.length == 0}
        onClick={handleApplySubmit}
        >Apply</Button>
      </div>
      <div>
      </div>
      <IconButton type="submit" aria-label="search">
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
    <Button variant="contained"  onClick={addfacilityrHandler}> New</Button>
    <NewFacilityDrawer
      fopen={facilityopen}
      handleClose={() => toggleDrawer(false)}
    />
      </>
    );
  }

