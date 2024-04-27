import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import "./Profile.css";
import { logout } from '../../actions/userAction'
import { useAlert } from 'react-alert';

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleLogout = () =>{
    dispatch(logout());
    navigate('/');
    alert.success("Logout Successfully");

  }

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        <MetaData title={`${user.name}'s Profile`} />
        <div className="profileContainer">
          <div>
            <h1>My Profile</h1>
            <img src={user.avatar.url} alt={user.name} />
            <Link to="/me/update">Edit Profile</Link>
          </div>
          <div>
            <div>
              <h4>Full Name</h4>
              <p>{user.name}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <h4>Joined On</h4>
              <p>{String(user.createdAt).substr(0, 10)}</p>
            </div>

            <div>
              {user.role === "admin" ? <Link to="/admin/dashboard">Dashboard</Link> : ''}
              <Link to="/orders">My Orders</Link>
              <Link to="/password/update">Change Password</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </Fragment>
      }
    </Fragment>
  )
}

export default Profile
