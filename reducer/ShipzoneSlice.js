import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getshipzoneapi, createshipzoneapi, deleteshipzoneapi } from '../services/api';
export const createShipzone = createAsyncThunk('shipzone/create', async (formData, { rejectWithValue }) => {
  try {
    const response = await createshipzoneapi(formData);
    console.log(response);
    return response;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getallShipzone = createAsyncThunk('shipzone/getall', async (formData, { rejectWithValue }) => {
  try {
    const response = await getshipzoneapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});

  export const deleteShipzone = createAsyncThunk('shipzone/delete', async (formData, { rejectWithValue }) => {
    try {
      const response = await  deleteshipzoneapi(formData);
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
const ShipzoneSlice = createSlice({
  name: "shipzone",
  initialState: initialState,
  reducers: {
    clearshipzAction: (state) => {
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
    .addCase( createShipzone.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase( createShipzone.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase( createShipzone.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getallShipzone.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getallShipzone.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getallShipzone.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteShipzone.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.delsuccess = false;
      })
      .addCase(deleteShipzone.fulfilled, (state, action) => {
        state.submitting = false;
        state.delsuccess = true;
        state.error = null;
      })
      .addCase(deleteShipzone.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.delsuccess = false;
      });
        
  },
});
export const shipzoneReducer = ShipzoneSlice.reducer;
export const { clearshipzAction } = ShipzoneSlice.actions; 