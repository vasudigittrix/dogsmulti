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

export default function StatusFilter3( { selectedItems , handleApply, newhandler}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const [facilityopen, setFacilityOpen] = useState(false);
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
    const handleFilterChange = (event) => {
      setFilter(event.target.value);
    }
    const handleApplySubmit = ( ) => {
      handleApply(selectedValue);
      setSelectedStatValue('');
      setSelectedValue('No Action');
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
            <MenuItem value="Delete">Delete</MenuItem>
        </Select>
</FormControl>
        <Button 
        variant="contained" 
        disabled = {selectedValue === 'No Action'}
        onClick={handleApplySubmit}
        >Apply</Button>
      </div>
      <div style={{ marginLeft: "auto" }}>
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
    <Button variant="contained"  onClick={newhandler}> New</Button>
    </div>
    </div>
      </>
    );
  }

