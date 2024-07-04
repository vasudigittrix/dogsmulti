import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getsingletagapi, editsingletagapi, getsingleunitapi, editsingleunitapi } from '../services/api';
export const getSingleunit = createAsyncThunk('singleunit/getunit', async (formData, { rejectWithValue }) => {
    try {
      const response = await getsingleunitapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
export const editSingleunit= createAsyncThunk('singleunit/editunit', async (arg, { rejectWithValue }) => {
  try {
    const {id, formData} = arg;
    console.log(id, formData);
    const response = await editsingleunitapi(id, formData);
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
  const SingleunitSlice = createSlice({
    name: "singleunit",
    initialState: initialState,
    reducers: {
      clearsinunitAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.editsuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getSingleunit.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;

      })
      .addCase(getSingleunit.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getSingleunit.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
        .addCase(editSingleunit.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.editsuccess = false;

        })
        .addCase(editSingleunit.fulfilled, (state, action) => {
          state.submitting = false;
          state.editsuccess = true;
          state.error = null;
        })
        .addCase(editSingleunit.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.editsuccess = false;
        });
    },
});

export const singleunitReducer = SingleunitSlice.reducer;
export const {  clearsinunitAction } = SingleunitSlice.actions; 