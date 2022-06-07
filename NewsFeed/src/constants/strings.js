const strings = {
  APP_NAME: 'News Feed',
};
const loadingStatus = {
  NOT_LOADED: 'not-loaded',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'error',
};

const api = {
  BASE_URL: 'http://192.168.43.193:5000', // change ip
  NEWS_LIST: '/api/news/list',
  GET_PROFILE: '/api/profile/list',
  PROFILE_UPDATE: '/api/profile/edit',
  PROFILE_ADD: '/api/profile/add',
};

export {strings, loadingStatus, api};
