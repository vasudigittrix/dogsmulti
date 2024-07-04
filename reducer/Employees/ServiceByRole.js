import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getservicesbyRoleapi, createserviceapi, updateservicesapi, deleteservicesapi, getservicesbycategoryeapi, getservicesbytypestatusapi } from '../../services/api';

export const getServicesByRole = createAsyncThunk('services/getservicesbyrole', async (formData, { rejectWithValue }) => {
    try {
      const response = await getservicesbyRoleapi(formData);
      return response.responseData.data;
  
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
  const ServicesByRoleSlice = createSlice({
    name: "servicesbyrole",
    initialState: initialState,
    reducers: {
      clearSrvroleAction: (state) => {
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
      .addCase(getServicesByRole.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;

      })
      .addCase(getServicesByRole.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getServicesByRole.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      });
    },
});

export const servicesbyroleReducer = ServicesByRoleSlice.reducer;
export const {  clearSrvroleAction } = ServicesByRoleSlice.actions; 