import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getemployeebytypeapi, createemployeebytypeapi, updatestatusempltypeapi, updateblockempltypeapi, deleteemployeeapi, getactivenbemployeebytypeapi } from '../services/api';
export const createEmployeeByType = createAsyncThunk('employee/createemployee', async (formData, { rejectWithValue }) => {
  try {
    const response = await createemployeebytypeapi(formData);
    return response;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getEmployeeByType = createAsyncThunk('employee/getemplyeebytype', async (formData, { rejectWithValue }) => {
  try {
    console.log(formData);
    const response = await getemployeebytypeapi(formData);
    console.log(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getActiveNbEmployeeByType = createAsyncThunk('employee/getactivenbemplyeebytype', async (formData, { rejectWithValue }) => {
  try {
    console.log(formData);
    const response = await getactivenbemployeebytypeapi(formData);
    console.log(formData);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updatestatEmployeeByType = createAsyncThunk('employee/updatestatemplyeebytype', async (formData, { rejectWithValue }) => {
  try {
    const response = await updatestatusempltypeapi(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updateblockEmployeeByType = createAsyncThunk('employee/updateblockemplyeebytype', async (formData, { rejectWithValue }) => {
  try {
    const response = await updateblockempltypeapi(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const deleteEmployeeByType = createAsyncThunk('employee/deleteemployee', async (formData, { rejectWithValue }) => {
  try {
    const response = await deleteemployeeapi(formData);
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
  createsuccess: false,
  updatesuccess:false,
  delsuccess: false,
  activenb: [],
  actsuccess: false
};
const EmployeeByTypeSlice = createSlice({
  name: "employeebytype",
  initialState: initialState,
  reducers: {
    clearAction: (state) => {
      state.submitting = false;
      state.success = false;
      state.respoData = "";
      state.error = null;
      state.delsuccess = false;
      state.createsuccess = false;
      state.updatesuccess = false;
      state.actsuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createEmployeeByType.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase(createEmployeeByType.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase(createEmployeeByType.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getEmployeeByType.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getEmployeeByType.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getEmployeeByType.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getActiveNbEmployeeByType.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.actsuccess = false;
      })
      .addCase(getActiveNbEmployeeByType.fulfilled, (state, action) => {
        state.submitting = false;
        state.activenb = action.payload;
        state.actsuccess = true;
        state.error = null;
      })
      .addCase(getActiveNbEmployeeByType.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.actsuccess = false;
      })
      .addCase(updatestatEmployeeByType.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updatestatEmployeeByType.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.respoData = action.payload;
        state.error = null;
      })
      .addCase(updatestatEmployeeByType.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      .addCase(updateblockEmployeeByType.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updateblockEmployeeByType.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.respoData = action.payload;
        state.error = null;
      })
      .addCase(updateblockEmployeeByType.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      .addCase(deleteEmployeeByType.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.delsuccess = false;
      })
      .addCase(deleteEmployeeByType.fulfilled, (state, action) => {
        state.submitting = false;
        state.delsuccess = true;
        state.error = null;
      })
      .addCase(deleteEmployeeByType.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.delsuccess = false;
      });
  },
});
export const employeebytypeReducer = EmployeeByTypeSlice.reducer;
  export const { clearAction } = EmployeeByTypeSlice.actions; 