
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getFacilitiesapi, updatestatusfacilityapi, createfacilityapi, deletefacilityapi, getactiveFacilitiesapi } from '../services/api';
// import { getTagsapi, updatestatusTagapi, createTagapi, deleteTagapi, getTagsbystatusapi } from '../services/api';
import { getallBrandsapi, updatestatusBrandapi, createBrandapi, deleteBrandapi, getBrandsbystatusapi} from '../services/api';
export const createBrand = createAsyncThunk('brands/createbrand', async (formData, { rejectWithValue }) => {
  try {
    const response = await createBrandapi(formData);
    console.log(response);
    return response;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getBrands = createAsyncThunk('brands/getbrands', async (_, { rejectWithValue }) => {
  try {
    const response = await getallBrandsapi();
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getBrandsByStatus = createAsyncThunk('brands/getactivebrands', async (formData, { rejectWithValue }) => {
  try {
    const response = await getBrandsbystatusapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updateStatusBrands = createAsyncThunk('brands/updatestatus', async (formData, { rejectWithValue }) => {
    try {
      const response = await updatestatusBrandapi(formData);
      console.log(response);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const deleteBrands = createAsyncThunk('brands/delete', async (formData, { rejectWithValue }) => {
    try {
      const response = await deleteBrandapi(formData);
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
  activebrands: [],
  actsuccess:false,
};
const BrandsSlice = createSlice({
  name: "brands",
  initialState: initialState,
  reducers: {
    clearbrandAction: (state) => {
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
    .addCase(createBrand.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase(createBrand.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase(createBrand.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getBrands.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getBrandsByStatus.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.actsuccess = false;
      })
      .addCase(getBrandsByStatus.fulfilled, (state, action) => {
        state.submitting = false;
        state.activebrands = action.payload;
        state.actsuccess = true;
        state.error = null;
      })
      .addCase(getBrandsByStatus.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.actsuccess = false;
      })
      .addCase(updateStatusBrands.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updateStatusBrands.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.error = null;
      })
      .addCase(updateStatusBrands.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      .addCase(deleteBrands.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.delsuccess = false;
      })
      .addCase(deleteBrands.fulfilled, (state, action) => {
        state.submitting = false;
        state.delsuccess = true;
        state.error = null;
      })
      .addCase(deleteBrands.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.delsuccess = false;
      });
        
  },
});
export const brandsReducer = BrandsSlice.reducer;
export const { clearbrandAction } = BrandsSlice.actions; 