import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getDurationsByTypeapi, getactiveDurationsapi, updatestatusdurationapi, createdurationapi, deletedurationapi} from '../services/api';
export const createDuration = createAsyncThunk('durations/createduration', async (formData, { rejectWithValue }) => {
  try {
    const response = await createdurationapi(formData);
    console.log(response);
    return response;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getDurationsByType = createAsyncThunk('durations/getdurations', async (formData, { rejectWithValue }) => {
  try {
    const response = await getDurationsByTypeapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getActiveDurationsByType = createAsyncThunk('durations/getactivedurations', async (formData, { rejectWithValue }) => {
  try {
    const response = await getactiveDurationsapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updateStatusDurations = createAsyncThunk('durations/updatestatus', async (formData, { rejectWithValue }) => {
    try {
      const response = await updatestatusdurationapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const deleteDurations = createAsyncThunk('durations/delete', async (formData, { rejectWithValue }) => {
    try {
      const response = await deletedurationapi(formData);
      return response.responseData;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
// export const deleteBooking = createAsyncThunk('booking/delete', async (formData, { rejectWithValue }) => {
//   try {
//     const response = await deleteBookingapi(formData);
//     // console.log(response.responseData.data);
//     console.log(response);
//     return response.responseData.data;

//   } catch (error) {
//     return rejectWithValue(error.response);
//   }
// });
const initialState = {
  submitting: false,
  error: null,
  success: false,
  content: [],
  createsuccess: false,
  delsuccess: false,
  updatesuccess: false,
  activeDurations: [],
  actsuccess:false,
};
const DurationsSlice = createSlice({
  name: "durations",
  initialState: initialState,
  reducers: {
    clearDurAction: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
      state.delsuccess = false;
      state.updatesuccess = false;
      state.createsuccess = false;
      state.actsuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createDuration.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase(createDuration.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase(createDuration.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getDurationsByType.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getDurationsByType.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getDurationsByType.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getActiveDurationsByType.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.actsuccess = false;
      })
      .addCase(getActiveDurationsByType.fulfilled, (state, action) => {
        state.submitting = false;
        state.activeDurations = action.payload;
        state.actsuccess = true;
        state.error = null;
      })
      .addCase(getActiveDurationsByType.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.actsuccess = false;
      })
      .addCase(updateStatusDurations.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updateStatusDurations.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.error = null;
      })
      .addCase(updateStatusDurations.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      .addCase(deleteDurations.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.delsuccess = false;
      })
      .addCase(deleteDurations.fulfilled, (state, action) => {
        state.submitting = false;
        state.delsuccess = true;
        state.error = null;
      })
      .addCase(deleteDurations.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.delsuccess = false;
      });
        
  },
});
export const DurationsReducer = DurationsSlice.reducer;
export const { clearDurAction } = DurationsSlice.actions; 