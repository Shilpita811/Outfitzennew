import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_APPLICATIONS_RESET } from "../../constants/sellerConstants";
import{ getSellerRequestDetails, updateRequest, clearErrors } from "../../actions/sellerAction";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router";





const ProcessRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, request } = useSelector((state) => state.requestDetails);

  const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state)=>state.application);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const requestId = id;


  useEffect(()=>{
    if(request && request._id !== requestId){
      dispatch(getSellerRequestDetails(requestId));
    }else{
      setName(request.name);
      setEmail(request.email);
      setRole(request.role);
    }
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if(updateError){
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if(isUpdated){
      alert.success("Role Has been updated Successfully");
      navigate("/admin/seller");
      dispatch({ type: UPDATE_APPLICATIONS_RESET });
    }
  },[dispatch,alert,error,navigate,isUpdated,updateError,request,requestId]);

  const updateRequestHandler =(e) =>{
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("role", role);
    dispatch(updateRequest(requestId, myForm));
  }


  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateRequestHandler}
            >
              <h1>Update Request</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  readOnly
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  readOnly
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="seller">Seller</option>
                  <option value="hold">Hold</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default ProcessRequest
