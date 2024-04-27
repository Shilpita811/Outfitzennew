import React, { useEffect, useState } from 'react'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../../actions/userAction';
import { useLocation, useNavigate } from 'react-router';

const Login = () => {
    const dispatch  = useDispatch();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const {error, loading, isAuthenticated} = useSelector((state) => state.user);

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
        navigate('/');
    }
    
    const redirect = location.search ? location.search.split("=")[1] : "/account";

    // useEffect(()=> {
    //     if(error){
    //         alert.error(error);
    //         dispatch(clearErrors());
    //     }
    //     //const path = location.pathname;
    //     if(isAuthenticated){
    //         navigate('/');
    //     }
    // }, [dispatch, error, alert,isAuthenticated,navigate]);
  return (
    <div>
      <div>
        <div className="container8">
          <div className="title">Login</div>
          <form onSubmit={loginSubmit}>
            <div className="user__details">


              <div className="input__box">
                <span className="details">Email</span>
                <input type="email" placeholder="johnsmith@hotmail.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
              </div>

              <div className="input__box">
                <span className="details">Password</span>
                <input type="password" placeholder="" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
              </div>


            </div>
            <div className="button">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login