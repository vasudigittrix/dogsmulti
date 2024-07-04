import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getsingleserviceapi, editsingleserviceapi } from '../services/api';
import { getsingletagapi, editsingletagapi } from '../services/api';
export const getSingletag = createAsyncThunk('singletag/gettag', async (formData, { rejectWithValue }) => {
    try {
        console.log(formData);
      const response = await getsingletagapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
export const editSingletag = createAsyncThunk('singletag/edittag', async (arg, { rejectWithValue }) => {
  try {
    const {id, formData} = arg;
    console.log(id, formData);
    const response = await editsingletagapi(id, formData);
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
  const SingletagSlice = createSlice({
    name: "singletag",
    initialState: initialState,
    reducers: {
      clearsintagAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.editsuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getSingletag.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;

      })
      .addCase(getSingletag.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getSingletag.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
        .addCase(editSingletag.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.editsuccess = false;

        })
        .addCase(editSingletag.fulfilled, (state, action) => {
          state.submitting = false;
          state.editsuccess = true;
          state.error = null;
        })
        .addCase(editSingletag.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.editsuccess = false;
        });
    },
});

export const singletagReducer = SingletagSlice.reducer;
export const {  clearsintagAction } = SingletagSlice.actions; 