import React, { useEffect, useState } from 'react';
import './Registration.css';
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from 'react-alert';
import { useLocation, useNavigate } from 'react-router';



const Registration = () => {
    const dispatch  = useDispatch();
    const alert  = useAlert();
    const navigate = useNavigate();
    const location = useLocation();

    const {error, loading, isAuthenticated} = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const {name, email, password} = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const registerSubmit = (e) =>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    };

    const registerDataChange = (e) =>{
        if(e.target.name === "avatar"){
            const reader = new FileReader();
            reader.onload = (e) => {
                if(reader.readyState === 2 ){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                };
            };
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUser({...user, [e.target.name]: e.target.value});    
        }
    }

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(()=> {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        //const path = location.pathname;
        if(isAuthenticated){
            navigate(redirect);
        }
    }, [dispatch, error, alert,isAuthenticated,navigate,redirect]);
  return (
    <>
     <div className="container5">
                <div className="title">Registration</div>
                <form encType="multipart/form-data" onSubmit={registerSubmit}>
                    <div className="user__details">
                        <div className="input__box">
                            <span className="details">Full Name</span>
                            <input type="text" placeholder="E.g: John Smith" name="name" value={name} onChange={registerDataChange} required />
                        </div>
                        <div className="input__box">
                            <span className="details">Email</span>
                            <input type="email" placeholder="johnsmith@hotmail.com" name="email" value={email} onChange={registerDataChange} required />
                        </div>

                        <div className="input__box">
                            <span className="details">Password</span>
                            <input type="password" placeholder="********" name="password" value={password} onChange={registerDataChange} required />
                        </div>
                        <div className="input__box img">
                            <span className="details">Photo</span>
                            <input type="file" placeholder="" name="avatar" onChange={registerDataChange} required style={{paddingTop : "7px"}}/>
                        </div>
                        <img src={avatarPreview} alt="Avatar Preview" style={{height: "80px"}}/>

                    </div>
                    <div className="button">
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
    </>
  )
}

export default Registration