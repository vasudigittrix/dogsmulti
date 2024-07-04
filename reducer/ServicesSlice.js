import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addcustomerapi, getcustomerlistapi, getcustomersapi} from '../services/api';
import { createcategoryapi, getcategoriesbytypeapi, deletecategoriesapi, updatecategoriesapi } from '../services/api';
import { getservicesbytypeapi, createserviceapi, updateservicesapi, deleteservicesapi, getservicesbycategoryeapi, getservicesbytypestatusapi } from '../services/api';

export const getServicesByType = createAsyncThunk('services/getservicesbytype', async (formData, { rejectWithValue }) => {
    try {
        console.log(formData, 'formaxsa');
      const response = await getservicesbytypeapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const getServicesByCategory = createAsyncThunk('services/getservicesbycategory', async (formData, { rejectWithValue }) => {
    try {
      const response = await getservicesbycategoryeapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
export const addServiceByType = createAsyncThunk('services/addservicebytype', async (formData, { rejectWithValue }) => {
  try {
    const response = await createserviceapi(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const deleteServiceByType = createAsyncThunk('services/deleteservice', async (formData, { rejectWithValue }) => {
    try {
      const response = await deleteservicesapi(formData);
      return response.responseData;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const updateServiceByType = createAsyncThunk('services/updateservicebytype', async (formData, { rejectWithValue }) => {
    try {
      const response = await updateservicesapi(formData);
      return response.responseData;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });



const initialState = {
    submitting: false,
    error: null,
    success: false,
    addsuccess: false,
    content: [],
    servicebycat: [],
    delsuccess: false,
    updatesuccess: false,
    servicebycat: [],
    catsuccess: false,
    statussuccess: false,
    statusdata: []
  };
  const ServicesSlice = createSlice({
    name: "services",
    initialState: initialState,
    reducers: {
      clearSerAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.addsuccess = false;
        state.delsuccess = false;
        state.updatesuccess = false;
        state.catsuccess = false;
        state.statussuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getServicesByType.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;

      })
      .addCase(getServicesByType.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getServicesByType.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      
      .addCase(getServicesByCategory.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.catsuccess = false;

      })
      .addCase(getServicesByCategory.fulfilled, (state, action) => {
        state.submitting = false;
        state.servicebycat = action.payload;
        state.catsuccess = true;
        state.error = null;
      })
      .addCase(getServicesByCategory.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.catsuccess = false;
      })
        .addCase(addServiceByType.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.addsuccess = false;

        })
        .addCase(addServiceByType.fulfilled, (state, action) => {
          state.submitting = false;
          state.addsuccess = true;
          state.error = null;
        })
        .addCase(addServiceByType.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.addsuccess = false;
        })
        .addCase(deleteServiceByType.pending, (state) => {
            state.submitting = true;
            state.error = null;
            state.delsuccess = false;
  
          })
          .addCase(deleteServiceByType.fulfilled, (state, action) => {
            state.submitting = false;
            state.delsuccess = true;
            state.error = null;
          })
          .addCase(deleteServiceByType.rejected, (state, action) => {
            state.submitting = false;
            state.error = action.payload;
            state.delsuccess = false;
          })
          .addCase(updateServiceByType.pending, (state) => {
            state.submitting = true;
            state.error = null;
            state.updatesuccess = false;
  
          })
          .addCase(updateServiceByType.fulfilled, (state, action) => {
            state.submitting = false;
            state.updatesuccess = true;
            state.error = null;
          })
          .addCase(updateServiceByType.rejected, (state, action) => {
            state.submitting = false;
            state.error = action.payload;
            state.updatesuccess = false;
          });
    },
});

export const servicesReducer = ServicesSlice.reducer;
export const {  clearSerAction } = ServicesSlice.actions; 