import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addcustomerapi, getcustomerlistapi, getcustomersapi, getactivecustomersapi, updatestatuscustomerapi, deletecustomerapi} from '../services/api';
// export const createEmployeeByType = createAsyncThunk('employee/createemployee', async (formData, { rejectWithValue }) => {
//   try {
//     const response = await createemployeebytypeapi(formData);
//     return response;

//   } catch (error) {
//     return rejectWithValue(error.response);
//   }
// });
export const getCustomers = createAsyncThunk('customer/getcustomers', async (formData, { rejectWithValue }) => {
    try {
      const response = await getcustomersapi(formData);
      return response.responseData;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const getactiveCustomers = createAsyncThunk('customer/getactivecustomers', async (_, { rejectWithValue }) => {
    try {
      const response = await getactivecustomersapi();
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
export const addCustomer = createAsyncThunk('customer/addcustomer', async (formData, { rejectWithValue }) => {
  try {
    const response = await addcustomerapi(formData);
    return response.responseData;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getCustomerList = createAsyncThunk('customer/getlist', async (_, { rejectWithValue }) => {
    try {
      const response = await getcustomerlistapi();
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const updatestatusCustomer = createAsyncThunk('customer/updatestatus', async (formData, { rejectWithValue }) => {
    try {
      console.log(formData);
      const response = await updatestatuscustomerapi(formData);
      return response.responseData;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const deleteCustomer = createAsyncThunk('customer/delete', async (formData, { rejectWithValue }) => {
    try {
      const response = await deletecustomerapi(formData);
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
    editsuccess: false,
    listsuccess: false,
    updatesuccess: false,
    list: [],
    actsuccess: false,
    activecustomer: [],
    delsuccess: false
  };
  const CustomerSlice = createSlice({
    name: "customer",
    initialState: initialState,
    reducers: {
      clearCustAction: (state) => {
        state.submitting = false;
        state.success = false;
        state.error = null;
        state.addsuccess = false;
        state.updatesuccess = false;
        state.listsuccess = false;
        state.actsuccess = false;
        state.delsuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getCustomers.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;

      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getactiveCustomers.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.actsuccess = false;

      })
      .addCase(getactiveCustomers.fulfilled, (state, action) => {
        state.submitting = false;
        state.activecustomer = action.payload;
        state.actsuccess = true;
        state.error = null;
      })
      .addCase(getactiveCustomers.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.actsuccess = false;
      })
        .addCase(addCustomer.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.addsuccess = false;

        })
        .addCase(addCustomer.fulfilled, (state, action) => {
          state.submitting = false;
          state.addsuccess = true;
          state.error = null;
        })
        .addCase(addCustomer.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.addsuccess = false;
        })
        .addCase(updatestatusCustomer.pending, (state) => {
          state.submitting = true;
          state.error = null;
          state.updatesuccess = false;

        })
        .addCase(updatestatusCustomer.fulfilled, (state, action) => {
          state.submitting = false;
          state.updatesuccess = true;
          state.error = null;
        })
        .addCase(updatestatusCustomer.rejected, (state, action) => {
          state.submitting = false;
          state.error = action.payload;
          state.updatesuccess = false;
        })
        .addCase(getCustomerList.pending, (state) => {
            state.submitting = true;
            state.error = null;
            state.listsuccess = false;
  
          })
          .addCase(getCustomerList.fulfilled, (state, action) => {
            state.submitting = false;
            state.list = action.payload;
            state.listsuccess = true;
            state.error = null;
          })
          .addCase(getCustomerList.rejected, (state, action) => {
            state.submitting = false;
            state.error = action.payload;
            state.listsuccess = false;
          })
          .addCase(deleteCustomer.pending, (state) => {
            state.submitting = true;
            state.error = null;
            state.delsuccess = false;
          })
          .addCase(deleteCustomer.fulfilled, (state, action) => {
            state.submitting = false;
            state.delsuccess = true;
            state.error = null;
          })
          .addCase(deleteCustomer.rejected, (state, action) => {
            state.submitting = false;
            state.error = action.payload;
            state.delsuccess = false;
          });
      },
    },
);

export const customerReducer = CustomerSlice.reducer;
export const {  clearCustAction } = CustomerSlice.actions; 