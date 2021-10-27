import {
  IS_LOGGED_IN,
  IS_LOADING_LOGIN,
  IS_LOADING_REGISTER,
  SET_TOKEN,
  SET_ID,
  UNSET_TOKEN,
} from './actionTypes';

export function setLogStatus(payload) {
  return { type: IS_LOGGED_IN, payload };
}

export function setToken(payload) {
  return { type: SET_TOKEN, payload };
}

export function setLoadingLogin(payload) {
  return { type: IS_LOADING_LOGIN, payload };
}

export function setLoadingRegister(payload) {
  return { type: IS_LOADING_REGISTER, payload };
}

export function setID(payload) {
  return { type: SET_ID, payload };
}

export function unsetToken(payload) {
  return { type: UNSET_TOKEN, payload };
}

export const login = (payload, history, toast) => {
  return async dispatch => {
    dispatch(setLoadingLogin(true));
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXSHQHfzLhH9bg4SIpyBQCgJVn-rs33aM';

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        dispatch(setLogStatus(true));
        dispatch(setToken(data.idToken));
        dispatch(setID(data.localId));
        localStorage.setItem('token', data.idToken);
        history.push('/home');
      } else {
        const data = await res.json();
        let errorMessage = 'Authentication failed!';
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      dispatch(setLoadingLogin(false));
    }
  };
};

export const logout = history => {
  return dispatch => {
    dispatch(setLogStatus(false));
    dispatch(unsetToken(''));
    localStorage.removeItem('token');
    history.push('/');
  };
};

export const register = (payload, history, toast) => {
  return async dispatch => {
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXSHQHfzLhH9bg4SIpyBQCgJVn-rs33aM';

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        dispatch(setLogStatus(true));
        dispatch(setToken(data.idToken));
        dispatch(setID(data.lokalId));
        localStorage.setItem('token', data.idToken);
        history.push('/home');
      } else {
        const data = await res.json();
        let errorMessage = 'Authentication failed!';
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }

        throw new Error(errorMessage);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      dispatch(setLoadingLogin(false));
    }
  };
};
