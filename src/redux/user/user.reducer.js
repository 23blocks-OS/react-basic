import { UserTypes } from './user.types';

const INITIAL_STATE = {
  user: null,
  isLoaded: false,
  isAuthenticated: false,
  userProfile: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isLoaded: true,
        isAuthenticated: action.payload ? true : false,
      };
    case UserTypes.PROFILE_LOADED:
      return {
        ...state,
        userProfile: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
