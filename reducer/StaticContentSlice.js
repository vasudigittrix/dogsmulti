import { getallstaticcontentapi, editstaticcontentbytypeapi, getstaticcontentbytypeapi } from "@/services/api";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const getallStaticContent = createAsyncThunk('staticcontent/getall', async (formData, { rejectWithValue }) => {
  try {
    const response = await getallstaticcontentapi(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const staticcontentSlice = createSlice({
  name: 'staticcontent',
  initialState: {
    submitting: false,
    error: null,
    success: false,
    content: [],
    editsuccess: false
  },
  reducers: {
    clearstatconStatus: state => {
      state.success=false;
      state.error = null;
      state.submitting = false;
      state.editsuccess = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getallStaticContent.pending, state => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getallStaticContent.fulfilled, (state,action) => {
        state.submitting = false;
        state.success=true;
        state.content = action.payload;
      })
      .addCase(getallStaticContent.rejected, (state, action) => {
        state.submitting = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});
export const staticcontentReducer = staticcontentSlice.reducer;

export const { clearstatconStatus } = staticcontentSlice.actions;

