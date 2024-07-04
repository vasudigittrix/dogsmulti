import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBookingsByTypeapi, deleteBookingapi, updatestatusBookingapi, updatepaystatusBookingapi, createBookingsByTypeapi } from '../services/api';
export const createBookingByType = createAsyncThunk('booking/createbooking', async (formData, { rejectWithValue }) => {
  try {
    const response = await createBookingsByTypeapi(formData);
    console.log(response.responseData.data);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getBookingByType = createAsyncThunk('booking/getbookingbytype', async (formData, { rejectWithValue }) => {
  try {
    const response = await getBookingsByTypeapi(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const deleteBooking = createAsyncThunk('booking/delete', async (formData, { rejectWithValue }) => {
  try {
    const response = await deleteBookingapi(formData);
    // console.log(response.responseData.data);
    console.log(response);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updatestatusBooking = createAsyncThunk('booking/updatestatus', async (formData, { rejectWithValue }) => {
  try {
    const response = await updatestatusBookingapi(formData);
    console.log(response);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updatepaystatusBooking = createAsyncThunk('booking/updatepaystatus', async (formData, { rejectWithValue }) => {
  try {
    const response = await updatepaystatusBookingapi(formData);
    console.log(response);
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
  createsuccess: false,
  delsuccess: false,
  updatesuccess: false,
  updatepaysuccess: false,
};
const BookingByTypeSlice = createSlice({
  name: "bookingbytype",
  initialState: initialState,
  reducers: {
    clearAction: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
      state.delsuccess = false;
      state.updatesuccess = false;
      state.updatepaysuccess = false;
      state.createsuccess = false;
      
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createBookingByType.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase(createBookingByType.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase(createBookingByType.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getBookingByType.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getBookingByType.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getBookingByType.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updatestatusBooking.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updatestatusBooking.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.error = null;
      })
      .addCase(updatestatusBooking.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      .addCase(updatepaystatusBooking.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatepaysuccess = false;
      })
      .addCase(updatepaystatusBooking.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatepaysuccess = true;
        state.error = null;
      })
      .addCase(updatepaystatusBooking.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatepaysuccess = false;
      })
      .addCase(deleteBooking.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.delsuccess = false;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.submitting = false;
        state.delsuccess = true;
        state.error = null;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.delsuccess = false;
      });
  },
});
export const bookingbytypeReducer = BookingByTypeSlice.reducer;
  export const { clearAction } = BookingByTypeSlice.actions; 