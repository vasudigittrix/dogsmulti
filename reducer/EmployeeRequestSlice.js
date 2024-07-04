import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getemployeerequestapi, verifystatusemployeeapi, getemployeerequestbycommapi } from '../services/api';
export const getEmployeeRequests = createAsyncThunk('employeerequests/get', async (_, { rejectWithValue }) => {
  try {
    const response = await getemployeerequestapi();
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getEmployeeRequestsByComm = createAsyncThunk('employeerequests/getbycomm', async (formData, { rejectWithValue }) => {
  try {
    console.log(formData);
    const response = await getemployeerequestbycommapi(formData);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updateverifyEmployeeRequest = createAsyncThunk('employee/updateverifystatus', async (formData, { rejectWithValue }) => {
  try {
    const response = await verifystatusemployeeapi(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const initialState = {
  submitting: false,
  error: null,
  respoData: "",
  success: false,
  content: [],
  updatesuccess:false,
  commsuccess: false,
  commlist : []
};
const EmployeeRequestSlice = createSlice({
  name: "employeerequest",
  initialState: initialState,
  reducers: {
    clearempreqAction : (state) => {
      state.submitting = false;
      state.success = false;
      state.respoData = "";
      state.error = null;
      state.createsuccess = false;
      state.updatesuccess = false;
      state.commsuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeRequests.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getEmployeeRequests.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getEmployeeRequests.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getEmployeeRequestsByComm.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.commsuccess = false;
      })
      .addCase(getEmployeeRequestsByComm.fulfilled, (state, action) => {
        state.submitting = false;
        state.commlist = action.payload;
        state.commsuccess = true;
        state.error = null;
      })
      .addCase(getEmployeeRequestsByComm.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.commsuccess = false;
      })
      .addCase(updateverifyEmployeeRequest.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updateverifyEmployeeRequest.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.respoData = action.payload;
        state.error = null;
      })
      .addCase(updateverifyEmployeeRequest.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      });
  },
});
export const employeerequestReducer = EmployeeRequestSlice.reducer;
  export const { clearempreqAction } = EmployeeRequestSlice.actions; 