import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getFacilitiesapi, updatestatusfacilityapi, createfacilityapi, deletefacilityapi, getactiveFacilitiesapi } from '../services/api';
// import { getTagsapi, updatestatusTagapi, createTagapi, deleteTagapi, getTagsbystatusapi } from '../services/api';
import { getallUnitsapi, updatestatusUnitapi, createUnitapi, deleteUnitapi, getUnitsbystatusapi } from '../services/api';
export const createUnit = createAsyncThunk('units/createunit', async (formData, { rejectWithValue }) => {
  try {
    const response = await createUnitapi(formData);
    console.log(response);
    return response;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getUnits = createAsyncThunk('units/getunits', async (formData, { rejectWithValue }) => {
  try {
    const response = await getallUnitsapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getUnitsByStatus = createAsyncThunk('units/getunitsbystatus', async (formData, { rejectWithValue }) => {
  try {
    const response = await getUnitsbystatusapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updateStatusUnits = createAsyncThunk('units/updatestatus', async (formData, { rejectWithValue }) => {
    try {
      const response = await updatestatusUnitapi(formData);
      console.log(response);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const deleteUnits = createAsyncThunk('units/delete', async (formData, { rejectWithValue }) => {
    try {
      const response = await deleteUnitapi(formData);
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
  activeunits: [],
  actsuccess:false,
};
const UnitsSlice = createSlice({
  name: "units",
  initialState: initialState,
  reducers: {
    clearunitAction: (state) => {
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
    .addCase(createUnit.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase(createUnit.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase(createUnit.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getUnits.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getUnits.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getUnits.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getUnitsByStatus.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.actsuccess = false;
      })
      .addCase(getUnitsByStatus.fulfilled, (state, action) => {
        state.submitting = false;
        state.activeunits = action.payload;
        state.actsuccess = true;
        state.error = null;
      })
      .addCase(getUnitsByStatus.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.actsuccess = false;
      })
      .addCase(updateStatusUnits.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updateStatusUnits.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.error = null;
      })
      .addCase(updateStatusUnits.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      .addCase(deleteUnits.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.delsuccess = false;
      })
      .addCase(deleteUnits.fulfilled, (state, action) => {
        state.submitting = false;
        state.delsuccess = true;
        state.error = null;
      })
      .addCase(deleteUnits.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.delsuccess = false;
      });
        
  },
});
export const unitsReducer = UnitsSlice.reducer;
export const { clearunitAction } = UnitsSlice.actions; 