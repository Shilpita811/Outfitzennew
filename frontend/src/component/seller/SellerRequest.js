import React, { Fragment, useState, useEffect } from "react";
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import PinDropIcon from "@material-ui/icons/PinDrop";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import "./SellerRequest.css";
import { clearErrors, sellerRequest as sellerrequest } from "../../actions/sellerAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
//import { APPLICATION_RESET } from "../../constants/sellerConstants";
import { useNavigate } from "react-router";
import Loader from "../layout/Loader/Loader";



const SellerRequest = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const alert = useAlert();
    const { loading, error, success } = useSelector((state) => state.sellerRequest);

    const [request, setRequest] = useState({
        name: "",
        email: "",
        phoneNo: "",
        address: "",
        pinCode: "",
        password: "",
    })

    const { name, email, phoneNo, address, pinCode, password } = request;

    const requestSubmit = (e)=>{
        e.preventDefault();
        const requestForm = new FormData();
        requestForm.set("name",name);
        requestForm.set("email",email);
        requestForm.set("phoneNo",phoneNo);
        requestForm.set("address",address);
        requestForm.set("pinCode",pinCode);
        requestForm.set("password",password);
        dispatch(sellerrequest(requestForm));
    }

    const requestDataChange = (e) =>{
        setRequest({...request, [e.target.name]: e.target.value});
    }
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors);
        };
        if(success){
            alert.success("Request Has Been Sent");
            navigate("/requestSuccess");
        }

    },[dispatch, error, success, navigate, alert]);

    return (
        <Fragment>
            <MetaData title={"Seller Request "} />
            <Fragment>
                {loading ? <Loader /> : <Fragment>
                <div className="requestContainer">
                <div className="requestBox">
                    <form 
                        className="requstForm"
                        encType="multipart/form-data"
                        onSubmit={requestSubmit}
                    >
                        <div className="signUpName">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Seller Name"
                                required
                                name="name"
                                value={name}
                                onChange={requestDataChange}
                            />
                        </div>
                        <div className="signUpEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Seller Email"
                                required
                                name="email"
                                value={email}
                                onChange={requestDataChange}
                            />
                        </div>
                        <div>
                            <PhoneIcon />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                required
                                name="phoneNo"
                                value={phoneNo}
                                size="10"
                                onChange={requestDataChange}
                            />
                        </div>
                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                name="address"
                                value={address}
                                onChange={requestDataChange}
                            />
                        </div>
                        <div>
                            <PinDropIcon />
                            <input
                                type="text"
                                placeholder="Pin Code"
                                required
                                name="pinCode"
                                value={pinCode}
                                onChange={requestDataChange}
                            />
                        </div>
                        <div>
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={password}
                                onChange={requestDataChange}
                            />
                        </div>
                        <input type="submit" value="Register" className="requstBtn" />
                    </form>
                </div>
            </div>
                    </Fragment>}
            </Fragment>
        </Fragment>

    )
}

export default SellerRequest

