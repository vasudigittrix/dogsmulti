import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBookingReportwithtimeapi, getBookingReportbytimeapi, } from '../services/api';
export const getBookingsReportsWithTime = createAsyncThunk('bookingreport/getall', async (formData, { rejectWithValue }) => {
  try {
    const response = await getBookingReportwithtimeapi(formData);
    console.log(response.responseData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getBookingsReportsByTime = createAsyncThunk('bookingreport/getbytime', async (formData, { rejectWithValue }) => {
  try {
    console.log(formData, 'booking form')
    const response = await getBookingReportbytimeapi(formData);
    console.log(response.responseData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
// export const getBookingsByStatus = createAsyncThunk('booking/getallbookingbystatus', async (formData, { rejectWithValue }) => {
//     try {
//       const response = await getallBookingsByStatuseapi(formData);
//       console.log(response.responseData);
//       return response.responseData;
  
//     } catch (error) {
//       return rejectWithValue(error.response);
//     }
//   });
//   export const getBookingsBySearch = createAsyncThunk('booking/getallbookingsbysearch', async (formData, { rejectWithValue }) => {
//     try {
//       const response = await getallBookingsBySearchapi(formData);
//       console.log(response.responseData , 'seacrg');
//       return response.responseData;
  
//     } catch (error) {
//       return rejectWithValue(error.response);
//     }
//   });



const initialState = {
  submitting: false,
  error: null,
  success: false,
  content: [],
  statuscontent: [],
    statussuccess : false,
};
const BookingReportSlice = createSlice({
  name: "bookingreport",
  initialState: initialState,
  reducers: {
    clearBookRepAction: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
      state.statussuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getBookingsReportsWithTime.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.success = false;
    })
    .addCase(getBookingsReportsWithTime.fulfilled, (state, action) => {
      state.submitting = false;
      state.success = true;
      state.error = null;
      state.content = action.payload;
    })
    .addCase(getBookingsReportsWithTime.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase(getBookingsReportsByTime.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.statussuccess = false;
    })
    .addCase(getBookingsReportsByTime.fulfilled, (state, action) => {
      state.submitting = false;
      state.statussuccess = true;
      state.error = null;
      state.statuscontent = action.payload;
    })
    .addCase(getBookingsReportsByTime.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.statussuccess = false;
    })
  },
});
export const bookingreportReducer = BookingReportSlice.reducer;
  export const { clearBookRepAction } = BookingReportSlice.actions; 