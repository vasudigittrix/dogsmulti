import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getsingleserviceapi, editsingleserviceapi } from '../services/api';

export const getSingleservice = createAsyncThunk('singleservice/getservice', async (formData, { rejectWithValue }) => {
    try {
      const response = await getsingleserviceapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
export const editSingleservice = createAsyncThunk('singleservice/edit', async (arg, { rejectWithValue }) => {
  try {
    const {id, formData} = arg;
    console.log(id, formData);
    const response = await editsingleserviceapi(id, formData);
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
  const SingleserviceSlice = createSlice({
    name: "singleservice",
    initialState: initialState,
    reducers: {
      clearserviceAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.editsuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getSingleservice.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;

      })
      .addCase(getSingleservice.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getSingleservice.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
        .addCase(editSingleservice.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.editsuccess = false;

        })
        .addCase(editSingleservice.fulfilled, (state, action) => {
          state.submitting = false;
          state.editsuccess = true;
          state.error = null;
        })
        .addCase(editSingleservice.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.editsuccess = false;
        });
    },
});

export const singleserviceReducer = SingleserviceSlice.reducer;
export const {  clearserviceAction } = SingleserviceSlice.actions; 