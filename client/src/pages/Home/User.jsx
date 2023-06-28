import React from "react";
import { Avatar } from "react-ig-icons";
import { useDispatch } from "react-redux";
import { followUser, loadUser, logoutUser, suggestedUsers } from "../../redux/actions/userActions";
import { Link } from "react-router-dom";

const User = ({ user, isAccount=false }) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    const handleFollowUser = () => {
      dispatch(followUser(user.handle));
      dispatch(loadUser());
    }

  return (
    <div className="user__card">
      <div>
        <Avatar src={user.avatar?.url} />
        <div className="text">
          <h4 className="name">{user.name}</h4>
          <Link to={isAccount ? '/account' : `/user/${user.handle}`}>
          <small>@{user.handle}</small>
          </Link>
        </div>
      </div>
      <div>{isAccount ? <button onClick={handleLogout} >Logout</button> 
      : <button onClick={handleFollowUser}>Follow</button>}</div>
    </div>
  );
};

export default User;
