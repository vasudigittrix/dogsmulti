import { getallstaticcontentapi, editstaticcontentbytypeapi, getstaticcontentbytypeapi } from "@/services/api";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getStaticContentByType = createAsyncThunk('staticcontent/getbytype', async (formData, { rejectWithValue }) => {
    try {
      const response = await getstaticcontentbytypeapi(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
export const editStaticContent = createAsyncThunk('staticcontent/edit', async (formData, { rejectWithValue }) => {
  try {
    console.log(formData);
    const response = await editstaticcontentbytypeapi(formData);
    return response;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});



const singlestaticcontentSlice = createSlice({
  name: 'singlestaticcontent',
  initialState: {
    submitting: false,
    error: null,
    success: false,
    content: [],
    editsuccess: false
  },
  reducers: {
    clearsingstatconStatus: state => {
      state.success=false;
      state.error = null;
      state.submitting = false;
      state.editsuccess = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getStaticContentByType.pending, state => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getStaticContentByType.fulfilled, (state,action) => {
        state.submitting = false;
        state.success=true;
        state.content = action.payload;
      })
      .addCase(getStaticContentByType.rejected, (state, action) => {
        state.submitting = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(editStaticContent.pending, state => {
        state.submitting = true;
        state.error = null;
        state.editsuccess = false;
      })
      .addCase(editStaticContent.fulfilled, (state,action) => {
        state.submitting = false;
        state.editsuccess=true;
        state.content = action.payload;
      })
      .addCase(editStaticContent.rejected, (state, action) => {
        state.submitting = false;
        state.editsuccess = false;
        state.error = action.payload;
      });
  },
});
export const singlestaticcontentReducer = singlestaticcontentSlice.reducer;
export const { clearsingstatconStatus } = singlestaticcontentSlice.actions;

