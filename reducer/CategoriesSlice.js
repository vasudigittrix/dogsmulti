import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createcategoryapi, getcategoriesbytypeapi, deletecategoriesapi, updatecategoriesapi, getcategoriesbytypestatusapi } from '../services/api';
// export const createEmployeeByType = createAsyncThunk('employee/createemployee', async (formData, { rejectWithValue }) => {
//   try {
//     const response = await createemployeebytypeapi(formData);
//     return response;

//   } catch (error) {
//     return rejectWithValue(error.response);
//   }
// });
export const getCategoriesByType = createAsyncThunk('categories/getcategoriesbytype', async (formData, { rejectWithValue }) => {
    try {
        console.log(formData, 'formaxsa');
      const response = await getcategoriesbytypeapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const getCategoriesByTypeStatus = createAsyncThunk('categories/getcategoriesbytypestatus', async (formData, { rejectWithValue }) => {
    try {
        console.log(formData, 'formaxsa');
      const response = await getcategoriesbytypestatusapi(formData);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
export const addCategoryByType = createAsyncThunk('categories/addcategorybytype', async (formData, { rejectWithValue }) => {
  try {
    const response = await createcategoryapi(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const deleteCategoryByType = createAsyncThunk('categories/deletecategorybytype', async (formData, { rejectWithValue }) => {
    try {
      const response = await deletecategoriesapi(formData);
      return response.responseData;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const updateCategoryByType = createAsyncThunk('categories/updatecategorybytype', async (formData, { rejectWithValue }) => {
    try {
      const response = await updatecategoriesapi(formData);
      return response.responseData;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });



const initialState = {
    submitting: false,
    error: null,
    success: false,
    addsuccess: false,
    content: [],
    statuscontent: [],
    delsuccess: false,
    updatesuccess: false,
    statussuccess: false,
  };
  const CategoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {
      clearCatAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.addsuccess = false;
        state.delsuccess = false;
        state.updatesuccess = false;
        state.statussuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getCategoriesByType.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;

      })
      .addCase(getCategoriesByType.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getCategoriesByType.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getCategoriesByTypeStatus.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.statussuccess = false;

      })
      .addCase(getCategoriesByTypeStatus.fulfilled, (state, action) => {
        state.submitting = false;
        state.statuscontent = action.payload;
        state.statussuccess = true;
        state.error = null;
      })
      .addCase(getCategoriesByTypeStatus.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.statussuccess = false;
      })
        .addCase(addCategoryByType.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.addsuccess = false;

        })
        .addCase(addCategoryByType.fulfilled, (state, action) => {
          state.submitting = false;
          state.addsuccess = true;
          state.error = null;
        })
        .addCase(addCategoryByType.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.addsuccess = false;
        })
        .addCase(deleteCategoryByType.pending, (state) => {
            state.submitting = true;
            state.error = null;
            state.delsuccess = false;
  
          })
          .addCase(deleteCategoryByType.fulfilled, (state, action) => {
            state.submitting = false;
            state.delsuccess = true;
            state.error = null;
          })
          .addCase(deleteCategoryByType.rejected, (state, action) => {
            state.submitting = false;
            state.error = action.payload;
            state.delsuccess = false;
          })
          .addCase(updateCategoryByType.pending, (state) => {
            state.submitting = true;
            state.error = null;
            state.updatesuccess = false;
  
          })
          .addCase(updateCategoryByType.fulfilled, (state, action) => {
            state.submitting = false;
            state.updatesuccess = true;
            state.error = null;
          })
          .addCase(updateCategoryByType.rejected, (state, action) => {
            state.submitting = false;
            state.error = action.payload;
            state.updatesuccess = false;
          });
    },
});

export const categoriesReducer = CategoriesSlice.reducer;
export const {  clearCatAction } = CategoriesSlice.actions; 