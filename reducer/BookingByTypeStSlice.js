import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getBookingsByTypeapi, deleteBookingapi } from '../services/api';
import { getBookingBytypestatusapi, getBookingsBytypesearcheapi} from '../services/api';
export const getBookingByTypeStatus = createAsyncThunk('booking/getbookingbytypestatus', async (formData, { rejectWithValue }) => {
  try {
    const response = await getBookingBytypestatusapi(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getBookingByTypeSearch = createAsyncThunk('booking/getbookingbytypesearch', async (formData, { rejectWithValue }) => {
  try {
    const response = await getBookingsBytypesearcheapi(formData);
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
  searchsuccess: false,
  delsuccess: false,
  bookingbysearch : []
};
const BookingByTypeStatusSlice = createSlice({
  name: "bookingbytypestatus",
  initialState: initialState,
  reducers: {
    clearfilterAction: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
      state.delsuccess = false;
      state.searchsuccess=false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookingByTypeStatus.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getBookingByTypeStatus.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getBookingByTypeStatus.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getBookingByTypeSearch.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.searchsuccess = false;
      })
      .addCase(getBookingByTypeSearch.fulfilled, (state, action) => {
        state.submitting = false;
        state.bookingbysearch = action.payload;
        state.searchsuccess = true;
        state.error = null;
      })
      .addCase(getBookingByTypeSearch.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.searchsuccess = false;
      });
  },
});
export const bookingbytypestatusReducer = BookingByTypeStatusSlice.reducer;
  export const { clearfilterAction } = BookingByTypeStatusSlice.actions; 