import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getsinglecategoryapi, editsinglecategoryapi, getsingleBookingapi } from '../services/api';
import { getsingleproductapi, upstocksingleproductapi, upstockvariationapi, editsingleproductapi} from '../services/api';
export const getSingleProduct = createAsyncThunk('singleproduct/getproduct', async (formData, { rejectWithValue }) => {
    try {
      const response = await getsingleproductapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const editSingleProduct = createAsyncThunk('singleproduct/editproduct', async (arg, { rejectWithValue }) => {
    try {
      const {id, formData} = arg;
      const response = await editsingleproductapi(id, formData);
      return response.responseData;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
export const updatestocksingleProduct = createAsyncThunk('singleproduct/updatestock', async (formData, { rejectWithValue }) => {
  try {
    console.log(formData);
    const response = await upstocksingleproductapi(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updatestockProductvariant = createAsyncThunk('singleproduct/updatestockvariant', async (formData, { rejectWithValue }) => {
  try {
    console.log(formData);
    const response = await upstockvariationapi(formData);
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
    updatesuccess: false,
    editsuccess: false
  };
  const SingleProductSlice = createSlice({
    name: "singleproduct",
    initialState: initialState,
    reducers: {
      clearsingproAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.editsuccess = false;
        state.updatesuccess = false;
        state.editsuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getSingleProduct.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(editSingleProduct.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.editsuccess = false;
      })
      .addCase(editSingleProduct.fulfilled, (state, action) => {
        state.submitting = false;
        state.editsuccess = true;
        state.error = null;
      })
      .addCase(editSingleProduct.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.editsuccess = false;
      })
      .addCase(updatestocksingleProduct.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updatestocksingleProduct.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.error = null;
      })
      .addCase(updatestocksingleProduct.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      .addCase(updatestockProductvariant.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updatestockProductvariant.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.error = null;
      })
      .addCase(updatestockProductvariant.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      
    },
});

export const singleproductReducer = SingleProductSlice.reducer;
export const {   clearsingproAction} = SingleProductSlice.actions; 