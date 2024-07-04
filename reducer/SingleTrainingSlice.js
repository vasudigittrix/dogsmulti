import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getsingleserviceapi, editsingleserviceapi } from '../services/api';
import { getsingletrainingapi, editsingletrainingapi } from '../services/api';
export const getSingleTraining = createAsyncThunk('singletraining/get', async (formData, { rejectWithValue }) => {
    try {
      const response = await getsingletrainingapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
export const editSingleTraining = createAsyncThunk('singletraining/edit', async (arg, { rejectWithValue }) => {
  try {
    const {id, formData} = arg;
    console.log(id, formData);
    const response = await editsingletrainingapi(id, formData);
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
    editsuccess: false,
  };
  const SingletrainingSlice = createSlice({
    name: "singletraining",
    initialState: initialState,
    reducers: {
      cleartrainAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.editsuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getSingleTraining.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;

      })
      .addCase(getSingleTraining.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getSingleTraining.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
        .addCase(editSingleTraining.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.editsuccess = false;

        })
        .addCase(editSingleTraining.fulfilled, (state, action) => {
          state.submitting = false;
          state.editsuccess = true;
          state.error = null;
        })
        .addCase(editSingleTraining.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.editsuccess = false;
        });
    },
});

export const singletrainingReducer = SingletrainingSlice.reducer;
export const {  cleartrainAction } = SingletrainingSlice.actions; 