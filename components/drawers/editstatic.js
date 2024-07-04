import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Paper, Typography} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormGroup, FormControlLabel, Switch, FormHelperText} from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import {IconButton} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import 'react-toastify/dist/ReactToastify.css';
import { createTax } from '@/reducer/TaxesSlice';
import { getSingletax, editSingletax , clearsintaxAction } from '@/reducer/SingleTaxSlice';
import { getStaticContentByType, clearsingstatconStatus, editStaticContent } from '@/reducer/SingleStaticContentSlice';
import Editor from '../editor';
export default function EditStaticContentDrawer({open , type,  handleClose}){
    const dispatch = useDispatch();
    const singlestconeditsuccessData = useSelector((state)=> state.singlestaticcontent.editsuccess);
    const singlestconsuccessData = useSelector((state)=> state.singlestaticcontent.success);
    const singlestconcontentData = useSelector((state)=> state.singlestaticcontent.content);
const [editorLoaded, setEditorLoaded] = useState(false);
const handleEditorChange = (event, editor) => {
    const newData = editor.getData();
    setEditorData(newData);
    formik.setFieldValue(name, newData);
    formik.setFieldTouched(name, true);
  };
    const handleSubmit = (e)=>{
      e.preventDefault(); 
      formik.submitForm(); 
    }
    useEffect(()=>{
        if(open){
          dispatch(getStaticContentByType(
            {type}
          ))
        }
      },[open, type]);
      useEffect(() => {
        setEditorLoaded(true);
      }, []);
    useEffect(()=>{
        if(singlestconsuccessData && singlestconcontentData){
            console.log(singlestconcontentData , 'sinsinglestconcontentData')
            formik.setValues(singlestconcontentData);
            dispatch(clearsingstatconStatus());
        }
    },[singlestconsuccessData]);
    const initialvalues = {
        type: "",
        content: "",
        type: "",
        moduletype: "",
      };
    

    const toggleDrawer = (openpar) => { 
      setOpen(openpar);
    };
 
      const validationSchema = Yup.object().shape({
        type: Yup.string().required('Title is required'),
        content: Yup.string().required('Description is required'),
      });
      const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
          dispatch(editStaticContent(values));
          resetForm(); 
          handleClose();
        },
      });
    return(
        <>
        <Drawer
        open={open}
         onClose={ handleClose}
        anchor = "right"
      >
         <h2>Edit Pages</h2>
                <IconButton style={{ position: "absolute", top: "10px", right: "10px" }} onClick={ handleClose}>
            <IconX />
        </IconButton>
        <Paper
          style={{
            padding: "20px",
            maxWidth: "800px",
            margin: "50px auto",
            overflowY: "auto",
            maxHeight: "80vh",
             minWidth: '750px'
          }}
        >
               
                <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <InputLabel>Title</InputLabel>
        <TextField 
        // label="Service Name" 
        variant="outlined" 
        fullWidth
        name="type"
        onChange={formik.handleChange}
        value={formik.values.type}
        error={formik.touched.type && Boolean(formik.errors.type)}
        helperText={formik.touched.type && formik.errors.type}
        onBlur={formik.handleBlur}
         />
          </Grid>
          <Grid item xs={12}>
                <InputLabel id="form-layouts-separator-select-label">
                  Description
                </InputLabel>
                <Editor
                  editorLoaded={editorLoaded}
                  name="content"
                  value={formik.values.content}
                  formik={formik}
                />
              </Grid>
   
     
    </Grid>
    </form>
        </Paper>
        <Grid item xs={12} spacing={2}>
        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} style={{marginRight: '5px'}}>Submit</Button>
        <Button color="secondary" variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
      </Grid>
      </Drawer>
        </>
    )
}