import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gettrainingtypeapi, getactivetrainingtypeapi, updatestatustrainingtypeapi, createtrainingtypeapi, deletetrainingtypeapi } from '../services/api';
export const createTrainingType = createAsyncThunk('trainingtype/create', async (formData, { rejectWithValue }) => {
  try {
    const response = await createtrainingtypeapi(formData);
    console.log(response);
    return response;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getTrainingType = createAsyncThunk('trainingtype/getall', async (formData, { rejectWithValue }) => {
  try {
    const response = await gettrainingtypeapi();
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getActiveTrainingType = createAsyncThunk('trainingtype/getactive', async (formData, { rejectWithValue }) => {
  try {
    const response = await getactivetrainingtypeapi();
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updateStatusTrainingType = createAsyncThunk('trainingtype/updatestatus', async (formData, { rejectWithValue }) => {
    try {
      const response = await updatestatustrainingtypeapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const deleteTrainingType = createAsyncThunk('trainingtype/delete', async (formData, { rejectWithValue }) => {
    try {
      const response = await deletetrainingtypeapi(formData);
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
  activeTrainingType: [],
  actsuccess:false,
};
const TrainingTypeSlice = createSlice({
  name: "trainingtype",
  initialState: initialState,
  reducers: {
    clearttAction: (state) => {
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
    .addCase(createTrainingType.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase(createTrainingType.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase(createTrainingType.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getTrainingType.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getTrainingType.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getTrainingType.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getActiveTrainingType.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.actsuccess = false;
      })
      .addCase(getActiveTrainingType.fulfilled, (state, action) => {
        state.submitting = false;
        state.activeTrainingType = action.payload;
        state.actsuccess = true;
        state.error = null;
      })
      .addCase(getActiveTrainingType.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.actsuccess = false;
      })
      .addCase(updateStatusTrainingType.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updateStatusTrainingType.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.error = null;
      })
      .addCase(updateStatusTrainingType.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      .addCase( deleteTrainingType.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.delsuccess = false;
      })
      .addCase( deleteTrainingType.fulfilled, (state, action) => {
        state.submitting = false;
        state.delsuccess = true;
        state.error = null;
      })
      .addCase( deleteTrainingType.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.delsuccess = false;
      });
        
  },
});
export const TrainingTypeReducer = TrainingTypeSlice.reducer;
export const { clearttAction } = TrainingTypeSlice.actions; 