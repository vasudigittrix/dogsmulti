import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getlogisticapi, updatestatusLogisticapi, createLogisticapi, deleteLogisiticapi, getlogisticbystatusapi } from '../services/api';
export const createLogistic = createAsyncThunk('logistics/createlogistic', async (formData, { rejectWithValue }) => {
  try {
    const response = await createLogisticapi(formData);
    console.log(response);
    return response;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getLogistics = createAsyncThunk('logistics/getall', async (formData, { rejectWithValue }) => {
  try {
    const response = await getlogisticapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getLogisticsByStatus = createAsyncThunk('logistics/getbystatus', async (formData, { rejectWithValue }) => {
  try {
    const response = await getlogisticbystatusapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updateStatusLogistics = createAsyncThunk('logistics/updatestatus', async (formData, { rejectWithValue }) => {
    try {
      const response = await updatestatusLogisticapi(formData);
      console.log(response);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const deleteLogistics = createAsyncThunk('taxes/delete', async (formData, { rejectWithValue }) => {
    try {
      const response = await  deleteLogisiticapi(formData);
      console.log(response);
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
  createsuccess: false,
  delsuccess: false,
  updatesuccess: false,
  activetaxess: [],
  actsuccess:false,
  modsuccess: false,
  modtaxes: []
};
const LogisticsSlice = createSlice({
  name: "logistic",
  initialState: initialState,
  reducers: {
    clearlogAction: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
      state.delsuccess = false;
      state.updatesuccess = false;
      state.createsuccess = false;
      state.actsuccess = false;
      state.modsuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createLogistic.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase(createLogistic.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase(createLogistic.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getLogistics.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getLogistics.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getLogistics.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getLogisticsByStatus.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.actsuccess = false;
      })
      .addCase(getLogisticsByStatus.fulfilled, (state, action) => {
        state.submitting = false;
        state.activetaxess = action.payload;
        state.actsuccess = true;
        state.error = null;
      })
      .addCase(getLogisticsByStatus.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.actsuccess = false;
      })
      .addCase(updateStatusLogistics.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updateStatusLogistics.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.error = null;
      })
      .addCase(updateStatusLogistics.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      .addCase(deleteLogistics.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.delsuccess = false;
      })
      .addCase(deleteLogistics.fulfilled, (state, action) => {
        state.submitting = false;
        state.delsuccess = true;
        state.error = null;
      })
      .addCase(deleteLogistics.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.delsuccess = false;
      });
        
  },
});
export const logisticsReducer = LogisticsSlice.reducer;
export const { clearlogAction } = LogisticsSlice.actions; 