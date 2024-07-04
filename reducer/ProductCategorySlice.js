
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getFacilitiesapi, updatestatusfacilityapi, createfacilityapi, deletefacilityapi, getactiveFacilitiesapi } from '../services/api';
// import { getTagsapi, updatestatusTagapi, createTagapi, deleteTagapi, getTagsbystatusapi } from '../services/api';
import { getallPCategoryapi, updatestatusPCategoryapi, createPCategoryapi, deletePCategorypi, getPCategorybystatusapi } from '../services/api';
export const createPCategory = createAsyncThunk('productcategory/createcategory', async (formData, { rejectWithValue }) => {
  try {
    const response = await createPCategoryapi(formData);
    console.log(response);
    return response;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getPCategory = createAsyncThunk('productcategory/getcategory', async (_, { rejectWithValue }) => {
  try {
    const response = await getallPCategoryapi();
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getPCategoryByStatus = createAsyncThunk('productcategory/getbystatus', async (formData, { rejectWithValue }) => {
  try {
    const response = await getPCategorybystatusapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updateStatusPCategory = createAsyncThunk('productcategory/updatestatus', async (formData, { rejectWithValue }) => {
    try {
      const response = await updatestatusPCategoryapi(formData);
      console.log(response);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const deletePCategory = createAsyncThunk('productcategory/delete', async (formData, { rejectWithValue }) => {
    try {
      const response = await deletePCategorypi(formData);
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
  activepcategory: [],
  actsuccess:false,
};
const ProductCategorySlice = createSlice({
  name: "pcategory",
  initialState: initialState,
  reducers: {
    clearpcategoryAction: (state) => {
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
    .addCase(createPCategory.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase(createPCategory.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase(createPCategory.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getPCategory.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getPCategory.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getPCategory.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getPCategoryByStatus.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.actsuccess = false;
      })
      .addCase(getPCategoryByStatus.fulfilled, (state, action) => {
        state.submitting = false;
        state.activepcategory = action.payload;
        state.actsuccess = true;
        state.error = null;
      })
      .addCase(getPCategoryByStatus.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.actsuccess = false;
      })
      .addCase(updateStatusPCategory.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updateStatusPCategory.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.error = null;
      })
      .addCase(updateStatusPCategory.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      .addCase(deletePCategory.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.delsuccess = false;
      })
      .addCase(deletePCategory.fulfilled, (state, action) => {
        state.submitting = false;
        state.delsuccess = true;
        state.error = null;
      })
      .addCase(deletePCategory.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.delsuccess = false;
      });
        
  },
});
export const productcategoryReducer = ProductCategorySlice.reducer;
export const { clearpcategoryAction } = ProductCategorySlice.actions; 