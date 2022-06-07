import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {API, LoadingStatus} from '../constants';
import axiosRequest from '../helpers/axiosRequest';

const NEWS_FEATURE_KEY = 'newsfeed';

const newsAdapter = createEntityAdapter();

const initialNewsState = newsAdapter.getInitialState({
  newsListLoadingStatus: LoadingStatus.NOT_LOADED,
  newsList: [],
  newsListError: null,
});

/**
 * For News List
 */
export const newsListAction = createAsyncThunk(
  'auth/newsListAction',
  async (params, thunkAPI) => {
    try {
      const list = await axiosRequest.get(`${API.NEWS_LIST}/?query=${params}`);
      return list.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

/**
 * Slice for all reducres
 */
const newsSlice = createSlice({
  name: NEWS_FEATURE_KEY,
  initialState: initialNewsState,
  reducers: {
    add: newsAdapter.addOne,
    remove: newsAdapter.removeOne,
    filterListAction: (state, action) => {
      return {
        ...state,
        newsList: action.payload,
      };
    },
    resetnewsListState: (state, action) => {
      return {
        ...state,
      };
    },
    sortListAction: (state, action) => {
      return {
        ...state,
        newsList: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder
      //News List
      .addCase(newsListAction.pending, state => {
        state.newsListLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(newsListAction.fulfilled, (state, action) => {
        state.newsListLoadingStatus = LoadingStatus.LOADED;
        state.newsList = action.payload;
      })
      .addCase(newsListAction.rejected, (state, action) => {
        state.newsListLoadingStatus = LoadingStatus.FAILED;
        state.newsListError = action.payload || action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const newsReducer = newsSlice.reducer;

export const newsActions = newsSlice.actions;
