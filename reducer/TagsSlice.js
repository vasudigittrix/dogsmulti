import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getFacilitiesapi, updatestatusfacilityapi, createfacilityapi, deletefacilityapi, getactiveFacilitiesapi } from '../services/api';
import { getTagsapi, updatestatusTagapi, createTagapi, deleteTagapi, getTagsbystatusapi } from '../services/api';
export const createTag = createAsyncThunk('tags/createtag', async (formData, { rejectWithValue }) => {
  try {
    const response = await createTagapi(formData);
    console.log(response);
    return response;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getTags = createAsyncThunk('tags/gettags', async (formData, { rejectWithValue }) => {
  try {
    const response = await getTagsapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const getTagsByStatus = createAsyncThunk('tags/getactivetags', async (formData, { rejectWithValue }) => {
  try {
    const response = await getTagsbystatusapi(formData);
    console.log(response.responseData.data);
    return response.responseData.data;

  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const updateStatusTags = createAsyncThunk('tags/updatestatus', async (formData, { rejectWithValue }) => {
    try {
      const response = await updatestatusTagapi(formData);
      console.log(response);
      return response.responseData.data;
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });
  export const deleteTags = createAsyncThunk('tags/delete', async (formData, { rejectWithValue }) => {
    try {
      const response = await deleteTagapi(formData);
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
  activetagss: [],
  actsuccess:false,
};
const TagsSlice = createSlice({
  name: "tags",
  initialState: initialState,
  reducers: {
    cleartagAction: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
      state.delsuccess = false;
      state.updatesuccess = false;
      state.createsuccess = false;
      state.actsuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createTag.pending, (state) => {
      state.submitting = true;
      state.error = null;
      state.createsuccess = false;
    })
    .addCase(createTag.fulfilled, (state, action) => {
      state.submitting = false;
      state.createsuccess = true;
      state.error = null;
    })
    .addCase(createTag.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
      state.createsuccess = false;
    })
      .addCase(getTags.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.submitting = false;
        state.content = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getTagsByStatus.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.actsuccess = false;
      })
      .addCase(getTagsByStatus.fulfilled, (state, action) => {
        state.submitting = false;
        state.activetagss = action.payload;
        state.actsuccess = true;
        state.error = null;
      })
      .addCase(getTagsByStatus.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.actsuccess = false;
      })
      .addCase(updateStatusTags.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.updatesuccess = false;
      })
      .addCase(updateStatusTags.fulfilled, (state, action) => {
        state.submitting = false;
        state.updatesuccess = true;
        state.error = null;
      })
      .addCase(updateStatusTags.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.updatesuccess = false;
      })
      .addCase(deleteTags.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.delsuccess = false;
      })
      .addCase(deleteTags.fulfilled, (state, action) => {
        state.submitting = false;
        state.delsuccess = true;
        state.error = null;
      })
      .addCase(deleteTags.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.delsuccess = false;
      });
        
  },
});
export const tagsReducer = TagsSlice.reducer;
export const { cleartagAction } = TagsSlice.actions; 