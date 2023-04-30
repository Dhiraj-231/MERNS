import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../../Actions/Post";
import Loader from "../../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import User from "../User/User";
import { LogoutUser, deleteProfile } from "../../Actions/User";
function Account() {
  const dispatch = useDispatch();
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading, error, myPost } = useSelector((state) => state.myPosts);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.likes);

  const [followersToggle, setFollowerToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const logOuthandler = async () => {
    await dispatch(LogoutUser());
    toast.error("Logout successfully", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const deleteButtonHandler = async () => {
    await dispatch(deleteProfile());
    dispatch(LogoutUser());
  };
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch, message]);

  useEffect(() => {
    if (likeError) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch({ type: "clearMessasge" });
    }
  }, [likeError, message, dispatch, error]);
  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountLeft">
        {myPost && myPost.length > 0 ? (
          myPost.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              postImage={post.image_url.url}
              caption={post.caption}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h4">No post yet</Typography>
        )}
      </div>
      <div className="accountRight">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h5">{user.name}</Typography>
        <div>
          <button onClick={() => setFollowerToggle(!followersToggle)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user.follower.length}</Typography>
        </div>

        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography>Followings</Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>

        <div>
          <Typography>Posts</Typography>
          <Typography>{user.posts.length}</Typography>
        </div>

        <Button variant="contained" onClick={logOuthandler}>
          Logout
        </Button>

        <Link to="/user/updateProfile">Edit Profile</Link>
        <Link to="/user/updatePassword">Change Passowrd</Link>
        <Button
          onClick={deleteButtonHandler}
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          disabled={deleteLoading}
        >
          Delete My Profile
        </Button>

        <Dialog
          open={followersToggle}
          onClose={() => setFollowerToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>
            {user && user.follower.length > 0 ? (
              user.follower.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>
        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followings</Typography>
            {user && user.following.length > 0 ? (
              user.following.map((followings) => (
                <User
                  key={followings._id}
                  userId={followings._id}
                  name={followings.name}
                  avatar={followings.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You are not Following any One
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default Account;
