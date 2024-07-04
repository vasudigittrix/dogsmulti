import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ChangeEvent, MouseEvent, useState, SyntheticEvent, useEffect } from 'react'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select } from '@mui/material';
export default function ProductStatusFilter( {addcategoryHandler, selectedItems , handleApply, filterhandler}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState('No Action');
    const [selectedstatValue, setSelectedStatValue] = useState('');
    const[filter, setFilter] = useState('All');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const handleStatChange = (event) => {
      setSelectedStatValue(event.target.value)
    }
   
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    const handleSearchChange = () => {
        
    }
    // const handleFilterChange = () => []
    const handleFilterChange = (event) => {
      setFilter(event.target.value);
      // commissionHandler(event.target.value)
      filterhandler(event.target.value);
    }
    const handleApplySubmit = ( ) => {
      handleApply(selectedValue, selectedstatValue);
      setSelectedStatValue('');
      setSelectedValue('No Action');
    }
    const handleStatusClick = (status) =>{
      setFilter(status);
    }

    return (
        <>
         <div style={{ display: "flex", alignItems: "center" }}>
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
            <MenuItem value="Featured">Featured</MenuItem>
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
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
        </Select>
</FormControl>
)}
{selectedValue === 'Featured' && (
  <FormControl>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedstatValue}
            onChange={handleStatChange}
            disabled = {selectedItems.length == 0}
        >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
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
      <div style={{ marginLeft: "auto" }}>
      <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            onChange={handleFilterChange}
        >
          <MenuItem value="All">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
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
    <Button variant="contained"  onClick={addcategoryHandler}> New</Button>
    </div>
    </div>
      </>
    );
  }

