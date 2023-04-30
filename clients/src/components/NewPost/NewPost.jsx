import React, { useEffect, useState } from "react";
import "./NewPost.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../Actions/Post";
import { toast } from "react-toastify";
import { loadUser } from "../../Actions/User";
import { useNavigate } from "react-router-dom";
function NewPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [Caption, setCaption] = useState("");
  const { loading, error, message } = useSelector((state) => state.likes);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(Caption, image));
    await dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/account");
      dispatch({ type: "clearMessasge" });
    }
  }, [dispatch, message, error]);
  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h4">New Post</Typography>
        {image && <img src={image} alt="Post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption...."
          value={Caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled={loading} type="submit" variant="text">
          Post
        </Button>
      </form>
    </div>
  );
}

export default NewPost;
