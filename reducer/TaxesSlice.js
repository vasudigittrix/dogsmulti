import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getFacilitiesapi, updatestatusfacilityapi, createfacilityapi, deletefacilityapi, getactiveFacilitiesapi } from '../services/api';
import { getTagsapi, updatestatusTagapi, createTagapi, deleteTagapi, getTagsbystatusapi } from '../services/api';
import { getTaxesapi, updatestatusTaxapi, createTaxapi, deleteTaxapi, getTaxesbystatusapi, getTaxesbymoduleapi  } from '../services/api';
export const createTax = createAsyncThunk('taxs/createtax', async (formData, { rejectWithValue }) => {
  try {
    const response = await createTaxapi(formData);
    console.log(response);
    return response;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getTaxes = createAsyncThunk('taxs/gettaxes', async (formData, { rejectWithValue }) => {
  try {
    const response = await getTaxesapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getTaxesByStatus = createAsyncThunk('taxes/gettaxesbystatus', async (formData, { rejectWithValue }) => {
  try {
    const response = await getTaxesbystatusapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getTaxesByModule = createAsyncThunk('taxes/gettaxesbymodule', async (formData, { rejectWithValue }) => {
  try {
    const response = await getTaxesbymoduleapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updateStatusTaxes = createAsyncThunk('taxes/updatestatus', async (formData, { rejectWithValue }) => {
    try {
      const response = await updatestatusTaxapi(formData);
      console.log(response);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const deleteTaxes = createAsyncThunk('taxes/delete', async (formData, { rejectWithValue }) => {
    try {
      const response = await deleteTaxapi(formData);
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
const TaxesSlice = createSlice({
  name: "taxes",
  initialState: initialState,
  reducers: {
    cleartaxAction: (state) => {
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
    .addCase(createTax.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase(createTax.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase(createTax.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getTaxes.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getTaxes.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getTaxes.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getTaxesByStatus.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.actsuccess = false;
      })
      .addCase(getTaxesByStatus.fulfilled, (state, action) => {
        state.submitting = false;
        state.activetaxess = action.payload;
        state.actsuccess = true;
        state.error = null;
      })
      .addCase(getTaxesByStatus.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.actsuccess = false;
      })
      .addCase(getTaxesByModule.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.modsuccess = false;
      })
      .addCase(getTaxesByModule.fulfilled, (state, action) => {
        state.submitting = false;
        state.modtaxes = action.payload;
        state.modsuccess = true;
        state.error = null;
      })
      .addCase(getTaxesByModule.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.modsuccess = false;
      })
      .addCase(updateStatusTaxes.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updateStatusTaxes.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.error = null;
      })
      .addCase(updateStatusTaxes.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      .addCase(deleteTaxes.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.delsuccess = false;
      })
      .addCase(deleteTaxes.fulfilled, (state, action) => {
        state.submitting = false;
        state.delsuccess = true;
        state.error = null;
      })
      .addCase(deleteTaxes.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.delsuccess = false;
      });
        
  },
});
export const taxesReducer = TaxesSlice.reducer;
export const { cleartaxAction } = TaxesSlice.actions; 