import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getallBookingseapi, getallBookingsBySearchapi, getallBookingsByStatuseapi } from '../services/api';
export const getBookings = createAsyncThunk('booking/getallbooking', async (formData, { rejectWithValue }) => {
  try {
    const response = await getallBookingseapi(formData);
    console.log(response.responseData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getBookingsByStatus = createAsyncThunk('booking/getallbookingbystatus', async (formData, { rejectWithValue }) => {
    try {
      const response = await getallBookingsByStatuseapi(formData);
      console.log(response.responseData);
      return response.responseData;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const getBookingsBySearch = createAsyncThunk('booking/getallbookingsbysearch', async (formData, { rejectWithValue }) => {
    try {
      const response = await getallBookingsBySearchapi(formData);
      console.log(response.responseData , 'seacrg');
      return response.responseData;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });



const initialState = {
  submitting: false,
  error: null,
  success: false,
  content: [],
  searchcontent:[],
  statuscontent: [],
  searchsuccess: false,
    statussuccess : false,
};
const BookingSlice = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {
    clearBookAction: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
      state.searchsuccess= false;
      state.statussuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getBookings.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.success = false;
    })
    .addCase(getBookings.fulfilled, (state, action) => {
      state.submitting = false;
      state.success = true;
      state.error = null;
      state.content = action.payload;
    })
    .addCase(getBookings.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase(getBookingsByStatus.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.statussuccess = false;
      })
      .addCase(getBookingsByStatus.fulfilled, (state, action) => {
        state.submitting = false;
        state.statussuccess = true;
        state.error = null;
        state.statuscontent = action.payload;
      })
      .addCase(getBookingsByStatus.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.statussuccess = false;
      })
      .addCase(getBookingsBySearch.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.searchsuccess = true;
      })
      .addCase(getBookingsBySearch.fulfilled, (state, action) => {
        state.submitting = false;
        state.searchsuccess = true;
        state.error = null;
        state.searchcontent = action.payload;
      })
      .addCase(getBookingsBySearch.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.searchsuccess = true;
      })
    
  },
});
export const bookingReducer = BookingSlice.reducer;
  export const { clearBookAction } = BookingSlice.actions; 