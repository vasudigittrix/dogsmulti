import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createpetapi, editemployeeapi, fetchpetbyuserapi, deletepetapi } from '../services/api';
// export const createEmployeeByType = createAsyncThunk('employee/createemployee', async (formData, { rejectWithValue }) => {
//   try {
//     const response = await createemployeebytypeapi(formData);
//     return response;

//   } catch (error) {
//     return rejectWithValue(error.response);
//   }
// });
export const createPet = createAsyncThunk('pets/createpet', async (formData, { rejectWithValue }) => {
  try {
    const response = await createpetapi(formData);
    return response.responseData;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const fetchpetsbyuser = createAsyncThunk('employee/editemployee', async (formData, { rejectWithValue }) => {
  try {
    const response = await fetchpetbyuserapi(formData);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const deletePet = createAsyncThunk('pets/deletepet', async (formData, { rejectWithValue }) => {
  try {
    const response = await deletepetapi(formData);
    return response.responseData.data;

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
    editsuccess: false,
    delsuccess: false
  };
  const PetSlice = createSlice({
    name: "pet",
    initialState: initialState,
    reducers: {
      clearpetAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.editsuccess = false;
        state.addsuccess = false;
        state.delsuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createPet.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.addsuccess = false;
        })
        .addCase(createPet.fulfilled, (state, action) => {
          state.submitting = false;
          state.addsuccess = true;
          state.error = null;
        })
        .addCase(createPet.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.addsuccess = false;
        })
        .addCase(deletePet.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.delsuccess = false;
        })
        .addCase(deletePet.fulfilled, (state, action) => {
          state.submitting = false;
          state.delsuccess = true;
          state.error = null;
        })
        .addCase(deletePet.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.delsuccess = false;
        })
        .addCase(fetchpetsbyuser.pending, (state) => {
            state.submitting = true;
            state.error = null;
            state.success = false;
          })
          .addCase(fetchpetsbyuser.fulfilled, (state, action) => {
            state.submitting = false;
            state.success = true;
            state.content = action.payload;
            state.error = null;
          })
          .addCase(fetchpetsbyuser.rejected, (state, action) => {
            state.submitting = false;
            state.error = action.payload;
            state.success = false;
          });
    },
});

export const petReducer = PetSlice.reducer;
export const { clearpetAction } = PetSlice.actions; 