import {
  SET_ID,
  SET_TOKEN,
  IS_LOGGED_IN,
  IS_LOADING_LOGIN,
  IS_LOADING_REGISTER,
  UNSET_TOKEN,
} from './actionTypes';

const initialToken = localStorage.getItem('token');

const initialState = {
  id: '',
  isLoggedIn: initialToken ? true : false,
  accessToken: initialToken ? initialToken : '',
  isloadingLogin: false,
  isloadingRegister: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ID:
      return { ...state, id: action.payload };
    case SET_TOKEN:
      return { ...state, accessToken: action.payload };
    case IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };
    case IS_LOADING_LOGIN:
      return { ...state, isLoadingLogin: action.payload };
    case IS_LOADING_REGISTER:
      return { ...state, isloadingRegister: action.payload };
    case UNSET_TOKEN:
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
};

export default reducer;
