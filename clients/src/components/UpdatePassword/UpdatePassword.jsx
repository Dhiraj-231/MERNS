import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePasswords } from "../../Actions/User.js";
import { useNavigate } from "react-router-dom";
function UpdatePassword() {
  const [form, setForm] = useState({
    oldpassword: "",
    newpassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loading,
    error: passwordError,
    message: passwordUpdate,
  } = useSelector((state) => state.likes);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(updatePasswords(form.oldpassword, form.newpassword));
  };
  useEffect(() => {
    if (passwordError) {
      toast.error(passwordError, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch({ type: "clearError" });
    }
    if (passwordUpdate) {
      toast.success(passwordUpdate, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
      dispatch({ type: "clearMessasge" });
    }
  }, [passwordError, passwordUpdate]);
  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Change Password
        </Typography>
        <input
          type="password"
          placeholder=" Enter Old password"
          onChange={(event) =>
            setForm({ ...form, oldpassword: event.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Enter New Password"
          onChange={(event) =>
            setForm({ ...form, newpassword: event.target.value })
          }
          required
        />
        <Button disabled={loading} variant="contained" type="submit">
          Change Password
        </Button>
      </form>
    </div>
  );
}

export default UpdatePassword;
