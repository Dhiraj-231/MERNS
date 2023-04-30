import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { Typography, Button, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../../Actions/User";
import Loader from "../../Loader/Loader";
function UpdateProfile() {
  const dispatch = useDispatch();
  const { user, loading, error, message } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message: updateMessage,
  } = useSelector((state) => state.likes);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    image: "",
    imagePrev: user.avatar.url,
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(form.name, form.email, form.image));
    dispatch(loadUser());
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setForm({ ...form, imagePrev: Reader.result });
        setForm({ ...form, image: Reader.result });
      }
    };
    Reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (updateError) {
      toast.error(updateError, {
        position: toast.POSITION.TOP_LEFT,
      });
      dispatch({ type: "clearErrors" });
    }
    if (updateMessage) {
      toast.success(updateMessage, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [dispatch, updateError, updateMessage, error, message]);
  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h4">Update Profile</Typography>
        {form.image == "" ? (
          <Avatar
            src={form.imagePrev}
            alt="User"
            sx={{ height: "10vmax", width: "10vmax" }}
          />
        ) : (
          <Avatar
            src={form.image}
            alt="User"
            sx={{ height: "10vmax", width: "10vmax" }}
          />
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Enter Your Name"
          className="updateProfileInputs"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          className="updateProfileInputs"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Button disabled={updateLoading} variant="contained" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
}

export default UpdateProfile;
