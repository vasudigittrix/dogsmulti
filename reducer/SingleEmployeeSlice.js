import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getemployeedetailsapi, editemployeeapi} from '../services/api';
// export const createEmployeeByType = createAsyncThunk('employee/createemployee', async (formData, { rejectWithValue }) => {
//   try {
//     const response = await createemployeebytypeapi(formData);
//     return response;

//   } catch (error) {
//     return rejectWithValue(error.response);
//   }
// });
export const getEmployee = createAsyncThunk('employee/getemployeedetails', async (formData, { rejectWithValue }) => {
  try {
    const response = await getemployeedetailsapi(formData);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const editEmployee = createAsyncThunk('employee/editemployee', async (arg, { rejectWithValue }) => {
  try {
    const {id, formData} = arg;
    const response = await editemployeeapi(id, formData);
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
    editsuccess: false
  };
  const SingleEmployeeSlice = createSlice({
    name: "singleemployee",
    initialState: initialState,
    reducers: {
      clearEmplAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.editsuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getEmployee.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.success = false;
        })
        .addCase(getEmployee.fulfilled, (state, action) => {
          state.submitting = false;
          state.content = action.payload;
          state.success = true;
          state.error = null;
        })
        .addCase(getEmployee.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.success = false;
        })
        .addCase(editEmployee.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.editsuccess = false;
        })
        .addCase(editEmployee.fulfilled, (state, action) => {
          state.submitting = false;
          state.editsuccess = true;
          state.error = null;
        })
        .addCase(editEmployee.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.editsuccess = false;
        });
    },
});

export const singleemployeeReducer = SingleEmployeeSlice .reducer;
export const {  clearEmplAction } = SingleEmployeeSlice .actions; 