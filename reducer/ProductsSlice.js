
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getallproductsapi, createproductapi, updatestatusproductapi, updatefeaturedproductapi, deleteproductapi, getproductsbystatusapi } from '../services/api';
export const createProduct = createAsyncThunk('products/createproduct', async (formData, { rejectWithValue }) => {
  try {
    console.log(formData);
    const response = await createproductapi(formData);
    console.log(response);
    return response;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getAllProducts = createAsyncThunk('products/getproducts', async (formData, { rejectWithValue }) => {
  try {
    const response = await getallproductsapi(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getProductsByStatus = createAsyncThunk('products/getbystatus', async (formData, { rejectWithValue }) => {
  try {
    const response = await getproductsbystatusapi(formData);
    console.log(response.responseData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updateStatusProduct = createAsyncThunk('product/updatestatus', async (formData, { rejectWithValue }) => {
    try {
      const response = await updatestatusproductapi(formData);
      console.log(response);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const updatefeaturedProduct = createAsyncThunk('product/updatefeatured', async (formData, { rejectWithValue }) => {
    try {
      const response = await updatefeaturedproductapi(formData);
      console.log(response);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const deleteProduct = createAsyncThunk('productc/delete', async (formData, { rejectWithValue }) => {
    try {
      const response = await deleteproductapi(formData);
      console.log(response);
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
  updatesuccess: false,
  updatefsuccess: false,
  activeproducts: [],
  actsuccess:false,
};
const ProductsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    clearproductsAction: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
      state.delsuccess = false;
      state.updatesuccess = false;
      state.createsuccess = false;
      state.actsuccess = false;
      state.updatefsuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createProduct.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getAllProducts.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getProductsByStatus.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.actsuccess = false;
      })
      .addCase(getProductsByStatus.fulfilled, (state, action) => {
        state.submitting = false;
        state.activeproducts = action.payload;
        state.actsuccess = true;
        state.error = null;
      })
      .addCase(getProductsByStatus.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.actsuccess = false;
      })
      .addCase(updateStatusProduct.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updateStatusProduct.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.error = null;
      })
      .addCase(updateStatusProduct.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      .addCase(updatefeaturedProduct.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatefsuccess = false;
      })
      .addCase(updatefeaturedProduct.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatefsuccess = true;
        state.error = null;
      })
      .addCase(updatefeaturedProduct.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatefsuccess = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.delsuccess = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.submitting = false;
        state.delsuccess = true;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.delsuccess = false;
      });
        
  },
});
export const productReducer = ProductsSlice.reducer;
export const { clearproductsAction } = ProductsSlice.actions; 