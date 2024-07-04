import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getsinglecategoryapi, editsinglecategoryapi } from '../services/api';

export const getSingleCategory = createAsyncThunk('singlecategory/getcategory', async (formData, { rejectWithValue }) => {
    try {
      const response = await getsinglecategoryapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
export const editSingleCategory = createAsyncThunk('singlecategory/edit', async (arg, { rejectWithValue }) => {
  try {
    const {id, formData} = arg;
    console.log(id, formData);
    const response = await editsinglecategoryapi(id, formData);
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
  const SingleCategorySlice = createSlice({
    name: "singlecategory",
    initialState: initialState,
    reducers: {
      clearscatAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.editsuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getSingleCategory.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;

      })
      .addCase(getSingleCategory.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getSingleCategory.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
        .addCase(editSingleCategory.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.editsuccess = false;

        })
        .addCase(editSingleCategory.fulfilled, (state, action) => {
          state.submitting = false;
          state.editsuccess = true;
          state.error = null;
        })
        .addCase(editSingleCategory.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.editsuccess = false;
        });
    },
});

export const singlecategoryReducer = SingleCategorySlice.reducer;
export const {  clearscatAction } = SingleCategorySlice.actions; 