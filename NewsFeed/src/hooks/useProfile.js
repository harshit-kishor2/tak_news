import {useDispatch, useSelector} from 'react-redux';
import {
  addProfileAction,
  getProfileAction,
  updateProfileAction,
} from '../redux/profile.slice';

const useProfile = () => {
  const dispatch = useDispatch();

  // All states
  const {
    userProfileLoadingStatus,
    addProfileLoadingStatus,
    updateProfileLoadingStatus,
    userProfile,
    userProfileError,
  } = useSelector(state => state.profileReducer);

  // Add Actions
  const addProfile = data => dispatch(addProfileAction(data));

  // update Actions
  const updateProfile = data => dispatch(updateProfileAction(data));

  const getProfile = () => dispatch(getProfileAction());

  return {
    userProfileLoadingStatus,
    addProfileLoadingStatus,
    updateProfileLoadingStatus,
    userProfile,
    userProfileError,
    addProfile,
    updateProfile,
    getProfile,
  };
};
export default useProfile;
