import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {API, LoadingStatus} from '../constants';
import axiosRequest from '../helpers/axiosRequest';

const PROFILE_FEATURE_KEY = 'profile';

const profileAdapter = createEntityAdapter();

const initialprofileState = profileAdapter.getInitialState({
  userProfileLoadingStatus: LoadingStatus.NOT_LOADED,
  addProfileLoadingStatus: LoadingStatus.NOT_LOADED,
  updateProfileLoadingStatus: LoadingStatus.NOT_LOADED,
  userProfile: null,
  userProfileError: null,
});

/**
 * For profile List
 */
export const getProfileAction = createAsyncThunk(
  'profile/getProfileAction',
  async (params, thunkAPI) => {
    try {
      const list = await axiosRequest.get(`${API.GET_PROFILE}/1`);
      return list.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

/**
 * For profile List
 */
export const addProfileAction = createAsyncThunk(
  'profile/addProfileAction',
  async (params, thunkAPI) => {
    try {
      const list = await axiosRequest({
        url: API.PROFILE_ADD,
        method: 'POST',
        data: params,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      return 'Success';
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const updateProfileAction = createAsyncThunk(
  'profile/updateProfileAction',
  async (params, thunkAPI) => {
    try {
      const list = await axiosRequest({
        url: API.PROFILE_UPDATE,
        method: 'POST',
        data: params,
      });
      return 'Success';
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

/**
 * Slice for all reducres
 */
const profileSlice = createSlice({
  name: PROFILE_FEATURE_KEY,
  initialState: initialprofileState,
  reducers: {
    add: profileAdapter.addOne,
    remove: profileAdapter.removeOne,
    resetprofileListState: (state, action) => {
      return {
        ...state,
      };
    },
  },
  extraReducers: builder => {
    builder
      //Add profile
      .addCase(addProfileAction.pending, state => {
        state.addProfileLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(addProfileAction.fulfilled, (state, action) => {
        state.addProfileLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(addProfileAction.rejected, (state, action) => {
        state.addProfileLoadingStatus = LoadingStatus.FAILED;
      })
      //get profile List
      .addCase(getProfileAction.pending, state => {
        state.userProfileLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getProfileAction.fulfilled, (state, action) => {
        state.userProfileLoadingStatus = LoadingStatus.LOADED;
        state.userProfile = action.payload;
      })
      .addCase(getProfileAction.rejected, (state, action) => {
        state.userProfileLoadingStatus = LoadingStatus.FAILED;
        state.userProfileError = action.payload || action.error.message;
      })
      //update profile List
      .addCase(updateProfileAction.pending, state => {
        state.updateProfileLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        state.updateProfileLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.updateProfileLoadingStatus = LoadingStatus.FAILED;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const profileReducer = profileSlice.reducer;

export const profileActions = profileSlice.actions;
