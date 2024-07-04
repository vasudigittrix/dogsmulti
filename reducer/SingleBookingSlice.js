import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getsinglecategoryapi, editsinglecategoryapi, getsingleBookingapi } from '../services/api';

export const getSingleBooking = createAsyncThunk('singlebooking/getbookings', async (formData, { rejectWithValue }) => {
    try {
      const response = await getsingleBookingapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
// export const editSingleCategory = createAsyncThunk('singlecategory/edit', async (arg, { rejectWithValue }) => {
//   try {
//     const {id, formData} = arg;
//     console.log(id, formData);
//     const response = await editsinglecategoryapi(id, formData);
//     return response.responseData;

//   } catch (error) {
//     return rejectWithValue(error.response);
//   }
// });


const initialState = {
    submitting: false,
    error: null,
    success: false,
    content: [],
    editsuccess: false,
  };
  const SingleBookingSlice = createSlice({
    name: "singlebooking",
    initialState: initialState,
    reducers: {
      clearsingbookAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.editsuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getSingleBooking.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getSingleBooking.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getSingleBooking.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      
    },
});

export const singlebookingReducer = SingleBookingSlice.reducer;
export const {  clearsingbookAction } = SingleBookingSlice.actions; 