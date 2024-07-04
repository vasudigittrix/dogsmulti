import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBookingsByEmployeeapi, getBookingsByEmployeeStatusapi, getBookingsByEmployeeSearchapi} from '../../services/api';
import { FlaskEmptyPlusOutline } from 'mdi-material-ui';
export const getBookingByEmployee = createAsyncThunk('booking/getbookingbyemployee', async (formData, { rejectWithValue }) => {
  try {
    const response = await getBookingsByEmployeeapi(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getBookingByEmployeeStatus = createAsyncThunk('booking/getbookingbyemployeestatus', async (formData, { rejectWithValue }) => {
  try {
    console.log(formData);
    const response = await getBookingsByEmployeeStatusapi(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getBookingByEmployeeSearch = createAsyncThunk('booking/getbookingbyemployeesearch', async (formData, { rejectWithValue }) => {
  try {
    const response = await getBookingsByEmployeeSearchapi(formData);
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
  statsuccess: false,
  statcontent: [],
  searchsuccess: false,
  searchcontent: []
};
const BookingByEmployeeSlice = createSlice({
  name: "bookingbyemployee",
  initialState: initialState,
  reducers: {
    clearbookempAction: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
      state.statsuccess = false;
      state.searchsuccess = false;      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookingByEmployee.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getBookingByEmployee.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getBookingByEmployee.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getBookingByEmployeeStatus.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.statsuccess = false;
      })
      .addCase(getBookingByEmployeeStatus.fulfilled, (state, action) => {
        state.submitting = false;
        state.statcontent = action.payload;
        state.statsuccess = true;
        state.error = null;
      })
      .addCase(getBookingByEmployeeStatus.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.statsuccess = false;
      })
      .addCase(getBookingByEmployeeSearch.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.searchsuccess = false;
      })
      .addCase(getBookingByEmployeeSearch.fulfilled, (state, action) => {
        state.submitting = false;
        state.searchcontent = action.payload;
        state.searchsuccess = true;
        state.error = null;
      })
      .addCase(getBookingByEmployeeSearch.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.searchsuccess = false;
      })
  },
});
export const bookingbyemployeeReducer = BookingByEmployeeSlice.reducer;
  export const { clearbookempAction } = BookingByEmployeeSlice.actions; 