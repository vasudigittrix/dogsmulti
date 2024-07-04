import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getsinglecustomerapi } from '../services/api';
export const getCustomerDetails = createAsyncThunk('customer/getlist', async (formData, { rejectWithValue }) => {
    try {
      const response = await getsinglecustomerapi(formData);
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
    addsuccess: false,
    content: [],
    editsuccess: false,
    list: []
  };
  const SingleCustomerSlice = createSlice({
    name: "singlecustomer",
    initialState: initialState,
    reducers: {
      clearSingleCustAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.addsuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getCustomerDetails.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.success = false;

        })
        .addCase(getCustomerDetails.fulfilled, (state, action) => {
          state.submitting = false;
          state.content = action.payload;
          state.success = true;
          state.error = null;
        })
        .addCase(getCustomerDetails.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.success = false;
        });
    },
});

export const singlecustomerReducer = SingleCustomerSlice.reducer;
export const {  clearSingleCustAction } = SingleCustomerSlice.actions; 