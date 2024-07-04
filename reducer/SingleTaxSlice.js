import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getsingletaxapi, editsingletaxapi } from '../services/api';
export const getSingletax = createAsyncThunk('singletax/gettax', async (formData, { rejectWithValue }) => {
    try {
        console.log(formData);
      const response = await getsingletaxapi(formData);
      console.log(response.responseData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
export const editSingletax = createAsyncThunk('singletax/edittax', async (arg, { rejectWithValue }) => {
  try {
    const {id, formData} = arg;
    console.log(id, formData);
    const response = await editsingletaxapi(id, formData);
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
  const SingletaxSlice = createSlice({
    name: "singletax",
    initialState: initialState,
    reducers: {
      clearsintaxAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.editsuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getSingletax.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;

      })
      .addCase(getSingletax.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getSingletax.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
        .addCase(editSingletax.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.editsuccess = false;

        })
        .addCase(editSingletax.fulfilled, (state, action) => {
          state.submitting = false;
          state.editsuccess = true;
          state.error = null;
        })
        .addCase(editSingletax.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.editsuccess = false;
        });
    },
});

export const singletaxReducer = SingletaxSlice.reducer;
export const {  clearsintaxAction } = SingletaxSlice.actions; 