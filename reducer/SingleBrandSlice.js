import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getsingletagapi, editsingletagapi, getsingleunitapi, editsingleunitapi } from '../services/api';
import { getsinglebrandapi,editsinglebrandapi } from '../services/api';
export const getSingleBrand = createAsyncThunk('singlebrand/getbrand', async (formData, { rejectWithValue }) => {
    try {
      const response = await getsinglebrandapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
export const editSingleBrand= createAsyncThunk('singlebrand/editbrand', async (arg, { rejectWithValue }) => {
  try {
    const {id, formData} = arg;
    console.log(id, formData);
    const response = await editsinglebrandapi(id, formData);
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
  const SingleBrandSlice = createSlice({
    name: "singlebrand",
    initialState: initialState,
    reducers: {
      clearsinbrandAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.editsuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getSingleBrand.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;

      })
      .addCase(getSingleBrand.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getSingleBrand.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
        .addCase(editSingleBrand.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.editsuccess = false;

        })
        .addCase(editSingleBrand.fulfilled, (state, action) => {
          state.submitting = false;
          state.editsuccess = true;
          state.error = null;
        })
        .addCase(editSingleBrand.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.editsuccess = false;
        });
    },
});

export const singlebrandReducer = SingleBrandSlice.reducer;
export const {  clearsinbrandAction } = SingleBrandSlice.actions; 