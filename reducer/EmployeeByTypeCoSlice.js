import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getBookingsByTypeapi, deleteBookingapi } from '../services/api';
import { getemployeebytypeCommapi,getemployeebytypesearcheapi } from '../services/api';
export const getEmployeeByTypeComm = createAsyncThunk('employee/getemployeebytypecomm', async (formData, { rejectWithValue }) => {
  try {
    const response = await getemployeebytypeCommapi(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getEmployeeByTypeSearch = createAsyncThunk('employee/getemployeebytype', async (formData, { rejectWithValue }) => {
  try {
    const response = await getemployeebytypesearcheapi(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const initialState = {
  submitting: false,
  error: null,
  success: false,
  content: [],
  searchsuccess: false,
  searchemployee: [],
};
const EmployeeByTypeCoSlice = createSlice({
  name: "employeebytypecomm",
  initialState: initialState,
  reducers: {
    clearEmpCompAction: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
      state.searchsuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeByTypeComm.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getEmployeeByTypeComm.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getEmployeeByTypeComm.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getEmployeeByTypeSearch.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.searchsuccess = false;
      })
      .addCase(getEmployeeByTypeSearch.fulfilled, (state, action) => {
        state.submitting = false;
        state.searchemployee = action.payload;
        state.searchsuccess  = true;
        state.error = null;
      })
      .addCase(getEmployeeByTypeSearch.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.searchsuccess  = false;
      });
  },
});
export const EmployeeByTypeCommReducer = EmployeeByTypeCoSlice.reducer;
  export const { clearEmpCompAction } = EmployeeByTypeCoSlice.actions; 