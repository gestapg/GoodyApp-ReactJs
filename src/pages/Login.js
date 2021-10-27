import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login, register } from '../store/authentication/action';
// import backgroundImage from './free-t4ergergd.jpg';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLogin, setIsLogin] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  const { isLoadingLogin } = useSelector(state => state.auth);

  const handleSwitchAuth = () => {
    setIsLogin(prevState => !prevState);
  };

  const forEmail = e => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const forPaswword = e => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    if (payload.email === '' || payload.password === '') {
      toast.error('Please Enter email and password', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (isLogin) {
        dispatch(login(payload, history, toast));
      } else {
        dispatch(register(payload, history, toast));
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="hero min-h-screen bg-base-200 bg-cover bg-center"
        style={{
          backgroundImage: `url(${'https://www.ikea.com/images/office-cbb84b757d5f050bf53ebb336af10930.jpg?f=xxxl'})`,
        }}
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div className="flex-col justify-center hero-content lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="mb-5 text-5xl font-bold">Hello there,</h1>
            <h1 className="mb-5 text-5xl font-bold">Welcome!</h1>
            <p className="mb-5 pr-20 text-xl">
              Find your thing in this website! You'll find a good match to your
              stlye here, feel free to register and scrolling around!
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div className="card-body">
              <h1 className="text-center text-3xl font-semibold mb-3">
                {isLogin ? 'Login' : 'Register'}
              </h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  onChange={forEmail}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  onChange={forPaswword}
                />
              </div>
              <button
                type="button"
                className="border-none"
                onClick={handleSwitchAuth}
                style={{ border: 'none', backgroundColor: 'transparent' }}
              >
                {isLogin ? 'Create new account' : 'Login with existing account'}
              </button>
              <div className="form-control mt-6">
                {!isLoadingLogin && (
                  <input
                    type="submit"
                    value={isLogin ? 'Login' : 'Create Account'}
                    className="btn btn-primary"
                  />
                )}
                {isLoadingLogin && (
                  <p className="text-center">Sending request....</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
