import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import "./CommentCard.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getMyPosts } from "../../Actions/Post";
import { getFollowingPost } from "../../Actions/User";
const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const deleteCommentHandler = (e) => {
    e.preventDefault();
    dispatch(deleteComment(postId, commentId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPost());
    }
  };
  return (
    <div className="commentUser">
      <Link to={`/user/&{userId}`}>
        <img src={avatar} alt={name} className="commentUserImage" />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography variant="h6">{comment}</Typography>
      {isAccount ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
