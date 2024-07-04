import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReviewByEmployeeapi } from '../../services/api';
export const getEmployeeProfile = createAsyncThunk('employee/getprofile', async (formData, { rejectWithValue }) => {
  try {
    const response = await getReviewByEmployeeapi(formData);
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
  delsuccess: false,
  updatesuccess: false,
  updatepaysuccess: false,
};
const ReviewByEmployeeSlice = createSlice({
  name: "reviewbyemployee",
  initialState: initialState,
  reducers: {
    clearrevempAction: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
      state.delsuccess = false;
      state.updatesuccess = false;
      state.updatepaysuccess = false;
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewByEmployee.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getReviewByEmployee.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getReviewByEmployee.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
  },
});
export const reviewbyemployeeReducer = ReviewByEmployeeSlice.reducer;
  export const { clearrevempAction } = ReviewByEmployeeSlice.actions; 