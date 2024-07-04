import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getservicesbytypeapi, createserviceapi, updateservicesapi, deleteservicesapi, getservicesbycategoryeapi, getservicesbytypestatusapi } from '../services/api';

// export const getServicesByType = createAsyncThunk('services/getservicesbytype', async (formData, { rejectWithValue }) => {
//     try {
//         console.log(formData, 'formaxsa');
//       const response = await getservicesbytypeapi(formData);
//       return response.responseData.data;
  
//     } catch (error) {
//       return rejectWithValue(error.response);
//     }
//   });
  export const getServiceByTypeStatus = createAsyncThunk('services/getservicesbytypestatus', async (formData, { rejectWithValue }) => {
    try {
        console.log(formData, 'formaxsa');
      const response = await  getservicesbytypestatusapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });




const initialState = {
    submitting: false,
    error: null,
    statussuccess: false,
    statuscontent: []
  };
  const ServicesFilterSlice = createSlice({
    name: "servicesfilter",
    initialState: initialState,
    reducers: {
        clearSerfilAction : (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.statussuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getServiceByTypeStatus.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.statussuccess = false;

      })
      .addCase(getServiceByTypeStatus.fulfilled, (state, action) => {
        state.submitting = false;
        state.statuscontent = action.payload;
        state.statussuccess = true;
        state.error = null;
      })
      .addCase(getServiceByTypeStatus.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.statussuccess = false;
      });
    },
});

export const servicesfilterReducer = ServicesFilterSlice.reducer;
export const {  clearSerfilAction } = ServicesFilterSlice.actions; 