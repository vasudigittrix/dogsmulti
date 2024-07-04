import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getallBookingseapi, getallBookingsBySearchapi, getallBookingsByStatuseapi } from '../services/api';
import { getallemployeeapi, getallemployeebycommapi,  getallemployeebysearchapi } from '../services/api';
export const getallEmployees = createAsyncThunk('employees/getallemployees', async (formData, { rejectWithValue }) => {
  try {
    const response = await getallemployeeapi(formData);
    console.log(response.responseData.data);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getallEmployeeByComm = createAsyncThunk('employees/getallemployeesbycomm', async (formData, { rejectWithValue }) => {
    try {
      const response = await getallemployeebycommapi(formData);
      console.log(response.responseData.data);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const getallEmployeeBySearch = createAsyncThunk('employees/getallemployeesbysearch', async (formData, { rejectWithValue }) => {
    try {
      const response = await  getallemployeebysearchapi(formData);
      console.log(response.responseData.data);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });


const initialState = {
  submitting: false,
  error: null,
  success: false,
  content: [],
  searchcontent:[],
  statuscontent: [],
  searchsuccess: false,
    statussuccess : false,
};
const EmployeeSlice = createSlice({
  name: "employees",
  initialState: initialState,
  reducers: {
    clearEmployeeAction: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
      state.searchsuccess= false;
      state.statussuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getallEmployees.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.success = false;
    })
    .addCase(getallEmployees.fulfilled, (state, action) => {
      state.submitting = false;
      state.success = true;
      state.error = null;
      state.content = action.payload;
    })
    .addCase(getallEmployees.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase(getallEmployeeByComm.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.statussuccess = false;
    })
    .addCase(getallEmployeeByComm.fulfilled, (state, action) => {
      state.submitting = false;
      state.statussuccess = true;
      state.error = null;
      state.statuscontent = action.payload;
    })
    .addCase(getallEmployeeByComm.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.statussuccess = false;
    })
    .addCase(getallEmployeeBySearch.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.searchsuccess = true;
    })
    .addCase(getallEmployeeBySearch.fulfilled, (state, action) => {
      state.submitting = false;
      state.searchsuccess = true;
      state.error = null;
      state.searchcontent = action.payload;
    })
    .addCase(getallEmployeeBySearch.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.searchsuccess = true;
    })
    
  },
});
export const employeeReducer = EmployeeSlice.reducer;
  export const { clearEmployeeAction } = EmployeeSlice.actions; 