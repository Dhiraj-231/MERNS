import React, { useEffect } from "react";
import "./Home.css";
import User from "../User/User";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import { Typography } from "@mui/material";
import { getAllUSer, getFollowingPost } from "../../Actions/User";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowingPost());
    dispatch(getAllUSer());
  }, [dispatch]);

  const { loading, post, error } = useSelector(
    (state) => state.postOfFollowing
  );
  const { error: likeError, message } = useSelector((state) => state.likes);
  const { allUser, loading: UserLoading } = useSelector(
    (state) => state.allUser
  );
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
  }, [toast, likeError, message, dispatch]);
  return loading === true || UserLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {post && post.length > 0 ? (
          post.map((posts) => (
            <Post
              key={posts._id}
              postId={posts._id}
              postImage={posts.image_url.url}
              caption={posts.caption}
              likes={posts.likes}
              comments={posts.comments}
              ownerImage={posts.owner.avatar.url}
              ownerName={posts.owner.name}
              ownerId={posts.owner._id}
            />
          ))
        ) : (
          <Typography variant="h5">No posts yet</Typography>
        )}
      </div>
      <div className="homeright">
        {allUser && allUser.length > 0 ? (
          allUser.map((users) => (
            <User
              key={users._id}
              userId={users._id}
              name={users.name}
              avatar={users.avatar.url}
            />
          ))
        ) : (
          <Typography variant="h5">No Register user Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
