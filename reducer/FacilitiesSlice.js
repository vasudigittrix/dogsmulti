import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFacilitiesapi, updatestatusfacilityapi, createfacilityapi, deletefacilityapi, getactiveFacilitiesapi } from '../services/api';
export const createFacility = createAsyncThunk('facilities/createfacility', async (formData, { rejectWithValue }) => {
  try {
    const response = await createfacilityapi(formData);
    console.log(response);
    return response;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getFacilities = createAsyncThunk('facilities/getfacilities', async (formData, { rejectWithValue }) => {
  try {
    const response = await getFacilitiesapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getActiveFacilities = createAsyncThunk('facilities/getactivefacilities', async (formData, { rejectWithValue }) => {
  try {
    const response = await getactiveFacilitiesapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updateStatusFacilities = createAsyncThunk('facilities/updatestatus', async (formData, { rejectWithValue }) => {
    try {
      const response = await updatestatusfacilityapi(formData);
      console.log(response);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const deleteFacilities = createAsyncThunk('facilities/delete', async (formData, { rejectWithValue }) => {
    try {
      const response = await deletefacilityapi(formData);
      console.log(response);
      return response.responseData.data;
  
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
  activefacilities: [],
  actsuccess:false,
};
const FacilitiesSlice = createSlice({
  name: "facilities",
  initialState: initialState,
  reducers: {
    clearAction: (state) => {
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
    .addCase(createFacility.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase(createFacility.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase(createFacility.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getFacilities.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getFacilities.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getFacilities.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getActiveFacilities.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.actsuccess = false;
      })
      .addCase(getActiveFacilities.fulfilled, (state, action) => {
        state.submitting = false;
        state.activefacilities = action.payload;
        state.actsuccess = true;
        state.error = null;
      })
      .addCase(getActiveFacilities.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.actsuccess = false;
      })
      .addCase(updateStatusFacilities.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updateStatusFacilities.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.error = null;
      })
      .addCase(updateStatusFacilities.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      .addCase(deleteFacilities.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.delsuccess = false;
      })
      .addCase(deleteFacilities.fulfilled, (state, action) => {
        state.submitting = false;
        state.delsuccess = true;
        state.error = null;
      })
      .addCase(deleteFacilities.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.delsuccess = false;
      });
        
  },
});
export const facilitiesReducer = FacilitiesSlice.reducer;
export const { clearAction } = FacilitiesSlice.actions; 