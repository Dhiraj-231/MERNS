import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPost } from "../../Actions/Post";
import Loader from "../../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { toast } from "react-toastify";
import User from "../User/User";
import { useParams } from "react-router-dom";
import { followAndUnfollowUser, getUserProfile } from "../../Actions/User";
function UserProfile() {
  const dispatch = useDispatch();
  const param = useParams();
  const { user: me } = useSelector((state) => state.user);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);
  const { loading, error, myPost } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.likes);

  const [followersToggle, setFollowerToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  useEffect(() => {
    if (me._id === param.id) {
      setMyProfile(true);
    }
    if (user) {
      user.follower.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, param.id, me._id]);
  const followingHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(param.id));
    dispatch(getUserProfile(param.id));
  };

  useEffect(() => {
    dispatch(getUserPost(param.id));
    dispatch(getUserProfile(param.id));
  }, [dispatch, param.id]);
  useEffect(() => {
    if (followError) {
      toast.error(followError, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch({ type: "clearError" });
    }
    if (userError) {
      toast.error(userError, {
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
  }, [followError, message, dispatch, userError]);
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
            />
          ))
        ) : (
          <Typography variant="h4">User has not made any post yet</Typography>
        )}
      </div>
      <div className="accountRight">
        {user && (
          <>
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

            {myProfile ? null : (
              <Button
                style={{ background: following ? "red" : "blue" }}
                onClick={followingHandler}
                variant="contained"
                disabled={followLoading}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
          </>
        )}

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

export default UserProfile;
