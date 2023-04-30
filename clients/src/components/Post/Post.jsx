import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar, Typography, Button, Dialog, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import {
  addCommentOnPost,
  deletePost,
  getMyPosts,
  likePost,
  updateCaption,
} from "../../Actions/Post";
import { getFollowingPost, loadUser } from "../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";
const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const [like, setLike] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setcaptionValue] = useState(caption);
  const [captionToggle, setcaptionToggle] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const likeButtonHandler = () => {
    setLike(!like);
    dispatch(likePost(postId));
    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPost());
    }
  };

  const commentSubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPost());
    }
  };
  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLike(true);
      }
    });
  }, [likes, user._id]);
  const updateCaptionHandler = (e) => {
    dispatch(updateCaption(captionValue, postId));
    dispatch(getMyPosts());
  };
  const deletePostHandler = async (e) => {
    e.preventDefault();
    await dispatch(deletePost(postId));
    await dispatch(getMyPosts());
    dispatch(loadUser());
  };
  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button onClick={() => setcaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : null}
      </div>
      <img src={postImage} alt="Post" height={500} width={50} />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <div className="postFooter">
        <Button onClick={likeButtonHandler}>
          {like ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>
        <Button onClick={deletePostHandler}>
          {isDelete ? <DeleteOutline /> : null}
        </Button>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 1vmax",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length} likes</Typography>
      </button>
      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked by</Typography>
          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>
          <form className="commentForm" onSubmit={commentSubmitHandler}>
            <Input
              className="commentFormInput"
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Your comments"
              required
            />
            <Button
              className="commentFormButton"
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </form>
          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                key={item.user._id}
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item.commentId}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No comments yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={captionToggle}
        onClose={() => setCommentToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>
          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <Input
              className="commentFormInput"
              type="text"
              value={captionValue}
              onChange={(e) => setcaptionValue(e.target.value)}
              placeholder="Caption Here...."
              required
            />
            <Button
              className="commentFormButton"
              type="submit"
              variant="contained"
            >
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
