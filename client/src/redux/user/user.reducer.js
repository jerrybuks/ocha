import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isFetchingUser: true,
  isLoggingIn: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isFetchingUser: false,
        isLoggingIn: false,
        error: null
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null
      };
    case UserActionTypes.EMAIL_SIGN_IN_START:
    case UserActionTypes.GOOGLE_SIGN_IN_START:
    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        isLoggingIn: true,
      }
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetchingUser: false,
        isLoggingIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
