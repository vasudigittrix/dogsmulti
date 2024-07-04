import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getallemployeereview, postreviewonemployeer, deleteemployeereviewapi } from '../services/api';
export const postReviewonEmployee = createAsyncThunk('employeereviews/createreview', async (formData, { rejectWithValue }) => {
  try {
    const response = await postreviewonemployeer(formData);
    console.log(response);
    return response;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getAllEmployeeReview = createAsyncThunk('employeereviews/getall', async (formData, { rejectWithValue }) => {
  try {
    const response = await getallemployeereview(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const deleteEmployeeReview = createAsyncThunk('employeereviews/delete', async (formData, { rejectWithValue }) => {
    try {
      const response = await deleteemployeereviewapi(formData);
      console.log(response.responseData.data);
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
};
const EmployeeReviewSlice = createSlice({
  name: "employeereviews",
  initialState: initialState,
  reducers: {
    clearEReviewsAction: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
      state.delsuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(postReviewonEmployee.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase(postReviewonEmployee.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase(postReviewonEmployee.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getAllEmployeeReview.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllEmployeeReview.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getAllEmployeeReview.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteEmployeeReview.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.delsuccess = false;
      })
      .addCase(deleteEmployeeReview.fulfilled, (state, action) => {
        state.submitting = false;
        state.delsuccess = true;
        state.error = null;
      })
      .addCase(deleteEmployeeReview.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.delsuccess = false;
      });
        
  },
});
export const EmployeeReviewReducer = EmployeeReviewSlice.reducer;
export const { clearEReviewsAction } = EmployeeReviewSlice.actions; 