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
import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/themes/material_green.css";
export default function DailyBookFilter( { dateRange,handleDateChange}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const [employeeopen, setEmployeeOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('No Action');
    const [selectedstatValue, setSelectedStatValue] = useState('');
    const [selectedCommission, setSelectedCommission]= useState('All Commission');
    const [searchQuery, setSearchQuery] = useState("");
    
    
      const toggleDrawer = (openpar) => { 
        setEmployeeOpen(openpar);
      };
  
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
      <label htmlFor="datePicker" className="date-picker-label">
        Select Date:
      </label>
      <Flatpickr
       id="datePicker"
        options={{
          dateFormat: "Y-m-d",
        }}
        value={dateRange}
        onChange={handleDateChange}
      />
    </div>
    </div>
      </>
    );
  }
