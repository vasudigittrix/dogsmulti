import DataTable from "react-data-table-component";
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Select,
    MenuItem
} from '@mui/material';
import { useState } from 'react';
import DashboardCard from '../shared/DashboardCard';
import { deleteBooking } from '@/reducer/BookingByTypeSlice';
import { IconTrash } from '@tabler/icons-react';
import DeleteBookingModal from '../modals/deleteBooking';
import { useDispatch, useSelector } from 'react-redux';
import { updatestatusBooking, updatepaystatusBooking } from '@/reducer/BookingByTypeSlice';
export const DataTableComponent = ({ data }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleRowSelected = (selected) => {
      setSelectedRows(selected.selectedRows);
    };
  
    const handleChangePage = (page) => {
      setPage(page);
    };
  
    const handleChangeRowsPerPage = (newPerPage, page) => {
      setRowsPerPage(newPerPage);
      setPage(page);
    };
  
    const columns = [
      {
        name: 'Id',
        selector: (row) => row.bookingid,
        sortable: true,
      },
      {
        name: 'Customer Name',
        selector: (row) => (
          <div>
            <div>{row.CustomerDetails?.firstName} {row.CustomerDetails?.lastName}</div>
            <div>{row.CustomerDetails?.email}</div>
          </div>
        ),
        sortable: true,
      },
      {
        name: 'Pet Name',
        selector: (row) => row.PetDetails?.name,
        sortable: true,
      },
      {
        name: 'Pet Detail',
        selector: (row) => row.PetDetails?.type,
        sortable: true,
      },
      {
        name: 'Dropoff Date & Time',
        selector: (row) => `${row.dropoffdate} ${row.dropofftime}`,
        sortable: true,
        right: true,
      },
      {
        name: 'Pickup Date & Time',
        selector: (row) => `${row.pickupdate} ${row.pickuptime}`,
        sortable: true,
        right: true,
      },
      {
        name: 'Price',
        selector: (row) => row.price,
        sortable: true,
        right: true,
      },
      {
        name: 'Boarder',
        selector: (row) => `${row.EmployeeDetails?.firstName} ${row.EmployeeDetails?.lastName}`,
        sortable: true,
        right: true,
      },
      {
        name: 'Updated At',
        selector: (row) => new Date(row.updatedAt).toLocaleString(),
        sortable: true,
        right: true,
      },
      {
        name: 'Status',
        selector: (row) => (
          row.status === 'completed' ? 
          <Chip label="Completed" color="success" /> :
          <Select
            value={row.status}
            onChange={(event) => handleStatusChange(event, row._id)}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        ),
        sortable: false,
        right: true,
      },
      {
        name: 'Payment Status',
        selector: (row) => (
          row.paymentStatus === 'paid' ?
          <Chip label="Paid" color="success" /> :
          <Select
            value={row.paymentStatus}
            onChange={(event) => handlePaymentStatusChange(event, row._id)}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
          </Select>
        ),
        sortable: false,
        right: true,
      },
      {
        name: 'Action',
        selector: (row) => (
          <IconTrash onClick={() => handleOpenModal(row._id)}/>
        ),
        sortable: false,
        right: true,
      },
    ];
  
    const handleStatusChange = (event, id) => {
      // Implement your status change logic here
    };
  
    const handlePaymentStatusChange = (event, id) => {
      // Implement your payment status change logic here
    };
  
    const handleOpenModal = (id) => {
      // Implement your modal open logic here
    };
  
    return (
      <DataTable
      title="Boarding Bookings"
        columns={columns}
        data={data}
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        pagination
        paginationServer
        paginationTotalRows={data.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        paginationRowsPerPageOptions={[5, 10, 15]}
        dense
        striped
      />
    );
  };