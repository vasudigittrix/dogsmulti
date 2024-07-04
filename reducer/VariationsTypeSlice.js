import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createvartypeapi, getallvartypeapi, getvartypestatusapi} from '../services/api';
export const createVariationType = createAsyncThunk('variationtype/create', async (formData, { rejectWithValue }) => {
  try {
    const response = await createvartypeapi(formData);
    console.log(response);
    return response;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getAllVarTypes = createAsyncThunk('variationtype/getall', async (formData, { rejectWithValue }) => {
  try {
    const response = await getallvartypeapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getVarTypesByStatus = createAsyncThunk('variationtype/getbystatus', async (formData, { rejectWithValue }) => {
  try {
    const response = await getvartypestatusapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
// export const updateStatusUnits = createAsyncThunk('units/updatestatus', async (formData, { rejectWithValue }) => {
//     try {
//       const response = await updatestatusUnitapi(formData);
//       console.log(response);
//       return response.responseData.data;
  
//     } catch (error) {
//       return rejectWithValue(error.response);
//     }
//   });
//   export const deleteUnits = createAsyncThunk('units/delete', async (formData, { rejectWithValue }) => {
//     try {
//       const response = await deleteUnitapi(formData);
//       console.log(response);
//       return response.responseData.data;
  
//     } catch (error) {
//       return rejectWithValue(error.response);
//     }
//   });
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
  activevartype: [],
  actsuccess:false,
};
const VariationsTypeSlice = createSlice({
  name: "variationtype",
  initialState: initialState,
  reducers: {
    clearvarAction: (state) => {
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
    .addCase(createVariationType.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase(createVariationType.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase(createVariationType.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getAllVarTypes.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllVarTypes.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getAllVarTypes.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getVarTypesByStatus.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.actsuccess = false;
      })
      .addCase(getVarTypesByStatus.fulfilled, (state, action) => {
        state.submitting = false;
        state.activevartype = action.payload;
        state.actsuccess = true;
        state.error = null;
      })
      .addCase(getVarTypesByStatus.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.actsuccess = false;
      })
    //   .addCase(updateStatusUnits.pending, (state) => {
    //     state.submitting = true;
    //     state.error = null;
    //     state.updatesuccess = false;
    //   })
    //   .addCase(updateStatusUnits.fulfilled, (state, action) => {
    //     state.submitting = false;
    //     state.updatesuccess = true;
    //     state.error = null;
    //   })
    //   .addCase(updateStatusUnits.rejected, (state, action) => {
    //     state.submitting = false;
    //     state.error = action.payload;
    //     state.updatesuccess = false;
    //   })
    //   .addCase(deleteUnits.pending, (state) => {
    //     state.submitting = true;
    //     state.error = null;
    //     state.delsuccess = false;
    //   })
    //   .addCase(deleteUnits.fulfilled, (state, action) => {
    //     state.submitting = false;
    //     state.delsuccess = true;
    //     state.error = null;
    //   })
    //   .addCase(deleteUnits.rejected, (state, action) => {
    //     state.submitting = false;
    //     state.error = action.payload;
    //     state.delsuccess = false;
    //   });
        
  },
});
export const variationtypeReducer = VariationsTypeSlice.reducer;
export const { clearvarAction } = VariationsTypeSlice.actions; 