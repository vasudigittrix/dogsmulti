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
import { useEffect, useState } from 'react';
import DashboardCard from '../shared/DashboardCard';
import { useDispatch } from 'react-redux';
import { updateStatusTags, deleteTags } from '@/reducer/TagsSlice';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import DeleteCommonModal from '../modals/deleteCommon';
import EdittagDrawer from '../drawers/edittag';
import { DataGrid } from '@mui/x-data-grid';
export default function VariationsTable({data, selectedItems, setSelectedItems}){
    
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'type', headerName: 'Type', width: 130 },
    {
        field: 'updatedAt',
        headerName: 'Updated At',
        type: 'number',
        width: 190,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 190,
        renderCell: (value) => (
            <Switch checked={value} />
        )
      },
      {
        field: 'id',
        headerName: 'Status',
        width: 190,
        renderCell: (value) => (
            <div  style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            <IconEdit  onClick={() => editTagHandler(value)}/>

           <IconTrash onClick={() => handleOpenModal(value)}/>  

           </div>
        )
      },

  ];
  const rows = data.map(item => {
    return { ...item, id: item._id };
  });
    const [checked, setChecked] = useState(true);
    const [selectionModel, setSelectionModel] = useState([]);

    const handleSelectionModelChange = (newSelection) => {
      setSelectionModel(newSelection);
      console.log('Selected row IDs:', newSelection);
    };
  
    const [isModalOpen, setModalOpen] = useState(false);
    const [idtodel, setidToDel] = useState("");
    const [idtoedit, setidToEdit] = useState("");
    const [edittagopen, setedittagOpen] = useState("");
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
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
    dispatch(updateStatusTags({
        status:status,
        ids: id
    }))
  };
  function rowKeyGetter(row) {
    return row.id;
  }
  const handledeletetag =  (id) => {
    console.log(id);
  dispatch(deleteTags([id]))
  }
  const handleCheckboxChange = (itemId)=>{
    if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter((id) => id !== itemId));
      } else {
        setSelectedItems([...selectedItems, itemId]);
      }
}
useEffect(()=>{
    console.log(rowSelectionModel, 'row');
},[rowSelectionModel]);
    return(
        <>
            <DashboardCard title="Variations">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                {/* <Table
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
                                    -
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    S.no
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                   Type
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Updated At
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
                </Table> */}
                 <DataGrid
        rows={rows}
        columns={columns}
        onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableSelectionOnClick

      />

            </Box>
        </DashboardCard>
        <DeleteCommonModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            deleteHandler = {handledeletetag}
            id = {idtodel}
            />
         <EdittagDrawer 
         open={edittagopen}
          handleClose={() => toggleDrawer(false)}
          id =  {idtoedit}
          />
        </>
    )
}